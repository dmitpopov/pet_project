import React, {Component} from "react";



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
        // if ()
        // console.log(this.state.log_true);

        // if(this.state.log_true && this.state.pass_true) {
        //     this.props.history.push('/main');
        // } else {
        //     alert('Repeat login & pass enter');
        // }
    }

    fetchLogin = () => {
        fetch('http://localhost:3030', {
            method: 'POST',
            // mode: 'no-cors',
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
                    const {id, name, pass} = data[0];
                    console.log(name, pass, this.state.login);
                    if (name === this.state.login && pass === this.state.pass) {
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
        this.setState({login: event.target.value});
    }

    logPassHandler = (event) => {
        this.setState({pass: event.target.value});
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