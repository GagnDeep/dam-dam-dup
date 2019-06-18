import React from 'react';
import classes from './winner.module.css';
import Toolbar from './../ui/toolbar/toolbar';
import Aux from './../../hoc/auxilary/aux';
import ButtonContainer from './../ui/button/buttonContainer';
import Button from './../ui/button/button';
import { CSSTransitionGroup } from 'react-transition-group'

const winner = props => {
    return (
        <Aux>
            <Toolbar message = {`Congratulations ${props.winner}`}/>
            <CSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={200}
              transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
            <ButtonContainer>
                <Button listener = {props.reset}><p style = {{fontSize:"16px"}}>Play Again?</p></Button>
            </ButtonContainer>
            
                <div className = {classes.winner}>{props.winner} WON!!!!</div>
            </CSSTransitionGroup>
    
        </Aux>
    );
}

export default winner