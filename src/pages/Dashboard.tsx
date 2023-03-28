import Card from '../components/Card/Card';
import Info from '../components/Ticket/Info';
import VerifyCard from '../components/VerifyCard/VerifyCard';
import './dashboard.scss'

const Dashboard = () => {
  return(
  <div className='dashview'>
    <ul className="cards">
      <Card title='Total Products Added' ans='325'/>
      <Card title='Total Merchants Added' ans='150'/>
      <Card title='Total Ownership Transferred' ans='20'/>
      <Card title='Total Tracking Updates' ans='43' />
    </ul> 
    <VerifyCard badgeTitle='Adminship Card' center={true}>
      <Info label='UserName' value='admin' />
      <Info label='Public Address' value='0x755B45d99ede22bf9D6a52D3C72AB92134B714bD' />
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
                <tr>
                  <td>1</td>
                  <td>0x303ea0a2030094a322f001f208c58494b5d954d3c7a799ab49037dc4695ef4e4</td>
                  <td>Grand Theaft Auto Online</td>
                  <td>27 Mar 2023	</td>
                  <td>Games</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>0x303ea0a2030094a322f001f208c58494b5d954d3c7a799ab49037dc4695ef42s</td>
                  <td>Misc</td>
                  <td>29 Mar 2023	</td>
                  <td>Others</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>0x303ea0a2030094a322f001f208c58494b5d954d3c7a799ab49037dc4695ef4ms</td>
                  <td>RangeRover</td>
                  <td>28 Mar 2023	</td>
                  <td>Car</td>
                </tr>
            </tbody>
      </table>
  </div>
  )
};

export default Dashboard;
