import React from "react";
import "./Popup.css"
import Xmark from "../assets/icons/Xmark.svg"

interface Promp {
  show: boolean;
  type: string;
  message: string;
  togglePopup: () => void;
}

const Popup = ({show, type, message, togglePopup}:Promp) => {
  if(!show){
    return null;
  }
  return (
      <div className={"PopupContainer " + type}>
        <button className="closeButton" onClick={togglePopup}><img src={Xmark} /></button>
        <p className="message">{message}</p>
      </div>);
};

export default Popup;
