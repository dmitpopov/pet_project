import React, { Component } from "react";

class CreateIdeaPage extends Component {
    render() {
        return (
            <form className="create-idea-form">
                <label htmlFor=""><span>Заголовок</span>
                    <input type="text"/>
                </label>
                <label htmlFor=""><span>Описание</span>
                    <textarea>
                    </textarea>
                </label>
                <label><span>Избранное</span>
                    <input type="checkbox"/>
                </label>
                <button type="submit" >Сохранить</button>
                
            </form>
        );
    }
}

export default CreateIdeaPage;