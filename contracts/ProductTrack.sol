pragma solidity ^0.8.17; 

contract ProductTrack {
    address internal owner;
    struct Track{
        address merchantId;
        uint date;
    }

    struct Product {
        bytes32 id;
        string name;
        uint date;
        string category;
        bool isDispatch;
        uint dispatchDate;
        address owner;
        string ownerName;
        Track[] tracks;
    }

    struct Merchant {
        address id;
        string name;
        string companyName;
        string email;
        uint joiningDate;
        string state;
        string city;
        uint pincode;
    }

    struct customProductReturn {
        bytes32 id;
        string name;
        uint date;
        string category;
        bool isDispatch;
        address owner;
        string ownerName;
    }
    constructor () {
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender==owner,"not the owner");
        _;
    }

    uint tracksCount = 0;
    uint ownershipTransferedCount = 0;
    mapping (bytes32 => Product) private data;
    mapping (address => Merchant) private merchantsData;
    bytes32[] private keys;
    address[] private merchantKeys;

    event returnId(bytes32 id);
    function hash(string memory _string) public pure returns(bytes32) {
     return keccak256(abi.encodePacked(_string));
    }

    function getDashboardData() public view onlyOwner returns(uint,uint,uint,uint){
        return (keys.length,merchantKeys.length,tracksCount,ownershipTransferedCount);
    }

    function addProduct(string memory _name,string memory _category) public onlyOwner returns(bytes32) {
        bytes32 id = hash(_name);
        keys.push(id);
        data[id].id = id;
        data[id].name = _name;
        data[id].date = block.timestamp;
        data[id].category = _category;
        data[id].isDispatch = false;
        data[id].dispatchDate = 0;
        data[id].owner = owner;
        data[id].ownerName = 'admin';
        emit returnId(id);
    }
    
    function updateOwner(bytes32 uid,address newOwner,string memory newOwnerName) public {
        require(msg.sender == data[uid].owner,"Sorry Only Original Owner Can Change A Owner");
        ownershipTransferedCount++;
        data[uid].owner = newOwner;
        data[uid].ownerName = newOwnerName;
    }

    function getProduct(bytes32 uid) public view returns(customProductReturn memory) {
        customProductReturn memory ret = customProductReturn(uid,data[uid].name,data[uid].date,data[uid].category,data[uid].isDispatch,data[uid].owner,data[uid].ownerName);
        return ret;
    }

    function getAllProducts() public view returns(customProductReturn[] memory retProducts){
        customProductReturn[] memory pros = new customProductReturn[](keys.length);
        for(uint i = 0; i < keys.length; i++){
            Product memory currPro = data[keys[i]];
            pros[i] = (customProductReturn(currPro.id,currPro.name,currPro.date,currPro.category,currPro.isDispatch,currPro.owner,currPro.ownerName));
        }
        return pros;
    }

    function dispatchProduct(bytes32 _id) public onlyOwner {
        data[_id].isDispatch = true;
        data[_id].dispatchDate = block.timestamp;
    }

    function addMerchants(address id,string memory _name,string memory _email,string memory _companyName,string memory _city,string memory _state,uint _pincode) public onlyOwner {
        // bytes32 id = hash(_email);
        merchantKeys.push(id);
        merchantsData[id] = Merchant(id,_name,_companyName,_email,block.timestamp,_state,_city,_pincode);
    }

    function getAllMerchants() public view returns(Merchant[] memory){
        Merchant[] memory merchants = new Merchant[](merchantKeys.length);
        for(uint i = 0; i < merchantKeys.length; i++){
            merchants[i] = merchantsData[merchantKeys[i]];
        }
        return merchants;
    }

    function getMerchant(address _id) public view returns (Merchant memory){
        return merchantsData[_id];
    }
    
    function verifyMerchant(address _id) public view returns(bool){
        if(merchantsData[_id].id == _id) return true;
        return false;
    }

    function updateTrack(bytes32 _productId,address _merchantId) public {
        data[_productId].tracks.push(Track(_merchantId,block.timestamp));
        tracksCount++;
    }

    function getTracks(bytes32 _productId) public view returns(Merchant[] memory,uint[] memory) {
        uint len = data[_productId].tracks.length;
        Merchant[] memory resTracks = new Merchant[](len);
        uint[] memory dateofTracks = new uint[](len);
        for(uint i = 0; i < len; i++){
            address currMerchant = data[_productId].tracks[i].merchantId;
            resTracks[i] = merchantsData[currMerchant]; 
            dateofTracks[i] = data[_productId].tracks[i].date;
        }
        return (resTracks,dateofTracks);
    }
}