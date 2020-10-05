import React, { Component } from "react";
import Header from "../components/header";
import {Link} from "react-router-dom";


class CreateIdeaPage extends Component {

    state = {
            id: '',
            name: '',
            date: '',
            description: '',
            favorite: false,
            isDisabled: false
    }

    inputHeadHandler = (event) => {
        const head = event.target.value;
        this.setState({name: head});
        this.dateHandler();
    }

    dateHandler = () => {
        this.setState({date: new Date().toLocaleDateString()});
    }

    inputDescriptionHandler = (event) => {
        const descr = event.target.value;
        this.setState({description: descr});
    }

    inputFavoriteHandler = (event) => {
        const favorite = event.target.checked;
        this.setState({favorite: favorite});
    }

    recordNewIdea = () => {
        fetch('http://localhost:3030/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.text())
            .then(data => console.log(data))
    }

    saveIdeaHandler = (event) => {
        event.preventDefault();
        this.recordNewIdea();
        this.setState({isDisabled: true});
    }

    render() {
        return (
            <div>
                <Header className="main_header create-form_header"/>
                <main className="create-form">
                    <form className="create-idea-form" onSubmit={this.saveIdeaHandler}>
                        <label htmlFor=""><span>Заголовок</span>
                            <input type="text" required disabled={this.state.isDisabled} onChange={this.inputHeadHandler}/>
                        </label>
                        <label htmlFor=""><span>Описание</span>
                            <textarea required disabled={this.state.isDisabled} onChange={this.inputDescriptionHandler}>
                            </textarea>
                        </label>
                        <label style={{display: "none"}}><span>Избранное</span>
                            <input type="checkbox" onChange={this.inputFavoriteHandler}/>
                        </label>
                        <button type="submit" style={this.state.isDisabled ? {visibility: "hidden"} : {visibility: true}}>Сохранить</button>
                        <p style={!this.state.isDisabled ? {visibility: "hidden"} : {visibility: true}}>Запись успешно сохранена</p>
                    </form>
                    <Link to="/main" >Назад</Link>
                </main>
            </div>
        );
    }
}

export default CreateIdeaPage;

