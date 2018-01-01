import React from 'react';
import ReactDOM from 'react-dom';
import "isomorphic-fetch";


class Events extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            event : 'party',
            all: []
        }
    }
    
    componentDidMount(){
        
        fetch('http://eventmanager-server.herokuapp.com/events')
            .then( (response) => {return response.json(); })
            .then( (data) =>  {
            
                console.log(data);
                
                this.setState({
                    all: this.state.all.concat(data)
                });
                
            })
            
    }
    
    render(){
        
        const items= this.state.all.map((item,i) => {
            return <li key={i}>{item.title} {item.organiser}</li>
        })
        
        return(
            <div>
                <h1>Working</h1>
                <ul>
                    {items}
                </ul>
            </div>
        );       
    }
    
}

export default Events;