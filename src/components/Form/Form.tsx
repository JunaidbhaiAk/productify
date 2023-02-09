import './form.scss'
type Props = {
    children:any,
    onclick:(e:any) => Promise<void>;
    formTitle:string;
    buttonText:string;
}
const Form = ({children,onclick,formTitle,buttonText}:Props) => {
  return (
    <form className='form'>
      <h3 className='form__title'>{formTitle}</h3>
      {children}
      <button className='form__button' onClick={onclick}>{buttonText}</button>  
    </form>       
  )
}

export default Form