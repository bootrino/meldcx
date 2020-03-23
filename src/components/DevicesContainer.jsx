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

            .notifyButton {
                margin: 0;
                font-weight: 400;
                text-align: center;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: .25rem;
                color: #fff;
                background-color: #343a40;
                border-color: #343a40;
                cursor: pointer;
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
