import React from 'react';
import Button from './../ui/button/button';
import ButtonContainer from './../ui/button/buttonContainer'

const players = props => {
    return (
        <ButtonContainer>
            {props.allowedNumber.map((num,i) => (<Button 
                                                    listener = {()=>props.playerCountListener(num)}
                                                    key = {num}>
                                                        {num}
                                                </Button>))}
        </ButtonContainer>
    );
}

export default players