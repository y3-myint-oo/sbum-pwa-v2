import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/ViewHeadline';
import IconButton from '@material-ui/core/IconButton';
import { navStatus } from '../../actions/setting_action';
import NetworkStatus from '../util/network';
import ContentUX from './content';



const styles = theme => ({
    root: {
        flexGrow: 1,        
    },
    grow: {
        flexGrow: 1,
    },
    toolBar:{
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
});

class DashBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            snackBarOpen: false,
            snackMessage:"",
        }    
        this.handleCloseSnack=this.handleCloseSnack.bind(this)
        this.handleNav=this.handleNav.bind(this)
    }   
    handleCloseSnack(){
        this.setState({snackBarOpen:false})
    }
    handleNav(){
        console.log("-----> nav handle")
    }
    componentDidMount () {
        
    }
    render(){
        const { classes } =this.props;
        return(
            <div className={"dashboard"}>
                <Snackbar
                anchorOrigin={'top'}
                open={this.state.snackBarOpen}
                onClose={this.handleCloseSnack}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.snackMessage}</span>}
                />
                <AppBar position="sticky" color="default">
                        <Toolbar className={classes.toolBar}>
                        <IconButton className={classes.menu} onClick={e=>this.props.navStatus(!this.props.setting.navIsOpen)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" color="primary">
                        ေငြေျကးစီမံမႈ
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <NetworkStatus />
                        </div>    
                        </Toolbar>
                </AppBar>
                <ContentUX />
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

export default connect(mapStateToProps,{navStatus})(withStyles(styles)(DashBoard));