import React, { Component } from "react";
import Header from "../components/header";

class CreateIdeaPage extends Component {

    state = {
            name: '',
            date: '',
            description: '',
            favorite: false
    }


    inputHeadHandler = (event) => {
        const head = event.target.value;
        this.setState({name: head});
        this.dateHandler();
        console.log(this.state);
    }

    dateHandler = () => {
        this.setState({date: new Date()})
    }

    inputDescriptionHandler = (event) => {
        const descr = event.target.value;
        this.setState({description: descr});
    }

    inputFavoriteHandler = (event) => {
        const favorite = event.target.value;
        this.setState({favorite: favorite});
    }



    saveIdeaHandler = () => {

    }

    render() {
        return (
            <div>
                <Header />
                <form className="create-idea-form" onSubmit={this.saveIdeaHandler}>
                    <label htmlFor=""><span>Заголовок</span>
                        <input type="text" onChange={this.inputHeadHandler}/>
                    </label>
                    <label htmlFor=""><span>Описание</span>
                        <textarea onChange={this.inputDescriptionHandler}>
                        </textarea>
                    </label>
                    <label><span>Избранное</span>
                        <input type="checkbox" onChange={this.inputFavoriteHandler}/>
                    </label>
                    <button type="submit">Сохранить</button>

                </form>
                {console.log(this.state)}
            </div>
        );
    }
}

export default CreateIdeaPage;