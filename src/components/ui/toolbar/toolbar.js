import React, {Component} from 'react';
import classes from './toolbar.module.css';
import {TweenLite} from 'gsap';

class Toolbar extends Component {
    shouldComponentUpdate(nextProps){
        if(this.myElement)
            return this.myElement.textContent !== nextProps.message;
        return true;
    }
    render(){
        return (
            <div className = {classes.Toolbar}>
                {this.props.message?<p ref={p=>this.myElement = p}>{this.props.message}</p>:null}
                 {!this.props.message && !this.props.winner?<button onClick = {this.props.reset}>Reset</button>:null}
            </div>
        );
    }
    componentDidMount(){
        if(this.myElement)
            this.myTween = TweenLite.from(this.myElement, 1, {x: 0, y: 0,opacity:0});
    }
    componentDidUpdate(){
        if(this.myElement)
            this.myTween = TweenLite.from(this.myElement, 1, {x: 0, y: 0,opacity:0}); 
    }
}

export default Toolbar;
