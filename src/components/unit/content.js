import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect }  from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Loop';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    root: {
        flexGrow: 1,        
    },
    grow: {
        flexGrow: 1,
    },
    Onroot:{
        marginLeft: theme.spacing.unit*30,
        backgroundColor:'#fee',
    },
    Offroot:{
       marginLeft: theme.spacing.unit*8,
    },
     toolBar:{
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
    box:{
        padding: theme.spacing.unit*5,
    },
    unitShow:{
        width: '50hw',
        height:'50vh',
        backgroundColor: 'red',
    },
    card: {
        maxWidth: '50hw',
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
    card2:{
        width:'auto',
        height:'auto',
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
    },
    gridList:{
        padding: theme.spacing.unit*5,
        width: '100%',
        height: '70vh',
    },
    unitField:{
        paddingBottom: theme.spacing.unit*2,
    },
    sweetLoading:{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

//http://localhost:8081/api/v1/unit
class Unit extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,          
            error: null,
            units:[],
        }
        this.fetchUnits=this.fetchUnits.bind(this)
    } 
    componentDidMount() {
        this.fetchUnits();
    }
    fetchUnits(){
        axios.get('http://localhost:8081/api/v1/unit',{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            //console.log(" response Unit data ", res.data.data)
            this.setState({units:res.data.data})
        }).then(data=>{
            this.setState({isLoading:false})
            //console.log(" response isloaing false dat")
        })
    }
    render(){
        const { isLoading,units, error } = this.state;       
        const { classes , menuToggle } = this.props;
        return(
            <div>
                {!this.state.isLoading ? (
                            <UnitContent classes={classes} units={this.state.units}/>
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





class UnitContent extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0,
            units:this.props.units,
            nunit:"",
            dunit:null, // Delete Unit Selection
            mappedUnit:"",
            mappedCross:0,
            addBoxShow:false,
            deleteBoxShow:false,
            snackOpen:false,
            snackMessage:"",
            snackCode:0,
        }        
        this.handleBack=this.handleBack.bind(this)
        this.handleForward=this.handleForward.bind(this)
        this.addNewUnit=this.addNewUnit.bind(this)
        this.handleNewUnit=this.handleNewUnit.bind(this)
        this.handleDeleteBox=this.handleDeleteBox.bind(this) // DeleteBox is for Converter Unit Only
        this.handleDeleteBoxConfrim=this.handleDeleteBoxConfrim.bind(this)
        this.handleSnack=this.handleSnack.bind(this)
        this.deleteUnit=this.deleteUnit.bind(this)
        this.refresh=this.refresh.bind(this)
        this.handleAddBox=this.handleAddBox.bind(this)
        this.handleSelectChange=this.handleSelectChange.bind(this)
        this.handleCorssChange=this.handleCorssChange.bind(this)
        this.addNewBox=this.addNewBox.bind(this)
    } 
    handleBack(){
        if ( this.state.selectedIndex == 0 ){
            this.setState({selectedIndex:this.state.units.length-1})
        }else{
            this.setState({selectedIndex:this.state.selectedIndex-1})
        }
    }
    handleForward(){
        if ( this.state.selectedIndex == this.state.units.length-1 ){
            this.setState({selectedIndex:0})
        }else{
            this.setState({selectedIndex:this.state.selectedIndex+1})
        }
    } 

    handleDeleteBox(value){   
        this.setState({dunit:value})    
        this.setState({deleteBoxShow:!this.state.deleteBoxShow})
    }
    handleDeleteBoxConfrim(){
       //Fetch API
        const params = {
            name:this.state.dunit.name,
            //mid - automatic fill from server-side
            cross:"",
            map:this.state.units[this.state.selectedIndex].name,
        };
        axios.post('http://localhost:8081/api/v1/unit/delete/converter',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            this.setState({snackMessage:res.data.message})
            this.setState({snackOpen:!this.state.snackOpen})
        }) 
       this.setState({deleteBoxShow:!this.state.deleteBoxShow})
    }

    handleAddBox(){
        this.setState({addBoxShow:!this.state.addBoxShow})
    }
    handleNewUnit(event){
        // New Unit Name - nunit
        this.setState({nunit: event.target.value});
    }
    addNewUnit(){
       // fetch API
        const params = {
            name:this.state.nunit,   
	        count:"၁",     
        };
        axios.post('http://localhost:8081/api/v1/unit',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            //this.refresh()
            this.setState({snackMessage:res.data.message})
            this.setState({snackOpen:!this.state.snackOpen})
        })  
    }
    deleteUnit(){
        const requnit=this.state.units[this.state.selectedIndex]
        const params = {
            id:requnit._id,
            name:requnit.name,
            count:requnit.count,
            converters:requnit.converters,
        };
        axios.post('http://localhost:8081/api/v1/delete/unit',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            console.log(" Delete Old Unit ", res.data)
            this.setState({snackMessage:res.data.message})
            this.setState({snackOpen:!this.state.snackOpen})
        }) 
    }
    refresh() {
        window.location.reload();
    }

    handleSnack(){
        this.setState({snackOpen:!this.state.snackOpen})
    }
   
    handleSelectChange(event){
        this.setState({mappedUnit:event.target.value})
    }
    handleCorssChange(event){
        if (event.target.value > 0){
            this.setState({mappedCross:event.target.value})
        }
    }
    addNewBox(){
        // fetch API
        const params = {
            name:this.state.mappedUnit,
            //mid - automatic fill from server-side
            cross:this.state.mappedCross,
            map:this.state.units[this.state.selectedIndex].name,
        };
        axios.post('http://localhost:8081/api/v1/unit/add/converter',params,{
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            this.setState({snackMessage:res.data.message})
            this.setState({snackOpen:!this.state.snackOpen})
        }) 
        this.setState({addBoxShow:!this.state.addBoxShow})
    }

    render(){        
        const {units} =this.state;
        const selectedUnit = units[this.state.selectedIndex];
        const { classes } = this.props;
        return(
            <div className={classes.root}>             
                <div className={classes.box}>
                    <Grid container>
                        <Grid item md={4}> 
                            <Grid container spacing={8}>
                                <Grid item xs={6} sm={6} md={6} align="left">
                                        <Button                                        
                                            onClick={this.handleBack}
                                            variant="outlined" color="primary"
                                            >
                                           အနောက်သို့
                                        </Button>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} align="right">
                                        <Button                                                                                       
                                            onClick={this.handleForward}
                                            variant="outlined" color="primary"
                                            >
                                            အရှေ့သို့
                                        </Button>
                                </Grid>
                                <Grid item md={12}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="title" align="center">
                                                    {selectedUnit.count}
                                                </Typography>
                                                <br />

                                                <Typography gutterBottom variant="h2" align="center">
                                                    {selectedUnit.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>    
                                </Grid>
                                <Grid item md={12}>
                                    <Grid container>
                                        <Grid item md={12} >
                                            <TextField
                                            label="အတိုင်းအတာယူနစ်"
                                            onInput={this.handleNewUnit}
                                            //defaultValue="Default Value"
                                            className={classes.unitField}
                                            helperText="၁ ယူနစ်စံချိန်နှုန်းဖြင့် တိုင်းတာသည်"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.nunit}
                                            fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} align="center">
                                            <Button variant="outlined" color="primary" onClick={this.addNewUnit}>
                                                ယူနစ်အသစ်ထည့်မည်
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} align="center">
                                            <Button variant="outlined" color="secondary" onClick={this.deleteUnit}>
                                                ယူနစ်အားဖျက်မည်
                                            </Button>
                                        </Grid>
                                    </Grid>
                                   
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={8}>
                            <GridList className={classes.gridList} cellHeight="130" spacing={8} cols={4}>
                                    <div>
                                    <Card className={classes.card2}>
                                    <CardActionArea onClick={this.handleAddBox}>
                                        <CardContent>
                                            <Typography variant="h6" align="center">
                                                    ပြောင်းလဲနှုန်း
                                            </Typography>
                                            <Typography color="primary" variant="h2" align="center">
                                                +
                                            </Typography>
                                        </CardContent> 
                                    </CardActionArea>                                                
                                    </Card>  
                                    </div>                              
                                {                                  
                                  selectedUnit.converters!=null && (
                                    selectedUnit.converters.map((item,i) => (
                                        <div key={i}>
                                           <Card className={classes.card2}>
                                           <CardActionArea onClick={e=>this.handleDeleteBox(item)}>
                                               <CardContent>
                                                   <Typography gutterBottom variant="h5" align="center">
                                                       {item.name}
                                                   </Typography>
                                                   <Typography gutterBottom variant="h4" align="center">
                                                       {item.cross}
                                                   </Typography>
                                               </CardContent>   
                                           </CardActionArea>                                          
                                           </Card>                                                
                                       </div>
                                    ))
                                  )                                  
                                }                                                                         
                                
                            </GridList>
                        </Grid>
                    </Grid>
                </div>
                <Dialog
                open={this.state.deleteBoxShow}
                onClose={this.handleDeleteBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"ပြောင်းလဲနှုန်းထားအား ပယ်ဖျက်လိုပါသလား"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {
                        this.state.dunit !=null && (
                            <div>
                                ၁ {selectedUnit.name} ={this.state.dunit.cross} {this.state.dunit.name} အတိုင်းအတာယူနစ်ရှိသည်။
                            </div>
                        )
                    }                  
                    </DialogContentText>
                </DialogContent>
                <DialogActions>                   
                    <Button onClick={this.handleDeleteBox} color="secondary">
                    ပယ်မဖျက်ပါ
                    </Button>
                    <Button onClick={this.handleDeleteBoxConfrim} color="primary">
                    ပယ်ဖျက်မည်
                    </Button>
                </DialogActions>
                </Dialog>
                <Dialog
                open={this.state.addBoxShow}
                onClose={this.handleAddBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"ပြောင်းလဲနှုန်းထားအသစ် ထည့်လိုပါသလား"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Select
                                
                                value={this.state.mappedUnit}
                                onChange={this.handleSelectChange}
                                inputProps={{
                                    name: 'age',
                                    padding:'2%',
                                }}
                                fullWidth
                            >    
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>  
                            {
                                this.state.units.map((item,i) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))
                            }
                            </Select>
                        </Grid>
                        <Grid item md={12}>
                        <TextField
                            //id="standard-number"
                            label="အချိန်အဆ"
                            value={this.state.mappedCross}
                            onChange={this.handleCorssChange}
                            type="number"
                           // className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                                padding:'2%',
                            }}
                            margin="normal"
                            fullWidth
                        />
                        </Grid>
                    </Grid>
                          
                </DialogContentText>
                </DialogContent>
                <DialogActions>                   
                    <Button onClick={this.handleAddBox} color="secondary">
                    မထည့်ပါ
                    </Button>
                    <Button onClick={this.addNewBox} color="primary">
                    ထည့်မည်
                    </Button>
                </DialogActions>
                </Dialog>        

                <Snackbar                    
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                   // style={{backgroundColor:'blue'}}
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
                        </Button>,
                        <IconButton
                           color="inherit"
                          onClick={this.handleSnack}
                        >
                          <CloseIcon />
                        </IconButton>,
                        
                      ]}
                />   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuToggle : state.MenuToggle
    };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Unit))