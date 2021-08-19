import React,{useState,useEffect,useRef} from 'react'

const Main = (props) => {
    const {liftLink}  = props;
    const [username, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    
    const onSubmitMain=()=>{
        
        console.log(username,roomId)
        liftLink(username, roomId)
    }
    
    
    return (
        <div>
            <form onSubmit={onSubmitMain}>
                
                <input type="text" onChange={((e)=>{
                    setUserName(e.target.value)
                   console.log(e.target.value) 
                })} value={username}/> <br/>
                <input type="text" onChange={((e)=>{
                    setRoomId(e.target.value)
                   console.log(e.target.value) 
                })} value={roomId}/> <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Main
