import React, { Component }  from 'react';
import { MDBBtn, MDBCard, MDBNavLink,MDBCardBody,  MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


  export default class CustomCards extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          disconnect: false,
        };
        
      }
    

      handleDeconnexion = () => {
          this.props.onDeco();
        // this.setState({ disconnect: true })
        // localStorage.clear();
        // this.props.history.push('/')
      }
 render(){

    return (
        <MDBCol className="ml-1 mt-2 user-card">
          <MDBCard className="view overlay" >
            {this.props.image? <img className="card-img-top" src={"/uploads/"+this.props.image}  />:
    ''
            }
            
            <MDBCardBody className="card-body">
              <MDBCardTitle className="card-title">{this.props.name}</MDBCardTitle>
              <MDBCardText className="card-text">
              {this.props.email}<br/>
              {this.props.statut}
              </MDBCardText>
              <MDBNavLink to='/Userpage' ><MDBBtn color='amber' size='sm' >Mon profil</MDBBtn></MDBNavLink>
              <MDBNavLink
                                  tag="button"
                                  to="/Taches"
                                  color="mdb-color"
                                  className="btn  btn-sm btn-rounded d-inline"
                                  
                                >
                                  <i class="fas fa-calendar-alt"></i>
                                </MDBNavLink>
                                
                                <MDBNavLink
                                  // tag="button"
                                  to="/AllTaches"
                                  color="mdb-color"
                                  className="btn  btn-sm btn-rounded d-inline"
                                 
                                >
                                  <i class="fas fa-tasks"></i>
                                </MDBNavLink>
                                
                                <MDBNavLink
                                  tag="button"
                                  to="/materiel"
                                  color="mdb-color"
                                  className="btn  btn-sm btn-rounded d-inline"
                                  
                                >
                                  <i class="fas fa-toolbox"></i>
                                </MDBNavLink>
                               
                      <MDBNavLink to='/' ><MDBBtn color='amber' size='sm' onClick={this.handleDeconnexion}>Deconnexion</MDBBtn></MDBNavLink>

                    
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      )
 }

}

