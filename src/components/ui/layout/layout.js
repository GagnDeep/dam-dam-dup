import React, {Component} from 'react';
import classes from './layout.module.css';
import Header from './../header/header';
import Footer from './../footer/footer';

class Layout extends Component {
    render(){
        return (
            <div className = {classes.Layout}>
                <Header button = {this.props.button}pu/>
                {this.props.children}
                <Footer info = {this.props.infoBar}/>
            </div>
        );
    }
    
}

export default Layout;
