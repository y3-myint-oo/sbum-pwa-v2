import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { networkStatus } from './actions/setting_action';
import LandingUx from './components/landing/index';
import HomeUx from './components/home/index';

//Theme Color
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
    
    };
    this.checkNetwork = this.checkNetwork.bind(this);
  }
  componentDidMount () {
    setInterval(this.checkNetwork, 1000);
  }



  checkNetwork(){
    fetch('http://localhost:8081/api/v1/network')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      if (data.status == 200 ){
        if (!this.props.setting.isOnline){
          this.props.networkStatus(true);
        }else{
          console.log("message in app already online")
        }         
      }else{
        if (this.props.setting.isOnline){
          this.props.networkStatus(false);
        }  else{
          console.log("message in app already offline")
        } 
      }
    })
    .catch(error => {
      if (this.props.setting.isOnline){
        this.props.networkStatus(false);
      }  else{
        console.log("message in app already offline")
      }  
    });
  }
 

  render() {
    console.log(" auth0 ( app.js ) ",this.props.auth0.user)
    if (this.props.auth0.user === null ){
      return (
      <MuiThemeProvider theme={theme}>
        <LandingUx />
      </MuiThemeProvider>
      );
    }else {
      return (
        <MuiThemeProvider theme={theme}>
            <HomeUx />
        </MuiThemeProvider>
      );
    }    
  }
}

function mapStateToProps(state) {
  return {
      setting:state.setting,
      auth0:state.auth0
  };
}

export default connect(mapStateToProps,{networkStatus})(App);;
