import React, { Component } from 'react';
import { withStyles, Icon } from '@material-ui/core';
import { connect }  from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Blocked from '../util/blocked';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import InIcon from '@material-ui/icons/ShowChart';
import BSIcon from '@material-ui/icons/Class';
import OutIcon from '@material-ui/icons/TrendingDown';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Timeline from 'react-time-line';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import TopIcon from '@material-ui/icons/KeyboardArrowUp';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
//import 'react-vertical-timeline-component/style.min.css';
import dateFns from "date-fns";
import './Calendar.css';

const styles = theme => ({
    fab: {
         backgroundColor: theme.palette.background.paper,
         color:"#357a38",
         boxShadow: '0px 0px 0px 0px rgba(255, 105, 100, .7)',
     },
     Onroot:{
        marginLeft: theme.spacing.unit*30,
        backgroundColor:'#fee',
    },
    Offroot:{
       marginLeft: theme.spacing.unit*8,
    },
    display:{
        padding: theme.spacing.unit*5,

    },
    card:{
        boxShadow: '0px 0px 10px 0px rgba(76,175,80, .9)',
        maxWidth: '200',
        height: '200',
    },
    icon:{
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        paddingLeft: theme.spacing.unit*2,
        position: 'relative',
        margin: theme.spacing.unit,
        width:'100%',
        height:'75vh',
        boxShadow: '0px 0px 0px 0px rgba(76,175,80, 1)',
    },
    button:{
        marginLeft: theme.spacing.unit,
        padding:theme.spacing.unit,
    },
    arrow:{
        margin: theme.spacing.unit,
    },
    activityGridList:{
        display:'block',
        width: '100%',
        height: theme.spacing.unit*55,     
        paddingTop:theme.spacing.unit*3,
    },
    
});

