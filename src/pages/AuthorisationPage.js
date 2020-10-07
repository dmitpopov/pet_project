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
        fetch('http://localhost:3030', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({login: this.state.login})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.length === 0) {
                    alert('Введите повторно логин и пароль');
                } else {
                    console.log(data);
                    const {id, name, password} = data[0];
                    console.log(name, password, this.state.login);
                    if (name === this.state.login && password === this.state.pass) {
                        this.setState({log_true: true, pass_true: true});
                        localStorage.setItem('user_id', id);
                        this.props.history.push('/main');
                    }
                }
            }).catch(err => {
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
            <div className="auth-form">
                <form action="" onSubmit={this.loginPathHandler}>
                    <label htmlFor="" className="auth-form-label"><span> Логин</span>
                        <input type="text" onChange={this.logTrueHandler}/>
                    </label>
                    <label htmlFor="" className="auth-form-label"> <span>Пароль</span>
                        <input type="password" onChange={this.logPassHandler}/>
                    </label>
                    <button type="submit" className="auth-submit-button" >Войти</button>
                    <div>
                        <p>Нет учетной записи?</p>
                        <Link to={'/reg'}>
                            Регистрация
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorisationPage;