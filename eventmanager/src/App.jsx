import React from 'react';
import ReactDOM from 'react-dom';
import "isomorphic-fetch";
import timestamp from "unix-timestamp";

class Events extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            
            filter: '',
            post: '',
            organiser: '',
            date: '',
            price: '',
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
                console.log(timestamp.now())
            })
    }
    
    
    /*
    Add an input form for this (additional)
    
    filter = (organiser) => {
        
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
    
    
    handlePostChange = (event) => {
        event.preventDefault;
        this.setState({
            post: event.target.value 
        });
        
    }
    
    handleOrganiserChange = (event) =>{
        event.preventDefault;
        this.setState({
            organiser: event.target.value 
        });
        
    }
    
    handleDateChange = (event) => {
        event.preventDefault;
        this.setState({
            date: event.target.value 
        });
    }
    
    handlePriceChange = (event) => {
        event.preventDefault;
        this.setState({
            price: event.target.value 
        });
    }
    
    
    
    handlePostSubmit = (event) => {
        event.preventDefault;
        fetch('http://eventmanager-server.herokuapp.com/events',{
            method: 'POST',
            body: JSON.stringify({
                "title": this.state.post,
                "date": this.state.date,
                "organiser": this.state.organiser,
                "price": this.state.price,
                "createdAt": timestamp.now(),
                "id": (this.state.all).length + 1
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then( (response) => {return response.json(); })
            .then( (data) => {
                
                console.log(data) 
             })
        
    }
    
    
    
    
    render(){
        
        const items= this.state.all.map((item,i) => {
            return <li key={i}>{item.title} {item.organiser} <button onClick={() => this.details(item.id)} > More </button> </li>
        })
        
        return(
            <div>
                
                <h1>Event Manager</h1>
                <br />
                
                <button> Filter </button>
                <form onSubmit={this.handleFilterSubmit}>
        		    <input onChange = {this.handleFilterChange} value = {this.state.input} />
        	        <button type='submit'>Submit!</button>
    		    </form>
                
                <br />
                
                <button style={{'marginTop': 10}}> Add Posts! </button>
                <form onSubmit={this.handlePostSubmit}>
        		    <input placeholder='Name your Post' onChange = {this.handlePostChange} value = {this.state.post} />
        		    <input placeholder='Organiser name' onChange = {this.handleOrganiserChange} value = {this.state.organiser} />
        		    <input placeholder='Date' onChange = {this.handleDateChange} value = {this.state.date} />
        		    <input placeholder='Price' onChange = {this.handlePriceChange} value = {this.state.price} />
        	        <button type='submit'>Submit!</button>
    		    </form>
                
                
                
                
                <br /> <br/>
                <ul>
                    {items}
                    {this.state.mycomments}
            
                </ul>
            </div>
        );       
    }
    
}

export default Events;