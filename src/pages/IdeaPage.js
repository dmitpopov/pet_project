import React, {Component} from "react";
import Header from "../components/header";
import {Link} from "react-router-dom";


class IdeaPage extends Component {
    state = {
        idea: null
    }

    proveDelete = () => {
        const a = !this.state.toDelete;
        this.setState({toDelete: a})
    }

    deleteIdea = () => {
        const id = this.props.match.params.id;
        fetch('http://localhost:3030/idea/' + id, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(data => {
                console.log('Delete successful')
            })
            .catch(err => {
                console.log(err);
            })
        this.proveDelete();
    }



    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('http://localhost:3030/idea/' + id, { headers: { token: localStorage.getItem('token') } })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({idea: data})
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {
        if(!this.state.idea){
            return null;
        }
        const {id, user_id, idea_head, idea_text, date} = this.state.idea[0];
        console.log(this.state.idea);
        return (
            <div>
                <Header />
                <main className="main main_idea">
                    <div className="idea-box">
                        <h3>{idea_head}</h3>
                        <p>{date}</p>
                        <p>{idea_text}</p>
                        <label style={{display: "none"}}>Избранное
                            <input
                                type="checkbox"
                                // defaultChecked={favorite}
                            />
                        </label>
                        <button
                            type="button"
                            className="delete-idea-button"
                            onClick={this.proveDelete}
                        >
                            Удалить
                        </button>
                        <Link
                            to="/main"
                            className="delete-idea-button"
                        >
                            Назад
                        </Link>
                        <div className="prove-delete-idea"
                             style={!this.state.toDelete ? {display: "none"} : {display: "block"}}
                        >
                            <p>Вы уверены, что хотите удалить эту идею?</p>
                            <button
                                className="delete-idea-button"
                                onClick={() => this.deleteIdea(id)}
                            >
                                Удалить
                            </button>
                            <button
                                className="delete-idea-button"
                                onClick={this.proveDelete}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default IdeaPage;