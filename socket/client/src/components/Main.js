import React, { useState } from "react";

const Main = (props) => {
    const {connectToRoom} = props;
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <div>
             
            <div className="logIn">
            <div className="inputs">
                <input
                type="text"
                placeholder="Name..."
                onChange={(e) => {
                    setUserName(e.target.value);
                }}
                />
                <input
                type="text"
                placeholder="Room..."
                onChange={(e) => {
                    setRoom(e.target.value);
                }}
                />
            </div>
            <button onClick={()=>connectToRoom(room, userName)}>Enter Chat</button>
            </div>
            
        </div>
    )
}

export default Main
