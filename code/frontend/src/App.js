import logo from './logo.png';
import './App.css';
import { isMobile } from 'react-device-detect';
import DesktopLanding from './components/desktop/DesktopLanding';

function App() {
    if (isMobile) {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  You're on mobile! Yay!
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          );
    }
    else {
        return (
            <DesktopLanding></DesktopLanding>
        );
    }
  
}

export default App;