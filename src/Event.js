import React, { Component } from "react";

class Event extends Component {
    constructor () {
        super();

    this.state = { showDetails: false }
    }

    handleDetailsClicked = () => {
        this.setState((prevState) => ({
            showDetails: !prevState.showDetails
            }))
        };

render() {
    const { event } = this.props; 
    return (
            <div className="EventDetails">
                <h1 className="summary" >{event.summary} </h1>
                <p className="startdatetime" >Start: {new Date(event.start.dateTime).toISOString()}</p>
                <p className="timezone">{event.timeZone}</p>
                <p className="location"> {event.location}</p>
                <br/>
                {!this.showDetails && (
                <div>
                    <h3>About Event:</h3>
                    <a className="htmlLink" href={event.htmlLink}>Click here to see details on Google Calendar </a>
                    <p className="description">{event.description}</p>
                </div>
                    )}
                    <br/><br/>
                <button className="detailsButton" onClick={this.handleDetailsClicked}>Show details</button>
                
            </div> 
           );
  }
}
export default Event;