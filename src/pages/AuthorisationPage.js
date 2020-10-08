import React, {Component} from "react";
import {Link} from "react-router-dom";


class AuthorisationPage extends Component {
    state = {
        login: 'test',
        pass: '1234',
        log_true: null,
        pass_true: null
    }

    loginPathHandler = (event) => {
        event.preventDefault();
        this.fetchLogin();
    }

    fetchLogin = () => {
        fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ login: this.state.login, pass: this.state.pass})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.length === 0) {
                alert('Введите повторно логин и пароль');
            } else {
                const { token } = data;
                localStorage.setItem('token', token);
                this.props.history.push('/');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    logTrueHandler = (event) => {
        this.setState({login: event.target.value}, () => {

        });
    }

    logPassHandler = (event) => {
        this.setState({pass: event.target.value}, () => {
            console.log(this.state.pass);
        });
    }



    render() {

        return (
            <div className="login-page">
                <form className="auth-form" onSubmit={this.loginPathHandler}>
                    <h1 className="app-title auth-form__title">
                        <span className="app-title__title-accent">I</span>dea <span className="app-title__title-accent">m</span>ailer
                    </h1>
                    <label className="auth-form__field">
                        <span className="auth-form__label">Логин</span>
                        <input type="text" className="auth-form__input" onChange={this.logTrueHandler} />
                    </label>
                    <label htmlFor="" className="auth-form__field">
                        <span className="auth-form__label">Пароль</span>
                        <input className="auth-form__input" type="password" onChange={this.logPassHandler}/>
                    </label>
                    <button type="submit" className="auth-form__auth-button">Войти</button>
                    <div className="login-reg-block">
                        <p className="login-reg-block__note">
                            Нет учетной записи?&nbsp;
                            <Link className="login-reg-block__link" to={'/reg'}>
                                Зарегистрируйтесь
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorisationPage;