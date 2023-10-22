import '../../css/mobile/MobileTransactionHistory.css'
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
            <div className="transactions-page">
                <div className="nav-bar">
                    <NavLink className="profile-link" to="/settings">
                        <img className="profile-image" src={'https://api.dicebear.com/5.x/identicon/svg?seed=' + Math.random()}></img>
                    </NavLink>
                </div>
                <div className="search-bar">
                    <img src={search}></img>
                    <input type="text" placeholder='search transactions' />
                </div>
                <div className="transactions-list">
                    <div className='transaction-block' to="/chats/Samuel Katon">
                        <div className="transaction-section">
                            <div className="payment-sent">Payment Sent</div>
                            <div className="time">Sep 26 10:19</div>
                        </div>
                        <div className="transaction-section">
                            <div>To: <NavLink className='name' to="/contacts/Samuel Katon">Samuel Katon</NavLink></div>
                        </div>
                        <div className="transaction-section">
                            <div>Amount:</div>
                            <div className='payment-sent amount'>2.00 USD</div>
                        </div>
                        <div className="transaction-section">
                            <div>Note: <span className='note'>For your silly domain fr</span></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='transaction-block' to="/chats/Samuel Katon">
                        <div className="transaction-section">
                            <div className="payment-recieved">Payment Recieved</div>
                            <div className="time">Sep 26 10:20</div>
                        </div>
                        <div className="transaction-section">
                            <div>To: <NavLink className='name' to="/contacts/Sam Davis">Sam Davis</NavLink></div>
                        </div>
                        <div className="transaction-section">
                            <div>Amount:</div>
                            <div className='payment-recieved amount'>2.00 USD</div>
                        </div>
                        <div className="transaction-section">
                            <div>Note: <span className='note'></span></div>
                            <div></div>
                        </div>
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

export default MobileChatsList;