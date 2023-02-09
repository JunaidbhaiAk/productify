import './input.scss'
type Props = {
    name:string;
    type:string;
    value:any;
    placeholder:string;
    onchange: (e:any) => void;
}

const Input = ({name,type,value,onchange,placeholder}:Props) => <input type={type} placeholder={placeholder} name={name} onChange={onchange} value={value}/>


export default Input