import React, {useState} from 'react';
import {doAjaxRequest} from "../helpers";

export default function Notify() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const url = "http://35.201.2.209:8000/notify";

  const onClick = () => {
    setError(null);
    const headers = {"Authorization": `Bearer ${localStorage.getItem('authtoken')}`};
    const postData = {
      name: "Andrew Stuart",
      email: "andrewbstuart@gmail.com",
      repoUrl: "https://github.com/bootrino/meldcx",
      message: "this is alot more than 4 hours work.  working demo at http://meldcxtest.s3-eu-west-1.amazonaws.com/index.html "
    };
    doAjaxRequest(url, false, headers, "POST", JSON.stringify(postData), callback);
  };

  const callback = (err, xhr) => {
    setError(null);
    setMessage(null);
    if (xhr.status === 201) {
      setMessage("notification sent OK")
      return;
    }
    setError(`error, server status code: ${xhr.status}`);
  };

  return (
    <>
      {message}<br/>
      {error}<br/>
      <style>
          {`
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
      <span type="button"
              className="notifyButton"
              onClick={onClick}>
        NOTIFY
      </span>
    </>
  );
}


