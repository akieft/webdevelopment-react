import logo from '../logo.svg';
import '../App.css';
import '../EpisodesSingle.css';
import {Component} from "react";
import {getEpisode} from 'rickmortyapi'; // getEpisode()
import {getCharacter} from 'rickmortyapi'; // getCharacter()
import s1 from "../img/Rick-Morty-season1.png";
import s2 from "../img/season2.png";
import s3 from "../img/season3.png";
import s4 from "../img/Rick-Morty-season4.jpg";
import portal from "../img/RickandMorty-Portal.png";

class Episode extends Component {
    constructor(props) {
        super(props);
        // Creates the state and put info in array
        this.state = {
            characters: [],
            season: "",
            episode: [],
            id: 1,
            date: "",
        };
    }

    async componentDidMount() {
        // get id out of current url and put id in state
        var characterId = await window.location.href.lastIndexOf('/');
        let currentCharacter = await Number(window.location.href.substring(characterId + 1));

        this.setState({id:currentCharacter});

        // gets the data from single episode based on id
        const epSingle = await getEpisode(this.state.id);
        // Create the state and put data in the state
        this.setState({episode:epSingle});
        // Loads in the data
        this.refresh();

        const date = this.state.episode.created.substring(-3, 10);
        var split = date.split('-');
        var creationDate = split[2] + '-' + split[1] + '-' + split[0];
        this.setState({date:creationDate});
    }

    //
    refresh = async () => {
        // Loads abbreviation of season number and episode
        const fullSeason = await this.state.episode.episode;
        // Extracts season from episodes using numbers
        const season = fullSeason.substring(0, 3);
        this.setState({season:season});
        let characterIds = [];


        this.state.episode.characters.map(function (item){
            // Asks the last number of url characterId after '/' and deletes first character
            var url = item.lastIndexOf('/');
            let characterId = Number(item.substring(url + 1));

            // Adds new items to end of array and returns new length characterId
            characterIds.push(characterId);
        })
        const characterList = await getCharacter([characterIds]);
        this.setState({characters:characterList});
    }

    // Grab the url of the next set of episodes and updates the state
    next = async (event) => {
        const allEpisodes = await getEpisode({});
        // Counts the number of collections in the element
        if(this.state.id == allEpisodes.info.count) {
        }else {
            // Gives equation for moving to next page based on id
            var nextId = this.state.id + 1;
            // Go back on page using variable nextId
            let nextEpisode = await getEpisode(nextId);
            // Grab the url of the next set of 20 characters
            this.setState({id:nextId, episode:nextEpisode});
            // Updates state and loads more data
            this.refresh();
        }
    }

    // Grab the url of the previous set of episodes and updates the state
    prev = async (event) => {
        // Prevents user from going back if page number is less than 1
        if(this.state.id <= 1){

        }else {
            // Gives equation for moving to previous page based on id
            var prevId = this.state.id - 1;
            // Go back on page using variable prevId
            let prevEpisode = await getEpisode(prevId);
            // Grab the url of the previous set of 20 characters
            this.setState({id: prevId, episode: prevEpisode});
            // Updates state and loads data
            this.refresh();
        }
    }

    render() {
        // Render the state in the console for testing purposes (left in to watch state)
        console.log(this.state);
        if(!this.state) return null;
        if(this.state.characters) var allCharacters = this.state.characters;
        const renderImage = ()=>{
            switch (this.state.season) {
                case "S01":
                    return s1;
                    break;
                case "S02":
                    return s2;
                    break;
                case "S03":
                    return s3;
                    break;
                case "S04":
                    return s4;
                    break;
                default:
                    return portal;
            }
        }
        return (
            <div className="App">
                <header className="App-header content-bg">
                    <div className="container-app">
                            <div className="col-md-4">
                                <img className="image-card" src={renderImage()}></img>
                            </div>
                            <div className="col-md-6 info-card fullwidth">
                                        <h2 className="text-head-align-left">Title:</h2>
                                        <p className="text-align-left">{this.state.episode.name}</p>

                                        <h2 className="text-head-align-left">Air date:</h2>
                                        <p className="text-align-left">{this.state.episode.air_date}</p>

                                        <h2 className="text-head-align-left">Episode:</h2>
                                        <p className="text-align-left">{this.state.episode.episode}</p>

                                        <h2 className="text-head-align-left">Episode created:</h2>
                                        <p className="text-align-left">{this.state.date}</p>
                            </div>
                    </div>

                    <div className="container-app">
                        <h2 className="episode-card">Characters in episode</h2>
                    </div>

                    <div className="container-app">
                        {/*Loop all characters*/}
                        {this.state.characters.map(function(item, i){
                            return [
                                // Always give a unique key to the highest tag
                                <div key={i} className="fullwidth col-md-4 info-card">
                                    <p>{item.name}</p>
                                    <img className="image" src={item.image} alt={item.name}></img>
                                </div>
                                ]
                        })}
                    </div>
                            <div className="butndiv">
                                {/*Calls on the function that displays the next/previous page of individual episode pages*/}
                                <span className="butn" onClick={this.prev}>Previous</span> <span className="butn" onClick={this.next}>Next</span>
                            </div>
                </header>
            </div>
        );
    }
}
// Export the data in this file for use in other files
export default Episode;