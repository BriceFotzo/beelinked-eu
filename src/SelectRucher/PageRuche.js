import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import RuchePage from "./SelectRuche.js";


class PageRuche extends React.Component {
  render() {
    return (
      <div class="jumbotron ">
        <MDBContainer className="justify-content-center">
          <MDBRow Style="margin-top : 105px ">
               <RuchePage />
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default PageRuche;
