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
        console.log(this.state);
    }

    dateHandler = () => {
        this.setState({date: new Date().toLocaleDateString()});
    }

    inputDescriptionHandler = (event) => {
        const descr = event.target.value;
        this.setState({description: descr});
    }

    inputFavoriteHandler = (event) => {
        console.log(event.target.value);
        const favorite = event.target;
        this.setState({favorite: favorite});
    }

    // returnToMainPageAfterCreation = () => {
    //     return <Redirect to="/main" />;
    // }

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
                <Header />
                <form className="create-idea-form" onSubmit={this.saveIdeaHandler}>
                    <label htmlFor=""><span>Заголовок</span>
                        <input type="text" required disabled={this.state.isDisabled} onChange={this.inputHeadHandler}/>
                    </label>
                    <label htmlFor=""><span>Описание</span>
                        <textarea required disabled={this.state.isDisabled} onChange={this.inputDescriptionHandler}>
                        </textarea>
                    </label>
                    <label><span>Избранное</span>
                        <input type="checkbox" onChange={this.inputFavoriteHandler}/>
                    </label>
                    <button type="submit" style={this.state.isDisabled ? {display: "none"} : {display: "block"}}>Сохранить</button>
                </form>
                <Link to="/main" >Назад</Link>

                {console.log(this.state)}
            </div>
        );
    }
}

export default CreateIdeaPage;

