import React,{useState,useEffect,useRef} from 'react'
import './chat.css'
import io from 'socket.io-client';
const Chat = (props) => {
    const [socket] = useState(() => io(':8000'));

    const {username, roomId} = props;
    const [listMessages, setListMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const chatMessage = useRef();
    const [joinedRoom, setJoinedRoom] = useState(false);

    if(!joinedRoom){
        console.log("Joined")
        socket.emit('joinRoom', {username, roomId});
        setJoinedRoom(true);
    }
    


    socket.on("roomUsers", (data)=>{
        console.log(data.users)
        // userInfo2= data;
        setUsers([...users, data.users])
    })

    
    useEffect(()=>{
    },[])
    socket.on('message', data => {
        console.log(data)
        
        setListMessages([...listMessages,data])
    });
    // socket.on('roomUsers', data => {
    //     setUsers([...users,data]);
    // });
    
    
    
    

    const onSubmitHandler =  (e)=>{
        e.preventDefault();
        let data = { 
            username: { username: username, roomId: roomId },
            text: chatMessage.current.value};
        socket.emit('chatMessage', {msg:chatMessage.current.value,roomId:roomId,username: username,});
    }

    return (
        <div className="chat">
            <aside>
                <h3>users</h3>
                {
                    users.length > 0&& users.map((item,idx)=>{
                        return(<p>{item.username}</p>)
                    })
                }
            </aside>

            <main>
                <section>
                    {
                        listMessages.length > 0&& listMessages.map((item,idx)=>{
                            return(<p key={idx} className={item.username.username === username?"you":"other"}>{item.text}</p>)
                        })
                    }
                </section>

                <form onSubmit={ e => onSubmitHandler(e)}>
                    <input type="text" ref={chatMessage}/>
                    <input type="submit" value="Send"/>
                </form>
            </main>
        </div>
    )
}

export default Chat
