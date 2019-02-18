import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RegIcon from '@material-ui/icons/HowToReg';
import PhoneIcon from '@material-ui/icons/LocalPhone'
import { withStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import { login,logout } from '../../actions/auth_action';

const styles = theme => ({
    fab: {
         backgroundColor: theme.palette.background.paper,
         color:"#357a38",
         boxShadow: '0px 0px 0px 0px rgba(255, 105, 100, .7)',
     },
});


class LoginFrame extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            pass:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handlePass=this.handlePass.bind(this);
    }
    handleSubmit(){
        //event.preventDefault();  // Importance
        //console.log("-- data --",event.target.username.value);
        const name=this.state.name;
        const pass=this.state.pass;
        const data = {
            //id: new Date(),
            name,
            pass,
          }
        console.log(data) 
        this.props.login(data);
    }
    handleName(event){
        this.setState({name: event.target.value});
    }
    handlePass(event){
        this.setState({pass: event.target.value});
    }
    render() {
        return(
            <div>
                
                    <form >
                    <Card>           
                    <CardContent>
                        <TextField
                        id="name"
                        onInput={this.handleName}
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        value={this.state.name}
                        />
                        <TextField
                        onChange={this.handlePass}
                        type="password"
                        id="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.pass}
                        />
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" fullWidth onClick={this.handleSubmit}>
                        Login
                        </Button>
                    </CardActions>
                    </Card>
                        
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
  
export default connect(mapStateToProps, { login,logout })(withStyles(styles)(LoginFrame));
  