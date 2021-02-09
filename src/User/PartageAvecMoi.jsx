import React, { Component } from 'react';
import axios from "axios";
import {  MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import SharedRow from './SharedRow';
const env = require('../config');

class PartageAvecMoi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listApic: []
        }
    }

    async componentWillMount() {
        console.log(this.props.userCo)
        let user = await axios.post(env.serverPath+':'+env.serverPort+'/getUserByMail', this.props.userCo);
        console.log("id user", user)
        await axios.post(env.serverPath+':'+env.serverPort+'/GetAllshareWi', user.data[0]).then( result => {
            this.setState({ listApic: result.data})
            console.log("result", result )
        });
        // let apic = res.data[0];
        
        console.log("apic share", this.state.listApic);

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
                            <SharedRow item = {item} userCo={this.props.userCo}/>

                        )
                        }
                    </MDBTableBody>
                </MDBTable>
                
            </div>
        );
    }
}

export default PartageAvecMoi;