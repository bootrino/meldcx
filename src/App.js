import React from 'react';
import Login from "./components/Login"
import DevicesContainer from "./components/DevicesContainer";

function App() {
  return (localStorage.getItem('authtoken') === null) ? <Login/> : <DevicesContainer/>;
}

export default App;
