import React from "react";

const WhiteCircle = ({index, numdevices}, ref) => {
  let animationDuration = 3000;
  let millisecondspercircle = Math.floor(animationDuration / (numdevices));
  let animationDelay = millisecondspercircle * index;

  return (
    <>
    <style>
      {`
        .layer30{
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            z-index: 30;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .spinningcenteredcontainer {
            z-index: 10;
            margin: 20px;
            width: 300px;
            height: 300px;
            animation-duration: ${animationDuration}ms;
            animation-name: spin;
            animation-timing-function: linear;
            animation-play-state: paused;
            margin:50px;
            padding:50px;
        }

        .whiteCircle {
            width:50px;
            height:50px;
            background:white;
            border-radius:50%;
        }

      `}
    </style>
      <div className="layer30">
        <div className="spinningcenteredcontainer"
             style={{"animationDelay": `-${animationDelay}ms`}}>
          <div className="whiteCircle"></div>
        </div>
      </div>
    </>
  );
};


export default WhiteCircle;
