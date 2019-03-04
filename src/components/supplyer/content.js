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

import { addSupplyer} from '../../actions/supplyer_action';

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


function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        supplyer:state.supplyer,
    };
} 


const divisions=[
    {name:"မႏၲေလးတိုင္းေဒသႀကီး"},
    {name:"ရန္ကုန္တိုင္းေဒသႀကီး"},
    {name:"မေကြးတိုင္းေဒသႀကီး"},
    {name:"ေနျပည္ေတာ္တိုင္းေဒသႀကီး"},
    {name:"ပဲခူးတိုင္းေဒသႀကီး"},
    {name:"ရွမ္းျပည္နယ္"},
    {name:"စကိုင္းတိုင္းေဒသႀကီး"},
    {name:"ဧရာ၀တီတိုင္းေဒသႀကီး"},
    {name:"မြန္ျပည္နယ္"},
    {name:"ကခ်င္ျပည္နယ္"},
    {name:"တနလ္ာရီတိုင္းေဒသႀကီး"},
    {name:"ခ်င္းျပည္နယ္"},
    {name:"ရခိုင္ျပည္နယ္"},
    {name:"ကရင္ျပည္နယ္"},
]

class SupplyContent extends Component{
    constructor(props){
        super(props);
        this.state={
            supplies:[],
            isLoading:true,
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
        this.fetchDatas=this.fetchDatas.bind(this)   
        this.fetchNetwork=this.fetchNetwork.bind(this)
    } 

    componentDidMount(){
        this.fetchNetwork()
    }
    fetchNetwork(){
        if (this.props.setting.isOnline){
            this.fetchDatas()
        }else{
            //From Redux
            console.log(" Redux offline data from cache [supplyer] - ",this.props.supplyer)
            this.setState({supplies:this.props.supplyer})
            this.setState({isLoading:false})
        }
    }
    fetchDatas(){
        axios.all([
            axios.get('http://localhost:8081/api/v1/supply',{
                headers: {
                    'content-type': 'application/json',
                },
            })
        ]).then(axios.spread((suppRes) => {
            this.setState({supplies:suppRes.data.data})
            this.setState({isLoading:false})
        }));
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
            <div>
                {!this.state.isLoading ? (
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
                                        ေတာင္သူ အသစ္ထည့္မည္
                                    </Button>   
                                    </div>
                                    <Paper className={classes.paper} style={{marginTop:-20}}>
                                        <GridList cellHeight={200} spacing={25} cols={1} className={classes.gridList}>
                                            {
                                                this.state.supplies !=null && (
                                                    <div>
                                                        {this.state.supplies.map(item => (
                                                            <SupplyItemUI item={item} classes={classes} handleItem={this.handleSelectedItem}
                                                            handleParentSnack={this.handleChildSnack}
                                                           // snackMessage={this.state.snackMessage}                                                    
                                                            />
                                                        ))}
                                                    </div>
                                                )
                                            }
                                            
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
                                    <NewItemDialog  classes={classes} close={this.handleDialog} snackMsg={this.handleSnack}
                                    action={this.props}
                                    /> 
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
                ):(
                    <div className={classes.sweetLoading}>
                            <BeatLoader
                            sizeUnit={"px"}
                            size={20}
                            color={'#357a38'}
                            loading={this.state.isLoading}
                            />
                    </div> 
                )} 
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
            units:this.props.units,
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
            name:this.state.name,
            address:this.state.address,
            phone:this.state.phone,
            division:this.state.division,
            note:this.state.note,
            network:""
        };
        if (this.props.action.setting.isOnline){
            params.network="synced"            
            //Redux & API
            this.props.action.addSupplyer(params)
            axios.post('http://localhost:8081/api/v1/add/supply',params,{
            headers: {
                'content-type': 'application/json',
            },
            }).then(res => {
                this.setState({snackMessage:res.data.message})
                this.setState({snackOpen:!this.state.snackOpen})
            }) 
        }else{
            params.network="pending"  
            //Redux only
            this.props.action.addSupplyer(params)
            this.setState({snackMessage:"offline cache storage"})
            this.setState({snackOpen:!this.state.snackOpen})
        }       
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
                <AppBar position='fixed'>
                        <Toolbar>                       
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                                         ေတာင္သူ အသစ္ထည့္မည္
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
                                အမည္
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
                                ဖုန္းနံပါတ္
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
                                တိုင္းေဒသႀကီး
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
                                         ေနရပ္လိပ္စာ
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
                                မွတ္ခ်က္
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
                            ပယ္ဖ်က္မည္
                            </Button>
                            <spam className={classes.bpacing}/>
                            <Button  variant="outlined" color="primary" onClick={this.handleConfirm}>
                            သိမ္းမည္
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


class SupplyItemUI extends Component{
    constructor(props){
        super(props);
        this.state={
            dialogPhoneBook:false,
            value: '',
            copied: false,
            item:this.props.item

        }
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
    handleDeleteSupply(){
        //Fetch API
        const v =this.state.item;
        const params = {
            id:v.id,
            name:v.name,
            address:v.address,
            phone:v.phone,
            division:v.division,
            note:v.note,
        };
        axios.post('http://localhost:8081/api/v1/delete/supply',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
           // this.setState({snackMessage:res.data.message})
            this.handleSnackOpen(true,res.data.message)
        })
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
                            <IconButton variant="fab" aria-label="Delete" onClick={this.handleDeleteSupply}>
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
                                            {item.name} ကို ဆက္သြယ္ရန္
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
                                <Tab label="ကိုယ္ေရးအက်ဥ္းခ်ဳပ္" onClick={e=>this.handleChange(0)}/>
                                <Tab label="သိုေလွာင္ပစၥည္းမ်ား" onClick={e=>this.handleChange(1)}/>
                                <Tab label="လုပ္ေဆာင္ခ်က္မ်ား" onClick={e=>this.handleChange(2)}/>
                            </Tabs>
                        </AppBar>    
                        {selectedView === 0 && 
                        <TabContainer>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                             ေတာင္သူအမည္
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                    ဆက္သြယ္ရန္ဖုန္းနံပါတ္
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="caption" gutterBottom align="left">
                                    တိုင္းေဒသႀကီး
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.division}
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="caption" gutterBottom align="left">
                                    ဆက္သြယ္ရန္လိပ္စာ
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Typography variant="title" align="left">
                                        {data.addr}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="caption" gutterBottom align="left">
                                    မွတ္ခ်က္
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
                        </TabContainer>
                        }                             
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




export default connect(mapStateToProps, {addSupplyer})(withStyles(styles)(SupplyContent))