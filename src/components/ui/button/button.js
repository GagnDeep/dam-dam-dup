import React, {Component} from 'react';
import classes from './button.module.css';

class Button extends Component{
    render(){
        let content=null;
        
        if(this.props.children) content = <p>{this.props.children}</p>
            
        if(this.props.playerValues) content = renderSetupArr(this.props);
        
        if(this.props.playerObj) content = renderGameScreen(this.props);
        
        return (
            
               <div className = {classes.Button} onClick = {this.props.listener}>
                    {content}
               </div>
        );
    }
   
}

function renderGameScreen(props){
    let arr;
    let playerAlreadyClicked = props.playerOkayed.indexOf(props.playerObj.id)
    if(playerAlreadyClicked === -1){
        arr = (
            <div className = {classes.coveringDiv}>
                <p className = {classes.playerId}>{props.playerObj.id}</p>
                <button onClick = {()=>props.handClickedHandler('hand1', props.playerObj.id)} disabled = {props.playerObj.hand1}> 
                    5
                </button>
                <button onClick = {()=>props.handClickedHandler('hand2', props.playerObj.id)} disabled = {props.playerObj.hand2}> 
                    5
                </button>
                <div onClick = {()=>props.okClickedHandler(props.playerObj.id)} className={classes.Done}>Done?</div>
            </div>
            
        )}else{
            arr = (
                <div className = {classes.coveringDiv}>
                    <p className = {classes.playerId}>{props.playerObj.id}</p>
                    <div className = {classes.state}>{(playerAlreadyClicked > -1)?
                            <p>Done</p>:null
                    }</div>
                </div>
            );
        };
    
    return arr;
}

function renderSetupArr(props){
    let arr = [];
        const obj = props.playerValues;
        
        if(!props.config[props.id]){
            for(let el in obj)
                    if(!obj[el]) arr.push((<button 
                                            onClick = {()=>props.listenerInside(props.id, el)}
                                            disabled = {props.disabled}
                                            key = {el+props.id}>{el}</button>));
        }else{
            arr = <p style = {{fontSize:'1rem'}}>{props.id} - {props.config[props.id]}</p> 
        }
    return arr;
}


export default Button;