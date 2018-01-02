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
            comment: '',
            commentid: '',
            all: [],
            mycomments:[],
            allcomments:[]
        }
    }
    
    componentDidMount(){
        
        fetch('http://eventmanager-server.herokuapp.com/events')
            .then( (response) => {return response.json(); })
            .then( (data) =>  {
                
                console.log('Event Data:');
                console.log(data);
                
                this.setState({
                    all: this.state.all.concat(data)
                });
                console.log(timestamp.now())
            })
            
            
        fetch('http://eventmanager-server.herokuapp.com/comments')
            .then( (response) => {return response.json(); })
            .then( (data) =>  {
            
                console.log('Comment Data:');
                console.log(data);
                
                this.setState({
                    allcomments: this.state.allcomments.concat(data)
                });
                console.log(timestamp.now())
                console.log('Comment Data Length:');
                console.log((this.state.allcomments).length)
            })
    }
    
    
    
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
    
    
    
    handleFilterChange = (event) => {
        event.preventDefault;
        this.setState({
            filter: event.target.value
        })
    }
    
    
    handleFilterSubmit = () => {
        
        var url = "http://eventmanager-server.herokuapp.com/events?organiser="+(this.state.filter)
        console.log(url)
    }
    
    
    
    handleCommentChange = (event) => {
        event.preventDefault;
        this.setState({
            comment: event.target.value 
        });
        
    }
    
    handleCommentIdChange = (event) => {
        event.preventDefault;
        this.setState({
            commentid: event.target.value 
        });
        
    }
    
    
    handleCommentSubmit = () => {
        
        fetch('http://eventmanager-server.herokuapp.com/comments',{
            method: 'POST',
            body: JSON.stringify({
                "body": this.state.comment,
                "postId": this.state.commentid,
                "createdAt": timestamp.now(),
                "id": (this.state.allcomments).length + 1
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then( (response) => {return response.json(); })
            .then( (data) => {
                
                console.log(data) 
             })
        
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
            return( <li key={i}>{item.title} by {item.organiser} <button onClick={() => this.details(item.id)} > More </button>
                            
            		        <br /><br />
                    </li>
                    
            )
        })
        
        return(
            <div>
                
                <button> Filter </button>
                <form onSubmit={this.handleFilterSubmit}>
        		    <input placeholder="Organiser Name" onChange = {this.handleFilterChange} value = {this.state.filter} />
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
    		    
    		    <form onSubmit={this.handleCommentSubmit} style={{'marginTop': 10}}>
        		    <input placeholder='Comment' onChange = {this.handleCommentChange} value = {this.state.comment} />
        		    <input placeholder='Post Id' onChange = {this.handleCommentIdChange} value = {this.state.commentid} />
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