import React from "react";
import "./Popup.css";

interface Promp {
  show: boolean;
  type: string;
  message: string;
  togglePopup: () => void;
}


const Popup = ({ show, type, message, togglePopup }: Promp) => {
  if (!show) {
    return null;
  }
  const animated = document.getElementById("animated");
  if (animated) {
    animated.style.animation = "none";
    void animated.offsetHeight;
    animated.style.animation = "toastDefault 5s ease-in-out";
  }

  return (
    <div id="animated" className={"PopupContainer " + type}>
      <button className="closeButton" onClick={()=>{togglePopup()}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="256"
          height="256"
          viewBox="0 0 256 256"
          xmlSpace="preserve"
        >
          <g
            contentStyleType="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <rect
              x="-10.67"
              y="37.03"
              rx="0"
              ry="0"
              width="111.33"
              height="15.95"
              contentStyleType="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9973) "
            />
            <rect
              x="37.03"
              y="-10.67"
              rx="0"
              ry="0"
              width="15.95"
              height="111.33"
              contentStyleType="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9996) "
            />
          </g>
        </svg>
      </button>

      <p className="message">{message}</p>
    </div>
  );
};

export default Popup;
