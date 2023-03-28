import {FC} from 'react'
type Props = {
    children: any;
    badgeTitle:string;
    center?:boolean;
}
const VerifyCard:FC<Props> = ({children,badgeTitle,center = false}) => {
  return (
    <div className='verify' style={{margin: center ? 'auto' : 'none' }}>
        <div className='verify__badge'>{badgeTitle}</div>
        <div className="verify__header">
            <img src ='https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg' alt='log' />
        </div>
        <div className='line'></div>
        <div className="verify__info">
            {children}
        </div>
    </div>    
  )
}

export default VerifyCard