import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
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
import AutoIcon from '@material-ui/icons/Autorenew';
import PhoneIcon from '@material-ui/icons/PhoneForwarded';
import Timeline from 'react-time-line';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import AgentFromUX from './agentform';

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
    orderGridList:{
        display:'block',
        width: '100%',
        height: theme.spacing.unit*62,     
        paddingTop:theme.spacing.unit*3,
        backgroundColor:'red',
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
    chip: {
        margin: theme.spacing.unit,
      },
    BadgePadding:{
        padding: `0 ${theme.spacing.unit * 2}px`,
        //paddingRight:theme.spacing.unit*2,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
       // color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
      },
      column: {
        flexBasis: '33.33%',
      },
      helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },

});




const SupplyItems = [
    {id:"1",code:"co001",name:"ဌက်နီ",oname:"ဦးကောင်းတင့်",description:"",phone:["092328422","013134134"],addr:"အမှတ် (၂) အိပ်အမှတ် ၇ , မင်းတုန်းလမ်း",township:"ရွှေဘို",division:"မန္တလေးမြို့"},
    {id:"2",code:"b002",name:"ဆင်မင်း",oname:"ဦးမြချစ်",description:"",phone:["985376264","09232312"],addr:"",township:"ရွှေဘို",division:"မန္တလေးမြို့"},
    {id:"3",code:"co002",name:"ဦးချစ်မောင် ပွဲရုံ",oname:"ဦးတင်မြင့်နိုင်",description:"",phone:["092381411"],addr:"ပုဇွန်တောင်အထက်လမ်း တိုက် (၂) ၄ လွှာ",township:"ပုဇွန်တောင်",division:"ရန်ကုန်"},
    {id:"4",code:"co390",name:"အောင်အောင်",oname:"ဦးအောင်ကို",description:"",phone:["091471874212"],addr:"",township:"",division:""},
    {id:"1",code:"co199",name:"ရွှေခေတ်",oname:"ဦးမြကြည်",description:"",phone:["0172646","0128347","684727484"],addr:"လမ်း ၅၀ အလယ်ဘလောက် တိုက် ၂၁",township:"ကျောက်တံတား",division:"ရန်ကုန်"},
    {id:"2",code:"co453",name:"မင်း",oname:"",description:"",phone:["044828472"],addr:"ပုဇွန်တောင်အထက်လမ်း",township:"",division:""},
    {id:"3",code:"co212",name:"သိန်းသန်း",oname:"မခင်ထား",description:"",phone:["294817471","1938491","0193847"],addr:"",township:"",division:""},
    {id:"4",code:"co138",name:"မတုတ်",oname:"မချစ်မ",description:"",phone:["918459283"],addr:"",township:"",division:""},
]
const units=[
    {name:"တင်းရေ"},
    {name:"အိတ်"},
    {name:"ပြည်"},
    {name:"ပိသာ"},
]
const divisions=[
    {name:"မန္တလေးမြို့"},
    {name:"ရန်ကုန်မြို့"},
    {},
]

