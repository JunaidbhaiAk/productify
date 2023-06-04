import { useContext, useEffect,useState } from 'react';
import Card from '../components/Card/Card';
import Info from '../components/Ticket/Info';
import VerifyCard from '../components/VerifyCard/VerifyCard';
import './dashboard.scss'
import { getDashboardData } from '../utils/web3';
import { convertDate } from '../utils/helpers';
import { AuthContext } from '../context/auth-context';

const Dashboard = () => {
  const [data,setData] = useState<any>([])
  const {user} = useContext(AuthContext)
  useEffect(() => {
    const getData = async() => {
      const res = await getDashboardData();
      setData(res);
    }
    getData();
  },[])
  return(
  <div className='dashview'>
    <ul className="cards">
      <Card title='Total Products Added' ans={data[0]?.toString()}/>
      <Card title='Total Merchants Added' ans={data[1]?.toString()}/>
      <Card title='Total Ownership Transferred' ans={data[3]?.toString()}/>
      <Card title='Total Tracking Updates' ans={data[2]?.toString()} />
    </ul> 
    <VerifyCard badgeTitle='Adminship Card' center={true}>
      <Info label='UserName' value='admin' />
      <Info label='Public Address' value={String(user)} />
      <Info label='Product Ver' value='1.1' />
    </VerifyCard>
    <span className='last__title'>Recently Added Products</span>
    <table className='table' style={{marginTop:"25px"}}>
            <thead>
              <tr>
              <th>Sr No</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Category</th>
              </tr>
            </thead>
            <tbody>
                {data[4]?.length === 0 ? <tr><td>No Data Found</td></tr>
                : data[4]?.map((ele:any,idx:number,) => {
                  return (<tr key={idx}>
                    <td>{idx}</td>
                    <td>{ele[0]}</td>
                    <td>{ele[1]}</td>
                    <td>{convertDate(ele[2])}</td>
                    <td>{ele[3]}</td>
                  </tr>)
                })  
              }
            </tbody>
      </table>
  </div>
  )
};

export default Dashboard;
