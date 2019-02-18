import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddEmpIcon from '@material-ui/icons/PersonAdd';
import PayRollIcon from '@material-ui/icons/AccountBalanceWallet';
import CheckInIcon from '@material-ui/icons/SwapHoriz';
import LeaveIcon from '@material-ui/icons/Drafts';
import PosIcon from '@material-ui/icons/AccountBox';
import PerIcon from '@material-ui/icons/TrendingUp';
import EmpsIcon from '@material-ui/icons/Group';
import Bloked from '../util/blocked';
import EmpListUX from './empolyeelist';
import EmpFormUX from './employeeform';

const styles = theme => ({
    test:{
        backgroundColor:'red',
    },
    root: {
        flexGrow: 1,        
    },
    stepBox:{
       paddingLeft: theme.spacing.unit*2,
       paddingRight: theme.spacing.unit*2,
    },
    grow: {
        flexGrow: 1,
    },
    Onroot:{
        marginLeft: theme.spacing.unit*30,
        backgroundColor:'#fee',
    },
    Offroot:{
       marginLeft: theme.spacing.unit*8,
    },
    toolBar:{
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
    icon:{
        marginLeft:'auto',
        marginRight: 'auto',
    },
    display:{
        padding: theme.spacing.unit*5,
    },
    card:{
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
        maxWidth: '200',
        height: '200',
    },
    box:{
        height:'50vh',
    },
    instruction:{
        paddingTop: theme.spacing.unit*10,
        paddingBottom: theme.spacing.unit*3,
    },
    employeeName:{
        marginLeft:'auto',
        marginRight:0,
    },
    StepperBox:{
        minWidth:'100vh',
   }, 
    cssFocused: {
        color:"green",
    },
    cssUnderline: {
     '&:after': {
       borderBottomColor: 'red',
     },
    },
    cssOutlinedInput: {
     '&$cssFocused $notchedOutline': {
       borderColor: 'green',
     },
    },
    notchedOutline: {},  

});

class Employees extends Component{
    render(){
        console.log( )
        const { classes , menuToggle } = this.props;
        return(
            <EmployeeContent classes={classes} />
        )
    }
}

class EmployeeContent extends Component{
    constructor(props){
        super(props);
        this.state={
           currentView:0,
        }        
        this.handleSwapView=this.handleSwapView.bind(this)
    } 
    handleSwapView(value){
        this.setState({currentView:value})
    }
    render(){
        const { classes } = this.props;
        const { currentView } = this.state;
        return(
            <div className={classes.root}>
                <Grid container className={classes.display}>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={8}
                        align="center"
                        justify="space-evenly"
                        alignItems="stretch"
                        >
                            <Grid item xs={4} sm={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(0)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <AddEmpIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            ၀န်ထမ်းအသစ်
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(1)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <PayRollIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            လစာ
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(2)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <CheckInIcon     color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            ရုံးတက်၊ရုံးဆင်း
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(3)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <LeaveIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            အလုပ်ခွင့်
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(4)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <PosIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            ရာထူးများ
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>   
                                </Card>    
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(5)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <PerIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            လုပ်ငန်းစွမ်းရည်
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>    
                            </Grid>
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(6)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <EmpsIcon color='primary' fontSize='large'/>
                                        </div>
                                        <Typography variant="body1" color="primary" gutterBottom>
                                            ၀န်ထမ်းများ
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>    
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>

                        {
                            currentView == 0 &&(
                                <EmpFormUX  classes={classes}/>
                            )
                        }
                        {
                            currentView == 1 &&(
                                <PayRollContent />
                            )
                        }
                        {
                            currentView == 2 &&(
                                <CheckInOutContent />
                            )
                        }
                        {
                            currentView == 3 &&(
                                <LeaveContent />
                            )
                        }
                        {
                            currentView == 4 &&(
                                <PositionContent />
                            )
                        }
                        {
                            currentView == 5 &&(
                                <PerforContent />
                            )
                        }
                        {
                            currentView == 6 &&(
                                <div style={{padding:20}}>
                                    <EmpListUX />
                                </div>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}






class PayRollContent extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedView:0,
        }              
    } 
    render(){
        const { selectedView } = this.state;
        return(
            <div style={{padding:20}}>
                <Bloked msg="၀န်ထမ်းများ၏ လုပ်ငန်းစွမ်းဆောင်ရေအပိုင်းအား တွက်ချက်ပေးသည့် system ဖြစ်ပါသည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။"/>
            </div>
        )
    }
}

class CheckInOutContent extends Component{
    render(){
        return(
            <div style={{padding:20}}>
                <Bloked msg="၀န်ထမ်းများ၏ လုပ်ငန်းစွမ်းဆောင်ရေအပိုင်းအား တွက်ချက်ပေးသည့် system ဖြစ်ပါသည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။"/>
            </div>
        )
    }
}

class LeaveContent extends Component{
    render(){
        return(
            <div style={{padding:20}}>
                <Bloked msg="၀န်ထမ်းများ၏ လုပ်ငန်းစွမ်းဆောင်ရေအပိုင်းအား တွက်ချက်ပေးသည့် system ဖြစ်ပါသည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။"/>
            </div>
        )
    }
}


class PositionContent extends Component{
    render(){
        return(
            <div style={{padding:20}}>
                <Bloked msg="၀န်ထမ်းများ၏ လုပ်ငန်းစွမ်းဆောင်ရေအပိုင်းအား တွက်ချက်ပေးသည့် system ဖြစ်ပါသည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။"/>
            </div>
        )
    }
}

class PerforContent extends Component{
    render(){
        return(
            <div style={{padding:20}}>
                <Bloked msg="၀န်ထမ်းများ၏ လုပ်ငန်းစွမ်းဆောင်ရေအပိုင်းအား တွက်ချက်ပေးသည့် system ဖြစ်ပါသည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။"/>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        menuToggle : state.MenuToggle
    };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Employees))