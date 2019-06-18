import React, {Component} from 'react';
import Button from './../../components/ui/button/button';
import ButtonContainer from './../../components/ui/button/buttonContainer';


class GameScreen extends Component{
    
    state = {
        playerProps: playerArrInit(this.props.config),
        playerOkayed: [],
        playerOut: [],
        winner: null
    }
    
    
    render(){
        
        const valueButtons = this.state.playerProps.map(el=>
                !this.state.playerOut.find(e=>e.id===el.id)?
                (<Button 
                    playerObj = {el} key = {el.id}
                    handClickedHandler = {this.handClickedHandler}
                    okClickedHandler = {this.okClickedHandler}
                    playerOkayed = {this.state.playerOkayed}
                    playerOut = {this.state.playerOut}></Button>):null);
        
        return (
            <ButtonContainer>
                {valueButtons}
            </ButtonContainer>
        );
    }
    
    handClickedHandler = (hand, id) => {
        let arr = [...this.state.playerProps];
        let i = arr.findIndex(el=>el.id === id);
        if(!arr[i][hand])
            arr[i][hand] = 5;
        else
            arr[i][hand] = 0;
        
        this.setState({playerProps: arr});
    }
    
    okClickedHandler = (id)=>{
        let arr = [...this.state.playerProps];
        let i = arr.findIndex(el=>el.id === id);
        arr[i].val = arr[i].hand1 +arr[i].hand2;
        
        let playerOkayed = [...this.state.playerOkayed];
        playerOkayed.push(id);

        this.setState({playerProps: arr, playerOkayed: playerOkayed});
        if(playerOkayed.length === this.props.players-this.state.playerOut.length) this.stateReset()
    }
    
    stateReset = ()=>{
        let arr             = {...this.state},
            val             = arr.playerProps.reduce((acc,curr)=>acc+curr.val, 0),
            playerOut       = arr.playerProps.find(el=>+el.choosenNum === val),
            playerOutArr    = [...arr.playerOut];
        
        if(playerOut){
            let i = playerOutArr.findIndex(el=>+el.choosenNum === val);
            if(i === -1){
                playerOutArr.push(playerOut);
                this.props.setMessage(`${playerOut.id} Out`);
            }else{
                playerOutArr.splice(i,1);
                this.props.setMessage(`${playerOut.id} In`);
            }   
        }else{
            this.props.setMessage(`Total: ${val}`);
        }
        
        if(playerOutArr.length === this.props.players-1) this.setWinner(playerOutArr);
        this.setState({
            playerOut: playerOutArr, 
            playerOkayed:[], 
            playerProps: playerArrInit(this.props.config),
        })
        
    }
    
    setWinner = out => {
        let playerObj = {...this.props.config};
        let arr = Object.keys(playerObj).filter(el=>out.findIndex(e=>e.id===el)===-1)
        this.props.setWinner(arr[0]);
    }
}



function playerArrInit(config){
       return Object.keys(config).sort().map(el => {
                 let Player =  new player(el,config);
                 return Player;
              })
    }
    
class player{
    constructor(el, config){
        this.id = el;
        this.hand1 = 0;
        this.hand2 = 0;
        this.choosenNum = config[el];
        this.turn = false;
        this.val = 0;
    }
}
export default GameScreen;