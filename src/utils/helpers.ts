import {MdSpaceDashboard} from 'react-icons/md'
import {IoBagAdd,IoPersonAddSharp,} from 'react-icons/io5'
import {HiUserGroup,HiShoppingCart} from 'react-icons/hi'
import html2canvas from 'html2canvas';
export const getSidebarIcons = (name: string) => {
    switch (name) {
      case "Dashboard":
        return MdSpaceDashboard;
      case "Add Product":
        return IoBagAdd;
      case "Add Merchant":
        return IoPersonAddSharp;
      case "View Products":
        return HiUserGroup;
      case "View Merchents":
        return HiShoppingCart;
      default:
        return MdSpaceDashboard;
    }
  };
  

export const cutId = (id:string,len:number) => id.substring(0,len) + '............' + id.substring(id.length - 4)

export const getLink = (id:string) => `http://localhost:3000/verify?id=${id}` 

export const convertDate = (date:any) => {
  let dob;
  if(date) dob = new Date(date.toNumber() * 1000) 
  else dob = new Date();
  var dobArr = dob.toDateString().split(" ");
  var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  return dobFormat;
};


export const handleDownloadImage = async (element:any) => {
  const canvas = await html2canvas(element,{useCORS: true});

  const data = canvas.toDataURL('image/jpg');
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = data;
    link.download = 'image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
};