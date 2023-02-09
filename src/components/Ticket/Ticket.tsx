import React,{useContext} from 'react'
import './ticket.scss'
import Info from './Info'
import QRCode from "react-qr-code";
import { AuthContext } from '../../context/auth-context';
import { convertDate, cutId, getLink } from '../../utils/helpers';
const Ticket = React.forwardRef<HTMLDivElement>((props,ref) => {
  const {postProductData} = useContext(AuthContext)
  return (
    <div className="ticket">
        <div className="ticket__body" ref={ref}>
        <div className="upper">
          <div className="upper_barcode">
            <QRCode value={getLink(postProductData.pro_id)} size={300} style={{ width: "100%" }}/>
          </div>
          <div className="upper__head">
            <img src='https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg' alt='default'/>
          </div>
          <div className="upper__info">
            <Info label='Product Id' value={cutId(postProductData.pro_id,20)} />
            <div className="row">
                <Info label='Category' value={postProductData.category} />
                <Info label='Date Created' value={convertDate(null)} />
            </div>
            <div className="row">
                <Info label='Done By' value='Admin' />
                <Info label='Gas Cost' value={`0.0${postProductData.gasUsed} ETH`} />
            </div>
            <Info label='Transaction hash' value={cutId(postProductData.thash,20)} />
          </div>
        </div>
        </div>
      </div>
  )
});

export default Ticket