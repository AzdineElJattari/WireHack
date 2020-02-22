import React, {Component} from 'react';
import WarningImg from './warning.svg';
import DO from './dodont.svg';

export default class Warning extends Component{
    state = {
        show: false
    };
    
    render(){
        let {show} = this.state;
        let divStyle = {}
        if(show){
            divStyle.display = "block";
        }else{
            divStyle.display = "none";
        }

        return (<div className="warning">
            <div><a href="#" onClick={() => this.setState({show: !show})}><img src={WarningImg}/></a></div>
            <div style={divStyle}>
                <img src={DO} width={244}/>
            </div>
        </div>);
    }
}