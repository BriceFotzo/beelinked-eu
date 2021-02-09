import React, { Component } from 'react';

class profile extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            userCo:  this.props.userCo
        }
    }
    render() {
        return (
            <div>
                <h3>Profil</h3>
                <p>{this.state.userCo.Email}</p>
                <p>{this.state.userCo.Nom, " ", this.state.userCo.Prenom}</p>
                <p>{this.state.userCo.Statut}</p>
                <p>{this.state.userCo.NAPI}</p>
            </div>
        );
    }
}

export default profile;