class Financial extends Component{
    render(){
        console.log( )
        const { classes , menuToggle } = this.props;
        return (
            <FinancialContent classes={classes} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuToggle : state.MenuToggle
    };
}

class FinancialContent extends Component{
    constructor(props){
        super(props);
        this.state={
           currentView:0,
        }        
        this.handleSwapView=this.handleSwapView.bind(this)
    }         
    handleSwapView(value){
        this.setState({currentView:value})
    }
    render(){
        const { classes } = this.props;
        return(
            <div>                    
                <Grid container className={classes.display}>
                    <Grid item xs={12} ms={3} md={2}>
                        <Grid container spacing={8}
                        align="center"
                        justify="center"
                        alignItems="center"
                      >
                             <Grid item xs={12}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(0)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <InIcon color='primary' fontSize='large'/>                                            
                                        </div>                                        
                                        <Typography variant="h5" color="primary" gutterBottom>
                                                ၀င်ငွေ
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>    
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(1)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <OutIcon color='primary' fontSize='large'/>                                            
                                        </div>                                        
                                        <Typography variant="h5" color="primary" gutterBottom>
                                                ထွက်ငွေ
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>    
                            </Grid> 
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                <CardActionArea onClick={e=>this.handleSwapView(2)}>
                                    <CardContent>
                                        <div className={classes.icon}>
                                            <BSIcon color='primary' fontSize='large'/>                                            
                                        </div>                                        
                                        <Typography variant="h5" color="primary" gutterBottom>
                                                စာရင်း
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>    
                                </Card>    
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={9} md={10}>
                        {this.state.currentView == 0  && (
                            <IncomeStatementContent classes={classes} />
                        )}
                        {this.state.currentView == 1 && (
                            <CashFlowContent classes={classes} />
                        )}
                        {this.state.currentView == 2 && (
                            <BalanceSheetContent classes={classes} />
                        )}
                    </Grid>
                </Grid>    
            </div>    
        )
    }
}

const events = [
    {ts: "2017-09-17T12:22:46.587Z", text: 'ကုန်ပစွည်းရောင်းချသည်, ပမာဏ ၂၀၀၀၀၀ ကျပ်'},
    {ts: "2017-09-17T12:21:46.587Z", text: 'ကုန်ပစွည်းရောင်းချသည်, ပမာဏ ၂၀၀၀ ကျပ်'},
    {ts: "2017-09-17T12:20:46.587Z", text: 'ကုန်ပစွည်းရောင်းချသည်, ပမာဏ ၂၀၀၀ ကျပ်'},
    {ts: "2017-09-16T12:22:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၄၀၀၀ ကျပ်'},
    {ts: "2017-09-16T12:21:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၄၇၀၀၀ ကျပ်'},
    {ts: "2017-09-16T12:20:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၁၀၉ ကျပ်'},
    {ts: "2017-07-16T12:22:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၄၀၀၀ ကျပ်'},
    {ts: "2017-07-16T12:21:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၄၇၀၀၀ ကျပ်'},
    {ts: "2017-06-16T12:20:46.587Z", text: 'ကုန်ပစွည်းငှားရမ်းခ, ပမာဏ ၁၀၉ ကျပ်'},
  ];
class IncomeStatementContent extends Component{
    constructor(props){
        super(props);
        this.state={
           currentView:0,
        }        
        this.handleSwapView=this.handleSwapView.bind(this)
    } 
    handleSwapView(value){
        this.setState({currentView:value})
    }
    render(){
        const { classes } = this.props;
        
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12} align="right">
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(0)}>
                            နေ့စဥ်
                        </Button> 
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(1)}>
                            လစဥ်
                        </Button> 
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(2)}>
                            နှစ်စဥ်
                        </Button> 
                    </Grid>
                    <Grid item xs={12}>
                      
                        {this.state.currentView ==0 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                            <Paper className={classes.paper}>                                   
                                <CalendarDay classes={classes}/>
                            </Paper>
                            </Slide>
                        )}
                        {this.state.currentView ==1 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                <Paper className={classes.paper}>     
                                        <CalendarMonth classes={classes} />
                                </Paper>
                            </Slide>
                           
                        )} 
                         {this.state.currentView ==2 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                <Paper className={classes.paper}>     
                                        <CalendarYear classes={classes} />
                                </Paper>
                            </Slide>
                        )}

                        
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

class CashFlowContent extends Component{
    constructor(props){
        super(props);
        this.state={
           currentView:0,
        }        
        this.handleSwapView=this.handleSwapView.bind(this)
    } 
    handleSwapView(value){
        this.setState({currentView:value})
    }
    render(){
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12} align="right">
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(0)}>
                            နေ့စဥ်
                        </Button> 
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(1)}>
                            လစဥ်
                        </Button> 
                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(2)}>
                            နှစ်စဥ်
                        </Button> 
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.currentView ==0 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                            <Paper className={classes.paper}>                                   
                                <CalendarDay classes={classes} flag={true}/>
                            </Paper>
                            </Slide>
                        )}
                        {this.state.currentView ==1 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                <Paper className={classes.paper}>     
                                        <CalendarMonth classes={classes} flag={true}/>
                                </Paper>
                            </Slide>
                           
                        )} 
                         {this.state.currentView ==2 &&(
                            <Slide direction="left" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                <Paper className={classes.paper}>     
                                        <CalendarYear classes={classes} flag={true} />
                                </Paper>
                            </Slide>
                        )}
                    </Grid>
                </Grid>
            </Grid>   
        )
    }
}

class BalanceSheetContent extends Component{
    constructor(props){
        super(props);
        this.state={
           currentCate:0,
           currentView:0,
           currentDate:new Date(),
        }        
        this.handleSwapView=this.handleSwapView.bind(this)
        this.handleSwapCate=this.handleSwapCate.bind(this)
    }
    handleSwapCate(value){
        this.setState({currentCate:value})
    } 
    handleSwapView(value){
        this.setState({currentView:value})
    }

    prev = () => {
        switch(this.state.currentView){
            case 0:
            return  this.setState({
                    currentDate: dateFns.subDays(this.state.currentDate, 1)
                });                
            case 1:
            return  this.setState({
                    currentDate: dateFns.subMonths(this.state.currentDate, 1)
                });
            case 2:
            return  this.setState({
                    currentDate: dateFns.subYears(this.state.currentDate, 1)
                });
        }
       
    }
    next = () => {
        switch(this.state.currentView){
            case 0:
            return  this.setState({
                    currentDate: dateFns.addDays(this.state.currentDate, 1)
                });
            case 1:
            return  this.setState({
                    currentDate: dateFns.addMonths(this.state.currentDate, 1)
                });
            case 2:
            return  this.setState({
                    currentDate: dateFns.addYears(this.state.currentDate, 1)
                });
        }        
    }

