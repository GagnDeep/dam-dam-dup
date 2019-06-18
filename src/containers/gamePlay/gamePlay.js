import React, {Component} from 'react';
import StartScreen from './../../components/startScreen/startScreen';
import Players from './../../components/setup/players';
import Aux from './../../hoc/auxilary/aux'
import SetUp from './../../components/setup/setup';
import Toolbar from './../../components/ui/toolbar/toolbar';
import GameScreen from './../gameScreen/gameScreen';
import Winner from './../../components/winner/winner';

class GamePlay extends Component{
    state = {
        newGame: true,
        setUp: false,
        allowedNumberOfPlayers: [2,3,4],
        playerValues: {},
        config: {},
        players: 0,
        winner: null,
        message: "Click Start to Play"
    }
    
    reset = ()=>{
        this.setState(this.originalState);
        this.props.reset();
    }
    
    componentWillMount(){
        const originalState = {...this.state};
        for(let el in originalState){
            if(typeof(el) === "object") originalState[el] = {...originalState[el]}
        }
        this.originalState = originalState;
    }
    
    render(){
        return (
                <Aux>
                    {this.getToolbar()}
                        
                    {this.getStartScreen()}
                    
                    {this.getPlayersScreen()}
                    
                    {this.getSetUpScreen()}
                    
                    {this.startGameScreen()}
                            
                    {this.getWinnerScreen()}        
                </Aux>
        );
    }
    
    // HANDLERS
    
    setMessage = (msg) => {
        this.setState({message:msg});
        
            setTimeout(()=>{
                this.setState({message:null});
            },3000);
    }
    
    setWinner = (winner)=>{
        this.setState({winner:winner});
    }
    
    valueHandler = (key, val)=>{
        let tempState = {...this.state.playerValues},
            tempConfig = {...this.state.config},
            allTrue = false;
            
        if(!tempConfig[key]){
            
            tempState[val] = key;
            tempConfig[key] = val;
            
            if(Object.keys(tempConfig).length === this.state.players){
                allTrue = true;
                this.props.infoChange(tempConfig);
                this.setMessage("Start Playing");
            }
            
            this.setState({playerValues:tempState, config: tempConfig, setUp: allTrue});
        }
    }
    
    startClickHandler = () => {
        this.setState({newGame: false, message:"Choose Number of Players"})
    }
    
    playerCountHandler = i => {
        const playerValues = this.playerValuesConstructor(i);
        this.setState({players: i, playerValues: playerValues, message: "Select Your Number"})
    }
    
    playerValuesConstructor = num => {
        const obj = {};
        let i = 0;
        while(i<num*10){
                i+=5;
                obj[i] = null;
        }
        return obj;
    }
    
    // DIFFERENT SCREENS
    
    getWinnerScreen = ()=>{
        if(this.state.winner){
            return <Winner winner = {this.state.winner} reset = {this.reset}/>
        }
        return null;
    }
    
    startGameScreen = ()=>{
        if(this.state.setUp && !this.state.winner)
            return (
                <GameScreen 
                    config = {this.state.config} 
                    players = {this.state.players} 
                    setWinner = {this.setWinner}
                    setMessage = {this.setMessage}/>
            );
        else
            return null;
    }
    
    getPlayersScreen = ()=>{
        if(!this.state.newGame && !this.state.players){
            
            return  (<Players 
                        allowedNumber = {this.state.allowedNumberOfPlayers}
                        playerCountListener = {this.playerCountHandler}/>)
        }else
            return null
    }
    
    getToolbar = ()=>{
        if(!this.state.winner)
            return (<Toolbar 
                        winner = {this.state.winner}
                        message = {this.state.message}
                        reset = {this.reset}/>);
        else
            return null;
    }
    
    getStartScreen = ()=>{
        if(this.state.newGame){
            return <StartScreen startClickHandler = {this.startClickHandler}/>
        }else
            return null;
    }
    
    getSetUpScreen = ()=>{
        if(!this.state.newGame && !this.state.setUp && this.state.players){
            
            return  (<SetUp 
                         playerCount     = {this.state.players}
                         playerValues    = {this.state.playerValues}
                         valueHandler    = {this.valueHandler}
                         config          = {this.state.config}/>);
        }else 
            return null
    }
}

export default GamePlay 