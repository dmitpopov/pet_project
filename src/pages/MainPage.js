import React, {Component} from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";




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
            <div>
                <Header />
                <main className="main">
                    {ideas.map((item) => {
                      return    <Link to={'/idea/' + item.id} className="idea-item" key={item.id} >
                                    <p>{item.idea_head}</p>
                                    <p>{' ' + item.date}</p>
                                </Link>
                        })
                    }
                </main>
            </div>

        )
    }
}

export default MainPage;

// {ideas.map((item, i) => {
//     return <Link to={"/idea"} key={i}>
//         {item.name}
//     </Link>
// })}

// {name: 'test15', date: '26.09.2020', description: 'This is idea test1', favorite: false},
// {name: 'test2', date: '27.09.2020', description: 'This is idea test2', favorite: true},
// {name: 'test3', date: '28.09.2020', description: 'This is idea test3', favorite: false}