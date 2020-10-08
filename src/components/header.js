import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1 className="app-title">
                    <span className="app-title__title-accent">I</span>dea <span className="app-title__title-accent">m</span>ailer
                </h1>
                <Link className="header__create-button" to="/create">Записать идею</Link>
            </header>
        );
    }
}

export default Header;