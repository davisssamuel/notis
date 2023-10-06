import logo from '../../logo.png';
import "../../css/mobile/MobileLogin.css"

function MobileLogin() {
    return (
        <>
            <div className="nav-bar">
                <img src={logo} className='nav-logo'></img>
                <p className='nav-name'>make a new logo bro</p>
            </div>
            <form className="login-form">
                <input className="key-input" placeholder="> private key"></input>
                <button className="login-button" type="submit">Login</button>
            </form>
            <div className="key-generate"><a href="./">generate private key</a></div>
        </>
    );
    
}

export default MobileLogin;