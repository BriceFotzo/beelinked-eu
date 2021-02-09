import React, { Component } from 'react';
import { MDBContainer,MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBCardHeader,MDBCardBody,MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";
import FormsPage from "./Form";

class Ecriture extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBCol md='4'>       
        <MDBCard style={{ width: "22rem", marginTop: "0.1rem"}}>
           <MDBCardHeader color=" orange lighten-1"> </MDBCardHeader>
           <MDBCardBody>
          <MDBCardTitle>Ecrire dans les forums</MDBCardTitle>
        <MDBCardText>
            <FormsPage/>
        </MDBCardText>
        </MDBCardBody>
        </MDBCard>
    
       <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1.4rem" }}>
       <a><MDBCardTitle Style="text-align : center">Mon profil</MDBCardTitle></a>
       <MDBCardText>
       </MDBCardText>
      </MDBCard>
  </MDBCol>
    );
  }
}

export default Ecriture;