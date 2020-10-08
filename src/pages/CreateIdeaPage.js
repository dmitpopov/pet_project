import React, { Component } from "react";
import Header from "../components/header";
import {Link} from "react-router-dom";


class CreateIdeaPage extends Component {

    state = {
            user_id: '',
            idea_head: '',
            date: '',
            idea_text: '',
            favourite: false,
            isDisabled: false
    }

    inputHeadHandler = (event) => {
        const head = event.target.value;
        this.setState({idea_head: head, user_id: localStorage.getItem('user_id')});
        this.dateHandler();
    }

    dateHandler = () => {
        this.setState({date: new Date().toLocaleDateString()});
        console.log(new Date().toLocaleDateString());
    }

    inputDescriptionHandler = (event) => {
        const descr = event.target.value;
        this.setState({idea_text: descr});
    }

    inputFavoriteHandler = (event) => {
        const favourite = event.target.checked;
        this.setState({favourite: favourite});
    }

    recordNewIdea = () => {
        fetch('http://localhost:3030/idea', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            if (response.status === 401) {
                this.props.history.push('/login');
            } else {
                return response.text();
            }
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((err) => {
            if (err.status === 401) {
                this.props.history.push('/login');
            } else {
                console.log(err);
            }
        });
    }

    saveIdeaHandler = (event) => {
        event.preventDefault();
        this.recordNewIdea();
        this.setState({isDisabled: true});
    }

    render() {
        return (
            <div className="create-idea-page">
                <Header />
                <main className="create-idea-page__content">
                    <form className="create-idea-form" onSubmit={this.saveIdeaHandler}>
                        <label className="create-idea-form__field">
                            <span className="create-idea-form__label">Заголовок</span>
                            <input type="text" className="create-idea-form__input" required disabled={this.state.isDisabled} onChange={this.inputHeadHandler}/>
                        </label>
                        <label className="create-idea-form__field">
                            <span className="create-idea-form__label">Описание</span>
                            <textarea className="create-idea-form__textarea" required rows="10" disabled={this.state.isDisabled} onChange={this.inputDescriptionHandler}></textarea>
                        </label>
                        <label style={{display: "none"}}><span>Избранное</span>
                            <input type="checkbox" onChange={this.inputFavoriteHandler}/>
                        </label>
                        <div className="create-idea-form__controls">
                            <button type="submit" className="create-idea-form__save-button" style={this.state.isDisabled ? {visibility: "hidden"} : {visibility: true}}>Сохранить</button>
                            <Link to="/" className="create-idea-form__back-button">Отменить</Link>
                        </div>
                        <p style={!this.state.isDisabled ? {visibility: "hidden"} : {visibility: true}}>Запись успешно сохранена</p>
                    </form>
                </main>
            </div>
        );
    }
}

export default CreateIdeaPage;

