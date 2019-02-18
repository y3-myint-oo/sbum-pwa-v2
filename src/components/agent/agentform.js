import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PersonAdd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,BarChart, Bar } from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import PhoneIcon from '@material-ui/icons/PhoneForwarded';
import Timeline from 'react-time-line';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

import {addAgent} from '../../actions/agent_action'

const styles = theme => ({
   
    Onroot:{
        marginLeft: theme.spacing.unit*30,
        backgroundColor:'#fee',
    },
    Offroot:{
       marginLeft: theme.spacing.unit*8,
    },
   root: {
       flexGrow: 1,
       
   },
   flex:{
       flex: 1,
   },
   toolBar:{
       boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
   },
   grow: {
       flexGrow: 1,
   },
   search: {
       position: 'relative',
       borderRadius: theme.shape.borderRadius,
       backgroundColor: fade("#357a38", 0.15),
       '&:hover': {
         backgroundColor: fade("#357a38", 0.25),
       },
       marginLeft: 0,
       width: '100%',
       [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing.unit,
         width: 'auto',
       },
     },
     searchIcon: {
       width: theme.spacing.unit * 9,
       height: '100%',
       position: 'absolute',
       pointerEvents: 'none',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
     },
     inputRoot: {
       color: 'inherit',
       width: '100%',
     },
     inputInput: {
       paddingTop: theme.spacing.unit,
       paddingRight: theme.spacing.unit,
       paddingBottom: theme.spacing.unit,
       paddingLeft: theme.spacing.unit * 10,
       transition: theme.transitions.create('width'),
       width: '100%',
       [theme.breakpoints.up('sm')]: {
         width: 120,
         '&:focus': {
           width: 200,
         },
       },
     },
     content:{
       margin: theme.spacing.unit * 2,
     },
   paper:{
       padding: theme.spacing.unit * 2,
       boxShadow: '0px 0px 2px 2px rgba(76,175,80, .7)',
   },
   gridList: {
       display:'block',
       width: '106%',
       height: theme.spacing.unit*62,     
       paddingTop:theme.spacing.unit*3,
       
       [theme.breakpoints.down('sm')]: {
           width: '103%',
       },
   },
   activityGridList:{
       display:'block',
       width: '100%',
       height: theme.spacing.unit*58,     
       paddingTop:theme.spacing.unit*3,
   },
   menuButton:{
       width:'60%',
       marginLeft:'auto',
       marginRight: 'auto',
       zIndex:2,
   },
   addButton:{
       boxShadow: '0px 0px 2px 2px rgba(76,175,80, .7)',
       color:"#357a38",
   },
   card:{
       width:'100%',
       height:100,
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
   settingIcon:{
       height: 20,
       width: 20,
   },
   view:{
       width:'100%',
       height:'auto',
   },
   viewTab:{
      // marginTop:theme.spacing.unit*,
       backgroundColor:'#357a38',
       fontWeight:'bold',
   },
   display:{
       minHeight: theme.spacing.unit*20,
   },
   spacing:{
       //paddingLeft:theme.spacing.unit*3,
   },
   bpacing:{
       paddingLeft:theme.spacing.unit*2,
   },
   viewSettingButton:{
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'center',
       marginRight:'2%',
       marginLeft:'auto',
      // backgroundColor: 'red',
   },
   dialog: {
       position: 'absolute',
       width: theme.spacing.unit * 70,
       height:'auto',
       backgroundColor: theme.palette.background.paper,
       boxShadow: theme.shadows[5],
       padding: theme.spacing.unit * 4,
   },
   phone:{
       position: 'absolute',
       width: theme.spacing.unit * 40,
       backgroundColor: theme.palette.background.paper,
       boxShadow: theme.shadows[5],
       padding: theme.spacing.unit * 4,
       alignContent: 'center',
   },
   sweetLoading:{
       position: 'absolute', left: '50%', top: '50%',
       transform: 'translate(-50%, -50%)'
   },
   btm:{
       paddingTop:theme.spacing.unit*3,
   },
   textF:{
       paddingTop:theme.spacing.unit*2,
   }
});

class NewItemDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            units:this.props.units,
            wname:"",
            name:"",
            phone:"",
            division:"",
            address:"",
            note:"",
            snackOpen:false,
            snackMessage:"",
            snackCode:0,

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.handleSnack=this.handleSnack.bind(this)
        this.refresh=this.refresh.bind(this)
        this.handleConfirm=this.handleConfirm.bind(this)
    } 
    refresh() {
        window.location.reload();
    }
    handleSnack(){
        this.setState({snackOpen:!this.state.snackOpen})
    }
    handleClose(){
        this.props.close()
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        
    }
    handleConfirm(){
        //Fetch API
        const params = {
            wname:this.state.wname,
            name:this.state.name,
            address:this.state.address,
            phone:this.state.phone,
            division:this.state.division,
            note:this.state.note,
        };
        this.props.addAgent(params)
        this.props.close()
        this.setState({snackMessage:"success update"})
        this.setState({snackOpen:!this.state.snackOpen})
        /*axios.post('http://localhost:8081/api/v1/add/supply',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            this.setState({snackMessage:res.data.message})
            this.setState({snackOpen:!this.state.snackOpen})
        }) */
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
                <AppBar position='fixed'>
                        <Toolbar>                       
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                             ပွဲရုံ အသစ်ထည့်မည်
                        </Typography>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        </Toolbar>
                </AppBar>
                <div style={{paddingTop:50}} >
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6}>
                                <Typography variant="caption"  align="left">
                                ပွဲရုံ အမည်
                                </Typography> 
                                <TextField
                                name="wname"
                                required
                                value={this.state.wname}
                                margin="normal"
                                onChange={this.handleChange}
                                />                               
                    </Grid>
                    <Grid item xs={12} md={6}>
                                <Typography variant="caption"  align="left">
                                    အမည်
                                </Typography> 
                                <TextField
                                name="name"
                                required
                                value={this.state.name}
                                margin="normal"
                                onChange={this.handleChange}
                                />                               
                    </Grid>
                    <Grid item xs={6} >
                                <Typography variant="caption"  align="left">
                                    ဖုန်းနံပါတ်
                                </Typography>
                                <TextField
                                name="phone"
                                value={this.state.phone}
                                margin="normal"
                                onChange={this.handleChange}
                                />
                    </Grid>
                    <Grid item xs={6} >
                                <Typography variant="caption"  align="left">
                                တိုင်းဒေသကြီး
                                </Typography>
                                <TextField
                                fullWidth
                                name="division"
                                select
                                value={this.state.division}
                                onChange={this.handleChange}
                                margin="normal"
                                >
                                {divisions.map(i => (
                                    <MenuItem key={i.name} value={i.name}>
                                    {i.name}
                                    </MenuItem>
                                ))}
                                </TextField>
                    </Grid>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    နေရပ်လိပ်စာ
                                </Typography>                                
                                <Input
                                    className={classes.textF}
                                    name="address"
                                    value={this.state.address}
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={this.handleChange}
                                /> 
                    </Grid>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    မှတ်ချက်
                                </Typography> 
                                <Input
                                    name="note"
                                    className={classes.textF}
                                    value={this.state.note}
                                    margin="normal"
                                    fullWidth
                                    onChange={this.handleChange}
                                /> 
                    </Grid>
                    <Grid item xs={12} >
                        <div className={classes.btm}>                          
                            <Button  variant="outlined" color="secondary" onClick={this.handleClose}>
                                ပယ်ဖျက်မည်
                            </Button>
                            <spam className={classes.bpacing}/>
                            <Button  variant="outlined" color="primary" onClick={this.handleConfirm}>
                                သိမ်းမည်
                            </Button> 
                        </div>
                    </Grid>                    
                </Grid>
                <Snackbar                    
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.snackOpen}
                    onClose={this.handleSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        <span id="message-id"                        
                        >{this.state.snackMessage}</span>
                    }
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.refresh}>
                        CLOSE
                        </Button>              
                      ]}
                />
                </div>
            </div>
        )
    }
}
const divisions=[
    {name:"မန္တလေးတိုင်းဒေသကြီး"},
    {name:"ရန်ကုန်တိုင်းဒေသကြီး"},
    {name:"မကွေးတိုင်းဒေသကြီး"},
    {name:"နေပြည်တော်တိုင်းဒေသကြီး"},
    {name:"ပဲခူးတိုင်းဒေသကြီး"},
    {name:"ရှမ်းပြည်နယ်"},
    {name:"စကိုင်းတိုင်းဒေသကြီး"},
    {name:"ဧရာ၀တီတိုင်းဒေသကြီး"},
    {name:"မွန်ပြည်နယ်"},
    {name:"ကချင်ပြည်နယ်"},
    {name:"တနလ်ာရီတိုင်းဒေသကြီး"},
    {name:"ချင်းပြည်နယ်"},
    {name:"ရခိုင်ပြည်နယ်"},
    {name:"ကရင်ပြည်နယ်"},
]

function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        //agent
    };
} 


export default connect(mapStateToProps, {addAgent})(withStyles(styles)(NewItemDialog))