class SupplyContent extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItem:this.props.agent[0],  
            selectedView:0, 
            dialogOpen:false,
            snackOpen:false,
        }        
        this.handleSelectedItem=this.handleSelectedItem.bind(this)
        this.handleDialog=this.handleDialog.bind(this)
        this.handleSnack=this.handleSnack.bind(this)
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
    render(){
        const { classes } = this.props;
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
                          
                            ပွဲရုံး အသစ်ထည့်မည်
                        </Button>   
                        </div>
                        <Paper className={classes.paper} style={{marginTop:-20}}>
                            <GridList cellHeight={200} spacing={25} cols={1} className={classes.gridList}>
                                {this.props.agent.map(item => (
                                   <SupplyItemUI item={item} classes={classes} handleItem={this.handleSelectedItem}/>
                                ))}
                            </GridList>    
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <SupplyItemView data={this.state.selectedItem} classes={classes}/>                    
                    </Grid>
                </Grid>  

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.dialogOpen}
                    onClose={this.handleDialog}
                    >
                    <div style={getModalStyle()} className={classes.dialog}>
                        <AgentFromUX  classes={classes} close={this.handleDialog} snackMsg={this.handleSnack}/> 
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
                    <span id="message-id">I love snacks</span>
                    }
                    action={[
                        <IconButton
                           color="inherit"
                          onClick={this.handleSnack}
                        >
                          <CloseIcon />
                        </IconButton>,
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

class SupplyItemUI extends Component{
    constructor(props){
        super(props);
        this.state={
            dialogPhoneBook:false,
            value: '',
            copied: false,
        }
        this.handlePhoneBook=this.handlePhoneBook.bind(this)
    } 
    handlePhoneBook(){
        this.setState({dialogPhoneBook:!this.state.dialogPhoneBook})
    }
    render(){
        const { classes,item,handleItem } = this.props;
        return(
          
                 <Card className={classes.card}>
                 <CardActionArea onClick={e => handleItem(item)}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5" color="primary" align="left">
                                {item.name}
                            </Typography>
                        </CardContent>
                        <div className={classes.settingButton}>
                            <IconButton variant="fab" aria-label="Delete">
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

const orderedItems = [
    {serial:"9892841248",iname:"ပဲစိမ်း",quantity:"၅၀",lastdate:"17 Sep 2017",orderdate:"10 Aug 2017",unit:"အိတ်",all:false},
    {serial:"9892841328",iname:"ရွှေဘိုပေါ်ဆန်း",quantity:"၂၀၀",lastdate:"15 Dec 2017",orderdate:"10 Aug 2017",unit:"အိတ်",all:false},
    {serial:"9892121248",iname:"ပဲနီ",quantity:"၂၀",lastdate:"21 Dec 2017",orderdate:"10 July 2017",unit:"ပိသာ",all:true},
    {serial:"9892841238",iname:"မပဲ",quantity:"၁၀၀",lastdate:"30 Dec 2018",orderdate:"10 Jun 2017",unit:"တင်းပဲ",all:true},
    {serial:"9892812318",iname:"ပေါ်ဆန်းမွှေး",quantity:"၁၀",lastdate:"4 Dec 2017",orderdate:"10 Sep 2017",unit:"အိတ်",all:false},
]
  
class SupplyItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedView:0,  //buy price history, sell price history , with year filter
        }        
        this.handleChange=this.handleChange.bind(this)
 
    } 
    handleChange(view){
        this.setState({selectedView:view})
    }
   
    render(){
        
        const { classes,data } = this.props;
        const { selectedView } = this.state;
    
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
                                <Tab label="ပေးပို့ပြိးသောပစ္စည်းများ" onClick={e=>this.handleChange(1)}/>
                                <Tab onClick={e=>this.handleChange(2)}
                                label={
                                    <Badge className={classes.BadgePadding} color="secondary" badgeContent={5}>
                                      မှာယူထားသောပစ္စည်းများ
                                    </Badge>
                                }
                                
                                />
                                <Tab label="လုပ်ဆောင်ချက်များ" onClick={e=>this.handleChange(3)}/>
                            </Tabs>
                        </AppBar>    
                        {selectedView === 0 && 
                        <TabContainer>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            ပွဲရုံ အမည်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                            ပိုင်ရှင် အမည်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.oname}
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
                                            ဆက်သွယ်ရန်ဖုန်းနံပါတ်
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <div className={classes.phones}>
                                   
                                                <Chip
                                                avatar={
                                                <Avatar>
                                                    <PhoneIcon />
                                                </Avatar>
                                                }
                                                    label={data.phone}
                                                    className={classes.chip}
                                                />
                                    
                                   
                                    </div>
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
                                    <div className={classes.inLineLabel}>
                                        <Typography variant="title" align="right">
                                            {data.name} 
                                        </Typography>
                                    </div>
                            </div>                                

                        </TabContainer>}
                        {selectedView === 2 && <TabContainer>
                            <div>
                                    <div className={classes.inLineLabel}>
                                        <Typography variant="title" align="right">
                                            {data.name} 
                                        </Typography>
                                    </div>
                                    <br />
                                    
                                     {

                                            orderedItems.map(i => (
                                                    <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <div className={classes.column}>
                                                            <Typography className={classes.heading}>
                                                                    {i.iname}
                                                            </Typography>
                                                        </div>
                                                        <div className={classes.column} />
                                                        <div className={classes.column}>
                                                            <Typography className={classes.secondaryHeading} color="secondary">
                                                                    {i.lastdate}
                                                            </Typography>
                                                        </div>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails className={classes.details}>
                                                        <div className={classes.column}>
                                                            <Typography variant="body2" align="center" color="#fff">
                                                                 ကုန်ပစ္စည်းစတင်မှာယူသောနေ့ 
                                                            </Typography>
                                                            <spam className={classes.bpacing}/>
                                                            <Typography variant="subheading" align="center" color="#fff">
                                                                {i.orderdate} 
                                                            </Typography>
                                                        </div>
                                                        <div className={classes.column}>
                                                            <Typography variant="body2" align="center" color="#fff">
                                                                 စုစုပေါင်းပမာဏ 
                                                            </Typography>  
                                                            <spam className={classes.bpacing}/>
                                                            <Typography variant="h5" align="center" color="#fff">
                                                                {i.quantity} {i.unit}
                                                            </Typography>
                                                        </div>
                                                        <div className={classNames(classes.column, classes.helper)}>
                                                            
                                                                <Typography variant="body2" align="right">
                                                                {
                                                                    !i.all &&(
                                                                        <spam>ပေးပို့ရန်ကျန်ရှိနေသေးပါသည်</spam>
                                                                    )}
                                                                {
                                                                    i.all &&(
                                                                        <spam>မှာရှိထားသည့်ကုန်ပစ္စည်း အရေအတွက်အားလုံးပေးပို့ပြီးပါသည်</spam>
                                                                    )}
                                                                <br />
                                                                <a href="#sub-labels-and-columns" className={classes.link}>
                                                                    စာရင်းကြည့်မည်
                                                                </a>
                                                                </Typography>
                                                                                                   
                                                                                                                         
                                                        </div>
                                                        </ExpansionPanelDetails>
                                                        <Divider />
                                                        <ExpansionPanelActions>                                                      
                                                            <Button  variant="outlined" color="secondary" onClick={this.handleSnackMessage}>
                                                                ပယ်ဖျက်မည်
                                                            </Button>
                                                            <spam className={classes.bpacing}/>
                                                            {i.all && (
                                                                <Button  variant="outlined" color="primary" onClick={this.handleSnackMessage}>
                                                                 ပေးပိုပြီးပါသည်
                                                                </Button>
                                                            )}
                                                           
                                                        </ExpansionPanelActions>
                                                </ExpansionPanel>
                                                )
                                            )
                                        }     
                                    
                            </div>             
     
                        </TabContainer>}
                        {selectedView === 3 && <TabContainer>
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

function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        agent:state.agent,        
    };
} 


export default connect(mapStateToProps, null)(withStyles(styles)(SupplyContent))