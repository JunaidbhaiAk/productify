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
    }
    constructor () {
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender==owner,"not the owner");
        _;
    }

    uint count = 0;
    mapping (bytes32 => Product) private data;
    mapping (address => Merchant) private merchantsData;
    bytes32[] private keys;

    event returnId(bytes32 id);
    function hash(string memory _string) public pure returns(bytes32) {
     return keccak256(abi.encodePacked(_string));
    }

    function addProduct(string memory _name,string memory _category) public onlyOwner returns(bytes32) {
        count++;
        bytes32 id = hash(_name);
        keys.push(id);
        data[id].id = id;
        data[id].name = _name;
        data[id].date = block.timestamp;
        data[id].category = _category;
        data[id].isDispatch = false;
        data[id].dispatchDate = 0;
        emit returnId(id);
    }

    function getProduct(bytes32 uid) public view returns(bytes32 retid,string memory retname,uint retdate,bool,uint,string memory) {
        return (uid,data[uid].name,data[uid].date,data[uid].isDispatch,data[uid].dispatchDate,data[uid].category);
    }

    function getAllProducts() public view returns(customProductReturn[] memory retProducts){
        customProductReturn[] memory pros = new customProductReturn[](keys.length);
        for(uint i = 0; i < keys.length; i++){
            Product memory currPro = data[keys[i]];
            pros[i] = (customProductReturn(currPro.id,currPro.name,currPro.date,currPro.category,currPro.isDispatch));
        }
        return pros;
    }

    function dispatchProduct(bytes32 _id) public onlyOwner {
        data[_id].isDispatch = true;
        data[_id].dispatchDate = block.timestamp;
    }

    function addMerchants(address id,string memory _name,string memory _email,string memory _companyName,string memory _city,string memory _state,uint _pincode) public onlyOwner {
        // bytes32 id = hash(_email);
        merchantsData[id] = Merchant(id,_name,_companyName,_email,block.timestamp,_state,_city,_pincode);
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
    }

    function getTracks(bytes32 _productId) public view returns(Merchant[] memory) {
        uint len = data[_productId].tracks.length;
        Merchant[] memory resTracks = new Merchant[](len);
        for(uint i = 0; i < len; i++){
            address currMerchant = data[_productId].tracks[i].merchantId;
            resTracks[i] = merchantsData[currMerchant]; 
        }
        return resTracks;
    }
}