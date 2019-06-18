import React from 'react';
import Button from './../ui/button/button';
import ButtonContainer from './../ui/button/buttonContainer'

const startScreen = props=>{
    return (
        
            <ButtonContainer>
                <Button listener = {props.startClickHandler}>Start</Button>
            </ButtonContainer>
        
    );
}

export default startScreen;