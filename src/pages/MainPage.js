import React, {Component} from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";




class MainPage extends Component {
    state = {
        ideas: []
    }

    componentDidMount() {
        const id = localStorage.getItem('user_id');
        fetch('http://localhost:3030/main/' + id)
            .then(response => response.json())
            .then(data => {
                const newIdeas = [];
                data.map(item => {
                    return newIdeas.push(item);
                })
                this.setState({ideas: newIdeas});
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