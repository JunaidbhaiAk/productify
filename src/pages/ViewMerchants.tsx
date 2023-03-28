import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import './viewproduct.scss'
const ViewMerchants = () => {
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
                    <tr>
                    <td>1</td>
                    <td>0x755B45d99ede22bf9D6a52D3C72AB92134B714bD</td>
                    <td>Jhon Snow</td>
                    <td>jhon@email.com</td>
                    <td>Jhonnys Company</td>
                    <td>Pune</td>
                    <td>12 Jan 2023</td>  
                    <td><button>Update</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ViewMerchants