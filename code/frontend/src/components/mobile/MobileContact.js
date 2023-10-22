import '../../css/mobile/MobileContact.css'
import rightAngleBracket from "../../images/svg/right-angle-bracket.svg"
import text from "../../images/svg/text.svg"
import profile from "../../images/svg/profile.svg"
import share from "../../images/svg/share.svg"
import mute from "../../images/svg/mute.svg"
import block from "../../images/svg/block.svg"
import chatSettings from "../../images/svg/chat-settings.svg"
import transactionHistory from "../../images/svg/transaction-history.svg"
import chats from "../../images/svg/chats.svg"
import contacts from "../../images/svg/contacts.svg"
import { NavLink, useLocation, useParams} from "react-router-dom";
import Switch from 'react-switch'

function MobileContact() {
    const { id } = useParams();
    return (
        <>
        <div className="light" id="theme-container">
            <div className="contact-page">
                <div className="image-name-display">
                    <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    <div className='profile-name'>{id}</div>
                </div>
                <div className="upper-actions">
                    <NavLink className="action text" to={"/chats/" + id}>
                        <img className="image" src={text}></img>
                        <div className="body">Text</div>
                    </NavLink>
                    <div className="action profile">
                        <img className="image" src={profile}></img>
                        <div className="body">Profile</div>
                    </div>
                    <div className="action share">
                        <img className="image" src={share}></img>
                        <div className="body">Share</div>
                    </div>
                </div>
                <div className="contact-settings-list">
                    <div className='contact-setting-block'>
                        <div className="name">Nickname:</div>
                        <input className="nickname-input" type="text" placeholder="nickname" />
                    </div>
                    <div className='contact-setting-block'>
                        <img className="contact-setting-image mute" src={mute}></img>
                        <div className="name">Mute</div>
                        <Switch className="toggle-switch" onChange={() => {}} checkedIcon uncheckedIcon offColor="#aaa" onColor='#0AF'/>
                    </div>
                    <div className='contact-setting-block'>
                        <img className="contact-setting-image block" src={block}></img>
                        <div className="name">Block</div>
                        <Switch className="toggle-switch" onChange={() => {}} checkedIcon uncheckedIcon offColor="#aaa" onColor='#0AF'/>
                    </div>
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

export default MobileContact;