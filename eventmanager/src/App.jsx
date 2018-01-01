import React from 'react';
import ReactDOM from 'react-dom';


class Events extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            event : 'party'
        }
    }
    
    render(){
        return(
            <div>
                <h1>Working</h1>
            </div>
        );       
    }
    
}

export default Events;