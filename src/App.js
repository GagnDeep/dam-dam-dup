import React, { Component } from 'react';
import Layout from './components/ui/layout/layout';
import GamePlay from './containers/gamePlay/gamePlay';

class App extends Component {
  state = {
    infoBar: <span>Created By Gagandeep Singh</span>
  }
  
  componentWillMount(){
    this.originalState = {...this.state};
  }
  
  render() {
    return (
        <Layout infoBar = {this.state.infoBar}>
            <GamePlay infoChange = {this.infoChangeHandler} reset = {this.reset}/>
        </Layout>
    );
  }
  
  infoChangeHandler = info => {
    let str = Object.keys(info).sort().map((el,i)=>(<div key = {i}><span>{el}</span>: {info[el]}</div>));
    this.setState({infoBar: str});
  }
  
  reset = ()=>this.setState(this.originalState);
}

export default App;
