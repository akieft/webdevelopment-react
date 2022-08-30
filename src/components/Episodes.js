import logo from '../logo.svg';
import '../App.css';
import '../Episodes.css';
import {Component, useState} from "react";
import {getEpisode} from 'rickmortyapi'; // getEpisode()

function RandomEp() {
    // Set minVal and maxVal (ep 1 - 41)
    const [minVal, setMinVal] = useState(1);
    const [maxVal, setMaxVal] = useState(41);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));

    const handleRandomNum = () => {
        setRandomNum(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));
    };

    return (
        <div className="number">
            <div className="container-num">
                <div className="info-card padding">
                   <p className="p-padding">
                       Dont know which episode to watch?
                   </p>
                    <span className="p-padding" >Watch episode </span>
                    <span className="span-color">{randomNum}</span>
                    <span className="p-padding" >!</span>
                </div>
                <div className="butn-div">
                    <button className="btn btn-primary randomnumber-button" onClick={handleRandomNum}>Click to get random episode</button>
                </div>
            </div>
        </div>
    );
}

class Episodes extends Component {
    async componentDidMount() {
        // get the first 41 episodes based on id
        const ep = await getEpisode(Array.from({length: 41}, (v, i) => i + 1));
        // Create the state and put data in the state
        this.setState({episodes: ep});
    }

    render() {
        // Render the state in the console for testing purposes
        console.log(this.state);
        if(!this.state) return null;
        return (
            <div className="App">
                <p className="episode-card top">All Episodes</p>
                <header className="App-header content-bgg">
                    <div className="padding-bottom">
                        <table className="ep-head">
                            <thead>
                                <th className="text-align-head-nr" scope="col">Nr</th>
                                <th className="text-align-title" scope="col">Title</th>
                                <th className="text-align-airdate" scope="col">Airdate</th>
                                <th className="text-align-ep" scope="col">Episode Number</th>
                            </thead>
                            <tbody>
                        {/*Loop all episodes*/}
                        {this.state.episodes.map(function(item, i){
                            return [
                                // Always give a unique key to the highest tag
                                    <tr className="eptable" key={i}>
                                        <td className="text-id">{item.id}</td>
                                        <td className="text-name"><a href={"episode/" + item.id}>{item.name}</a></td>
                                        <td className="text-align-body-airdate">{item.air_date}</td>
                                        <td className="text-align-epbody">{item.episode}</td>
                                    </tr>
                            ]
                        })}
                            </tbody>
                        </table>
                    </div>
                </header>
                <p className="episode-card bottom">Random episode picker</p>
                {/*  Load the RandomEp function in */}
                <RandomEp />
            </div>
        );
    }
}
// Export the data in this file for use in other files
export default Episodes;