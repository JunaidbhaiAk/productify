
type Props = {
    label:string;
    value:string;
}

const Info = (props:Props) => {
  const {label,value} = props;
  return (
    <div className="info">
        <span className='info__title'>{label}</span>
        <span className='info__ans'>{value}</span>
    </div>
  )
}

export default Info
