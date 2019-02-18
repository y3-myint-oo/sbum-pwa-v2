import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login,logout } from '../../actions/auth_action';

class LoginFrame extends Component {
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
        const pass=event.target.password.value;
        const data = {
            //id: new Date(),
            name,
            pass,
          }
        console.log(data) 
        this.props.login(data);
    }
    render() {
        return(
            <div>
                <h4>Login</h4>   
                    <form onSubmit={event=>this.handleSubmit(event)}>
                        <label>
                            Name:
                            <input type="text" name="username" id="username"/>
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="text" name="password" id="password"/>
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth0: state.auth0,
    };
  }
  
export default connect(mapStateToProps, { login,logout })(LoginFrame);
  