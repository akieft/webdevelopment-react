import '../App.css';
import '../HomePage.css';
import {Component} from "react";
import {getCharacter} from 'rickmortyapi'; // getCharacter()
import img from "../img/wallpaper.png"; // getCharacter()

class RickMorty extends Component {
    constructor(props) {
        super(props);
        this.State = {
            characters: [],
            id: [1,2]
        };
    }

    async componentDidMount() {
        // get the characters based on id
        const charDouble = await getCharacter([this.State.id])
        // Create state and put data in the state
        this.setState({characters:charDouble});
    }

    render() {
        // Render the state in the console for testing purposes
        console.log(this.state);
        if(!this.state) return null;
        return (
        // Content Characters viewpage
            <div className="App-char">
                <img src={img} className="wallpaper" alt="wallpaper"/>
                <div className="multi">
                    <h1 className="home-title">WELCOME</h1>
                    <p className="home-txt">
                        Welcome to the amazing Rick and Morty API of Team C3! The API is based on the television show Rick and Morty. You will have access to all Rick and Morty characters,
                        locations and episodes. Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's nighttime
                        Adult Swim programming block. It's about the adventures of the members of the Smith household, which consists of parents Jerry and Beth, their children Summer and
                        Morty, and Beth's father, Rick Sanchez, who lives with them as a guest. The series follow the misadventures of mad scientist Rick Sanchez and his good-hearted
                        but fretful grandson Morty Smith, who split their time between domestic life and interdimensional adventures.
                    </p>
                {/*Loop through characters*/}
                    {this.state.characters.map(function(item, i){
                        return [
                            <div className="container-app-home">
                                <div className="info-card-home">
                                    <div>
                                        <p className="pchar">{item.name}</p>
                                        <img className="img-rick-morty" src={item.image} alt={item.name}></img>
                                    </div>
                                </div>
                            </div>
                        ]
                    })}
                    <p className="home-end-txt">© The data and images are used without claim of ownership and belong to their respective owners, Justin Roiland and Dan Harmon for Adult Swim.</p>

                </div>

            </div>
        );
    }
}
// Export the data in this file for use in other files
export default RickMorty;
