import '../../css/mobile/MobileChat.css'
import leftAngleBracket from "../../images/svg/left-angle-bracket.svg"
import rightAngleBracket from "../../images/svg/right-angle-bracket.svg"
import search from "../../images/svg/search.svg"
import chats from "../../images/svg/chats.svg"
import contacts from "../../images/svg/contacts.svg"
import { NavLink, useLocation, useParams } from "react-router-dom";

function MobileChat() {
    const { id } = useParams();
    //console.log(location)
    return (
        <>
        <div className="light" id="theme-container">
            <div className="messages-page">
                <div className="nav-bar">
                    <NavLink className="back-link" to={"/chats"}>
                        <img className="back-image" src={leftAngleBracket}></img>
                    </NavLink>
                    <NavLink className="profile-link" to={"/contacts/" + id}>
                        <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    </NavLink>
                    <div className="name">{id}</div>
                </div>
                <div className="messages-list">
                    <div className='message-block'>
                        <div className="top">
                            <div className="name">&gt; {id}</div>
                            <div className="time">Sep 29 11:00</div>
                        </div>
                        <div className='bottom'>
                            When you eating?
                        </div>
                    </div>
                    <div className='message-block'>
                        <div className="top">
                            <div className="name">&gt; You</div>
                            <div className="time">Sep 29 11:01</div>
                        </div>
                        <div className='bottom'>
                            Uh maybe around 12:30 if that works for you?
                        </div>
                    </div>
                    <div className='message-block'>
                        <div className="top">
                            <div className="name">&gt; {id}</div>
                            <div className="time">Sep 29 11:02</div>
                        </div>
                        <div className='bottom'>
                            That works for me!
                        </div>
                    </div>
                </div>
                <div className="send-message-box">
                    <div><strong>&gt;</strong></div>
                    <input className="message-input" type="text" placeholder="send message"></input>
                </div>
            </div>
        </div>
        </>
    );
}

export default MobileChat;