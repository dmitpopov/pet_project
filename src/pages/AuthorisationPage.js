import React, {Component} from "react";



class AuthorisationPage extends Component {
    state = {
        login: 'test',
        pass: '1234',
        log_true: false,
        pass_true: false
    }

    loginPathHandler = () => {
        if(this.state.log_true && this.state.pass_true) {
            this.props.history.push('/main');
        } else {
            alert('Repeat login & pass enter');
        }
    }

    logTrueHandler = (event) => {
        if(event.target.value === this.state.login) {
            this.setState({log_true: true})
        }
    }

    logPassHandler = (event) => {
        if(event.target.value === this.state.pass) {
            this.setState({pass_true: true})
        }
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
                </form>
            </div>
        );
    }
}

export default AuthorisationPage;