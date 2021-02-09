import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


class SharedRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    handleShow = (email, pwd) => {
        let idAsker = null;
        let idreceiver = null;
        let dataAsker = { Email: this.props.userCo.Email, Password: this.props.userCo.Mdp }
        let datareceiver = { Email: email, Password: pwd }

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.Nom, " ", this.props.item.Prenom}</td>
                <td>{this.props.item.NAPI}</td>
                <td>{this.props.item.CP}</td>
                <td>{this.props.item.Telephone}</td>
                <td>
                    <button className="sm btn btn-amber btn-sm" onClick={this.toggle}>Afficher</button>
                    <span>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle} style={{color: "black" }} >Dashboard de {this.props.item.Nom}</MDBModalHeader>
                            <MDBModalBody style={{color: "black" }}>
                                {this.props.item.NAPI}
                            </MDBModalBody>
                            <MDBModalFooter>
                                <button className="sm btn btn-danger btn-sm" onClick={this.toggle}>Close</button>
                                <button className="sm btn btn-amber btn-sm" to="#">Plus de Details</button>
                            </MDBModalFooter>
                        </MDBModal>
                    </span>
                </td>
            </tr>

        );
    }
}

export default SharedRow;