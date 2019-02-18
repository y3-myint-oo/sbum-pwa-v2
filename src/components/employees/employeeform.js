import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import PhoneIcon from '@material-ui/icons/PhoneForwarded';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import {deleteEmployee} from '../../actions/employee_action';
import Bloked from '../util/blocked';
import { addEmployee } from '../../actions/employee_action';


const positions=[
    {value:"general",label:"အထွေထွေ၀န်ထမ်း"},
    {value:"account",label:"စာရင်းကိုင်"},
    {value:"manager",label:"မန်နေဂျာ"},
]


const styles = theme => ({
    paper:{
        padding: theme.spacing.unit * 2,
       // boxShadow: '0px 0px 2px 2px rgba(76,175,80, .7)',
       boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
    phone:{
        position: 'absolute',
        width: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        alignContent: 'center',
    },
    card:{
        width:'100%',
        height:80,
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:10,
        zIndex: -1,       
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        zIndex: -1,   
    },
    settingButton:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:'2%',
        marginLeft:'auto',
    },
})



class AddEmpContent extends Component{
    constructor(props){
        super(props);
        this.state={
            activeStep: 0,
            skipped: new Set(),

            name:"",
            nrc:"",
            phone:"",
            position:"",
            address:"",
        }              
        this.handleChange=this.handleChange.bind(this)
    } 
    handleChange (name,value){
        this.setState({
          [name]: value,
        });
    };
    isStepOptional = step => {
        return step === 1;
    }; 
    handleNext = () => {
        if(this.state.activeStep === 2){
           const data ={
                name:this.state.name,
                nrc:this.state.nrc,
                phone:this.state.phone,
                position:this.state.position,
                address:this.state.address,
           }
           this.props.addEmployee(data)
        }

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
                                    <StepContent activeStep={activeStep} classes={classes} handleChange={this.handleChange}/>
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
        this.handleChangeInsdie=this.handleChangeInsdie.bind(this)      
    } 
    handleChangeInsdie = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        this.props.handleChange(name,event.target.value)
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
                        onChange={this.handleChangeInsdie('name')}
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
                        onChange={this.handleChangeInsdie('nrc')}
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
                        onChange={this.handleChangeInsdie('phone')}
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
                        onChange={this.handleChangeInsdie('position')}
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
                        onChange={this.handleChangeInsdie('address')}
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

function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        employee:state.employee
    };
} 

export default connect(mapStateToProps,{addEmployee})(withStyles(styles)(AddEmpContent));