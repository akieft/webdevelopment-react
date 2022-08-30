import './App.css';
import {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Home from "./components/Home";
import MultipleLocations from "./components/MultipleLocations";
import Location from "./components/Location";
import SingleCharacter from "./components/SingleCharacter";
import CharactersPage from "./components/CharactersPage";
import Episodes from "./components/Episodes";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from "./img/RickandMorty-Portal.png";
import Episode from "./components/EpisodesSingle";


class App extends Component {

    render() {
        return (
            <Router>
                <div className="content">
                    <Nav className="navbar navbar-expand-lg navbar-dark nav-bg">
                        <a className="navbar-brand nav-img" href="/">  <img src={logo} className="App-logo" alt="logo" style={{width: '100%', height: '100%'}} /></a>
                        <Button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </Button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/*Make a new li per page for the navigation bar*/}
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/locations">Locations</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/characters">Characters</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/episodes">Episodes</Link>
                                </li>
                            </ul>
                        </div>
                    </Nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        {/*Make a new route and call upon a component for each new link in the navigation bar*/}
                        <Route path="/locations">
                            <MultipleLocations />
                        </Route>
                        <Route path="/location/:id">
                            <Location />
                        </Route>
                        <Route path="/character/:id">
                            <SingleCharacter />
                        </Route>
                        <Route path="/characters">
                            <CharactersPage />
                        </Route>
                        <Route path="/episode/:od">
                            <Episode />
                        </Route>
                        <Route path="/episodes">
                            <Episodes />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}



export default App;
