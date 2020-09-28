import React, {Component} from "react";

class AuthorisationPage extends Component {

    state = {
        login: 'test',
        pass: '1234'
    }

    render() {
        return (
            <div className="auth-form">
                <form action="" >
                    <label htmlFor="" className="auth-form-label"><span> Логин</span>
                        <input type="text"/>
                    </label>
                    <label htmlFor="" className="auth-form-label"> <span>Пароль</span>
                        <input type="password"/>
                    </label>
                    <button type="submit" className="auth-submit-button">Войти</button>
                </form>
            </div>
        );
    }
}

export default AuthorisationPage;