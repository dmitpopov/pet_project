import React, {Component} from "react";
import MoveBackButton from "../components/MoveBackButton";

class IdeaPage extends Component {
    state = {
        ideas: [
            {name: 'test555', date: '29.09.2020', description: 'test555 idea text', favorite: true}
        ]
    }
    render() {
        const {name, date, description, favorite} = this.state.ideas[0];

        return (
            <div>
                <h3>{name}</h3>
                <p>{date}</p>
                <p>{description}</p>
                <label>Избранное
                    <input type="checkbox" defaultChecked={favorite} />
                </label>
                <MoveBackButton />
            </div>
        );
    }
}

export default IdeaPage;