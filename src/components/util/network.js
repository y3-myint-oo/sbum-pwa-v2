import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';


import IconButton from '@material-ui/core/IconButton';
import OnlineIcon from '@material-ui/icons/Link';
import OfflineIcon from '@material-ui/icons/LinkOff'

const styles = theme => ({

});

class Network extends Component{
    constructor(props){
        super(props);
        this.state={

        }        
    } 
    render(){
        const { classes } = this.props;
        if (this.props.setting.isOnline){
            return(
                <div>
                    <IconButton>
                        <OnlineIcon fontSize="large" />
                    </IconButton>
                </div>
            )
        }else{
            return(
                <div>
                   <IconButton>
                        <OfflineIcon fontSize="large" />
                    </IconButton>
                </div>
            )
        }
       
    }
}

function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        features:state.features,
    };
} 

export default connect(mapStateToProps, null)(withStyles(styles)(Network))