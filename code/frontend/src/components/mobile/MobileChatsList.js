import '../../css/mobile/MobileChatsList.css'
import search from "../../images/svg/search.svg"
import chats from "../../images/svg/chats.svg"
import contacts from "../../images/svg/contacts.svg"
import { NavLink, useLocation } from "react-router-dom";

function MobileChatsList() {
    const location = useLocation();
    //console.log(location)
    return (
        <>
        <div className="light" id="theme-container">
            <div className="chats-page">
                <div className="nav-bar">
                    <NavLink className="profile-link" to="/settings">
                        <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    </NavLink>
                </div>
                <div className="search-bar">
                    <img src={search}></img>
                    <input type="text" placeholder='search chats' />
                </div>
                <div className="chats-list">
                    <NavLink className='chat-block' to="/chats/Samuel Katon">
                        <div className="profile-link">
                            <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                        </div>
                        <div className="info">
                            <div className="top">
                                <div className="name">Samuel Katon</div>
                                <div className="time">Sep 28 10:12</div>
                            </div>
                            <div className='bottom'>
                                Samuel: Josh won’t shut up about the mockups...
                            </div>
                        </div>
                    </NavLink>
                    <NavLink className='chat-block' to="/chats/Joshua Lees">
                        <div className="profile-link">
                            <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                        </div>
                        <div className="info">
                            <div className="top">
                                <div className="name">Joshua Lees</div>
                                <div className="time">Sep 28 10:10</div>
                            </div>
                            <div className='bottom'>
                                You: Shut up about mockups you are annoying me
                            </div>
                        </div>
                    </NavLink>
                </div>
                <div className="footer">
                    <NavLink className="chats-button" to="/chats">
                        <img src={chats}></img>
                    </NavLink>
                    <NavLink className="contacts-button" to="/contacts">
                        <img src={contacts}></img>
                    </NavLink>
                </div>
            </div>
        </div>
        </>
    );
}

export default MobileChatsList;