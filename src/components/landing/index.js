import React, { Component } from 'react';
import LoginForm from './loginFrame';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RegIcon from '@material-ui/icons/HowToReg';
import PhoneIcon from '@material-ui/icons/LocalPhone'
import { withStyles } from '@material-ui/core';
import './main.css';

const styles = theme => ({
    fab: {
         backgroundColor: theme.palette.background.paper,
         color:"#357a38",
         boxShadow: '0px 0px 0px 0px rgba(255, 105, 100, .7)',
     },
});

class Landing extends Component{ 
      
    render(){
        const { classes } = this.props;
        return(
                <div class='welcome'>
                    <div class='login'>
                        <div class='menu'>
                            <Menu style={classes}/>
                        </div>
                        <div class='content'>
                            <div class='slider'>
                                <div class='slide1'></div>
                                <div class='slide2'></div>
                                <div class='slide3'></div>
                            </div>
                            <div class='header'>
                                ဦးျမင့္
                            </div>  
                            <div class='label'>
                                ေတာင္သူမ်ားနင့္အၿမဲအတူ
                            </div>    
                        </div>
                        <div class='frame'>
                            <LoginForm />
                        </div>    
                    </div>
                </div>   
           
        )
    }
}

class Menu extends Component{
    componentDidMount(){
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
    }
    render(){
        const { style } = this.props;
        return (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={40}
            style={{ paddingTop: '60%' }}
          >
            <Grid item>
                <Button variant="fab" class="add-button" color="secondary" className={style.fab}> 
                   <RegIcon />
                </Button>
            </Grid>
            <Grid item>
                <Button variant="fab" color="secondary" className={style.fab}>
                    <PhoneIcon />
                </Button>
            </Grid>
          </Grid>
        )
    }
}
export default withStyles(styles)(Landing);