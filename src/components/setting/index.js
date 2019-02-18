import React, { Component } from 'react';
import { connect } from 'react-redux';

class Setting extends Component{
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
                <h2>This is Setting page</h2>
                <ul>
                    <li>Language changing ( myanmar, englsih )</li>
                    <li>Developer info ( weblink)</li>
                    <li>Contact mail</li>
                </ul>
            </div>
        )
    }
}

export default connect(null)(Setting);