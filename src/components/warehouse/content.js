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
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { LineChart, Line, XAxis, Tooltip, } from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PrintIcon from '@material-ui/icons/Print';
import SettingIcon from '@material-ui/icons/Settings';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import AutoIcon from '@material-ui/icons/Autorenew';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dateFns from "date-fns";
import OfflineFeature from '../util/offline';

import MMNumber from '../util/mmnumber';

import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { readWarehouse,addWarehouse} from '../../actions/warehouse_action';

const styles = theme => ({   
     Onroot:{
         marginLeft: theme.spacing.unit*30,
         backgroundColor:'#fee',
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
        width: '100%',
        height: theme.spacing.unit*62,     
        paddingTop:theme.spacing.unit*3,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    menuButton:{
        width:'80%',
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
        padding:20,
    },
    settingButton:{
        display: 'flex',
        flexDirection: 'column',
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
        marginTop:theme.spacing.unit*3,
        backgroundColor:'#357a38',
        fontWeight:'bold',
    },
    display:{
        minHeight: theme.spacing.unit*20,
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
    sweetLoading:{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});


function mapStateToProps(state) {
    return {
        setting:state.setting,
        auth0: state.auth0,
        warehouse:state.warehouse,
    };
} 

class WarehouseContent extends Component{
    constructor(props){
        super(props);
        this.state={
            warehouseItems:this.props.warehouse,
            selectedItem:this.props.warehouse[0],
            selectedView:0, 
            dialogOpen:false,
            deleteDialogOpen:false,
            isLoading:true,
            snackOpen:false,
            snackMessage:"",
            snackCode:0,       
            tmpDate:null,

        }        
        this.handleSelectedItem=this.handleSelectedItem.bind(this)
        this.handleDialog=this.handleDialog.bind(this)
        this.handleDeleteDialog=this.handleDeleteDialog.bind(this)
        this.handleSnack=this.handleSnack.bind(this)
        this.fetchDatas=this.fetchDatas.bind(this)
        this.fetchNetwork=this.fetchNetwork.bind(this)
        this.closeSnack=this.closeSnack.bind(this)
        this.handleDeleteDialogAndSave=this.handleDeleteDialogAndSave.bind(this)
        this.deleteStock=this.deleteStock.bind(this)
    }     
    componentDidMount(){
        this.fetchNetwork()
    }
    fetchNetwork(){
        if (this.props.setting.isOnline){
            this.fetchDatas()
            //this.setState({isLoading:false})
        }else{
            //From Redux
            this.setState({warehouseItems:this.props.warehouse})
            this.setState({selectedItem:this.props.warehouse[0]})
            console.log(" Redux offline data from cache [warehouse] - ",this.props.warehouse)
            this.setState({isLoading:false})
        }
    }
    fetchDatas(){
        console.log("Fetch Data ...............................")
        axios.all([
            axios.get('http://localhost:8081/api/v1/stock',{
                headers: {
                    'content-type': 'application/json',
                },
            })
        ]).then(axios.spread((stockRes) => {
            console.log("Fetch Data ............................... (inside then ) ",stockRes.data)
            if (stockRes.data.data != null){
                this.setState({warehouseItems:stockRes.data.data})
                this.setState({selectedItem:this.state.warehouseItems[0]})
            }else{
                //Empty Stock in server
            }
        })).then(data=>{
            this.setState({isLoading:false})
        });
    }
    handleSelectedItem(data){
        this.setState({selectedItem:data})
    }
    handleDialog(){
        this.setState({dialogOpen:!this.state.dialogOpen})
    }
    handleDeleteDialog(){
        this.setState({deleteDialogOpen:!this.state.deleteDialogOpen})
    }    
    handleDeleteDialogAndSave(data){
        this.setState({deleteDialogOpen:!this.state.deleteDialogOpen})
        console.log(" save tmp data ", data)       
        this.setState({tmpDate:data}) 
    }
    deleteStock(){
        this.handleDeleteDialog()
        console.log(" save tmp data (api) ", this.state.tmpDate)   
        // fetch API
        const params = this.state.tmpDate;
         axios.delete('http://localhost:8081/api/v1/delete/stock',params,{
             headers: {
                 'content-type': 'application/json',
             },
         }).then(res => {
             console.log(" response data [WareHouse] Delete Stock ", res.data)
         }) 
    }
    handleSnack(message,status){
        this.setState({snackOpen:!this.state.snackOpen,snackCode:status,snackMessage:message})
    }
    closeSnack(){
        this.setState({snackOpen:false,snackCode:"",snackMessage:""})
    }
    render(){
        const { classes } = this.props;
        return(            
            <div className={classes.root}>
            {!this.state.isLoading ? (
                    <div className={classes.content}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={4}>
                            <div className={classes.menuButton}>
                            <Button variant="extendedFab" aria-label="addNewItem" fullWidth className={classes.addButton}
                            onClick={this.handleDialog}
                            >             
                                <AddIcon />
                                ကုန္ပစၥည္းအသစ္ထည့္မည္
                            </Button>   
                            </div>
                            <Paper className={classes.paper} style={{marginTop:-20,marginLeft:20}}>
                                <GridList cellHeight={90} spacing={16} cols={1} className={classes.gridList}>
                                    {this.state.warehouseItems.map(item => (                                      
                                      <Card className={classes.card} key={item.serial}>
                                      <CardActionArea onClick={e => this.handleSelectedItem(item)}>
                                          <div className={classes.details}>
                                              <CardContent className={classes.content}>
                                                  <Typography component="h5" variant="h5" color="primary" align="left">
                                                      {item.title}
                                                  </Typography>
                                                  <Typography component="caption" variant="caption" align="left">
                                                      {item.serial}
                                                  </Typography>                                                                      
                                              </CardContent>
                                              <div className={classes.settingButton}>
                                                  <Typography component="caption" variant="caption" color="secondary" align="left">
                                                      {item.unit}
                                                  </Typography>
                                                  <IconButton variant="fab" aria-label="Delete" onClick={e=>this.handleDeleteDialogAndSave(item)}>
                                                      <DeleteIcon className={classes.settingIcon}/>
                                                  </IconButton>
                                              </div>                                              
                                          </div>
                                          </CardActionArea>
                                      </Card> 
                                    ))}
                                </GridList>    
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Paper className={classes.paper}>
                                    <WarehouseItemView data={this.state.selectedItem} classes={classes}/>
                             </Paper>
                        </Grid>
                    </Grid>  
    
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.dialogOpen}
                        onClose={this.handleDialog}
                        >
                        <div style={getModalStyle()} className={classes.dialog}>
                                <NewItemDialog  classes={classes} close={this.handleDialog} snackMsg={this.handleSnack}
                                action={this.props}
                                /> 
                        </div>
                    </Modal>   
                    
                    <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDeleteDialog}>
                    <DialogTitle id="alert-dialog-title">{"Are you sure want to delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        This will delete permentaly please take care what you are doing.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteDialog} color="primary">
                        Disagree
                        </Button>
                        <Button onClick={this.deleteStock} color="primary" autoFocus>
                        Agree
                        </Button>
                    </DialogActions>
                    </Dialog>                    

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackOpen}
                        onClose={this.closeSnack}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={
                        <span id="message-id">{this.state.snackMessage}</span>
                        }
                        action={[
                            <IconButton
                               color="inherit"
                              onClick={this.closeSnack}
                            >
                              <CloseIcon />
                            </IconButton>,
                          ]}
                    />   
                </div>
            ):(
                <div className={classes.sweetLoading}>
                    <BeatLoader
                    // className={override}
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
            units:null,

            isLoading:true,       
            isOnlineFeature:false, 
            
            name:"",
            serialNumber:"",    // Generated Serail Number
            unit:"",            // Selected Unit
            sellPrice:0,
            buyPrice:0,
            network:"pending",
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSnackMessage= this.handleSnackMessage.bind(this);
        this.fetchDatas=this.fetchDatas.bind(this);
        this.fetchNetwork=this.fetchNetwork.bind(this);
        this.updateSerialNumber=this.updateSerialNumber.bind(this);
        this.handleChange=this.handleChange.bind(this);
    } 
   
    componentDidMount(){
        this.fetchNetwork()
    }
    fetchNetwork(){
        if (this.props.action.setting.isOnline){
            this.fetchDatas()
        }else{
            //Show alter box - offline feature
            this.setState({isOnlineFeature:true})
            this.setState({isLoading:false})
        }
    }
    //Preloading data from backend
    fetchDatas(){
        axios.all([
            axios.get('http://localhost:8081/api/v1/serial',{
                headers: {
                    'content-type': 'application/json',
                },
            }),
            axios.get('http://localhost:8081/api/v1/unit',{
                headers: {
                    'content-type': 'application/json',
                },
            })
        ]).then(axios.spread((serialRes, unitRes) => {
            console.log(" response data [WareHouse] ", serialRes.data , unitRes.data)
            this.setState({serialNumber:serialRes.data.message})
            this.setState({units:unitRes.data.data})
        })).then(data=>{
            this.setState({isLoading:false})
        });
    }
    updateSerialNumber(){
        this.fetchDatas()
    }
    handleClose(){
        this.props.close()
    }
    handleChange = name => event => {
       this.setState({ [name]: event.target.value });
    };
    handleSnackMessage(){
        // fetch API

        //const dateFormatHeader = ["DD MMM YYYY"," MMM YYYY","YYYY"];
        const stockPrice = {
            date: dateFns.format(new Date(),"DD MMM YYYY"),
            sprice:this.state.sellPrice,
            bpacing:this.state.buyPrice
        }
        
        const params = {           
           serial:this.state.serialNumber,
           title:this.state.name,
           unit:this.state.unit,
           price:[stockPrice],
           network:"synced", //create new stock only allowed when online
        };
        //Redux Update
        this.props.action.addWarehouse(params);

        axios.post('http://localhost:8081/api/v1/stock',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            console.log(" response data [WareHouse] POST Stock ", res.data)
            this.props.close()
            this.props.snackMsg(res.data.message,res.data.status)
        })       
    }
    render(){
        const { classes } = this.props;
        const { isLoading } = this.state;   
        return(
            <div>
                
                {!this.state.isLoading ? (    
                    <div>                       
                    <AppBar position='fixed'>
                            <Toolbar>                       
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                            ကုန္ပစၥည္း အမ်ိဳးအစာ အသစ္ထည့္မည္
                            </Typography>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            </Toolbar>
                    </AppBar>
                    <div style={{paddingTop:50}} >
                    {
                        this.state.isOnlineFeature ? (
                            <OfflineFeature />
                        ):(
                            <Grid container spacing={24}>
                        <Grid item xs={12} >
                                    <Typography variant="caption" gutterBottom align="left">
                                        ကုန္ပစၥည္းအမွတ္အသားဃူနစ္
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Input
                                        value={this.state.serialNumber}
                                        inputProps={{
                                        'aria-label': 'Description',
                                        }}
                                    />                               
                                    <IconButton aria-label="Auto" onClick={this.updateSerialNumber}>
                                        <AutoIcon />
                                    </IconButton>                                  
                        </Grid>
                        <Grid item xs={6} >
                                    <TextField
                                    required
                                    id="standard-required"
                                    label="ကုန္ပစၥည္းအမည္"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    className={classes.textField}
                                    margin="normal"
                                    />
                        </Grid>
                        <Grid item xs={6} >
                                    <TextField
                                    fullWidth
                                    select
                                    label="ကုန္ပစၥည္းအတိုင္းအတာယူနစ္"
                                    value={this.state.unit}                                   
                                    margin="normal"
                                    onChange={this.handleChange('unit')}
                                    >
                                   {this.state.units.map(option => (
                                    <option key={option.name} value={option.name}>
                                        {option.name}
                                    </option>
                                    ))}
                                    </TextField>
                        </Grid>
                        <Grid item xs={6} >
                                    <Typography variant="caption" gutterBottom align="left">
                                    လက္ရွိေရာင္းေစ်း
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Input
                                        value={this.state.sellPrice}
                                        onChange={this.handleChange('sellPrice')}
                                        inputProps={{
                                        'aria-label': 'Description',
                                        }}
                                    /> 
                        </Grid>
                        <Grid item xs={6} >
                                    <Typography variant="caption" gutterBottom align="left">
                                    ၀ယ္ေစ်း
                                    </Typography> 
                                    <spam className={classes.spacing} /> 
                                    <Input
                                        value={this.state.buyPrice}
                                        onChange={this.handleChange('buyPrice')}
                                        inputProps={{
                                        'aria-label': 'Description',
                                        }}
                                    />
                        </Grid>
                        <Grid item xs={6} >
                            <Button  variant="outlined" color="primary" onClick={this.handleSnackMessage}>
                            သိမ္းမည္
                            </Button>   
                            <spam className={classes.bpacing}/>
                            <Button  variant="outlined" color="secondary" onClick={this.handleClose}>
                            ပယ္ဖ်က္မည္
                            </Button>
                        </Grid>
                    </Grid>
                    )}
                    
                    </div>
                    </div>
                        ):(
                            <div className={classes.sweetLoading}>
                                <BeatLoader
                               // className={override}
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


class WarehouseItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedView:0,  //buy price history, sell price history , with year filter
        }        
        this.handleChange=this.handleChange.bind(this)
        this.fetchDatas=this.fetchDatas.bind(this)
 
    } 
    handleChange(view){
        this.setState({selectedView:view})
    }
    componentWillUpdate(){
      //  this.fetchDatas()
    }
    fetchDatas(){
        const params = {           
            serial:this.props.data.serial,
        };
        axios.all([
            axios.post('http://localhost:8081/api/v1/stock/totalprce',params,{
                headers: {
                    'content-type': 'application/json',
                },
            }),
            axios.post('http://localhost:8081/api/v1/stock/historyprice',params,{
                headers: {
                    'content-type': 'application/json',
                },
            })
        ]).then(axios.spread((totalPriceRes,historyPriceRes) => {
            console.log(" History Price Response ", historyPriceRes.data.data)
          //  if (this.state.totalPirce == ""){
                this.setState({totalPirce:totalPriceRes.data.data})
          //  }
          //  if (this.state.historyDate==null){
                this.setState({historyDate:historyPriceRes.data.data})
         //   }
          
        })).then(data=>{

        });
    }
    render(){      
       // console.log(" History Data ",this.state.historyDate)
        const { classes,data } = this.props;
        console.log(" History Data ", data)
        const { selectedView } = this.state;
        return (
            <div className={classes.view}>
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container className={classes.display}>
                            <Grid item xs={6}>
                                <Typography variant="caption" gutterBottom align="left">
                                ကုန္ပစၥည္းအမည္
                                </Typography> 
                                <spam className={classes.spacing} /> 
                                <Typography variant="title" align="left">
                                    {data.title}
                                </Typography>                             
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" gutterBottom align="left">
                                ကုန္ပစၥည္းအတိုင္းအတာယူနစ္
                                </Typography>
                                <spam className={classes.spacing} />
                                <Typography variant="title" align="left">
                                    {data.unit}
                                </Typography>
                            </Grid>  
                            <Grid item xs={6}>
                                <Typography variant="caption" gutterBottom align="left">
                                လက္ရွိေရာင္းေစ်း
                                </Typography>
                                <spam className={classes.spacing} /> 
                                <Typography variant="title" align="left">
                                {
                                    (typeof data.price !== 'undefined') && (typeof data.price[data.price.length-1] !== 'undefined') && (
                                        <div>
                                             {data.price[data.price.length-1].sprice}   က်ပ္
                                        </div>
                                    )                                   
                                }
                              
                                </Typography>
                            </Grid>    
                            <Grid item xs={6}>
                                <Typography variant="caption" gutterBottom align="left">
                                ၀ယ္ေစ်း
                                </Typography>
                                <spam className={classes.spacing} />
                                <Typography variant="title" align="left">
                                {
                                    (typeof data.price !== 'undefined') && (typeof data.price[data.price.length-1] !== 'undefined') && (
                                        <div>
                                             {data.price[data.price.length-1].bprice}  က်ပ္
                                        </div>
                                    )
                                }
                               
                                </Typography>
                            </Grid>  
                            <Grid item xs={6}>
                                <Typography variant="caption" gutterBottom align="left">
                                စုစုေပါင္းတန္ဖိုး
                                </Typography>
                                <spam className={classes.spacing} />
                                <Typography variant="title" align="left">
                                    {data.totalPirce} က်ပ္
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={4}>
                      
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.viewSettingButton}>                   
                                        <spam className={classes.bpacing}/>
                                        <IconButton variant="fab" className={classes.addButton}>
                                            <PrintIcon />
                                        </IconButton>
                                        </div>
                                    </Grid>    
                                </Grid>
                            </Grid>  
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>                        
                        <AppBar position="static"
                        classes={{
                            root:classes.viewTab,
                        }}
                        >
                            <Tabs value={selectedView}>
                                <Tab label="အေရာင္းစာရင္း" onClick={e=>this.handleChange(0)}/>
                                <Tab label="အ၀ယ္စာရင္း" onClick={e=>this.handleChange(1)}/>
                                <Tab label="ေရာင္းေစ်း ၊ ၀ယ္ေစ်း" onClick={e=>this.handleChange(2)}/>
                            </Tabs>
                        </AppBar>    
                        {selectedView === 0 && 
                        <TabContainer>
                            <LineChart width={600} height={200} data={data.price}
                            margin={{top: 5, right: 30, left: 30, bottom: 5}}    
                            >
                            <XAxis dataKey="date"/>                            
                            <Tooltip/>
                            <Line type="monotone" dataKey="sprice" stroke="#82ca9d" />
                            </LineChart> 
                        </TabContainer>}
                        {selectedView === 1 && <TabContainer>
                            <LineChart width={600} height={200} data={data.price}
                            margin={{top: 5, right: 30, left: 30, bottom: 5}}    
                            >
                            <XAxis dataKey="date"/>                            
                            <Tooltip/>
                            <Line type="monotone" dataKey="bprice" stroke="#8884d8" />
                            </LineChart> 
                        </TabContainer>}
                        {selectedView === 2 && <TabContainer>
                            <LineChart width={600} height={200} data={data.price}
                            margin={{top: 5, right: 30, left: 30, bottom: 5}}    
                            >
                            <XAxis dataKey="date"/>                            
                            <Tooltip/>
                            <Line type="monotone" dataKey="sprice" stroke="#8884d8" />
                            <Line type="monotone" dataKey="bprice" stroke="#82ca9d" />
                            </LineChart> 
                        </TabContainer>}
                             
                      </Grid>
                </Grid>
            </div>
        )
    }
}

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }




export default connect(mapStateToProps, { readWarehouse, addWarehouse})(withStyles(styles)(WarehouseContent))