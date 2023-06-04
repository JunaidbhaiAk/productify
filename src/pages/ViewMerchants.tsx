import React,{useEffect,useState} from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { convertDate } from '../utils/helpers'
import { getAllMerchants } from '../utils/web3'
import './viewproduct.scss'
const ViewMerchants = () => {
  const [merchants,setMerchants] = useState<any>([])
  const navigate = useNavigate();
  useEffect(() => {
    getAllMerchants().then(data => setMerchants(data))
  },[])

  const handleClick = (data:Array<any>) => {
    navigate('/addmerchant',{state:{data}})
  }

  return (
    <div className='view'>
        <div className='searchbar'>
        <div className='searchbar__container'>
          <RiSearch2Line size={15}/>
          <input type="text" onChange={() => null} placeholder='Enter Keywords'/>
        </div>
      </div>
        <div className='table_container'>
            <table className='table'>
                <thead>
                <tr>
                <th>Sr No</th>
                <th>Product Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>City</th>
                <th>Date</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {merchants.map((ele:any,idx:number) => {
                        return (
                        <tr key={ele['id']}>
                          <td>{idx + 1}</td>
                          <td>{ele['id']}</td>
                          <td>{ele['name']}</td>
                          <td>{ele['email']}</td>
                          <td>{ele['companyName']}</td>
                          <td>{ele['city']}</td>
                          <td>{convertDate(ele['joiningDate'])}</td>  
                          <td><button onClick={() => handleClick(ele)}>Update</button></td>
                        </tr>)
                    })}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default ViewMerchants