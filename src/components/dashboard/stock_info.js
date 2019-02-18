import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const styles = theme => ({
   
});

const data = [
    {name: 'item 1', uv: 4000, pv: 2400, amt: 2400},
    {name: 'item 2', uv: 3000, pv: 1398, amt: 2210},
    {name: 'item 3', uv: 2000, pv: 9800, amt: 2290},
    {name: 'item 4', uv: 2780, pv: 3908, amt: 2000},
    {name: 'item 5', uv: 1890, pv: 4800, amt: 2181},
    {name: 'item 4', uv: 2390, pv: 3800, amt: 2500},
    {name: 'item 5', uv: 3490, pv: 4300, amt: 2100},
    {name: 'item 6', uv: 4000, pv: 2400, amt: 2400},
    {name: 'item 7', uv: 3000, pv: 1398, amt: 2210},
    {name: 'item 8', uv: 2000, pv: 9800, amt: 2290},
    {name: 'item 9', uv: 2780, pv: 3908, amt: 2000},
    {name: 'item 10', uv: 1890, pv: 4800, amt: 2181},
    {name: 'item 11', uv: 2390, pv: 3800, amt: 2500},
    {name: 'item 12', uv: 3490, pv: 4300, amt: 2100},
];

class StockBox extends Component{
    constructor(props){
        super(props);
        this.state={
        }    
    } 
    componentDidMount(){
        //TODO Fectch avalialbel employee list
    }
    render () {
            const { classes } =this.props;        
            return(
                <div>
                    <LineChart width={700} height={300} data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
            )
    }
}
export default withStyles(styles)(StockBox)