import React,{useState} from 'react'
import toast from 'react-hot-toast'
import { cutId } from '../../utils/helpers'
import { updateOwner } from '../../utils/web3'
import Input from '../Input/Input'
import Info from '../Ticket/Info'

type Props = {
  currOwner:any;
  setCheck:any;
}

const Ownerchange:React.FC<Props> = ({currOwner,setCheck}) => {
  const [newOwner,setnewOwner] = useState({name:'',address:''});
  const handleChange = (e:any) => {
    const {name,value} = e.target;
    setnewOwner((pre) => {
      return {...pre,[name]:value};
    })
  } 
  const changeOwner = async() => {
    const toastId = toast.loading('Waiting For Confirmation...');
    const res = await updateOwner(currOwner.pid,newOwner.name,newOwner.address);
    if(res?.confirmations){
      toast.success(`Ownership Trasnfered Success`, {
        id: toastId,
        duration: 8000,
      });
      setCheck((pre:boolean) => !pre);
    } 
    else toast.error('Something Went Wrong Please Recheck',{id: toastId,duration: 8000})
  }
  return (
    <div style={{padding:'12px 18px'}}>
    <Info label='Owner Id' value={cutId(currOwner?.owner,15) } />
    <Info label='Owner Name' value={currOwner?.ownerName} />
    <Input type='text' name='address' onchange={handleChange} value={newOwner.address} placeholder='Enter New Owner Id'/>
    <Input type='text' name='name' onchange={handleChange} value={newOwner.name} placeholder='Enter New Owner Name'/>
    <button type='button' onClick={changeOwner}>Change Owner</button>
    </div>
  )
}

export default Ownerchange