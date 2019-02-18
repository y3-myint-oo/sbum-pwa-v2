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
import IconButton from '@material-ui/core/IconButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,BarChart, Bar } from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Timeline from 'react-time-line';
import axios from 'axios';

import { addTransportCar,deleteTransportCar,updateTransportCar,readTransportCars } from '../../actions/transport_action'
import TransportListUX from './transportList'


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



const mapStateToProps = (state) => {
    return {
        setting:state.setting,
        auth0: state.auth0,
        features:state.features,
    };
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

class TransportContent extends Component{
    constructor(props){
        super(props);
        this.state={
            cars:[],
            units:this.props.units,
            selectedItem:null,  
            selectedView:0, 
            dialogOpen:false,
            snackOpen:false,
        }        
        this.handleSelectedItem=this.handleSelectedItem.bind(this)
        this.handleDialog=this.handleDialog.bind(this)
        this.handleSnack=this.handleSnack.bind(this)
        this.refresh=this.refresh.bind(this)
        this.handleChildSnack=this.handleChildSnack.bind(this)
    } 
    handleSelectedItem(data){
        console.log(data)
        this.setState({selectedItem:data})
    }
    handleDialog(){
        this.setState({dialogOpen:!this.state.dialogOpen})
    }
    handleSnack(){
        this.setState({snackOpen:!this.state.snackOpen})
    }
    refresh(){
        window.location.reload()
    }
    handleChildSnack(c,msg){
        this.setState({snackOpen:c,snackMessage:msg})
    }
    render(){
        const { classes } = this.props;
        const { isLoading,units, error } = this.state;   
        return(
            <div className={classes.root}>
            <div className={classes.content}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={4}>
                            <div>
                                <Grid container>
                                    <Grid item  sm={12}>
                                            
                                    </Grid>
                                </Grid>  
                            </div>    
                            
                            <div className={classes.menuButton}>
                            <Button variant="extendedFab" aria-label="addNewItem" fullWidth className={classes.addButton}
                            onClick={this.handleDialog}
                            >             
                                <AddIcon />
                                Add New Transport
                            </Button>   
                            </div>
                            <Paper className={classes.paper} style={{marginTop:-20}}>
                                <GridList cellHeight={200} spacing={25} cols={1} className={classes.gridList}>
                                   <TransportListUX />                                    
                                </GridList>    
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            {
                                this.state.selectedItem !=null &&(
                                    <SupplyItemView data={this.state.selectedItem} classes={classes}/>
                                )
                            }   
                          
                        </Grid>
                    </Grid>  
    
                    <Modal
                        open={this.state.dialogOpen}
                        onClose={this.handleDialog}
                        >
                        <div style={getModalStyle()} className={classes.dialog}>
                            <NewItemDialog  classes={classes} close={this.handleDialog} snackMsg={this.handleSnack} action={this.props}/> 
                        </div>
                    </Modal>   
                    <Snackbar                    
                        anchorOrigin={{
                            vertical: 'bottom',
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
                            REFRESH
                            </Button>              
                        ]}
                    />       
                </div>       
        
        </div>   
        )
    }

}

function getModalStyle() {
    const top = 50 ;
    const left = 50;  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class NewItemDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            carNo:"",
            ownerName:"",
            driverName:"",
            phone:"",
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
        const carNo=this.state.carNo;
        const ownerName=this.state.ownerName;
        const driverName=this.state.driverName;
        const phone=this.state.phone;
        const data = {
            id: new Date(),
            carNo,
            ownerName,
            driverName,
            phone,
        }
        this.props.action.addTransportCar(data)
        this.props.close()
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
                <AppBar position='fixed'>
                        <Toolbar>                       
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Add New Transportation
                        </Typography>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        </Toolbar>
                </AppBar>
                <div style={{paddingTop:50}} >
                <Grid container spacing={8}>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    ကား အမည်
                                </Typography> 
                                <TextField
                                fullWidth
                                name="carNo"
                                required
                                value={this.state.carNo}
                                margin="normal"
                                onChange={this.handleChange}
                                />                               
                    </Grid>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    ပိုင်ဆိုင်သူ အမည်
                                </Typography>
                                <TextField
                                fullWidth
                                name="ownerName"
                                value={this.state.ownerName}
                                margin="normal"
                                onChange={this.handleChange}
                                />
                    </Grid>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    မောင်းသူ အမည်
                                </Typography>   
                                <TextField
                                fullWidth
                                name="driverName"
                                value={this.state.driverName}
                                margin="normal"
                                onChange={this.handleChange}
                                />                             
                    </Grid>
                    <Grid item xs={12} >
                                <Typography variant="caption"  align="left">
                                    ဖုန်း
                                </Typography>   
                                <TextField
                                fullWidth
                                name="phone"
                                value={this.state.phone}
                                margin="normal"
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



const HistoryData = [
    {month: 'Jan', uv: 4000, pv: 2400},
    {month: 'Feb', uv: 3000, pv: 1398},
    {month: 'Mar', uv: 2000, pv: 1800},
    {month: 'Apr', uv: 2780, pv: 3908},
    {month: 'May', uv: 1890, pv: 4800},
    {month: 'Jun', uv: 2390, pv: 3800},
    {month: 'Jul', uv: 3490, pv: 4300},
    {month: 'Aug', uv: 2780, pv: 3908},
    {month: 'Sep', uv: 1890, pv: 4800},
    {month: 'Oct', uv: 2390, pv: 3800},
    {month: 'Nov', uv: 3490, pv: 4300},
    {month: 'Dec', uv: 3490, pv: 4300},

];
/*
    သိုလှောင်ပစ္စည်းများ
*/
const store = [
    {"ကုန်ပစ္စည်းအမည်": 'ရွှေဘိုပေါ်ဆန်း', "ပမာဏ": 4000, "အတိုင်းအတာယူနစ်": "အိတ်"},
    {"ကုန်ပစ္စည်းအမည်": 'မပဲ', "ပမာဏ": 3000, "အတိုင်းအတာယူနစ်": "အိတ်"},
    {"ကုန်ပစ္စည်းအမည်": 'ပဲစိမ်းကုန်', "ပမာဏ": 2000, "အတိုင်းအတာယူနစ်": "အိတ်"},
    {"ကုန်ပစ္စည်းအမည်": 'ရွှေ၀ါ', "ပမာဏ": 2780, "အတိုင်းအတာယူနစ်": "ပိသာ"},
    {"ကုန်ပစ္စည်းအမည်": 'မတူတီး', "ပမာဏ": 4000, "အတိုင်းအတာယူနစ်": "တင်းပဲ"},
    {"ကုန်ပစ္စည်းအမည်": 'ပဲပြား', "ပမာဏ": 3000, "အတိုင်းအတာယူနစ်": "အိတ်"},
    {"ကုန်ပစ္စည်းအမည်": 'ပဲနီတုန်း', "ပမာဏ": 2000, "အတိုင်းအတာယူနစ်": "တင်းပဲ"},
    {"ကုန်ပစ္စည်းအမည်": 'ရွှေ၀ါအကီး', "ပမာဏ": 2780, "အတိုင်းအတာယူနစ်": "ပိသာ"},
];

const events = [
    {ts: "2017-09-17T12:22:46.587Z", text: 'ကုန်ပစ္စည်းအသစ် အပ်နှ့သည် ။ ကုန်ပစ္စည်းအမျိုးအစားမှာ မပဲဖြစ်ပါသည်'},
    {ts: "2017-09-17T12:21:46.587Z", text: 'အကြွေး ထားရှိသည်'},
    {ts: "2017-09-17T12:20:46.587Z", text: 'ကုန်ပစ္စည်း ထုပ်ယူသွားသည်'},
    {ts: "2017-09-16T12:22:46.587Z", text: 'ကုန်ပစ္စည်းအသစ် အပ်နှ့သည် ။ ကုန်ပစ္စည်းအမျိုးအစားမှာ ရွှေဘိုပေါ်ဆန်း ဖြစ်ပါသည်'},
    {ts: "2017-09-16T12:21:46.587Z", text: 'ကုန်ပစ္စည်း ထုပ်ယူသွားသည်'},
    {ts: "2017-09-16T12:20:46.587Z", text: 'အကြွေးဆပ် ထားသည်'},
    {ts: "2017-09-17T12:24:46.587Z", text: 'ကိုယ်ရေးအချက်အလက်ချိန်းသည်'},
    {ts: "2017-10-17T12:21:46.587Z", text: 'ကုန်ပစ္စည်းအသစ် အပ်နှ့သည် ။ ကုန်ပစ္စည်းအမျိုးအစားမှာ မပဲဖြစ်ပါသည်'},
    {ts: "2017-10-17T12:20:46.587Z", text: 'ကုန်ပစ္စည်းအသစ် အပ်နှ့သည် ။ ကုန်ပစ္စည်းအမျိုးအစားမှာ မပဲဖြစ်ပါသည်'},
    {ts: "2017-10-16T12:22:46.587Z", text: 'အကြွေး ထားရှိသည်'},
    {ts: "2017-09-16T12:21:46.587Z", text: 'အကြွေးဆပ် ထားသည်'},
    {ts: "2017-08-16T12:20:46.587Z", text: 'ကုန်ပစ္စည်း ထုပ်ယူသွားသည်'},
  ];

class SupplyItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedView:0,  //buy price history, sell price history , with year filter
            data:this.props.data
        }        
        this.handleChange=this.handleChange.bind(this)
       // this.handleDeleteSupply=this.handleDeleteSupply.bind(this)
    } 
    handleChange(view){
        this.setState({selectedView:view})
    }
   
   
    render(){
        const { classes } = this.props;
        const { selectedView,data } = this.state;
        return (
            <div className={classes.view}>
                <Grid container >
                    <Grid item xs={12}>                        
                        <AppBar position="static"
                        classes={{
                            root:classes.viewTab,
                        }}
                        >
                            <Tabs value={selectedView}>
                                <Tab label="ကိုယ်ရေးအကျဥ်းချုပ်" onClick={e=>this.handleChange(0)}/>
                                <Tab label="သိုလှောင်ပစ္စည်းများ" onClick={e=>this.handleChange(1)}/>
                                <Tab label="လုပ်ဆောင်ချက်များ" onClick={e=>this.handleChange(2)}/>
                            </Tabs>
                        </AppBar>    
                        {selectedView === 0 && 
                        <TabContainer>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            တောင်သူအမည်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            ဆက်သွယ်ရန်ဖုန်းနံပါတ်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            တိုင်းဒေသကြီး
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.division}
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            ဆက်သွယ်ရန်လိပ်စာ
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.addr}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            မှတ်ချက်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TabContainer>}
                        {selectedView === 1 && <TabContainer>
                            <div>
                                <BarChart 
                                    width={600} 
                                    height={400}
                                    data={store} 
                                    layout="vertical"
                                    margin={{top: 5, right: 100, left: 30, bottom: 5}}
                                >
                                    <XAxis type="number"/>
                                    <YAxis type="category" dataKey="ကုန်ပစ္စည်းအမည်" />
                                    <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey="ကုန်ပစ္စည်းအမည်" fill="#8884d8" />
                                <Bar dataKey="ပမာဏ" fill="#82ca9d" />
                                <Bar dataKey="အတိုင်းအတာယူနစ်" fill="red" />
                                </BarChart>   
                            </div>

                                

                        </TabContainer>}
                        {selectedView === 2 && <TabContainer>
                            <GridList cellHeight={200} spacing={25} cols={1} className={classes.activityGridList}>
                                <Timeline items={events} />
                            </GridList>                           
                              
     
                        </TabContainer>}
                             
                      </Grid>
                </Grid>
            </div>
        )
    }
}

function TabContainer(props) {
    return (
        <Paper style={{ padding: 8 * 3 ,boxShadow: '0px 0px 2px 1px rgba(76,175,80, .7)'}}>
             {props.children}
        </Paper>  
    );
}




export default connect(mapStateToProps, {addTransportCar,deleteTransportCar,updateTransportCar,readTransportCars})(withStyles(styles)(TransportContent))