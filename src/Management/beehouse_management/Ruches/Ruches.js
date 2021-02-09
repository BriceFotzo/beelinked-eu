import React from 'react'; 
import {  MDBCol,MDBCard,MDBCardBody,MDBCardTitle,MDBCardText, MDBBtn} from "mdbreact";

const Ruche =({details})=>{
    return (
            <MDBCol style={{ maxWidth: "22rem",backgroundColor : '#FFC733',width:'300px', padding:'10px', margin :'5px 11.4px'  }} >
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{details.name ? details.name : "NA"}</MDBCardTitle>
                <MDBCardText>
                    <p>Type de Ruche :{details.typeRucheName ? details.typeRucheName : "NA"}</p>
                    <p>Taille :{details.taille ? details.taille : "NA"}</p>
                    <p>Nombre de Cadres :{details.nbreCadres ? details.nbreCadres : "NA"}</p>
                    <p>Numero de serie :{details.numSerie ? details.numSerie : "NA"}</p>


                </MDBCardText>
                <MDBBtn outline color="warning" href="#" size="sm">Voir rapports</MDBBtn>
                <MDBBtn outline color="danger" href="#" size="sm">Voir détails</MDBBtn>
                <MDBBtn outline color="primary" href="#" size="sm">Modifier ruche</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
    )
}
export default Ruche;
