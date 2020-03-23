import React, {useEffect, useState} from "react";
import {doAjaxRequest} from "../helpers";
import Logout from "./Logout";
import Notify from "./Notify";
import WhiteCircle from "./WhiteCircle";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const url = "http://35.201.2.209:8000/devices";

  useEffect(() => {

    const callback = (err, xhr) => {
      setError(null);
      setDevices([]);
      setTimeout(getDeviceData, 5000);
      if (xhr.status === 200) {
        let devicesData = [];
        try {
          devicesData = JSON.parse(xhr.responseText)["devices"];
          setDevices(devicesData);
        } catch (e) {
          setError(`got a response, but unable to read the devices data: ${e} $devicesData}`);
          setDevices([]);
        }
        return;
      }
      setError(`error getting devices, server status code: ${xhr.status}`);
    };
    const getDeviceData = () => doAjaxRequest(url, false, {}, "GET", null, callback);
    getDeviceData();
  }, []);

  let circles = [];
  devices.forEach(
    (device, index) => {
      circles.push(<WhiteCircle key={device.id}
                                index={index}
                                numdevices={devices.length}/>);
    });

  return (
    <>
    <style>
      {`

        .layer10 {
            pointer-events: none; /* needed because if it overlays a button then button cannot be pressed */
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .layer20 {
            pointer-events: none; /* needed because if it overlays a button then button cannot be pressed */
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            z-index: 20;
            display: flex;
            align-self: center;
            align-items: center;
            align-content: center;
            justify-content: center;
        }

        .deviceinfocontainer {
            pointer-events: none; /* needed because if it overlays a button then button cannot be pressed */
          display: flex; 
          order: 0;
          flex: 0 1 auto;
          align-self: center;
          z-index: 100;
          margin: 20px;
          width: 300px;
          height: 300px;
          margin:50px;
          padding:50px;
          align-self: center;
          align-items: center;
          align-content: center;
          justify-content: center;
          text-align: center;
        }

        .animationcontainer {
            pointer-events: none; /* needed because if it overlays a button then button cannot be pressed */
            animation-duration: 4000ms;
            animation-iteration-count: infinite;
            animation-name: spin;
            animation-timing-function: linear;
            animation-play-state: running;
        }

        @keyframes spin {
            from {
                transform:rotate(0deg);
            }
            to {
                transform:rotate(360deg);
            }
        }

        
      `}
    </style>
      <div className="layer10">
        <div className="deviceinfocontainer"
             style={{"backgroundColor": "#ef7044", "flexDirection": "column"}}>
          <div style={{"fontSize": "2em", "color": "white", "display": "block"}}>{devices.length}</div>
          <div style={{"fontSize": "1em", "color": "white"}}>DEVICES</div>
          <div style={{"fontSize": "1em", "color": "white"}}>ONLINE</div>
        </div>
      </div>
      <div className="layer20 animationcontainer">
        {circles}
      </div>
    </>
  );
};


export default Devices;
