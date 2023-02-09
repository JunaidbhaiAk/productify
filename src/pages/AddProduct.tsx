import { useContext,useState,useRef } from 'react'
import toast from 'react-hot-toast';
import Ticket from '../components/Ticket/Ticket';
import { AuthContext } from '../context/auth-context';
import { cutId,handleDownloadImage } from '../utils/helpers';
import { addProductAndGet } from '../utils/web3';
import {RiFileDownloadFill} from 'react-icons/ri'
import './addproduct.scss'
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
const AddProduct = () => {
  const [input,setInput] = useState({name:"",category:""});
  const [show,setShow] = useState(false); //use rendering ticket
  const {updatepostProductData} = useContext(AuthContext)
  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e:any) => {
    const {value,name} = e.target;
    setInput((pre) => {
      return {...pre,[name]:value}
    })
  }
  const handleClick = async (e:any) => {
    e.preventDefault();
    const toastId = toast.loading('Waiting For Confirmation...');
    const data = await addProductAndGet(input);
    updatepostProductData({...data,category:input.category});
    toast.success(`Transaction Hash : ${cutId(data?.thash,20)} `, {
      id: toastId,
      duration: 8000,
    });
    setShow(true);
  }

  const handlePrint = () => {
    handleDownloadImage(printRef.current)
    setShow(false);
    updatepostProductData({});
    setInput({name:"",category:""});
  }
  return (
    <div className='product'>
      <Form onclick={handleClick} formTitle='Add Product' buttonText='Submit'>
        <Input type="text" placeholder='Enter Product Name' name='name' onchange={handleChange} value={input.name} />
        <Input type='text' placeholder='Enter Cateogry' name='category' onchange={handleChange} value={input.category} />
        <input type='text' value='12 Jan 2022' disabled />
      </Form>    
      <div className="printer"></div>
      {show && <div style={{position:'relative'}}><Ticket ref={printRef}/><div onClick={handlePrint} className='print_btn'><RiFileDownloadFill size={25}/></div></div>}
    </div>
  )
}

export default AddProduct