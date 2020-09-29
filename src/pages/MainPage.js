import React, {Component} from "react";
import { Link } from "react-router-dom";
class MainPage extends Component {
    state = {
        ideas: [
            {name: 'test15', date: '26.09.2020', description: 'This is idea test1', favorite: false},
            {name: 'test2', date: '27.09.2020', description: 'This is idea test2', favorite: true},
            {name: 'test3', date: '28.09.2020', description: 'This is idea test3', favorite: false}
        ]
    }

    ideaCounter = 0;
    render() {
        const ideas = this.state.ideas;
        return ideas.map((item, i) => {
            return <Link to={"/idea"} key={i}>
                        {item.name}
                    </Link>
        })
        ;
    }
}

export default MainPage;