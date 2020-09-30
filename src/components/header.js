import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="main_header">
                <Link to="/main">Главная</Link>
                <Link to="/create">Создать</Link>
                <Link to="/idea">Страница идеи</Link>
            </header>
        );
    }
}

export default Header;