    render(){
        const dateFormatHeader = ["DD MMM YYYY"," MMM YYYY","YYYY"];
        const { classes } =this.props;
        return(
            <div>
                <Grid container spacing={8}>
                        <Grid item md={12} style={{paddingBottom:50,paddingLeft:30}}>
                            <Grid  container >
                                <Grid item md={6} align="left">
                                    <div style={{display:"flex",width:'100%'}}>
                                        <Typography variant="h5" onClick={e=>this.handleSwapCate(0)}
                                        color={
                                           this.state.currentCate==0 ? "primary":"" 
                                        }
                                        style={{cursor:'default'}}
                                        >
                                            ငွေသားတန်ဖိုး
                                        </Typography> 
                                        <Typography variant="h5">
                                        &nbsp;၊&nbsp;
                                        </Typography>
                                        <Typography   variant="h5" onClick={e=>this.handleSwapCate(1)}
                                        color={
                                            this.state.currentCate==1 ? "primary":"" 
                                        }
                                        style={{cursor:'default'}}
                                        >
                                            ပစ္စည်းတန်ဖိုး
                                        </Typography>  
                                    </div>                   
                                </Grid>
                                <Grid item md={6} align="right">
                                    <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(0)}>
                                        နေ့စဥ်
                                    </Button> 
                                    <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(1)}>
                                        လစဥ်
                                    </Button> 
                                    <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={e=>this.handleSwapView(2)}>
                                        နှစ်စဥ်
                                    </Button> 
                                </Grid>                               
                            </Grid>
                        </Grid>
                        <Grid item md={5}>
                            <Grid container>
                                <Grid item item md={12} >
                                        <Grid container  align="center">
                                            <Grid item md={4} align="left">
                                                <IconButton>
                                                    <LeftIcon fontSize="large" onClick={this.prev}/>
                                                </IconButton>
                                            </Grid>
                                            <br />
                                            <Grid item md={4} align="center">
                                                <Typography variant="h5" >                                                    
                                                    {dateFns.format(this.state.currentDate,dateFormatHeader[this.state.currentView])}
                                                </Typography>   
                                            </Grid>
                                            <Grid item md={4} align="right">
                                                <IconButton>
                                                    <RightIcon fontSize="large" onClick={this.next}/>
                                                </IconButton>     
                                            </Grid>
                                        </Grid>
                                </Grid>
                                
                                        {
                                            this.state.currentCate == 0 &&(
                                                <div>
                                                    <Grid item md={12}>  
                                                    <Slide direction="up" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                                            <paper>
                                                                <div style={{padding:20}}> 
                                                                    
                                                                <Typography variant="subheading" >
                                                                ၀င်ငွေ
                                                                </Typography>
                                                                <Typography variant="h4"
                                                                color="primary"
                                                                >
                                                                    ၁၂၈၃၈၄၇၁
                                                                </Typography>
                                                                <br />
                                                                <Typography variant="caption" style={{color:'blue',cursor:'help'}}>
                                                                စာရင်းကြည့်မည်
                                                                </Typography>
                                                                </div>                                        
                                                            </paper>
                                                        </Slide>
                                                    </Grid>  
                                                    <Grid item md={12}>
                                                        <Slide direction="up" style={{ trgotoUpansitionDelay: false ? '500ms' : '0ms' }} in={true} mountOnEnter unmountOnExit>
                                                            <paper>
                                                                <div style={{padding:20}}> 
                                                                <Typography variant="subheading" >
                                                                ထွက်ငွေ
                                                                </Typography>
                                                                <Typography variant="h4" 
                                                                color="secondary"
                                                                >
                                                                    ၃၀၈၁၈၀
                                                                </Typography>
                                                                <br />
                                                                <Typography variant="caption" style={{color:'blue',cursor:'help'}}>
                                                                စာရင်းကြည့်မည်
                                                                </Typography>
                                                                </div>                                        
                                                            </paper>
                                                        </Slide>
                                                    </Grid>
                                                </div>
                                            )
                                        }  
                                        {
                                            this.state.currentCate == 1 &&(
                                                <div>
                                                    Categories
                                                </div>
                                            )
                                        }                                            
                            </Grid>            
                        </Grid>

                        <Grid item md={7}>
                            {
                                this.state.currentView == 0 &&  (
                                    <Blocked msg="ယနေ့အတွက် အကြွေးစာရင် မှတ်စု မရှိပါ" dec="" />  
                                )
                            }
                            {
                                this.state.currentView == 1 && (
                                    <div>
                                       <CalendarMonthWithout currentMonth={this.state.currentDate}/>
                                    </div>
                                )
                            }
                           
                        </Grid>
                       
                </Grid>
            </div>    
        )
    }
}

const loan = [
    {date:"12 Dec 2018"},
]

