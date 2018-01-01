import React from 'react';
import ReactDOM from 'react-dom';
import "isomorphic-fetch";

class Events extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            event : 'party',
            all: [],
            mycomments:[]
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
    
    
    /*
    Add an input form for this
    
    specific = (organiser) => {
        
        fetch('http://eventmanager-server.herokuapp.com/events?organiser='+organiser)
            .then( (response) => {return response.json(); })
            .then( (data) => {
                console.log(data);
                const newitems= data.all.map((newitem,i) => {
                    
                })    
            });
        
    }
    */
    
    details = (id) => {
        
        fetch('http://eventmanager-server.herokuapp.com/comments')
            .then( (response) => {return response.json(); })
            .then( (data) => {
                console.log(data);
                console.log(id);
                
                const comments= data.map((comment,i) => {
                    if(id == comment.postId){
                        return <li key={i}>{comment.body} </li>
                    }
                }) 
                
                this.setState({
                    mycomments: [comments]
                })
            });
        
    }
    
    
    
    render(){
        
        const items= this.state.all.map((item,i) => {
            return <li key={i}>{item.title} {item.organiser} <button onClick={() => this.details(item.id)} > More </button> </li>
        })
        
        return(
            <div>
                <h1>Working</h1>
                <ul>
                    {items}
                    {this.state.mycomments}
                </ul>
            </div>
        );       
    }
    
}

export default Events;