import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Bloked from '../util/blocked';

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
                                <AddEmpContent  classes={classes}/>
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
                                <EmpsContent />
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

class AddEmpContent extends Component{
    constructor(props){
        super(props);
        this.state={
            activeStep: 0,
            skipped: new Set(),
        }              
    } 
    isStepOptional = step => {
        return step === 1;
    }; 
    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
          skipped = new Set(skipped.values());
          skipped.delete(activeStep);
        }
        this.setState({
          activeStep: activeStep + 1,
          skipped,
        });
    };
    handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
    }
    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
          throw new Error("You can't skip a step that isn't optional.");
        }
    
        this.setState(state => {
          const skipped = new Set(state.skipped.values());
          skipped.add(activeStep);
          return {
            activeStep: state.activeStep + 1,
            skipped,
          };
        });
    };
    handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
    
    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }    
    
    render(){
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return(
            <div>
                   <div className={classes.stepBox}>
                        <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        >                            
                            <Grid item xs={12} md={12}>
                                <Stepper alternativeLabel nonLinear activeStep={activeStep} className={classes.StepperBox}>
                                {steps.map((label, index) => {
                                            const props = {};
                                            const labelProps = {};
                                            if (this.isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption"></Typography>;
                                            }
                                            if (this.isStepSkipped(index)) {
                                            props.completed = false;
                                            }
                                            return (
                                            <Step key={label} {...props}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                            );
                                        })}
                                </Stepper>
                 
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instruction} align="center">
                                        ၀န်ထမ်း အသစ်အား အောင်မြင်စွာ စားရင်းသွင်းပြီးပါပြီ။
                                    </Typography>                                
                                </div>
                            ) : (
                                <div className={classes.box}>
                                    <StepContent activeStep={activeStep} classes={classes} />
                                </div>
                                 )}                        
                                </Grid>
                               
                                {activeStep === steps.length ? (
                                    <Grid item md={12}>
                                        <Grid container justify="center" align="center" alignItems="stretch">
                                        <Grid item xs={12}>
                                            <Button onClick={this.handleReset} variant="outlined" color="secondary">
                                                ထပ်မှန်၍ အသစ်ပြုလုပ်မည်
                                            </Button>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                ):(
                                    <Grid item xs={12} md={12}>
                                    <Grid container  
                                    alignItems="center"
                                    className={classes.StepperBox}>
                                    <Grid item xs={4} sm={4} md={4}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            variant="outlined" color="primary"
                                            >
                                           အနောက်သို့
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} align="center">
                                        {this.isStepOptional(activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSkip}
                                                variant="outlined" color="primary"
                                            >
                                                အဆင့်ကျော်မည်
                                        </Button>
                                        )}
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            variant="outlined" color="primary"
                                            >
                                            {activeStep === steps.length - 1 ? 'သေချာပါသည်' : 'အရှေ့သို့'}
                                        </Button>                                            
                                    </Grid>
                                    </Grid>
                                    </Grid>
                                )}
                                
                        </Grid>
                    </div>
            </div>
        )
    }
    
}
const positions=[
    {value:"general",label:"အထွေထွေ၀န်ထမ်း"},
    {value:"account",label:"စာရင်းကိုင်"},
    {value:"manager",label:"မန်နေဂျာ"},
]

function getSteps() {
        return ['ကိုယ်ရေးအချက်အလက်ဖြည့်မည်', 'မှတ်ပုံတင်မည်', 'ပြုလုပ်ရန်သေချာပါသည်'];
}

class StepContent extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            nrc:"",
            phone:"",
            position:"",
            address:"",
        }       
        this.handleChange=this.handleChange.bind(this)      
    } 
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    render(){
        const {classes} = this.props;
        switch (this.props.activeStep) {
        case 0:
            return <div style={{padding:20}}>
                <Grid container spacing={8}>
                    <Grid item xs={12} ms={6} md={6}>
                    <TextField 
                        id="employee-name"
                        InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                        }}
                        label="အမည်"
                        value={this.state.ename}
                        fullWidth
                        onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} ms={6} md={6}>
                    <TextField                    
                        id="employee-nrc"
                        label="မှတ်ပုံတင်နံပါတ်"
                        value={this.state.nrc}
                        fullWidth
                        onChange={this.handleChange('nrc')}
                        margin="normal"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} ms={6} md={6}>
                    <TextField                    
                        id="employee-phone"
                        label="ဆက်သွယ်ရန်ဖုန်းနံပါတ်"
                        value={this.state.phone}
                        fullWidth
                        onChange={this.handleChange('phone')}
                        margin="normal"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} ms={6} md={6}>
                    <TextField                    
                        id="employee-position"
                        label="လုပ်ငန်းတာ၀န်"
                        select
                        value={this.state.position}
                        fullWidth
                        onChange={this.handleChange('position')}
                        margin="normal"
                        variant="outlined"
                    >
                    {positions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                    ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} ms={12} md={12}>
                    <TextField                    
                        id="employee-address"
                        label="နေရပ်လိပ်စာ"
                        value={this.state.address}
                        fullWidth
                        onChange={this.handleChange('address')}
                        margin="normal"
                        variant="outlined"
                        />
                    </Grid>
                </Grid>
            </div>              
        case 1:
            return  <Bloked msg="၀န်ထမ်း၏ နိုင်ငံသားကပ်ပြားအား မှတ်ပုံတင်မည်" dec="အထက်ပါအကြောင်းအရာအား အသုံးပြုလိုပါသည်။" />
        case 2:
            return <div style={{padding:20}}>
            <Grid container spacing={8}>
                <Grid item xs={12} ms={6} md={6}>
                    <Typography variant="caption" gutterBottom align="left">
                         အမည်
                    </Typography>
                    <Typography variant="h6" >
                        {this.state.name}
                    </Typography>
                </Grid>    
                <Grid item xs={12} ms={6} md={6}>
                    <Typography variant="caption" gutterBottom align="left">
                        မှတ်ပုံတင်နံပါတ်
                    </Typography>
                    <Typography variant="h6" >
                        {this.state.nrc}
                    </Typography>
                </Grid>
                <Grid item xs={12} ms={6} md={6}>
                    <Typography variant="caption" gutterBottom align="left">
                    ဆက်သွယ်ရန်ဖုန်းနံပါတ်
                    </Typography>
                    <Typography variant="h6" >
                        {this.state.phone}
                    </Typography>
                </Grid>
                <Grid item xs={12} ms={6} md={6}>
                    <Typography variant="caption" gutterBottom align="left">
                    လုပ်ငန်းတာ၀န်
                    </Typography>
                    <Typography variant="h6" >
                        {this.state.position}
                    </Typography>   
                </Grid>
                <Grid item xs={12} ms={12} md={12}>
                    <Typography variant="caption" gutterBottom align="left">
                     နေရပ်လိပ်စာ
                    </Typography>
                    <Typography variant="h6" >
                        {this.state.address}
                    </Typography>  
                </Grid>
            </Grid>
        </div>            
        default:
            return 'Unknown step';
 
        }
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
            <div>
               
            </div>
        )
    }
}

class CheckInOutContent extends Component{
    render(){
        return(
            <div>
                Manage Check in check out
            </div>
        )
    }
}

class LeaveContent extends Component{
    render(){
        return(
            <div>
                Manage Leaves
            </div>
        )
    }
}


class PositionContent extends Component{
    render(){
        return(
            <div>
                Manage Positions
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

class EmpsContent extends Component{
    render(){
       
        return(
            <div>
                Manage Pay roll 
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