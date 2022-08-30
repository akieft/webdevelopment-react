import logo from '../logo.svg';
import '../App.css';
import {Component} from "react";
import {getCharacter} from 'rickmortyapi'; // getCharacter()
import {getEpisode} from 'rickmortyapi'; // getLocation()

class SingleCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            location: [],
            episode: [],
            id: 7,
        };
    }

    async componentDidMount() {
        // get id out of current url and put id in state
        var characterId = await window.location.href.lastIndexOf('/');
        let currentCharacter = await Number(window.location.href.substring(characterId + 1));

        this.setState({id:currentCharacter});

        /* get character based on id */
        const charSingle = await getCharacter(this.state.id);

        this.setState({character:charSingle});

        this.refresh();
    }

    refresh = async () => {
        /* function to show location of current character */
        const location = this.state.character.location;
        this.setState({location:location});

        let episodeIds = [];

        this.state.character.episode.map(function (item){

            var url = item.lastIndexOf('/');
            let episodeId = Number(item.substring(url + 1));

            episodeIds.push(episodeId);
        })
        const episodeList = await getEpisode([episodeIds]);

        this.setState({episode:episodeList});

    }

    /* If the character plays in one episode only, a different method needs to be used to
    load in the episode content. */
    episodeCheck = () => {

        const episodes = this.state.episode.length;

        if(!episodes) {
            return [
                <div className="container-app">
                    <div className="fullwidth col-md-4 info-card">
                        <p className="episode-text">{this.state.episode.name}</p>
                    </div>
                </div>
            ]
        } else {
           return [
               <div className="container-app">
                   {this.state.episode.map(function(item, i){
                       return [
                                <div className="fullwidth col-md-4 info-card" key={i}>
                                    <p className="info-card-text">{item.name}</p>
                                </div>
                       ]
                   })}
               </div>
           ]
        }
    }

    /* Grab the url of the next character and update the state */
    next = async (event) => {
        const allCharacters = await getCharacter({});
        if(this.state.id == allCharacters.info.count) {

        } else {

            var nextId = this.state.id + 1;
            let nextCharacter = await getCharacter(nextId);

            this.setState({id:nextId, character:nextCharacter});

            this.refresh();
        }
    }

    /* Grab the url of the prev character and update the state */
    prev = async (event) => {
        if(this.state.id <= 1) {

        } else {

            var prevId = this.state.id - 1;
            let prevCharacter = await getCharacter(prevId);

            this.setState({id: prevId, character: prevCharacter});

            this.refresh();
        }
    }

    render() {
        /* Render the state in the console for testing purposes */
        console.log(this.state);
        if(!this.state) return null;
        return (
            <div className="App">
                <header className="App-header content-bg">
                    <div className="container-app">
                        <div className="col-md-4">
                            <img className="image-card" src={this.state.character.image} alt={this.state.character.name}></img>
                        </div>
                        <div className="col-md-6 info-card fullwidth">
                            <h2 className="char-title">{this.state.character.name}</h2>

                            <h3 className="char-title">Status:</h3>
                            <p className="text-align-left">{this.state.character.status}</p>

                            <h3 className="char-title">Species:</h3>
                            <p className="text-align-left">{this.state.character.species}</p>

                            <h3 className="char-title">Gender:</h3>
                            <p className="text-align-left">{this.state.character.gender}</p>

                            <h3 className="char-title">Location:</h3>
                            <p className="text-align-left"> {this.state.location.name}</p>
                        </div>
                    </div>

                    <div className="container-app">
                        <h2 className="episode-card">Episodes</h2>
                    </div>
                    {this.episodeCheck()}

                    {/*Call on the function that displays the next/previous character*/}
                    <div className="col butndiv">
                        <span className="butn" onClick={this.prev}>previous</span>
                        <span className="butn" onClick={this.next}>next</span>
                    </div>
                </header>
            </div>
        );
    }
}

export default SingleCharacter;