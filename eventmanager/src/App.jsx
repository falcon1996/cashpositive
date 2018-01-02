import React from 'react';
import ReactDOM from 'react-dom';
import "isomorphic-fetch";
import timestamp from "unix-timestamp";


const divStyle = {
  margin: '40px',
  border: '5px dashed pink'
};

const pStyle = {
  fontSize: '25px',
  textAlign: 'center',
  marginTop: '100px',
};



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
        
        var url = "http://eventmanager-server.herokuapp.com/events?organiser=organiser 3"
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
            return( <li key={i}>{item.title} by {item.organiser} <button onClick={() => this.details(item.id)} className="btn btn-primary"> More </button>
                            
            		        <br /><br />
                    </li>
                    
            )
        })
        
        return(
            <div style={divStyle}>
                
                
                <div style={{marginTop: '70px'}}>
                    <p style={{fontSize:30, marginLeft:30}}> Add Filters </p> 
                    <form onSubmit={this.handleFilterSubmit}>
            		    <input placeholder="Organiser Name" onChange = {this.handleFilterChange} value = {this.state.filter} className="form-control" />
            	        <button type='submit' className="btn btn-success">Submit!</button>
        		    </form>
                </div>
               
               <div style={{marginTop: '30px'}}>
                    <p style={{fontSize:30, marginLeft:30}}> Add New Posts </p>
                    <form onSubmit={this.handlePostSubmit} >
            		    <input placeholder='Name your Post' onChange = {this.handlePostChange} value = {this.state.post} className="form-control" />
            		    <input placeholder='Organiser name' onChange = {this.handleOrganiserChange} value = {this.state.organiser} className="form-control" />
            		    <input placeholder='Date (ex: November 5, 2017)' onChange = {this.handleDateChange} value = {this.state.date} className="form-control" />
            		    <input placeholder='Price' onChange = {this.handlePriceChange} value = {this.state.price} className="form-control" />
            	        <button type='submit' className="btn btn-success">Submit!</button>
        		    </form>
                </div>
                
                <ul style={{backgroundColor: 'yellow', fontSize: '25px', textAlign: 'center', marginTop: '100px',}}>
                    {this.state.mycomments}
            
                </ul>
                
                <h1 style={{fontSize:40, marginLeft:30, marginTop:50}}>Events</h1>
                <ul style={pStyle}>
                    {items}
            
                </ul>
                
                
    		    
    		    <form onSubmit={this.handleCommentSubmit} style={{'marginTop': 10, 'marginBottom': 20}}>
        		    <input placeholder='Comment' onChange = {this.handleCommentChange} value = {this.state.comment} className="form-control" />
        		    <input placeholder='Post Id' onChange = {this.handleCommentIdChange} value = {this.state.commentid} className="form-control" />
        	        <button type='submit' className="btn btn-success">Submit!</button>
    		    </form>
                
                
            </div>
        );       
    }
    
}

export default Events;