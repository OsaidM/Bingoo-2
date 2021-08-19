import logo from './logo.svg';
import React,{useState,useEffect,useRef} from 'react'
import './App.css';
import { navigate, Router } from '@reach/router';
import Player from './components/Player';
import Main from './components/Main';
import Chat from './components/Chat';



function App() {
 

  const liftUserLink =async (username,roomId)=>{
    
    navigate("chat/"+username+"/"+roomId);
  }


  return (
    <div className="App">
      <Router>  
        <Main path="/" liftLink={liftUserLink}/>
        <Chat path="chat/:username/:roomId"/>
      </Router>
    </div>
  );
}

export default App;
