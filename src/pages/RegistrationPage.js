import React, { Component } from "react";
import Header from "../components/header";




class RegistrationPage extends Component {

    state = {
        name: '',
        surname: '',
        login: '',
        pass: '',
        email: ''
    }

    registrationHandler = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        this.fetchRegistration();
    }

    fetchRegistration = () => {
        fetch('http://localhost:3030/reg', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const {token} = data;
                localStorage.setItem('token', token);
                console.log(token, 'from DB');
                console.log(localStorage.getItem(token));
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    nameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    surnameHandler = (event) => {
        this.setState({surname: event.target.value});
    }

    loginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    passHandler = (event) => {
        this.setState({pass: event.target.value});
    }

    emailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div>
                <Header />
                <form action=""
                      className="reg_form"
                    onSubmit={this.registrationHandler}
                >
                    <label htmlFor=""><span>Имя</span>
                        <input type="text"
                               required
                            onChange={this.nameHandler}
                        />
                    </label>
                    <label htmlFor=""><span>Фамилия</span>
                        <input type="text"
                               required
                            onChange={this.surnameHandler}
                        />
                    </label>
                    <label htmlFor=""><span>Логин</span>
                        <input type="text"
                               required
                            onChange={this.loginHandler}
                        />
                    </label>
                    <label htmlFor=""><span>Пароль</span>
                        <input type="text"
                               required
                            onChange={this.passHandler}
                        />
                    </label>
                    <label htmlFor=""><span>E-mail</span>
                        <input type="email"
                               required
                            onChange={this.emailHandler}
                        />
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>


            </div>
        );
    }
}

export default RegistrationPage;