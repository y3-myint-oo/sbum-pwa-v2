import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/PhoneForwarded';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import {addTransportCar,deleteTransportCar,updateTransportCar,readTransportCars} from '../../actions/transport_action';


function getModalStyle() {
    const top = 50 ;
    const left = 50;  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

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
       width: theme.spacing.unit * 40,
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


class TansportList extends Component {

    constructor(props){
        super(props);
        this.state={
            dialogPhoneBook:false,
            value: '',
            copied: false,
            item:this.props.item
        };
        this.handlePhoneBook=this.handlePhoneBook.bind(this)
        this.handleDeleteSupply=this.handleDeleteSupply.bind(this)
        this.handleSnackOpen=this.handleSnackOpen.bind(this)
    }
    handleSnackOpen(vale,msg){
        this.props.handleParentSnack(vale,msg);
    }
    handlePhoneBook(){
        this.setState({dialogPhoneBook:!this.state.dialogPhoneBook})
    }
    handleDeleteSupply(data){
        this.props.deleteTransportCar(data)
    }
    render() {
        const { classes } = this.props;
        return(          
            <div>
            {
                this.props.transport.map(item => {
                    return(
                        <Card className={classes.card}>
                        <CardActionArea>
                           <div className={classes.details}>
                               <CardContent className={classes.content}>
                                   <Typography component="h5" variant="h5" color="primary" align="left">
                                       {item.carNo}
                                   </Typography>
                               </CardContent>
                               <div className={classes.settingButton}>
                                   <IconButton variant="fab" aria-label="Delete" onClick={e=>this.handleDeleteSupply(item)}>
                                       <DeleteIcon className={classes.settingIcon}/>
                                   </IconButton>
                                   <IconButton variant="fab" aria-label="Phone" onClick={this.handlePhoneBook}>
                                       <PhoneIcon className={classes.settingIcon}/>
                                   </IconButton>
                               </div>    
                           </div>
                           </CardActionArea>
                               <Modal
                                   aria-labelledby="phone-book"
                                   aria-describedby="framer phone book"
                                   open={this.state.dialogPhoneBook}
                                   onClose={this.handlePhoneBook}
                                   >
                                   <div style={getModalStyle()} className={classes.phone}>
                                       <AppBar position='fixed'>
                                               <Toolbar>                       
                                               <Typography variant="h6" color="inherit" className={classes.flex}>
                                                   {item.carNo} ကို ဆက်သွယ်ရန်
                                               </Typography>
                                               <IconButton color="inherit" onClick={this.handlePhoneBook} aria-label="Close">
                                                   <CloseIcon />
                                               </IconButton>
                                               </Toolbar>
                                       </AppBar>
                                       <div style={{paddingTop:50}}>                                   
                                           <Typography component="h2" variant="headline" gutterBottom align="center">
                                                   {item.phone}                                           
                                           </Typography>                    
                                       </div>
                                   </div>
                               </Modal>   
                       </Card> 
                    )
                    })
            }
            </div>
        )      
    }
}

function mapStateToProps(state) {
    console.log(" ------- TransportCache (transportList) ---- ",state.transport)
    return {
        datas: state.datas,
        setting:state.setting,
        transport:state.transport
    };
  }
  
export default connect(mapStateToProps, {addTransportCar,deleteTransportCar,updateTransportCar,readTransportCars})(withStyles(styles)(TansportList));
  