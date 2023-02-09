import {useState} from 'react'
import toast from 'react-hot-toast'
import Form from "../components/Form/Form"
import Input from "../components/Input/Input"
import { cutId } from '../utils/helpers'
import { addMerchant } from '../utils/web3'
import './addmerchant.scss'

const AddMerchant = () => {
  const [data,setData] = useState({merchant_id:'',merchant_name:'',merchant_email:'',merchant_company:'',merchant_city:'',merchant_state:'',merchant_pincode:''})
  const handleChange = (e:any) => {
    const {name,value} = e.target;
    setData((pre) => {
      return {...pre,[name]:value}
    })
  } 
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const toastId = toast.loading('Waiting For Confirmation...');
    const res = await addMerchant(data);
    toast.success(`Transaction Hash : ${cutId(res,20)} `, {
      id: toastId,
      duration: 8000,
    });
    setData({merchant_id:'',merchant_name:'',merchant_email:'',merchant_company:'',merchant_city:'',merchant_state:'',merchant_pincode:''});
  }
  return (
    <div className='merchant'>
      <Form onclick={handleSubmit} formTitle='Add Merchant' buttonText='Submit Info'>
        <Input type="text" placeholder="Enter Merchant Metamask Public Key" onchange={handleChange} value={data.merchant_id} name='merchant_id'/> 
        <Input type="text" placeholder="Enter First & Last Name" onchange={handleChange} value={data.merchant_name} name='merchant_name'/> 
        <Input type="email" placeholder="Enter Email" onchange={handleChange} value={data.merchant_email} name='merchant_email'/> 
        <Input type="text" placeholder="Enter Company Name" onchange={handleChange} value={data.merchant_company} name='merchant_company'/>
        <Input type="text" placeholder="Enter City" onchange={handleChange} value={data.merchant_city} name='merchant_city'/> 
        <Input type="text" placeholder="Enter State" onchange={handleChange} value={data.merchant_state} name="merchant_state"/>
        <Input type='number' placeholder="Enter Pincode" onchange={handleChange} value={data.merchant_pincode} name='merchant_pincode'/>
      </Form>
    </div>
  )
}

export default AddMerchant