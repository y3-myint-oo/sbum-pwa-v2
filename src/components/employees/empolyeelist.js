import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import Paper from '@material-ui/core/Paper';
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

import {deleteEmployee} from '../../actions/employee_action';

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

class EmpsContent extends Component{
    render(){       
        const { classes } =this.props;
        console.log(" -- empl number -- ", this.props.employee)
        return(
            <div>
               <Paper className={classes.paper}>
                        <GridList cellHeight={'80vh'} spacing={16} cols={1} className={classes.gridList}>
                            {
                                this.props.employee !=null && (
                                    <div>
                                        {this.props.employee.map(data => (                                                                                                       
                                            <EmployeeItemUI item={data} classes={classes} action={this.props}/>
                                        ))}
                                    </div>
                                )
                            }                                    
                        </GridList>    
                </Paper> 
            </div>
        )
    }   
}
class EmployeeItemUI extends Component{
    constructor(props){
        super(props);
        this.state={
            dialogPhoneBook:false,
            item:this.props.item
        }
        this.handlePhoneBook=this.handlePhoneBook.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    } 
    handlePhoneBook(){
        this.setState({dialogPhoneBook:!this.state.dialogPhoneBook})
    }
    handleDelete(data){
        this.props.action.deleteEmployee(data)
    }
    render(){
        const { classes,item } = this.props;
        return(          
                 <Card className={classes.card}>
                 <CardActionArea>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5" color="primary" align="left">
                                {item.name}
                            </Typography>
                        </CardContent>
                        <div className={classes.settingButton}>
                            <IconButton variant="fab" aria-label="Delete" onClick={e=>this.handleDelete(item)}>
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
                                            {item.name} ကို ဆက်သွယ်ရန်
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
                                    <Typography variant="subheading" gutterBottom align="center">
                                            {item.addr}
                                    </Typography>
                                    <Typography variant="subheading" gutterBottom align="center">
                                            {item.township}
                                    </Typography>
                                    <Typography component="h6" variant="headline" gutterBottom align="center">
                                            {item.division}
                                    </Typography>
                                </div>
                            </div>
                        </Modal>   
                </Card>  
  
        )
    }
}

function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        employee:state.employee
    };
} 

export default connect(mapStateToProps,{deleteEmployee})(withStyles(styles)(EmpsContent));