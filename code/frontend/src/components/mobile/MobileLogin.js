import logo from '../../logo.png';
import copy from "../../images/svg/copy.svg"
import check from "../../images/svg/check.svg"
import x from "../../images/svg/x.svg"
import info from "../../images/svg/info.svg"
import warning from "../../images/svg/warning.svg"
import { useState } from 'react'
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools'
import "../../css/mobile/MobileLogin.css"
import "../../css/mobile/dark.css";

function MobileLogin() {
    generatePrivateKey();
    const [nsec, setNsec] = useState('');
    return (
        <>
            <div className="nav-bar">
                <img src={logo} className='nav-logo'></img>
                <p className='nav-name'>notis</p>
            </div>
            <form className="login-form">
                <input className="key-input" placeholder="> private key"></input>
                <button className="login-button" type="submit">Login</button>
            </form>
            <div className="key-generate">
                <a onClick={() => {
                    let key = generatePrivateKey();
                    setNsec(key);
                    document.querySelector("#popup-body").showModal();
                    let backdrop = document.querySelector("#dialog-backdrop")
                    backdrop.classList.add("dialog-backdrop-open");
                    let img = document.querySelector("#copy-button");
                    img.classList.remove("check");
                    img.classList.remove("x");
                    img.classList.add("copy");
                    document.querySelector("#copy-status").innerHTML="";
                    }}>
                    generate private key
                </a>
                <dialog id="popup-body">
                    <div id="popup-content">
                        <div id="private-key">
                            <p id="key">{nsec}</p>
                            <img id="copy-button" className="copy" src={copy} onClick={() => {
                                let img = document.querySelector("#copy-button");
                                let status = document.querySelector("#copy-status");
                                navigator.clipboard.writeText(nsec).then(
                                    () => {
                                        img.setAttribute("src",check);
                                        img.classList.remove("copy");
                                        img.classList.add("check");
                                        status.classList.add("check");
                                        status.innerHTML = "successfully copied to clipboard"
                                    },() => {
                                        img.setAttribute("src",x);
                                        img.classList.remove("copy");
                                        img.classList.add("x");
                                        status.classList.add("x");
                                        status.innerHTML = "failed copying to clipboard";
                                    })
                                }}></img>
                        </div>
                        <p id="copy-status"></p>
                        <div id="bottom-info">
                            <div>
                                <img className="info-icon" src={info}></img>
                                <p>Press <img id="info-copy-button" src={copy}></img> to easily copy your key</p>
                            </div>
                            <div>
                                <img className="info-icon" src={warning}></img>
                                <p>Remember to save this key or you will lose your account!</p>
                            </div>
                        </div>
                        <div id="bottom-buttons">
                            <button onClick={() => {
                                let dialog = document.querySelector("#popup-body");
                                let backdrop = document.querySelector("#dialog-backdrop")
                                dialog.classList.add('dialog-closing');
                                backdrop.classList.remove("dialog-backdrop-open");
                                backdrop.classList.add("dialog-backdrop-closing");
                                setTimeout(() => {
                                    dialog.close();
                                    dialog.classList.remove('dialog-closing');
                                    backdrop.classList.remove("dialog-backdrop-closing");
                                }, 200);
                            }}>Close</button>
                            <div></div>
                            <button onClick={() => {window.location.href="/"}}>Login</button>
                        </div>
                    </div>
                </dialog>
                <div id="dialog-backdrop"></div>
            </div>
        </>
    );
    
}

export default MobileLogin;