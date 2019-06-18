import React from 'react';
import classes  from './buttonContainer.module.css';

const buttonContainer = props => (
    <div className = {classes.Container}>
        {props.children}
    </div>
);

export default buttonContainer;