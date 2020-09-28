import React, { Component } from "react";

class AllIdeas extends Component {
    state = {
        ideas: [
            {name: 'test1', date: '26.09.2020', description: 'This is idea test1', favorite: false},
            {name: 'test2', date: '27.09.2020', description: 'This is idea test2', favorite: true},
            {name: 'test3', date: '28.09.2020', description: 'This is idea test3', favorite: false}
        ]
    }

    render() {
        const ideas = this.state.ideas;

        return (
            <div>
                ideas.forEach((item) => {

            })


            </div>
        );
    }
}

export default AllIdeas;