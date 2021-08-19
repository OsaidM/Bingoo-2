import React from "react";
import "./App.css";
import {Router, navigate} from "@reach/router"
import Chat from "./components/Chat"
import Main from "./components/Main"


function App() {

  const connectToRoom = (room,username) => {

    navigate(`chat/${room}/${username}`)

  };

  return (
    <div className="App">
      <Router>
        <Main path="/" connectToRoom={connectToRoom}/> 
        <Chat path="chat/:room/:name"/>
      </Router>
    </div>
  );
}

export default App;
