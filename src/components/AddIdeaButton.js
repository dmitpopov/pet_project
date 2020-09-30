import React, { Component } from "react";


class AddIdeaButton extends Component {


    render() {
        return (
            <button className="add-idea-button" onClick={this.props.moveToCreateIdeaPage}>
                Добавить идею
            </button>
        );
    }
}

export default AddIdeaButton;