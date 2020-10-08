import React, {Component} from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import dayjs from "dayjs";





class MainPage extends Component {
    state = {
        ideas: []
    }

    componentDidMount() {
        fetch('http://localhost:3030/ideas', { headers: { token: localStorage.getItem('token') } })
            .then(response => {
                if (response.status === 401) {
                    this.props.history.push('/login');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({ ideas: data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const ideas = this.state.ideas;
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    {ideas.map((item) => {
                        return (
                            <Link to={'/idea/' + item.id} className="main-page-idea" key={item.id} >
                                <p className="main-page-idea__title">{item.idea_head}</p>
                                <p className="main-page-idea__date">{dayjs(item.date).format('DD.MM.YYYY')}</p>
                            </Link>
                        );
                    })}
                </main>
            </div>

        )
    }
}

export default MainPage;

