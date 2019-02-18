import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_action';
import { readFeatures } from '../../actions/features_action';
import { requestPage } from '../../actions/setting_action';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ContentUx from './content';
import { Divider } from '@material-ui/core';
import {navStatus} from '../../actions/setting_action'

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
            
        };
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                
                <SwipeableDrawer
                    anchor="left"
                    open={this.props.setting.navIsOpen}
                    onClose={e=>this.props.navStatus(!this.props.setting.navIsOpen)}
                    onOpen={e=>this.props.navStatus(!this.props.setting.navIsOpen)}
                    >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={e=>this.props.navStatus(!this.props.setting.navIsOpen)}
                        onKeyDown={e=>this.props.navStatus(!this.props.setting.navIsOpen)}
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
export default connect(mapStateToProps, { logout,readFeatures,requestPage,navStatus })(withStyles(styles)(Home));
  