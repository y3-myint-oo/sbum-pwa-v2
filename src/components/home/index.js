import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_action';
import { readFeatures } from '../../actions/features_action';
import { requestPage } from '../../actions/setting_action';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ContentUx from './content';
import { Divider } from '@material-ui/core';

const styles = {
    menu: {
        margin: 0,
        top: 20,
        right: 20,
        bottom: 'auto',
        left: 'auto',
        position: 'fixed',
    },
    avatar: {
        margin: 10,
        width: 30,
        height: 30,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
};

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            navIsOpen:false, //left: false,
        };
        this.toggleDrawer=this.toggleDrawer.bind(this);
    }
    toggleDrawer(){
        this.setState({
            navIsOpen: !this.state.navIsOpen,
        });
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button 
                variant="fab"
                color="primary" 
                className={classes.menu}
                onClick={e=>this.toggleDrawer()}
                >
                Menu</Button>
                <SwipeableDrawer
                    anchor="left"
                    open={this.state.navIsOpen}
                    onClose={e=>this.toggleDrawer()}
                    onOpen={e=>this.toggleDrawer()}
                    >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={e=>this.toggleDrawer()}
                        onKeyDown={e=>this.toggleDrawer()}
                    >
                       <div className={classes.list}>
                       {
                        this.props.features.map(data => {
                            return (                                
                                <List onClick={(event) => this.props.requestPage(data.title)} key={data.id}>                           
                                    <ListItem button key={data.title}>
                                            <ListItemAvatar>
                                                <img alt={data.title} className={classes.avatar} src={data.icon} />
                                            </ListItemAvatar>
                                        <ListItemText primary={data.title} />
                                    </ListItem>
                                </List>              
                                )
                            })
                        }
                        <Divider/>
                        <List onClick={event=>this.props.logout(event)} >                           
                            <ListItem button key="Log out">
                                <ListItemAvatar>
                                    <img alt="" className={classes.avatar} src="" />
                                </ListItemAvatar>
                                <ListItemText primary="Log out" />
                            </ListItem>
                        </List>
                        </div>
                    </div>
                </SwipeableDrawer>               
                <div>
                    <ContentUx />                   
                </div>     
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        features:state.features,
    };
} 
export default connect(mapStateToProps, { logout,readFeatures,requestPage })(withStyles(styles)(Home));
  