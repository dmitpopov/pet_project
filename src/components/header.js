import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {

    state = {
        ownerName: ''
    }

    render() {
        return (

            <header className="main_header">
                <div>
                    <h1><span className="header-span">I</span>dea <span className="header-span">m</span>ailer</h1>
                    {/*<p>Владелец: {this.state.ownerName ? this.state.ownerName : 'not registered'}</p>*/}
                </div>
                <div>
                    {/*<Link to="/main">Главная</Link>*/}
                    <Link className="link-button create-button" to="/create">Записать идею</Link>
                    {/*<Link to="/idea">Страница идеи</Link>*/}
                </div>

            </header>
        );
    }
}

export default Header;