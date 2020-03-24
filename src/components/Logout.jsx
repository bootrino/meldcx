import React from 'react';

export default function Logout() {

  const onClick = () => {
    // we define logged in as there being an authtoken in localstorage.  Thus remove it to logout and reload.
    localStorage.removeItem('authtoken');
    window.location.reload();
  };

  return (
    <>
        <style>
          {`
            .logoutButton:hover {
                cursor: pointer;
            }

            .logoutButton {
                cursor: pointer;
                margin: 0;
                font-weight: 400;
                text-align: center;
                vertical-align: middle;
                border: 1px solid transparent;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: .25rem;
                color: #fff;
                background-color: #343a40;
                border-color: #343a40;
                }
          `}
        </style>
      <span onClick={onClick}
              className="logoutButton">LOGOUT
      </span>
    </>
  );
}


