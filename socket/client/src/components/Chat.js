import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const Chat = (props) => {
    const {room, name} = props;
    const [socket] = useState(()=>io(":8000"));
    // After Login
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn]= useState(false); 
    
    if(!loggedIn){ // had to use this to make it launch for the first time only
                  // somehow usEffect keeps Emitting the event multiple times couldn't solve it.
      setLoggedIn(true)
      socket.emit("join_room", {room, username:name});
      setUsers([...users, {room,username:name}]);
      console.log("loggedIn")
    }
    useEffect(() => {
        return () => socket.disconnect(true);
    },[socket]);


    socket.on("welcome_message", (data) => {
      console.log(users);
      setUsers([...users, data]);
    });

    socket.on("receive_message", (data) => {
        setMessageList([...messageList, data]);
    });

    const sendMessage = async () => {
      if(message.length<1){// to ensure the input field is not empty and at least 1 letter inside.
        return
      }
        let messageContent = {
          room: room,
          content: {
            author: name,
            message: message,
          },
        };
    
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
      };
    return (
      <main>
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  key = {key}
                  className="messageContainer"
                  id={val.author === name ? "You" : "Other"}
                >
                  <div key = {key} className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    )
}

export default Chat
