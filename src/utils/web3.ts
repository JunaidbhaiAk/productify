import {ethers} from 'ethers'
import { getContract, contract_add } from './config';
import c from './abi.json'
let contract:any;
export const getHash = async() => {
    contract.hash('hello').then((res:any) => console.log(res));
}

export const isOwner = async() => {
    return await contract.isOwner();
}

export const getDashboardData = async() => {
    const data = await contract.getDashboardData();
    return data;
}


export const addProductAndGet = async(input:any) => {
    const {name,category} = input
    const data = await contract.addProduct(name,category);
    const rec = await data.wait()
    if(rec.status){
        return {gasUsed : rec.gasUsed.toNumber() * 20,thash: rec.transactionHash,pro_id:rec.logs[0].data};
    }
}

export const getAllProducts = async() => {
    return await contract.getAllProducts();
}

export const getProductById = async(_id:any) => {
    // console.log(ethers.utils.arrayify(_id));
    const data = await contract.getProduct(_id);
    console.log(data)
    return data;
}

export const updateOwner = async(pid:string,name:string,address:string) => {
    try{
        const verify = await contract.updateOwner(pid,address,name);
        return await verify.wait();
    }catch(error){
      return error;
    } 
}
     


export const addMerchant = async(data:any) => {
    const {merchant_id,merchant_name,merchant_email,merchant_company,merchant_city,merchant_state,merchant_pincode,update} = data;
    const res = await contract.addMerchants(merchant_id,merchant_name,merchant_email,merchant_company,merchant_city,merchant_state,merchant_pincode,update);
    const rec = await res.wait();
    if(rec.status){
        return rec.transactionHash;
    }
}

export const getMerchant = async(id:any) => {
    const data = await contract.getMerchant(id);
    return data;
}

export const getAllMerchants = async() => {
    const data = await contract.getAllMerchants();
    return data;
}


export const updateTrack = async(product_id:string | null,merchat_id:string) => {
    const res = await contract.updateTrack(product_id,merchat_id);
    const rec = await res.wait()
    if(rec.status){
        return rec.transactionHash;
    }
}

export const getTracks = async(product_id:string) => {
    const res = await contract.getTracks(product_id);
    return res;
}

export const connectWallet = async () => {
    const {ethereum} = window;
    if(ethereum){
        const address = await ethereum.request({method:'eth_requestAccounts'})
        if(address.length > 0){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(c.networks["5777"].address,c.abi,signer);
            return Promise.resolve(address[0]);
        }
        return null;
    }
}