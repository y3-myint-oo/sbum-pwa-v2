import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer} from 'recharts';

const styles = theme => ({
  
});
//Warehouse store status
const storeBoxData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
    { subject: 'Te', A: 99, B: 100, fullMark: 150 },
    { subject: 'wfew', A: 85, B: 90, fullMark: 150 },
    { subject: 'wfw', A: 65, B: 85, fullMark: 150 },
];
class StoreBox extends Component{
    constructor(props){
        super(props);
        this.state={

        }    
    } 
    componentDidMount(){
        //TODO Fetch Sotre info data
    }
    render () {
            return(
                    <RadarChart width={300} height={250} data={storeBoxData}
                    style={{margin:'0 auto'}}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis/>
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                        <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>   
                    </RadarChart>          
            )
    }
}
export default withStyles(styles)(StoreBox)