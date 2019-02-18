import React, { Component } from 'react';
import { connect } from 'react-redux';


import WarehouseUx from '../warehouse/index';
import DashBoardUx from '../dashboard/index';
import AgentUx from '../agent/index';
import TransportUx from '../transport/index';
import SupplyerUx from '../supplyer/index';
import FinacialUx from '../finacial/index';
import EmployeeUx from '../employees/index';
import UnitUx from '../unit/index';
import SettingUx from '../setting/index';


class Content extends Component{
    constructor(props){
        super(props);
        this.state={
       
        }        
    }
    componentDidMount () {
   
    }
    render() {
        console.log('[Content] this.props', this.props.setting.requestedPage);
        if (this.props.setting.requestedPage === "DashBoard"){
            return (
            <DashBoardUx />
            ); 
        }else if (this.props.setting.requestedPage === "Warehouse"){
            return (
            <WarehouseUx />
            ); 
        }else if (this.props.setting.requestedPage === "Supplyer"){
            return (
               <SupplyerUx />
            ); 
        }else if (this.props.setting.requestedPage === "Agent"){
            return (
                <AgentUx />
            ); 
        }else if (this.props.setting.requestedPage === "Transport"){
            return (
               <TransportUx />
            ); 
        }else if (this.props.setting.requestedPage === "Finacial"){
            return (
                <FinacialUx />
            ); 
        }else if (this.props.setting.requestedPage === "Employee"){
            return (
                <EmployeeUx />
            ); 
        }else if (this.props.setting.requestedPage === "Unit"){
            return (
                <UnitUx />
            ); 
        }else if (this.props.setting.requestedPage === "Setting"){
            return (
                <SettingUx />
            ); 
        }
        
        
        
        else {
            return (
                <div>
                  <h2>Ther is no page u requested</h2>
                </div>
            ); 
        }
    }

}

function mapStateToProps(state) {
    return {
        setting:state.setting
    };
}

export default connect(mapStateToProps,null)(Content);

