import logo from '../../logo.png';
import "../../css/desktop/landing.css"

function DesktopLanding() {
    return (
        <>
            <div className='nav-bar'>
                <img src={logo} className='nav-logo'></img>
                <p className='nav-name'>notis</p>
                <div className='nav-items'>
                    <a href='https://github.com/davisssamuel/notis'>github</a>
                    <a href='https://github.com/davisssamuel/notis/wiki'>help</a>
                </div>
            </div>
            <div className="error-body">
                <div id='welcome'>
                    Welcome to notis!
                </div>
                <div id='info'>
                    <p>unfortunately, desktop mode is in development and is not supported at this time...</p>
                    <p>try again on a mobile device</p>
                </div>
            </div>
        </>
    );
}

export default DesktopLanding;