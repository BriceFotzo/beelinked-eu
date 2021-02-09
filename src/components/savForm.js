import React, { Component,useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { Multiselect } from "multiselect-react-dropdown";

const env = require('../config');

const FormPage = () => {
    const [status, setStatus] = useState("Envoyer");
    const [ruches, setRuches] = useState([]);
    //const [details, setRuches] = useState([]);
    const [hiveGroups,setHiveGroups]=useState([
        { Ruche: "Ruche 1", Rucher: "Rucher 1" },
        { Ruche: "Ruche 2", Rucher: "Rucher 1" },
        { Ruche: "Ruche 3", Rucher: "Rucher 1" },
        { Ruche: "Ruche 4", Rucher: "Rucher 2" },
        { Ruche: "Ruche 5", Rucher: "Rucher 2" },
        { Ruche: "Ruche 6", Rucher: "Rucher 2" },
        { Ruche: "Ruche 7", Rucher: "Rucher 2" }
      ])

      const [hiveGroupsSelected,setHiveGroupsSelected]=useState([
        { Ruche: "Ruche 1", Rucher: "Rucher 1" },
        { Ruche: "Ruche 2", Rucher: "Rucher 1" },

      ])
      const onSelect=async(selectedList, selectedItem) => {
        setRuches(selectedList)
        console.log(selectedList)
    }
    const onRemove=async(selectedList, selectedItem) => {
        setRuches(selectedList)
        console.log(selectedList)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("En cours...");
      const {  message } = e.target.elements;
      console.log(ruches)
      let details = {
        ruches: JSON.stringify(ruches),
        message: message.value
      };
      let response = await fetch(env.serverPath+':'+env.serverPort+'/sav', {
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
              
                <p className="h4 text-center py-4">Soumettez votre requête</p>

                <div className="grey-text">
                    <label>Quelles ruches sont concernées par votre demande?</label>
                <Multiselect
                    id='ruches'
                    placeholder="Sélectionnez les ruches"
                    options={hiveGroups}
                    displayValue="Ruche"
                    groupBy="Rucher"
                    showCheckbox={true}
                    onSelect={onSelect}
                    onRemove={onRemove}
            />
                    {/* <MDBInput
                    id="ruches"
                    label="Votre message"
                    icon="comment-alt"
                    group
                    type="textarea"
                    validate
                    error="wrong"
                    success="right"
                  /> */}
                  <MDBInput
                    id="message"
                    label="Votre message"
                    icon="comment-alt"
                    group
                    type="textarea"
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