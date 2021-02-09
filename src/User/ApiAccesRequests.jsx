import React, { Component } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead, MDBAlert } from 'mdbreact';
import GrantAccessRow from './GrantAccessRow';
const env = require('../config');


class ApiAccesRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            message: ""
        }
    };

    async componentWillMount() {
        console.log("user co on acces", this.props.userCo)
        let res = await axios.post(env.serverPath+':'+env.serverPort+'/ApiRequests', this.props.userCo)
        let reqCOp = [...this.state.requests]
        res.data.map((elt) => reqCOp.push({ idUser: elt.UserId_asker }))
        this.setState({ requests: reqCOp })
        if (this.state.requests.length < 1) {
            this.setState({ message: "Aucune requête!" })
        }
        // console.log(this.state.requests);

    }

    render() {
        return (
            <div>
                <MDBTable hover className={this.state.message == "Aucune requête!" ? "d-none" : "d-block-inline"}>
                    <MDBTableHead color="warning-color hover" textWhite>
                        <tr>

                            <th>Nom</th>
                            <th>NAPI</th>
                            <th> </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.requests.map((item) =>

                            <GrantAccessRow asker={item} granter={this.props.userCo.id} />

                        )
                        }
                    </MDBTableBody>
                </MDBTable>
                <MDBAlert color="danger" className={this.state.message == "Aucune requête!" ? "d-block-inline" : "d-none"}>
                    Aucune demande!
                </MDBAlert>

            </div>

        );
    }
}

export default ApiAccesRequests;
