import React, {Component} from "react";
import Header from "../components/header";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

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
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
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
        .catch(err => {
            console.log(err);
        })
        this.proveDelete();
    }



    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('http://localhost:3030/idea/' + id, { headers: { token: localStorage.getItem('token') } })
        .then(response => {
            if (response.status === 401) {
                this.props.history.push('/login');
            } else {
                return response.json();
            }
        })
        .then(data => {
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
        const {id, idea_head, idea_text, date} = this.state.idea[0];
        console.log(this.state.idea);
        return (
            <div className="basic-div">
                <Header className="main_header" />
                <main className="main main_idea">
                    <div className="idea-box">
                        <h2>{idea_head}</h2>
                        <p>{dayjs(date).format('DD.MM.YYYY')}</p>
                        <p>{idea_text}</p>
                        <label style={{display: "none"}}>Избранное
                            <input
                                type="checkbox"
                                // defaultChecked={favorite}
                            />
                        </label>
                        <div className="delete-block">
                            <Link
                                to="/"
                                className="link-button"
                                style={this.state.toDelete ? {display: "none"} : {display: "inline-block"}}
                            >
                                Назад
                            </Link>
                            <button
                                type="button"
                                // className="delete-idea-button"
                                style={this.state.toDelete ? {display: "none"} : {display: "inline-block"}}
                                onClick={this.proveDelete}
                            >
                                Удалить
                            </button>

                        </div>
                        <div className="prove-delete-idea"
                             style={!this.state.toDelete ? {display: "none"} : {display: "inline-block"}}
                        >
                            <p>Вы уверены, что хотите удалить идею '{idea_head}'?</p>
                            <button
                                className="delete-idea-button delete-button"
                                onClick={() => this.deleteIdea(id)}
                            >
                                Удалить
                            </button>
                            <button
                                className="delete-idea-button cancel-button"
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