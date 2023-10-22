import '../../css/mobile/MobileSettings.css'
import rightAngleBracket from "../../images/svg/right-angle-bracket.svg"
import darkMode from "../../images/svg/dark-mode.svg"
import liveActivity from "../../images/svg/live-activity.svg"
import publicKey from "../../images/svg/public-key.svg"
import chatSettings from "../../images/svg/chat-settings.svg"
import transactionHistory from "../../images/svg/transaction-history.svg"
import chats from "../../images/svg/chats.svg"
import contacts from "../../images/svg/contacts.svg"
import { NavLink, useLocation } from "react-router-dom";
import Switch from 'react-switch'

function MobileSettings() {
    return (
        <>
        <div className="light" id="theme-container">
            <div className="settings-page">
                <div className="image-name-display">
                    <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    <div className='profile-name'>Luke Lyall</div>
                </div>
                <div className="settings-list">
                    <div className='setting-block'>
                        <img className="setting-image dark-mode" src={darkMode}></img>
                        <div className="name">Dark Mode</div>
                        <Switch className="toggle-switch" onChange={() => {}} checkedIcon uncheckedIcon offColor="#aaa" onColor='#0AF'/>
                    </div>
                    <div className='setting-block'>
                        <img className="setting-image live-activity" src={liveActivity}></img>
                        <div className="name">Live Activity</div>
                        <Switch className="toggle-switch" onChange={() => {}} checkedIcon uncheckedIcon offColor="#aaa" onColor='#0AF'/>
                    </div>
                    <div className='setting-block'>
                        <img className="setting-image public-key" src={publicKey}></img>
                        <div className="name">Private Key</div>
                        <img className="right-angle-bracket" src={rightAngleBracket}></img>
                    </div>
                    <div className='setting-block'>
                        <img className="setting-image chat-settings" src={chatSettings}></img>
                        <div className="name">Notifications</div>
                        <Switch className="toggle-switch" onChange={() => {}} checkedIcon uncheckedIcon offColor="#aaa" onColor='#0AF'/>
                    </div>
                    <NavLink className='setting-block' to="/transactions">
                        <img className="setting-image transaction-history" src={transactionHistory}></img>
                        <div className="name">Transaction History</div>
                        <img className="right-angle-bracket" src={rightAngleBracket}></img>
                    </NavLink>
                </div>
                <div className="qr-code">
                    <img src={"https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}></img>
                    <div>Have your friends scan to add you!</div>
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

export default MobileSettings;