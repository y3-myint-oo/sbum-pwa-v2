import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import StoreInfoUX from './store_info';
import EmployeeInfoUX from './emp_info';
import StocKInfoUX from './stock_info';

const styles = theme => ({
    root:{
        padding:20,
    },
    storeBox:{
        marginTop: theme.spacing.unit*2,
        padding: theme.spacing.unit * 2,
        boxShadow: '0px 0px 2px 2px rgba(76,175,80, .7)',
    },
    cashBox:{
        marginTop: theme.spacing.unit*2,
        padding: theme.spacing.unit * 2,
        boxShadow: '0px 0px 2px 2px rgba(76,175,80, .7)',
    },
});

class DashContent extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }          
    }    
    render(){
        const { classes } =this.props;
        return(
            <div className={classes.root}>    
                <Grid container
                spacing={16}               
                >
                    <Grid item md={5} sm={12} xs={12}>
                            <Grid container spacing={8}>
                                <Grid item md={12} sm={12} xs={12}>
                                <Paper className={classes.storeBox}>
                                        <Typography variant="subtitle1" gutterBottom align="center" color="primary">
                                        ဂိုေထာင္ သိုေလွာင္မွဳအေျခအေန
                                        </Typography> 
                                        <StoreInfoUX />                                       
                                </Paper>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <Paper className={classes.storeBox}>
                                        <Typography variant="subtitle1" gutterBottom align="center" color="primary">
                                        ဝန္ထမ္းစာရင္း
                                        </Typography> 
                                        <EmployeeInfoUX />                                       
                                </Paper>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item md={7} sm={12} xs={12}>
                            <Grid container spacing={8}>
                            <Grid item md={12} sm={12} xs={12}>
                                <Paper className={classes.storeBox}>
                                    <Typography variant="subtitle1" gutterBottom align="center" color="primary">
                                    ကုန္ပစၥည္း ေစ်းႏႈန္း ( လ အလိုက္ စာရင္း )
                                    </Typography> 
                                    <StocKInfoUX />                             
                                </Paper>
                            </Grid>
                           
                            </Grid>
                    </Grid>
                    
                </Grid>                        
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
export default connect(mapStateToProps,null)(withStyles(styles)(DashContent));