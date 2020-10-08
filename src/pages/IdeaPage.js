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
            <div className="idea-page">
                <Header />
                <main className="idea-page__content">
                    <div className="idea-content">
                        <h2 className="idea-content__title">{idea_head}</h2>
                        <p className="idea-content__date">{dayjs(date).format('DD.MM.YYYY')}</p>
                        <p className="idea-content__description">{idea_text}</p>
                        <label style={{display: "none"}}>Избранное
                            <input
                                type="checkbox"
                                // defaultChecked={favorite}
                            />
                        </label>
                        <div className="idea-content__controls">
                            <button
                                type="button"
                                className="idea-content__remove-button"
                                style={this.state.toDelete ? {display: "none"} : {display: "inline-block"}}
                                onClick={this.proveDelete}
                            >
                                Удалить
                            </button>
                            <Link to="/" className="idea-content__back-button" style={this.state.toDelete ? {display: "none"} : {display: "inline-block"}}>
                                Назад
                            </Link>
                        </div>
                        <div className="idea-remove-confirm" style={!this.state.toDelete ? {display: "none"} : {display: "block"}}>
                            <p className="idea-remove-confirm__text">Вы уверены, что хотите удалить идею '{idea_head}'?</p>
                            <div className="idea-remove-confirm__controls">
                                <button className="idea-remove-confirm__ok-button" onClick={() => this.deleteIdea(id)}>
                                    Удалить
                                </button>
                                <button className="idea-remove-confirm__cancel-button" onClick={this.proveDelete}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default IdeaPage;