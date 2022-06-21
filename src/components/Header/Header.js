import React from "react";
import "./Header.css";
import logo from "../img/logo.svg";

function Header() {
    return (
        <div className="header">
            <img className="not-selectable" src={logo} alt="" id="logo"/>
            <h1 className="not-selectable">POMODORO</h1>
        </div>
    )
}

export default Header;