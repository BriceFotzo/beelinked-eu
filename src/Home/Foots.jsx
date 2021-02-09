import React, { Component } from 'react';
import contact from '../assets/images/contact-us.png';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class Foots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
    }
    render() {
        return (
            <div>
                <MDBContainer className="justify-content-center">
                    <MDBRow >
                        <MDBCol md="4"></MDBCol>
                        <MDBCol md="4" ></MDBCol>
                        <MDBCol md="4" className="text-center align-self-center">
                        <h6 class="litltxt"> Contactez nous! </h6> 

                        <a href='/contact'><img src={contact}  style={{ height: 60, width: 60, marginTop: 3 }} alt="" /></a>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                     </div>
        );
    }
}

export default Foots;
