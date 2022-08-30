import '../App.css';
import '../Location.css';
import {Component} from "react";
import {getLocation} from 'rickmortyapi'; // getCharacter()
import {getCharacter} from 'rickmortyapi';
import img from "../img/rickandmorty.jpg"

class Location extends Component {
    constructor(props) {
        super(props);
        /* Creates the state and put info in array */
        this.state = {
            location: [],
            residents: [],
            id: 1,
        };
    }

    async componentDidMount() {
        // get id out of current url and put id in state
        var locationId = await window.location.href.lastIndexOf('/');
        let currentLocation = await Number(window.location.href.substring(locationId + 1));

        this.setState({id:currentLocation});

        /* Get the locations based on id*/
        const singleLocation = await getLocation(this.state.id);
        /* Create the state and put data in the state */
        this.setState({location: singleLocation});
        /* Loads in the data */
        this.refresh();
    }


    refresh = async () => {
        let residentIds = [];

        this.state.location.residents.map(function (item){
            /* Asks the last number of url residentId after / and delete everything what comes before the / */
            var url = item.lastIndexOf('/');
            let residentId = Number(item.substring(url + 1));

            /* Adds new items to end of array and returns new length residentId */
            residentIds.push(residentId);
        })
        const residentsList = await getCharacter([residentIds]);
        this.setState({residents:residentsList});
    }

  /* This function with html code has been created so that we can also see the location page without residents or if only 1
   resident lives there. If we don't use this, it'll show an error on the client side*/
    locationCheck = () => {
        const residentLength = this.state.residents.length;

        /* check the length of the array if it's <= 1 or less it wil show the info inside the if statement  */
        if(!residentLength){
            return[
                <div className="container-app">
                    <div className="fullwidth col-md-4 info-card">
                        <p className="info-card-text">{this.state.residents.name}</p>
                        <img src={this.state.residents.image} />
                    </div>
                </div>
            ]
        /* if the array is => 1 it will show the info inside the else statement   */
        } else {
            return[
                <div className="container-app">

                    {/* Loop the array from residents */}
                    {this.state.residents.map(function (item, i){
                        return [
                            /* A unique key in the highest <tag> */
                            <div className="fullwidth col-md-4 info-card" key={i}>
                                <p className="info-card-text">{item.name}</p>
                                <img className="image" src={item.image} alt={item.name}></img>
                            </div>
                        ]
                    })}
                </div>
            ]
        }
    }

    /* Grab the url of the next location and updates the state  */
    next = async (event) => {
        const allLocations = await getLocation({});
        /* Counts the number from locations in the element */
        if(this.state.id == allLocations.info.count) {
        } else {
            /* Gives equation for moving to next page based on id */
            var nextId = this.state.id + 1;
            /* Go next on page using variable nextId */
            let nextLocation = await getLocation(nextId);
            /* Grab the url of the next location*/
            this.setState({id: nextId, location: nextLocation});
            /* Updates state and loads more data */
            this.refresh();
        }
    }

    /* Grab the url of the previous location and updates the state*/
    prev = async (event) => {
        /* Prevents for going back if page number is less than 1 */
        if(this.state.id <= 1) {
        } else {
            var prevId = this.state.id - 1;
            /* Go previous on page using variable prevId */
            let prevLocation = await getLocation(prevId);
            /* Grab the url of the previous location*/
            this.setState({id: prevId, location: prevLocation});
            /* Updates state and loads data */
            this.refresh();
        }
    }

    /* Render the information on the Client-side */
    render() {
            if(!this.state.residents) return null;
            return (
                <div className="App">
                    <header className="App-header content-bg">

                            {/* Show the first container block with the image and items from the api rick and morty */}
                                <div className="container-app">
                                    <div className="centered info-card col-md-12">
                                        <img src={img} className="rick-morty-img"  alt="rick-morty"/>
                                    </div>
                                    <div className="centered info-card col-md-12">
                                        <div className="info-block-location">

                                            <h2 className="h2-location">Location</h2>
                                            <p>{this.state.location.name}</p>

                                            <h2 className="h2-location">Type of location</h2>
                                            <p>{this.state.location.type}</p>

                                            <h2 className="h2-location">Dimension</h2>
                                            <p>{this.state.location.dimension}</p>
                                        </div>
                                    </div>
                                </div>

                        {/* Show the title Residents */}
                        <div className="container-app">
                            <div className="episode-card">
                                <h2 className="h2-location">Residents</h2>
                            </div>
                        </div>

                        {/* Show the second container block with the array data inside from the function location */}
                        <div className="container-app">
                            {this.locationCheck()}
                        </div>

                        {/*Call on the function that displays the next/previous page*/}
                        <div className="col butndiv">
                            {/*Call on the function that displays the next/previous set of 20 locations*/}
                            <span className="butn" onClick={this.prev}>previous</span>
                            <span className="butn" onClick={this.next}>next</span>
                        </div>
                    </header>
                </div>
            );
        }
    }

    /*Export the data in this file for use in other files*/
    export default Location;

