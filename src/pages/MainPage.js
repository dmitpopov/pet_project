import React, {Component} from "react";
import { Link } from "react-router-dom";
// import AddIdeaButton from "../components/AddIdeaButton";
// import SettingsButton from "../components/SettingsButton";
import Header from "../components/header";




class MainPage extends Component {
    state = {
        ideas: []
    }

    componentDidMount() {
        // console.log('comp');
        fetch('http://localhost:3030/main')
            .then(response => response.json())
            .then(data => {
                this.setState({ideas: data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    // moveToCreateIdeaPage = () => {
    //     this.props.history.push('/create');
    // }


    render() {
        const ideas = this.state.ideas;
        return (
            <div>
                <Header />
                <main className="main">
                    {ideas.map((item) => {
                      return    <Link to={'/idea/' + item.id} className="idea-item" key={item.id} >
                                    <p>{item.name}</p>
                                    <p>{' ' + item.date}</p>
                                </Link>
                        })
                    }
                </main>
                {/*<AddIdeaButton moveToCreateIdeaPage={this.moveToCreateIdeaPage}/>*/}
                {/*<SettingsButton />*/}
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