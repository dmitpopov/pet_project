import React, {Component} from 'react';
import './style.css';
import AuthorisationPage from "./pages/AuthorisationPage";
import { Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IdeaPage from "./pages/IdeaPage";
import CreateIdeaPage from "./pages/CreateIdeaPage";
import RegistrationPage from "./pages/RegistrationPage";
import LogoutPage from './pages/LogoutPage';


class App extends Component {
  render() {
    return (
        <div className="app">
          <Route path="/login" exact component={AuthorisationPage} />
          <Route path="/logout" exact component={LogoutPage} />
          <Route path="/" exact component={MainPage} />
          <Route path="/idea/:id" component={IdeaPage} />
          <Route path="/create" component={CreateIdeaPage} />
          <Route path="/reg" component={RegistrationPage} />
        </div>
    );
  }

}

export default App;