class CalendarMonthWithout extends Component {
    constructor(props){
        super(props);
        this.state={
          //  currentMonth: this.props.selectedMonth,
            selectedDate: new Date()
        }        
        this.renderCalendar=this.renderCalendar.bind(this);
    }         
    renderCalendar() {
        const { classes,flag } = this.props;
        const dateFormatHeader = "MMMM YYYY";
        const dayFormat = "ddd";
        const daysHeader = [];
        let startDateHeader = dateFns.startOfWeek(this.props.currentMonth);
        for (let i = 0; i < 7; i++) {
            daysHeader.push(
              <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDateHeader, i), dayFormat)}
              </div>
            );
        }

        //Cells
        const { selectedDate } = this.state;
        const { currentMonth } = this.props;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              formattedDate = dateFns.format(day, dateFormat);
              const cloneDay = day;
              console.log(" ------------- day format ", dateFns.format(cloneDay,"D MMM YYYY"))
              days.push(
                <div
                  className={`col cell ${
                    !dateFns.isSameMonth(day, monthStart)
                      ? "disabled"
                      : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                >
                  <div className="col col-center">{formattedDate}</div>
                 
                </div>
              );
              day = dateFns.addDays(day, 1);
            }
            rows.push(
              <div className="row" key={day}>
                {days}
              </div>
            );
            days = [];
        }

        return (
            <Grid container>               
                <Grid item md={12}>
                    <div className="days row">{daysHeader}</div>
                    <div className="calendar">{rows}</div>
                </Grid>
            </Grid>
        )

    }
    
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }


    render() {
      return (
        <div>
            {this.renderCalendar()}                  
        </div>
      );
    }
}

class CalendarMonth extends Component {
    constructor(props){
        super(props);
        this.state={
            currentMonth: new Date(),
            selectedDate: new Date()
        }        
        this.renderCalendar=this.renderCalendar.bind(this);
    }         
    renderCalendar() {
        const { classes,flag } = this.props;
        const dateFormatHeader = "MMMM YYYY";
        const dayFormat = "ddd";
        const daysHeader = [];
        let startDateHeader = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            daysHeader.push(
              <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDateHeader, i), dayFormat)}
              </div>
            );
        }

        //Cells
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              formattedDate = dateFns.format(day, dateFormat);
              const cloneDay = day;
              const checkLoan = dateFns.format(cloneDay, "D MMM YYYY")
              console.log(" ------------ ", checkLoan)
              days.push(
                <div
                  className={`col cell ${
                    !dateFns.isSameMonth(day, monthStart)
                      ? "disabled"
                      : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                >
                  <div className="col col-center">{formattedDate}</div>
                 
                </div>
              );
              day = dateFns.addDays(day, 1);
            }
            rows.push(
              <div className="row" key={day}>
                {days}
              </div>
            );
            days = [];
        }

        return (
            <Grid container>
                <Grid item md={4} align="center">
                    <IconButton>
                        <TopIcon fontSize="large" onClick={this.prevMonth}/>
                    </IconButton> 
                    <br />
                    <Typography variant="title" >
                        <span>
                        {dateFns.format(this.state.currentMonth, dateFormatHeader)}
                        </span>
                    </Typography>
                    <br />
                    <Typography variant="title" >
                        {
                            !flag && (
                                <spam>
                                    စုစုပေါင်း၀င်ငွေ   
                                </spam>
                            )
                        }
                        {
                            flag && (
                                <spam>
                                    စုစုပေါင်းထွက်ငွေ   
                                </spam>
                            )
                        }
                    </Typography>
                    <br />
                    <Typography variant="h3" 
                    color={ !flag ? "primary":"secondary"}
                    >
                        ၂၀၁၃၄၂၀၀
                    </Typography>
                    <br />
                    <Typography variant="subtitle" >
                        ကျပ်
                    </Typography>
                    <IconButton>
                        <DownIcon fontSize="large" onClick={this.nextMonth}/>
                    </IconButton> 
                </Grid>
                <Grid item md={8}>
                    <div className="days row">{daysHeader}</div>
                    <div className="calendar">{rows}</div>
                </Grid>
            </Grid>
        )

    }
    
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }


    render() {
      return (
        <div>
            {this.renderCalendar()}                  
        </div>
      );
    }
}


