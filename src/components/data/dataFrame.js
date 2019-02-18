import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData,removeData } from '../../actions/data_action';

class DataList extends Component {
    constructor(props){
        super(props);
        this.state={
        
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();  // Importance
        //console.log("-- data --",event.target.username.value);
        const name=event.target.username.value;
        const data = {
            id: new Date(),
            name
          }
        console.log(data) 
        this.props.addData(data);
    }
    render() {
        console.log('[Data] this.props', this.props);
        return(
            <div>
                <h4>Add New Data</h4>   
                    <form onSubmit={event=>this.handleSubmit(event)}>
                        <label>
                            Name:
                            <input type="text" name="username" id="username"/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        datas: state.datas,
    };
  }
  
export default connect(mapStateToProps, { addData,removeData })(DataList);
  