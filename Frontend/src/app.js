import React, {Component} from 'react';
import CityLocator from "./citymap";
import Landing from './landing';

export default class App extends Component {
    state = {
        renderObj: "landing"
    }

    render(){
        let torender = (<div />);

        if(this.state.renderObj === "city"){
            torender = (<CityLocator />);
        }else{
            let time = 5000;
            if(this.state.renderObj === "landing"){
                torender = (<Landing />);
                time = 3000;
            }
            setTimeout(() => {this.setState({renderObj:"city"})}, time)
        }

        return(<div>{torender}</div>);
    }
}