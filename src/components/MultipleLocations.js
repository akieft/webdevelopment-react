import logo from '../logo.svg';
import '../App.css';
import {Component} from "react";
import {getLocation} from 'rickmortyapi'; // getLocation()

class MultipleLocations extends Component {
    constructor(props) {
        super(props);
        // Creates the state and put info in array
        this.state = {
            filter: "",
            locations: [],
            filterError: "",
        };

        this.filter = this.filter.bind(this);
    }

    async componentDidMount() {
        // Get specific locations based on id
        const locationmultiple = await getLocation(Array.from(getLocation()));
        // Create the state and put data in the state
        this.setState({locations: locationmultiple,});
    }

    filter = async (event) => {
        // Get filter and put the content in the state
        const filterText = await event.target.value;
        this.setState({filter: filterText});
        // Grab the url for filtering name and apply it
        let filteredUrl = "https://rickandmortyapi.com/api/location/?name=" + this.state.filter;
        // Fetch data, put in json format and put it in the state, refresh the filterError state.
        fetch(filteredUrl).then(res => {
            res.json().then(data => {
                this.setState({locations: data, filterError: ""})
            });
        });
    }

    falseFilter = (event) => {
        // Grab all characters with an empty filter
        let filteredUrl = "https://rickandmortyapi.com/api/location/?name=";
        // Fetch data, put in json format and put it in the state, give relevant error to the filterError state
        fetch(filteredUrl).then(res => {
            res.json().then(data => {
                this.setState({locations: data, filterError: "no matching results"})
            });
        });
    }

    // Grab the url of the next set of 20 locations and update the state
    next = (event) => {
        // Grab the url of the next set of 20 locations
        let nextUrl = this.state.locations.info.next;

        // Fetch the url of the next set of 20 locations, put it into a json format and update the state "locations"
        fetch(nextUrl).then(res => {
            res.json().then(data => {
                this.setState({locations: data})
            });
        });
    }

    // Grab the url of the previous set of 20 locations and update the state
    prev = (event) => {
        // Grab the url of the previous set of 20 locations
        let prevUrl = this.state.locations.info.prev;

        // Fetch the url of the previous set of 20 locations, put it into a json format and update the state "locations"
        fetch(prevUrl).then(res => {
            res.json().then(data => {
                this.setState({locations: data})
            });
        });
    }

    render() {
        // Render the state in the console for testing purposes
        console.log(this.state);
        if(this.state.locations.error)this.falseFilter();
        if(!this.state.locations.results) return null;
        return (
            <div className="App">
                <header className="App-header content-bg">
                    <div>
                        <div className="title-char">
                            <h1>Locations</h1>
                            <div>{this.state.filterError}</div>
                            <span><input type="text" value={this.state.filter} onChange={this.filter}/></span>
                        </div>
                        <div className="container-app">
                            {/*Loop all locations*/}
                            {this.state.locations.results.map(function(item, i){
                                return [
                                    // Always give a unique key to the highest tag
                                    <div key={i} className="fullwidth col-md-4 info-card">
                                        <p><a href={"location/" + item.id}>{item.name}</a></p>
                                        <p>{item.dimension}</p>
                                    </div>
                                ]
                            })}
                        </div>
                    </div>
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
// Export the data in this file for use in other files
export default MultipleLocations;