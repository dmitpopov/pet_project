import React, {Component} from 'react';
import './style.css';
import AuthorisationPage from "./pages/AuthorisationPage";
import { Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IdeaPage from "./pages/IdeaPage";
import CreateIdeaPage from "./pages/CreateIdeaPage";


class App extends Component {
  render() {
    return (
        <div className="app">
          <Route path="/" exact component={AuthorisationPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/idea/:id" component={IdeaPage} />
          <Route path="/create" component={CreateIdeaPage} />
        </div>
    );
  }

}

export default App;
