import { sidebarItemsType } from "./type";

export const sidebarItems:sidebarItemsType[] = [
    {name:'Dashboard',path:'/dashboard'},
    {name:'Add Product',path:'/addproduct'},
    {name:'Add Merchant',path:'/addmerchant'},
    {name:'View Products',path:'/viewproducts'},
    {name:'View Merchents',path:'/viewmerchants'}
]


export const addMerchantForm = [
    {
        type:"text", 
        placeholder:"Enter First & Last Name",
        name:'merchant_name'
    },
    {
        type:"email",
        placeholder:"Enter Email",
        name:'merchant_email'
    }
]

export const addressSample = [
    {
        name:'admin',
        address:'Hadapsar Pune 411028 Maharashtra',
        date:'26 Jan 2022',
        note:'The product have been dispatched from company'
    },

]