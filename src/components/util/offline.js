import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import OfflineIcon from '@material-ui/icons/LinkOff'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    blocked:{
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundImage: 'linear-gradient(#6fbf73, white)',
        padding:theme.spacing.unit*10,
    },
    spacing:{
        padding:theme.spacing.unit*3,
    }, 
});

class Offline extends Component{
    render(){
        const { classes } = this.props;
            return(
                <div className={classes.Offroot}>
                        <div className={classes.blocked}>
                        <Typography variant="h5" align="center" color="primary">
                                This Feature need online
                        </Typography>
                            <spam className={classes.spacing} />
                        <Typography variant="caption" align="center" color="secondary">
                               Some of features need online because of its internal system, please go online and retry this feature
                        </Typography>
                        </div>
                </div>
        )      
    }
}

export default withStyles(styles)(Offline)