import React from 'react'
import './sidebar.scss'
import { sidebarItems } from '../../utils/constants'
import { sidebarItemsType } from '../../utils/type'
import { getSidebarIcons } from '../../utils/helpers'
import { useLocation, useNavigate } from 'react-router-dom'
const Sidebar = () => {

  return (
    <aside className='side'>
        <div className="side__head">
            <img src ='https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg' alt='log' />
        </div>
        <ul className="side__items">
            {sidebarItems.map(ele => ListItem(ele))}
        </ul>
    </aside>
  )
}

const ListItem = (data:sidebarItemsType) => {
    const navigate = useNavigate();
    const location = useLocation();
    const Icon = getSidebarIcons(data.name);
    const size = '20px'
    const active = location.pathname === data.path ? 'active' : '';
    return (
        <li className={`side__items__item ${active}`} key={data.path} onClick={() => navigate(data.path)}>
            <Icon style={{marginRight:'1rem'}} size={size}/>
            {data.name}
        </li>
    )
}

export default Sidebar