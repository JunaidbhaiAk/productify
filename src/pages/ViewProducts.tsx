import { useEffect,useState,useRef } from 'react'
import { getAllProducts } from '../utils/web3'
import './viewproduct.scss'
import './table.scss'
import QRCode from "react-qr-code";
import Modal from '../components/Modal/Modal'
import { convertDate, cutId, getLink, handleDownloadImage } from '../utils/helpers'
import Info from '../components/Ticket/Info';
import { RiFileDownloadFill,RiSearch2Line } from 'react-icons/ri';

const ViewProducts = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [allproducts,setAllProducts] = useState([]);
  const [modalInfo,setModalInfo] = useState<any>(null);
  const fetchData = async () => {
    const data = await getAllProducts();
    setAllProducts(data);
  }
  useEffect(() => {
    fetchData();
  }, [])

  const [show,setShow] = useState(false);
  const setInfo = (ele:any) => {
    setModalInfo(ele);
    setShow(!show);
  }
  const handleChange = (e:any) => {
    const {value} = e.target;
    if(value.length > 4){
      const filteredData = allproducts.filter((ele:any) => {
        return ele[0].includes(value) || ele[1].includes(value)
      })
      setAllProducts(filteredData);
    }
    else fetchData();
  }
  return (
    <div className="view">
      <div className='searchbar'>
        <div className='searchbar__container'>
          <RiSearch2Line size={15}/>
          <input type="text" onChange={handleChange} placeholder='Enter Keywords'/>
        </div>
      </div>
      <div className='table_container'>
        <table className='table'>
            <thead>
              <tr>
              <th>Sr No</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Category</th>
              <th>Added By</th>
              <th>Dispatched</th>
              </tr>
            </thead>
            <tbody>
                {allproducts.map((ele:any,idx:number) => {
                  return (
                  <tr key={ele[0]} onClick={() => setInfo(ele)}>
                    <td>{idx+1}</td>
                    <td>{ele[0]}</td>
                    <td>{ele[1]}</td>
                    <td>{convertDate(ele[2])}</td>
                    <td>{ele[3]}</td>
                    <td>Admin</td>
                    <td>{ele[4] ? 'Dispatched' : 'Not Dispatched'}</td>
                  </tr>)
                })}
            </tbody>
        </table>
      </div>
      {show && 
      <Modal show={show} setShow={setShow}>
          <span onClick={() => handleDownloadImage(printRef.current,modalInfo[1])} className='print_btn'><RiFileDownloadFill size={25}/></span>
          <div ref={printRef}>
            <QRCode value={getLink(modalInfo[0])} size={300} style={{ width: "100%" }}/>
            <div className='ticket'>
              <div style={{width:'80px',marginBottom:'0.2rem'}}>
                <img src='https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg' alt='default'/>
              </div>
              <Info label='Product Id' value={cutId(modalInfo[0],20)} />
              <Info label='Product Name' value={modalInfo[1]} />
              <Info label='Product Created At' value={convertDate(modalInfo[2])} />
              <Info label='Product Added By' value="Admin" />
            </div>
          </div>
          <button onClick={() => setShow(false)} style={{width:'100%',marginBottom:'4px'}}>Close</button>
      </Modal>
      }
    </div>
  )
}

export default ViewProducts