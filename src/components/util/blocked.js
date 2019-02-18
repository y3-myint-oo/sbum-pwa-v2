import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';


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

class Blocked extends Component{
    constructor(props){
        super(props);
        this.state={
            msg:this.props.msg,
            dec:this.props.dec,
        }        
    } 
    render(){
        const { classes , menuToggle } = this.props;
        if ( menuToggle){
            return(
                <div className={classes.Offroot}>
                        <div className={classes.blocked}>
                        <Typography variant="h5" align="center" color="primary">
                                {this.state.msg}
                        </Typography>
                            <spam className={classes.spacing} />
                        <Typography variant="caption" align="center" color="secondary">
                                {this.state.dec}
                        </Typography>
                        </div>
                </div>
            )
        }else{
            return(
                <div className={classes.Onroot}>
                        <div className={classes.blocked}>
                        <Typography variant="h5" align="center" color="primary">
                                {this.state.msg}
                        </Typography>
                            <spam className={classes.spacing} />
                        <Typography variant="caption" align="center" color="secondary">
                                {this.state.dec}
                        </Typography>
                        </div>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        menuToggle : state.MenuToggle
    };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Blocked))