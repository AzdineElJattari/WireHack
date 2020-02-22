import React, {Component} from 'react';
import Msg1 from './msg.svg';
import Msg2 from './msg2.svg';

export default class Landing extends Component{
    componentDidMount(){
        let timeo = 500;
        setTimeout(() => {
            this.setState({msg: Msg2});
        }, timeo)
        setTimeout(() => {
            this.setState({msg: Msg1});
        }, timeo * 2)
        setTimeout(() => {
            this.setState({msg: Msg2});
        }, timeo * 3)
        setTimeout(() => {
            this.setState({msg: Msg1});
        }, timeo * 4)
        setTimeout(() => {
            this.setState({msg: Msg2});
        }, timeo *5)
        setTimeout(() => {
            this.setState({msg: Msg1});
        }, timeo * 6)
    }

    componentWillUnmount(){
        
    }

    state = {
        msg: Msg1
    };

    render(){

        return (<div className="blinker">
            <div>
                <img src={this.state.msg} alt="This is a warning signal"/>
            </div>
        </div>);
    }
}