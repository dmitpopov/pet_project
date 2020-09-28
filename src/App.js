import React, {Component} from 'react';
import './style.css';
import AuthorisationPage from "./pages/AuthorisationPage";
import { Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AllIdeas from "./pages/AllIdeas";


class App extends Component {
  render() {
    return (
        <div className="app">
          <Route path="./" component={AuthorisationPage} />
          <Route path='./main' component={MainPage}/>
          <Route path='./all-ideas' component={AllIdeas}/>
        </div>
    );
  }
}




export default App;
