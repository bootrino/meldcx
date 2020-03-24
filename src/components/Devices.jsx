import React, {useEffect, useState} from "react";
import {doAjaxRequest} from "../helpers";
import WhiteCircle from "./WhiteCircle";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  // there appears to be no HTTPS so the site must be hosted on HTTTP to avoid mixed content errors
  const url = "http://35.201.2.209:8000/devices";

  useEffect(() => {

    const callback = (err, xhr) => {
      setError(null);
      setDevices([]);
      // a good way to do polling is trigger the function again in the callback, avoiding setInterval
      setTimeout(getDeviceData, 5000);
      if (xhr.status === 200) {
        let devicesData = [];
        // generally try to minimise try/catch but it's a good way to do robust response parsing
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
  }, []); // empty deps array means the useEffect runs only once

  /*
  HOW ANIMATION OF CIRCLES WORKS:

  This took longer than I wanted it to because there's many ways of approaching the problem of
  displaying animated circles orbiting a number.

  This is the sort of problem where if you know the optimum solution then you can do it many times faster.

  However, not having ever done this before I don't know the optimum solution offhand.

  So I researched examples how how other people have done similar things opn codepen and also on StackOverflow.

  I'm pretty sure there would be several easier ways to do it but I had to commit to a strategy and get
  a working result rather then spend more time researching for a better approach.

  I started with the approach of creating one DIV for each circle, with the circle displayed in the corner
  of the DIV.

  This animated fine but all the circles were sitting on top of each other so it only looked like there
  was a single circle.

  So instead I created each circle DIV into an array of components, and using the animation start delay
  calculated a start delay which spread the start position of each DIV evenly.

  BUT  as soon as the DIVs started animating, they changed into different positions and were not evenly spread.

  To diagnose this I set the animation as initially stopped, which showed that all the DIVs were started in
  the correct evenly spread positions relative to each other.

  I figured the problem is that the animation of each DIV is starting at slightly different times.

  So I went down a rabbit hole trying to get a ref to each DIV to start them all at the same time.

  Then I realised that since they were all perfectly spread initially, I should just put all the DIVs
  in a container and animate the container thus there would be no need for each DIV to be animated
  separately each with individual timing.

  The animation could probably be broken down into a separate component between this one and the circles
  but I've run out of time available to work on this

  */


  let circles = [];
  // we use forEach rather than map because we need the index number of the iteration
  // forEach cannot be inlined in the JSX because forEach does not return a an array
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
