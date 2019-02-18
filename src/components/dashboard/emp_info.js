import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {ScrollBox } from 'react-scroll-box';
import GridList from '@material-ui/core/GridList';

const styles = theme => ({
    avatar: {
        margin: 10,
        width: 30,
        height: 30,
    },
    gridList: {
        flexWrap: 'nowrap',
        width: '100%',
        height: 70,
    },
});

// list of employee
const employees = [
    { name: 'item1', icon:"/images/employee_icons/1.svg" },
    { name: 'item2',icon:"/images/employee_icons/2.svg" },
    { name: 'item3',icon:"/images/employee_icons/3.svg" },
    { name: 'item4',icon:"/images/employee_icons/4.svg" },
    { name: 'item5',icon:"/images/employee_icons/1.svg" },
    { name: 'item6',icon:"/images/employee_icons/1.svg" },
    { name: 'item7',icon:"/images/employee_icons/2.svg" },
    { name: 'item8',icon:"/images/employee_icons/2.svg" },
    { name: 'item9',icon:"/images/employee_icons/4.svg" },
    { name: 'item1',icon:"/images/employee_icons/1.svg" },
    { name: 'item2',icon:"/images/employee_icons/4.svg" },
    { name: 'item3',icon:"/images/employee_icons/2.svg" },
    { name: 'item4',icon:"/images/employee_icons/1.svg" },
    { name: 'item5',icon:"/images/employee_icons/1.svg" },
    { name: 'item6',icon:"/images/employee_icons/4.svg" },
    { name: 'item7',icon:"/images/employee_icons/4.svg" },
    { name: 'item8',icon:"/images/employee_icons/2.svg" },
    { name: 'item9',icon:"/images/employee_icons/1.svg" }
];




class EmployeeBox extends Component{
    constructor(props){
        super(props);
        this.state={
            semp:null,
        }    
        this.onSelect=this.onSelect.bind(this)
    } 
    componentDidMount(){
        //TODO Fectch avalialbel employee list
    }
    onSelect = key => {
        this.setState({ semp: key });
    }
    render () {
            const { classes } =this.props;        
            return(
                
                <GridList cellHeight={20} className={classes.gridList} cols={2.5}
                spacing={16}
                style={"overflow-x: hidden;"}
                >
                   { 
                       employees.map((item,i) => <div key={item}                       
                       >
                       <Avatar src={item.icon}></Avatar>                       
                       </div>)                   
                   }
               </GridList>  

            )
    }
}
export default withStyles(styles)(EmployeeBox)