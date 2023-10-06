import logo from './logo.png';
import './App.css';
import { isMobile } from 'react-device-detect';
import DesktopLanding from './components/desktop/DesktopLanding';
import MobileLogin from './components/mobile/MobileLogin';

function App() {
    if (isMobile) {
        return (
            <MobileLogin></MobileLogin>
        );
    }
    else {
        return (
            <DesktopLanding></DesktopLanding>
        );
    }
  
}

export default App;