import React from 'react'
import './button.scss'
type Props = {
    children:any;
    onclick: () => void; 
}
const Button = ({children,onclick}:Props) => {
  return (
    <button onClick={onclick}>{children}</button>
  )
}

export default Button