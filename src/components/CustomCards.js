import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


function CustomCards(props)  {
 
  return (
    <MDBCol className="ml-1 mt-2 custom-card">
      <MDBCard className="view overlay" >
        {props.image? <img className="card-img-top" src={"/uploads/"+props.image}  />:
''
        }
        
        <MDBCardBody className="card-body">
          <MDBCardTitle className="card-title">{props.cardTitle}</MDBCardTitle>
          <MDBCardText className="card-text">
          {props.cardText}
          </MDBCardText>
          <MDBBtn id={props.id} onClick={props.handleClick} className="btn btn-primary moreBtn" href={props.link}>{props.btnText}</MDBBtn>
        {props.access===300?
        <div className="editionButtons">
          <button className="btn btn-warning"  >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </button>
          <button onClick={(() => window.confirm('Êtes vous sur de vouloir supprimer cet objet?') ? props.onDelete(props.val) :'')} className="btn btn-danger"  >
          
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        
        </div>
        :''}
        {/* onClick={(() => props.delete(val))} */}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CustomCards;