import React from 'react'
import './card.scss'

type Props = {
  title:string;
  ans:string;
}
const Card:React.FC<Props> = ({title,ans}) => {
  return (
   <li className='card'>
    <span className='card__title'>{title}</span>
    <span className='card__ans'>{ans}</span>
  </li>
  )
}

export default Card