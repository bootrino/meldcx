import React, {useEffect, useState} from "react";
import {doAjaxRequest} from "../helpers";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const url = "http://35.201.2.209:8000/login";

  const onClick = () => {
    setError(null);
    if (password !== "meld123") {
      setError("invalid password");
      return;
    }
    doAjaxRequest(url, false, {}, "POST", JSON.stringify({email, password}), callback);
  };

  const callback = (err, xhr) => {
    setError(null);
    if (xhr.status === 200) {
      // we define logged in as an authtoken being present in localstorage
      localStorage.setItem('authtoken', xhr.responseText);
      return window.location.reload();
    }
    if (xhr.status === 401) {
      localStorage.setItem('authtoken', null);
      return;
    }
    setError(`error, server status code: ${xhr.status}`);
  };

  return (
    <>
    <style>
      {`
        .layer10 {
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
        
        .loginContainer {
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

        .loginButton {
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
      <div className="layer10"
           style={{"backgroundColor": "#263138"}}>
        <div className="loginContainer"
             style={{"backgroundColor": "#ffffff", "flexDirection": "column"}}>

          <div style={{"fontSize": "2em", "color": "white", "display": "block"}}>
            <span style={{"color": "#263138", "marginTop": "10px"}}>
              Login
            </span>
          </div>
          <div style={{"color": "white", "display": "block"}}>
            <input className="form-control"
                   tabIndex="1"
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   size={35}
                   required
                   style={{"fontSize": "1.2em", "marginTop": "10px", "padding": "4px"}}
                   placeholder="Any email address will work"
                   type="email"/>
          </div>
          <span style={{"color": "#263138", "marginTop": "10px"}}>
            {error}<br/>
          </span>
          <div style={{"fontSize": "1em", "color": "white"}}>

            <input onChange={(e) => setPassword(e.target.value)}
                   value={password}
                   tabIndex="2"
                   size={35}
                   required
                   style={{"fontSize": "1.2em", "marginTop": "10px", "padding": "4px"}}
                   placeholder="Enter the password meld123"
                   type="password"/>
          </div>
          <div style={{"fontSize": "1em", "color": "white"}}>
            <button type="button"
                    className="loginButton"
                    style={{"fontSize": "1.2em", "marginTop": "10px"}}
                    onClick={onClick}>
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;
