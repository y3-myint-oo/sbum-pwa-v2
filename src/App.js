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
    let deferredPrompt;
    const addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      addBtn.style.display = 'block';
      addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
          deferredPrompt = null;
        });
      });
    });

    //NetworkStatus Checker
    setInterval(this.checkNetwork, 1000);
  }
  checkNetwork(){
    axios.get(`http://localhost:8081/api/v1/network`)
      .then(res => {
        if (res.data.status === 200 ){
          if (!this.props.setting.isOnline){
            this.props.networkStatus(true);
          }else{
            console.log("message in app already online")
          }         
        }
    }).catch(error => {       
        if (this.props.setting.isOnline){
          this.props.networkStatus(false);
        }  else{
          console.log("message in app already offline")
        }      
    })
    
  }
  render() {
    console.log(" auth0 ( app.js ) ",this.props.auth0.user)
    if (this.props.auth0.user === null ){
      return (
      <MuiThemeProvider theme={theme}>
        <LandingUx />
        <button class="add-button">Add to home screen</button>
      </MuiThemeProvider>
      );
    }else {
      return (
        <MuiThemeProvider theme={theme}>
            <HomeUx />
            <button class="add-button">Add to home screen</button>
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
