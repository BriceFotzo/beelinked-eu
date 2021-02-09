import React, { Component,useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
const env = require('../config');


const ContactForm = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message,objet } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
      objet: objet.value,
    };
    let response = await fetch(env.serverPath+':'+env.serverPort+'/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (

              <MDBContainer>
              <MDBRow>
                <MDBCol md="12">
                  <form onSubmit={handleSubmit} method="POST">
                    <p className="h5 text-center mb-4">Envoyez nous un mail</p>
                    <div className="grey-text">
                      <MDBInput id='name' label="Votre nom" icon="user" group type="text" validate error="wrong"
                        success="right" />
                      <MDBInput id='email' label="Votre email" icon="envelope" group type="email" validate error="wrong"
                        success="right"  />
                      <MDBInput id='objet' label="Objet" icon="tag" group type="text" validate error="wrong" success="right" />
                      <MDBInput id='message' type="textarea" rows="2" label="Votre message" icon="pencil-alt" 
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn type="submit" outline color="primary">
                      {status}
                        <MDBIcon far icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
  );
};

export default ContactForm;