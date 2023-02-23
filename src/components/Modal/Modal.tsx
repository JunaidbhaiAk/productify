// import React from "react";
import './modal.scss'

type Props = {
    setShow: (show:boolean) => void;
    show:boolean;
    children:any;
}
const Modal = (props:Props) => {
  const {setShow,show,children} = props;
  return (
    <div>
      <div className="modal">
        {children}
        {/* <button onClick={() => setShow(!show)}>Show</button> */}
      </div>
      <div
        className="backdrop"
        style={{ display: show ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default Modal;