class CalendarDay extends Component {
    constructor(props){
        super(props);
        this.state={
            currentMonth: new Date(),
            selectedDate: new Date(),
            currentDate: new Date(),
        }        
        this.renderCalendar=this.renderCalendar.bind(this);
    }         
    renderCalendar() {
        const { classes, flag } = this.props;
        const dateFormatHeader = "D MMMM YYYY";
        return (
            <Grid container>
                <Grid item md={4} align="center">
                    <IconButton>
                        <TopIcon fontSize="large" onClick={this.prevMonth}/>
                    </IconButton> 
                    <br />
                    <Typography variant="title" >
                        <span>
                        {dateFns.format(this.state.currentDate, dateFormatHeader)}
                        </span>
                    </Typography>
                    <br />
                    <Typography variant="title" >
                        {
                            !flag && (
                                <spam>
                                    စုစုပေါင်း၀င်ငွေ   
                                </spam>
                            )
                        }
                        {
                            flag && (
                                <spam>
                                    စုစုပေါင်းထွက်ငွေ   
                                </spam>
                            )
                        }
                       
                    </Typography>
                    <br />
                    <Typography variant="h3" 
                    color={ !flag ? "primary":"secondary"}
                    >
                        ၂၀၁၃၄၂၀၀
                    </Typography>
                    <br />
                    <Typography variant="subtitle" >
                        ကျပ်
                    </Typography>
                    <IconButton>
                        <DownIcon fontSize="large" onClick={this.nextMonth}/>
                    </IconButton> 
                </Grid>
                <Grid item md={8}>
                    <Typography variant="title" align="center">
                        စာရင်းမှတ်တမ်း
                    </Typography>
                    
                    <GridList cellHeight={200} spacing={25} cols={1} className={classes.activityGridList}>
                        <Timeline items={events} />
                    </GridList>                                             
                </Grid>
            </Grid>
        )

    }
    
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }
    nextMonth = () => {
        this.setState({
            currentDate: dateFns.addDays(this.state.currentDate, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentDate: dateFns.subDays(this.state.currentDate, 1)
        });
    }


    render() {
      return (
        <div>
            {this.renderCalendar()}                  
        </div>
      );
    }
}

class CalendarYear extends Component {
    constructor(props){
        super(props);
        this.state={
            currentMonth: new Date(),
            selectedDate: new Date(),
            currentYear:new Date(),
        }        
        this.renderCalendar=this.renderCalendar.bind(this);
    }         
    renderCalendar() {
        const { classes,flag } = this.props;
        const dateFormatHeader = "YYYY";
        return (
            <Grid container>
                <Grid item md={12} align="center">
                    <Grid container>
                        <Grid item md={4} align="left">
                            <IconButton>
                                <LeftIcon fontSize="small" onClick={this.prevYear}/>
                            </IconButton>
                        </Grid>
                        <Grid item md={4} align="center">
                            <Typography variant="h3" >
                                <span>
                                {dateFns.format(this.state.currentYear, dateFormatHeader)}
                                </span>
                            </Typography>   
                        </Grid>
                        <Grid item md={4} align="right">
                            <IconButton>
                                <RightIcon fontSize="small" onClick={this.nextYear}/>
                            </IconButton>     
                        </Grid>
                    </Grid>         
                    
                </Grid>
                <Grid item md={12} align="center">
                    <div style={{paddingTop:'10%'}}>
                    <Typography variant="title" >
                        {
                            !flag && (
                                <spam>
                                    စုစုပေါင်း၀င်ငွေ   
                                </spam>
                            )
                        }
                        {
                            flag && (
                                <spam>
                                    စုစုပေါင်းထွက်ငွေ   
                                </spam>
                            )
                        }
                       
                    </Typography>
                    <br />
                    <Typography variant="h3" 
                    color={ !flag ? "primary":"secondary"}
                    >
                        ၂၀၁၃၄၂၀၀
                    </Typography>
                        <br />
                        <Typography variant="title" >
                            ကျပ်
                        </Typography>
                    </div>
                </Grid>
                <Grid item md={12} align="center">
                    <div style={{paddingTop:'10%'}}>
                    Month
                    </div>
                </Grid>
              
            </Grid>
        )

    }
    
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }
    nextMonth = () => {
        this.setState({
            currentDate: dateFns.addDays(this.state.currentDate, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentDate: dateFns.subDays(this.state.currentDate, 1)
        });
    }

    nextYear = () => {
        this.setState({
            currentYear: dateFns.addYears(this.state.currentYear, 1)
        });
    }
    prevYear = () => {
        this.setState({
            currentYear: dateFns.subYears(this.state.currentYear, 1)
        });
    }

    render() {
      return (
        <div>
            {this.renderCalendar()}                  
        </div>
      );
    }
}



export default connect(mapStateToProps, null)(withStyles(styles)(Financial))