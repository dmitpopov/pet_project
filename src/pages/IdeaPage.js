import React, {Component} from "react";
// import MoveBackButton from "../components/MoveBackButton";
import Header from "../components/header";
import {Link} from "react-router-dom";


class IdeaPage extends Component {
    state = {
        idea: []
    }



    componentDidMount() {
        const id = this.props.match.params.id - 1;
        console.log(id);
        fetch('http://localhost:3030/idea/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({idea: data})
            })
    }



    render() {
        const {name, date, description, favorite} = this.state.idea;

        return (
            <div>
                <Header />
                <h3>{name}</h3>
                <p>{date}</p>
                <p>{description}</p>
                <label>Избранное
                    <input type="checkbox" defaultChecked={favorite} />
                </label>
                <Link to="/main" >Назад</Link>
            </div>
        );
    }
}

export default IdeaPage;