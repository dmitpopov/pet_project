import React, {Component} from "react";

class LogoutPage extends Component {
    componentDidMount() {
        fetch('http://localhost:3030/logout', { headers: { token: localStorage.getItem('token') } })
        .then(res => res.text())
        .then(() => {
            localStorage.removeItem('token');
            this.props.history.push('/login');
        });
    }    
    render() {
        return null;
    }
}

export default LogoutPage;