import React from "react";
import Devices from "./Devices";
import Logout from "./Logout";
import Notify from "./Notify";

const DevicesContainer = () => {
    return (
      <>
        <style>
          {`
             .flex-container {
                align-content: stretch;
                align-items: stretch;
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
                align-self: center;
                display: flex;
                height: 100%;
                justify-content: center;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: 200;
                background-color: gray;
                }
            
            .top {
                width: 100%;
                order: 0;
                flex: 1 1 auto;
                align-self: auto;
                background-color: #ef7044;
                }
            
            .bottom {
                width: 100%;
                order: 0;
                flex: 0 1 auto;
                align-self: auto;
                background-color: #d76845;
                text-align: center;
                padding: 20px;
                }

          `}
        </style>
        <div className="flex-container">
          <div className="top">
            <Devices/>
          </div>
          <div className="bottom">
            <Notify/>
            &nbsp;
            <Logout/>
          </div>
        </div>
      </>
    );
  }
;


export default DevicesContainer;
