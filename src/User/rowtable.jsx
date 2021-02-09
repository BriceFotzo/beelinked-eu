import React, { Component } from 'react';


class Rowtable extends Component {
    
    constructor(props) {
        super(props);
        
    }
    

    render() {
        console.log("rowtable", this.props)
        return (

            <tr>
                <td>{this.props.data.Nom, " ", this.props.data.Prenom}</td>
                <td>{this.props.data.NAPI}</td>
                <td>{this.props.data.TypeMiel}</td>
            </tr>


        );
    }
}

export default Rowtable;