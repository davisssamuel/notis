import '../../css/mobile/MobileContactsList.css'
import search from "../../images/svg/search.svg"
import chats from "../../images/svg/chats.svg"
import contacts from "../../images/svg/contacts.svg"
import { NavLink, useLocation } from "react-router-dom";

function MobileContactsList() {
    return (
        <>
            <div className="light" id="theme-container">
            <div className="contacts-page">
                <div className="nav-bar">
                    <NavLink className="profile-link" to="/settings">
                        <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    </NavLink>
                </div>
                <div className="search-bar">
                    <img src={search}></img>
                    <input type="text" placeholder='search contacts' />
                </div>
                <div className="contacts-list">
                    <NavLink className='contact-block' to="/contacts/Samuel Katon">
                        <div className="profile-link">
                            <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                        </div>
                        <div className="info">
                            <div className="name">Samuel Katon</div>
                        </div>
                    </NavLink>
                    <NavLink className='contact-block' to="/contacts/Joshua Lees">
                        <div className="profile-link">
                            <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                        </div>
                        <div className="info">
                            <div className="name">Joshua Lees</div>
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

export default MobileContactsList;