import React from 'react';
import Button from './../ui/button/button';
import ButtonContainer from './../ui/button/buttonContainer';

const setUp = props => {
    
    let playerArr = [];
    
    for(let i = 1; i<=props.playerCount; i++){
        playerArr.push(<Button 
                            playerValues = {props.playerValues} 
                            key = {"PLAYER "+i} 
                            id ={"PLAYER "+i}
                            listenerInside={props.valueHandler}
                            config = {props.config}/>)
    }
    
    return (
        <ButtonContainer>
            {playerArr}
        </ButtonContainer>
    );
}

export default setUp;