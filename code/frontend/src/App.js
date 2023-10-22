import './App.css';
import { isMobile } from 'react-device-detect';
import { Routes, Route, Navigate } from 'react-router-dom';
import DesktopLanding from './components/desktop/DesktopLanding';
import MobileLogin from './components/mobile/MobileLogin';
import MobileChatsList from './components/mobile/MobileChatsList';
import MobileChat from './components/mobile/MobileChat';
import MobileContactsList from './components/mobile/MobileContactsList';
import MobileContact from './components/mobile/MobileContact';
import Mobile404 from './components/mobile/Mobile404';
import MobileSettings from './components/mobile/MobileSettings'
import MobileTransactionHistory from './components/mobile/MobileTransactionHistory';

function App() {
    if (isMobile) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/login" ></Navigate>}></Route>
                <Route path="/login" element={<MobileLogin></MobileLogin>}></Route>
                <Route path="/chats">
                    <Route index element={<MobileChatsList></MobileChatsList>}></Route>
                    <Route path=":id" element={<MobileChat></MobileChat>}></Route>
                </Route>
                <Route path="/contacts">
                    <Route index element={<MobileContactsList></MobileContactsList>}></Route>
                    <Route path=":id" element={<MobileContact></MobileContact>}></Route>
                </Route>
                <Route path="/settings" element={<MobileSettings></MobileSettings>}></Route>
                <Route path="/transactions" element={<MobileTransactionHistory></MobileTransactionHistory>}></Route>
                <Route path="*" element={<Mobile404></Mobile404>}></Route>
            </Routes>
        );
    }
    else {
        return (
            <Routes>
                <Route path="*" element={<DesktopLanding />} />
            </Routes>
        );
    }
    
}

export default App;