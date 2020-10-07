import React, { Component } from "react";
import Header from "../components/header";


class RegistrationPage extends Component {
    render() {
        return (
            <div reg-form-wrapper>
                <Header />
                <form action="" className="reg_form">
                    <label htmlFor=""><span>Имя</span>
                        <input type="text"/>
                    </label>
                    <label htmlFor=""><span>Фамилия</span>
                        <input type="text"/>
                    </label>
                    <label htmlFor=""><span>Логин</span>
                        <input type="text"/>
                    </label>
                    <label htmlFor=""><span>Пароль</span>
                        <input type="text"/>
                    </label>
                    <label htmlFor=""><span>E-mail</span>
                        <input type="text"/>
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>


            </div>
        );
    }
}

export default RegistrationPage;