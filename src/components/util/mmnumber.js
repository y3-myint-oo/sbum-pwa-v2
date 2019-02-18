import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
//Myanmar Font
import myanmar from 'myanmar-tools';
const detector = new myanmar.ZawgyiDetector();
const converter = new myanmar.ZawgyiConverter();
//const converter.unicodeToZawgyi

const styles = theme => ({
    nav:{
        minHeight:'100vh',         
        [theme.breakpoints.down('sm')]: {
            //backgroundColor: 'red !important',
            minHeight:'150vh',  
        },
    },
});

class MMTextField extends Component{
    
    constructor(props){
        super(props);
        this.state={
           text:"",
        }
        this.handleFont = this.handleFont.bind(this)
    } 
    
    handleFont(event){
        //၂၀၁၈ 
        let score = detector.getZawgyiProbability(event.target.value)
        let puretext = event.target.value
        console.log(" ---- Score ----- ", score)

        if ( score > 0.9){
            console.log(" ---- Input Font ----- Zaw Gyi")
            puretext = converter.zawgyiToUnicode(event.target.value)
        }else {
            console.log(" ---- Input Font ----- UniCode")
        }        
        console.log(" ---- MM ZawGyi -> Unicode converted ---- ", puretext);


        // Convert MM Number ( Unicode ) to English Number
        // Myanmar MM Number Range - 4160 <-> 4169,
        
        let eng_code=""
        for (var i=0;i<puretext.length;i++){
            let code= puretext.charCodeAt(i)
            if (code >= 4160 && code<=4169){               
                switch(code){
                    case 4160:
                        eng_code=eng_code+"0"                        
                    break;
                    case 4161:
                        eng_code=eng_code+"1"
                    break;
                    case 4162:
                        eng_code=eng_code+"2"
                    break;
                    case 4163:
                        eng_code=eng_code+"3"
                    break;
                    case 4164:
                        eng_code=eng_code+"4"
                    break;
                    case 4165:
                        eng_code=eng_code+"5"
                    break;
                    case 4166:
                        eng_code=eng_code+"6"
                    break;
                    case 4167:
                        eng_code=eng_code+"7"
                    break;
                    case 4168:
                        eng_code=eng_code+"8"
                    break;
                    case 4169:
                        eng_code=eng_code+"9"
                    break; 
                }
            } 
        }
        console.log(" Eng number ", eng_code)  
        console.log(" Eng Number x 2 ", Number(eng_code)*2)            
        this.setState({text: puretext});
    }
    
    render(){
        const {classes, ...other} = this.props
        return(
            <TextField 
                {...other}
                onChange={this.handleFont}
                type="text"
                value={this.state.text}
            />
        )
    }
}
export default withStyles(styles)(MMTextField);