import React, { Component } from 'react';
import { connect } from 'react-redux';

class Transport extends Component{
    constructor(props){
        super(props);
        this.state={
       
        }        
    }
    componentDidMount () {
   
    }
    render(){
        return(
            <div>
                <h2>This is Transport page</h2>
                <ul>
                    <li>Same desing with stock</li>
                </ul>
            </div>
        )
    }
}

export default connect(null)(Transport);