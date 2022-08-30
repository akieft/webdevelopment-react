import '../CharactersPage.css';
import '../App.css';
import {Component} from "react";
import {getCharacter} from 'rickmortyapi'; // getCharacter()

class CharactersPage extends Component {
    constructor(props) {
        super(props);
        // Creates the state and put info in array
        this.state = {
            filter: "",
            characters: [],
            filterError: "",
        };

        this.filter = this.filter.bind(this);
    }

    async componentDidMount() {
        // Get all characters
        const getCharacters = await getCharacter({});
        // Put all characters in array
        const characters = await getCharacter(Array.from(getCharacters));
        // Create the state and put data in the state
        this.setState({characters: characters});
    }

    filter = async (event) => {
        // Get filter and put the content in the state
        const filterText = await event.target.value;
        this.setState({filter: filterText});
        // Grab the url for filtering name and apply it
        let filteredUrl = "https://rickandmortyapi.com/api/character/?name=" + this.state.filter;
        // Fetch data, put in json format and put it in the state, refresh the filterError state.
        fetch(filteredUrl).then(res => {
            res.json().then(data => {
                this.setState({characters: data, filterError: ""})
            });
        });
    }

    falseFilter = (event) => {
        // Grab all characters with an empty filter
        let filteredUrl = "https://rickandmortyapi.com/api/character/?name=";
        // Fetch data, put in json format and put it in the state, give relevant error to the filterError state
        fetch(filteredUrl).then(res => {
            res.json().then(data => {
                this.setState({characters: data, filterError: "no matching results"})
            });
        });
    }

    // Grab the url of the next set of 20 characters and update the state
    next = (event) => {
        // Grab the url of the next set of 20 characters
        let nextUrl = this.state.characters.info.next;

        // Fetch the url of the next set of 20 characters, put it into a json format and update the state "characters"
        fetch(nextUrl).then(res => {
            res.json().then(data => {
                this.setState({characters: data})
            });
        });
    }

    // Grab the url of the previous set of 20 characters and update the state
    prev = (event) => {
        // Grab the url of the previous set of 20 characters
        let prevUrl = this.state.characters.info.prev;

        // Fetch the url of the previous set of 20 characters, put it into a json format and update the state "characters"
        fetch(prevUrl).then(res => {
            res.json().then(data => {
                this.setState({characters: data})
            });
        });
    }

    render() {
        // Render the state in the console for testing purposes
        console.log(this.state);
        if(this.state.characters.error)this.falseFilter();
        if(!this.state.characters.results) return null;
        return (
        // Content Character viewpage
            <div className="App-char">
                <div className="title-char">
                    <h1>Rick & Morty Characters</h1>
                    <div>{this.state.filterError}</div>
                    <span><input type="text" value={this.state.filter} onChange={this.filter}/></span>
                </div>
                <header className="App-header-char content-char">
                    <div>
                        {/*Loop all characters*/}
                        {this.state.characters.results.map(function(item, i){
                            return [
                                // A unique key in the highest <tag>
                                <div className="container-app-chars" key={i}>
                                    <div className="info-card-chars">
                                        <div>
                                            <p className="pchar"><a href={"character/" + item.id}>{item.name}</a></p>
                                            <img className="image-char" src={item.image} alt={item.name}></img>
                                        </div>
                                    </div>
                                </div>
                            ]
                        })}
                        <div className="butndiv">
                            {/*Display the next/previous set of 20 characters*/}
                            <span className="butn" onClick={this.prev}>previous</span> <span className="butn" onClick={this.next}>next</span>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
// Export the data in this file for use in other files
export default CharactersPage;
