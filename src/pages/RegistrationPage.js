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
        .then(res => res.text())
        .then(data => {
            const { token } = data;
            localStorage.setItem('token', token);
            this.props.history.push('/login');
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
            <div className="registration-page">
                <form className="auth-form" onSubmit={this.registrationHandler}>
                    <h1 className="app-title auth-form__title">
                        <span className="app-title__title-accent">I</span>dea <span className="app-title__title-accent">m</span>ailer
                    </h1>
                    <label className="auth-form__field">
                        <span className="auth-form__label">Имя</span>
                        <input className="auth-form__input" type="text" required onChange={this.nameHandler}/>
                    </label>
                    <label className="auth-form__field">
                        <span className="auth-form__label">Фамилия</span>
                        <input className="auth-form__input" type="text" required onChange={this.surnameHandler}/>
                    </label>
                    <label className="auth-form__field">
                        <span className="auth-form__label">Логин</span>
                        <input className="auth-form__input" type="text" required onChange={this.loginHandler}/>
                    </label>
                    <label className="auth-form__field">
                        <span className="auth-form__label">Пароль</span>
                        <input className="auth-form__input" type="password" required onChange={this.passHandler}/>
                    </label>
                    <label className="auth-form__field">
                        <span className="auth-form__label">E-mail</span>
                        <input className="auth-form__input" type="email" required onChange={this.emailHandler}/>
                    </label>
                    <button className="auth-form__auth-button" type="submit">Зарегистрироваться</button>
                </form>


            </div>
        );
    }
}

export default RegistrationPage;