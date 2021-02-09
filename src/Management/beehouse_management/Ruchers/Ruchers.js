import React from 'react'; 
import {  MDBIcon,MDBBtn,MDBNavLink } from "mdbreact";

const Rucher =({details})=>{

    return (
        <div className="Ruchers" style={{backgroundColor : '#FFC733',width:'300px', padding:'10px', margin :'5px 11.4px' }}>
            <div className="card text-center" >
                <div className="card-body">
                    <h5 className="card-title">{details.name}</h5>
                    <p className="card-text"> <h2>{details.number_of_hives}</h2> ruches </p>
                    <p className="card-text"> {details.address}</p>
                    <p className="card-text">long: {details.long}  lat:{details.lat} </p>
                        <MDBBtn  color="warning" size="md">
                                <MDBIcon far icon="clone" className="left" /> 
                                <MDBNavLink to={{
                                    pathname: "/HiveManagement",
                                    state: details.id }} >Voir détails</MDBNavLink>
                        </MDBBtn>
                </div>
            </div>
      </div>
    )
    }
export default Rucher;

