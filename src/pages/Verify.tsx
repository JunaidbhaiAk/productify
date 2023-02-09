import React,{useEffect,useState} from 'react'
import './verify.scss'
import {useSearchParams} from 'react-router-dom'
import { connectWallet, getMerchant, getProductById, updateTrack } from '../utils/web3';
import Info from '../components/Ticket/Info';
import { convertDate, cutId } from '../utils/helpers';
import VerifyCard from '../components/VerifyCard/VerifyCard';
import Timeline from '../components/Timeline/Timeline';
import Button from '../components/Button/Button';
import toast from 'react-hot-toast';
const Verify = () => {
//   const {_id} = useParams();
  let [searchParams] = useSearchParams();
  const [data,setData] = useState([]);
  const [address,setAddress] = useState('');
  const [showContactForm,setShowContactForm] = useState(false);
  const [merchantData,setmerchantData] = useState<any>([]);
  const [remind,setRemind] = useState(false);
  const _id = searchParams.get('_id')
  useEffect(()=>{
    if(_id){
      const start = async() => {
        const address = await connectWallet();
        setAddress(address);
        const productData = await getProductById(_id);
        setData(productData);
        const merchantData = await getMerchant(address);
        merchantData[1] === '' ? setShowContactForm(true) : setmerchantData(merchantData);
      }
      start();
    }
  },[]) 

  const handleClick = async () => {
    const toastId = toast.loading('Waiting For Confirmation...');
    const res = await updateTrack(_id,address);
    toast.success(`Transaction Hash : ${cutId(res,20)} `, {
      id: toastId,
      duration: 8000,
    });
    setRemind(pre => !pre)
  }

  return (<>
  {data[1] !== '' ? <div className='container'>
      <div style={{height:'100%',maxWidth:'700px',width:'100%'}}>
        <VerifyCard badgeTitle='Product Info'>
            <Info label='Product Id' value={data[0]} />
            <Info label='Product Name' value={data[1]} />
            <Info label='Added At' value={convertDate(data[2])} />
            {/* <Info label='Added By' value="Admin" /> */}
            <Info label='Category' value={data[5]} />
            <img src='./verified.png' alt='veri' className='verification_img'/>
        </VerifyCard>
        {showContactForm ? <CustomerCard /> : <VerifyCard badgeTitle='Update Track'>
            <Info label='Product Id' value={data[0]} />
            <Info label='Product Name' value={data[1]} />
            <Info label='Merchant Id' value={address} />
            <div style={{display:'flex',alignItems:'center'}}>
              <Info label='Merchant Name' value={merchantData[1]} />
              <Info label='Merchant Company' value={merchantData[2]} />
            </div>
            <Info label='Merchant Address' value={`${merchantData[6]} - ${merchantData[7]?.toString()} ${merchantData[5]}`} />
            <Button onclick={handleClick}>Update Track</Button>
        </VerifyCard>}
      </div>
      
      <VerifyCard badgeTitle='Product Track'>
        {address && <Timeline remind={remind} product_id={_id}/>}
      </VerifyCard>
  </div>
  : <h1>Not Data Found</h1>}
  </>
  )
}


const CustomerCard = () => {
  return(
  <VerifyCard badgeTitle='Customer Support'>
    <Info label='Email' value='producti@sample.com' />
    <Info label='Address' value='FQPW+QR3, Ground floor Aajol, Pune - Bengaluru Hwy, near McDonald Restaurant, Motiram Nagar, Warje, Pune, Maharashtra 411052' />
    <Info label='Telephone' value='(202)-196-445-2' /> 
    <Info label='Rights' value='This is original verification site please contact us in any problem' />
  </VerifyCard>)
}

export default Verify