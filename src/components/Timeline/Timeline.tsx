import {useEffect,useState} from 'react'
import { addressSample } from "../../utils/constants";
import { convertDate } from '../../utils/helpers';
import { getTracks } from '../../utils/web3';
import "./timeline.scss";
type Props = {
  remind: boolean;
  product_id:any;
}
const Timeline = ({remind,product_id}:Props) => {
  const [tracks,setTracks] = useState([])
  useEffect(() => {
    const getData = async() => {
      const data = await getTracks(product_id);
      setTracks(data);
    }
    getData();
  }, [remind])
  
  return (
    <div className="timeline">
      {tracks.map((ele: any, idx: any) => {
        return (
          <div className={`timeline__container ${idx % 2 && "right"}`}>
            <div className="point">
              <div className="point__inner" />
            </div>
            <div className="timeline__container--text">
              <span className="text__title">{ele['companyName']}</span>
              <span className="text__sub">{`${ele['city']} - ${ele['pincode']?.toString()} ${ele['state']}`}</span>
              <span className="text__sub">{convertDate(ele['date'])}</span>
              <span className="text__sub">Product Dispatched To Next Seller</span>
            </div>
            <div
              className={`timeline__container${
                idx % 2 ? "--right_arrow" : "--arrow"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
