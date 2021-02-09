import React, { Component,useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
const env = require('../config');

const FormPage = () => {
    const [status, setStatus] = useState("Submit");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("En cours...");
      const { nbRuchers, nbRuches, adresse } = e.target.elements;
      let details = {
        nbRuchers: nbRuchers.value,
        nbRuches: nbRuches.value,
        adresse: adresse.value,
        
      };
      let response = await fetch(env.serverPath+':'+env.serverPort+'/commandes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Envoyer");
      let result = await response.json();
      alert(result.status);
    };
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit} method="POST">
              
                <p className="h4 text-center py-4">Commander un module</p>
                <div className="grey-text">
                  <MDBInput
                    id="nbRuchers"
                    label="Nombre de ruchers à équiper"
                    icon="sort-numeric-up"
                    group
                    type='text'
                    pattern='[0-9]*'
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    id="nbRuches"
                    label="Nombre de ruches à équiper"
                    icon="sort-numeric-up"
                    group
                    type='text'
                    pattern='[0-9]*'
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    id="adresse"
                    label="Adresse de livraison"
                    icon="map-marker"
                    group
                    type="address"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" type="submit">
                  {status}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;