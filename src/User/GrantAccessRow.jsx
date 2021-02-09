import axios from 'axios';
import React, { Component } from 'react';
const env = require('../config');

class GrantAccessRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asker: {},
            disable: false
        }
    };

    async componentWillMount() {

        
        let res = await axios.post(env.serverPath+':'+env.serverPort+'/getUserById', this.props.asker)
        console.log("res granaccesRow", res)
        if(res.data.length >0 ){

            if ( res.data[0].NAPI == null) {
                res.data[0].NAPI = "---"
            }
           
            this.setState({ asker: res.data[0] })
            console.log("result grant access row state ", this.state.asker)

        }
        

        
    }

    async handleGrant(asker, granter) {
        let grantReqData = { asker: asker, granter: granter }
        console.log("Access from to", grantReqData)
        let grant = await axios.put(env.serverPath+':'+env.serverPort+'/grantAccess', grantReqData)
        if (grant.data == "Access was updated...") {
            this.setState({ disable: true })
        }

    }
    async handleDismiss(asker, granter) {
        let grantReqData = { asker: asker, granter: granter }
        console.log("Dismiss Access from to", grantReqData)
        let grant = await axios.put(env.serverPath+':'+env.serverPort+'/DismissAccess', grantReqData)
        if (grant.data == "Access was updated: Dismiss...") {
            this.setState({ disable: true })
        }
    }
    render() {
        return (

            <tr>
                <td>{this.state.asker.Nom, " ", this.state.asker.Prenom}</td>
                <td>{this.state.asker.NAPI}</td>
                <td>
                    <div className="btn-group-sm btn-group">
                        <button className="sm btn btn-primary" onClick={() => this.handleGrant(this.state.asker.idUser, this.props.granter)} disabled={this.state.disable}>Accepter la demande</button>
                        <button className="sm btn btn-danger" onClick={() => this.handleDismiss(this.state.asker.idUser, this.props.granter)} disabled={this.state.disable}>Refuser la demande</button>
                    </div>
                </td>
            </tr>

        );
    }
}

export default GrantAccessRow;