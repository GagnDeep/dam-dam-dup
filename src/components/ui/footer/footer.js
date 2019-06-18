import React from 'react';
import classes from './footer.module.css';

const footer = props => {
    return (
        <div className = {classes.footer}>
            {props.info}
        </div>
    );
}

export default footer;