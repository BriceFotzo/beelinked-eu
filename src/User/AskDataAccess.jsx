import React, { Component } from 'react';
import axios from "axios";
import {  MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AccessRow from './AccessRow';
const env = require('../config');


class AskDataAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listApic: []
        }
    }
    async componentWillMount() {
        let res = await axios.get(env.serverPath+':'+env.serverPort+'/ListApiculteur');
        let apic = res.data
        console.log("apic", apic)
        await this.setState({ listApic: apic })

    }

   
   
    render() {
        return (
            <div>
                <MDBTable hover autoWidth>
                    <MDBTableHead color="warning-color hover" textWhite>
                        <tr>

                            <th>Nom</th>
                            <th>NAPI</th>
                            {/* <th>Adresse</th> */}
                            <th>Code Postal</th>
                            <th>Telephone</th>
                            <th> </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.listApic.map((item, key) =>
                            <AccessRow item = {item} userCo={this.props.userCo}/>

                        )
                        }
                    </MDBTableBody>
                </MDBTable>

            </div>
        );
    }
}

export default AskDataAccess;