import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData,removeData } from '../../actions/data_action';

import axios from 'axios'

class DataList extends Component {

    constructor(props){
        super(props);
        this.state={
        
        };
        this.pushData=this.pushData.bind(this);
    }
    componentDidMount () {
        this.pushData()
        //NetworkStatus Checker
        //setInterval(this.checkNetwork, 1000);
    }
    pushData(){
        console.log("push data")
        const params = {
            id:new Date(),
            title:"test",
        };
        axios.post('https://my-json-server.typicode.com/typicode/demo/posts',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
           console.log(" reponse data "+ res.status)
        })
    }
    render() {
        console.log('[Data] this.props', this.props);
        if (this.props.setting.isOnline){
                
        }
        return(
            <div>
                <h4>Datas</h4>   
                <ul className="list-group">
                {
                    this.props.datas.map(data => {
                    return (
                        <div>
                        <li key={data.id} className="list-group-item">
                            <div className="list-item">{data.name}</div>
                        </li>
                            <button onClick={() => this.props.removeData(data)}>
                                x
                            </button>    
                        </div>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        datas: state.datas,
        setting:state.setting,
    };
  }
  
export default connect(mapStateToProps, { addData,removeData })(DataList);
  