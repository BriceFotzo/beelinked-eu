import React from 'react';
import {MDBIcon, MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import moment from 'moment';
import {MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Lecture extends React.Component {
    state={
        sujet : [],
        modal: false,
    }

    componentWillReceiveProps(nextProps){
     
        this.setState({sujet: nextProps.sujet},()=>console.log()); 
        console.log(this.state.sujet );
      }

    toggle = () => {
        this.setState({
           modal: !this.state.modal
         });
    }     

    
    render(){
      if (this.state.sujet[0]  !== undefined){
          return(
            <div>
                {this.state.sujet.map((item)=>{ 
            return (
                <div Style="padding: 1rem">
                    <a onClick={this.toggle}>
                    <MDBCard className="card-body" style={{ width: "auto" ,padding:"2.5rem" }}>
                    <MDBCardTitle><MDBIcon icon="user-circle" /> {item.Prenom} {moment(item.date).format('YYYY-MM-DD HH:mm ')}</MDBCardTitle>         
                    <MDBCardText >
                      <h3 Style="color: black">{item.title}</h3>
                      <h6 Style="color: grey; width:50%;overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;">{item.text}</h6>
                    </MDBCardText>
                    <div  className='text-right' Style=" left:10px;  color: grey">
                    <MDBIcon far icon="eye" size="2x" Style="padding: 1rem"/>
                    <MDBIcon far icon="comment-dots"size="2x"Style="padding: 1rem" />
                    <MDBIcon far icon="thumbs-up"size="2x" Style="padding: 1rem"/>
                    <MDBIcon far icon="star" size="2x"Style="padding: 1rem"/>
                    </div>
                  </MDBCard>
                    </a>
                    <MDBModal  isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle} Style="color: grey" ><MDBIcon icon="user-circle" /> {item.Prenom}</MDBModalHeader>
                        <MDBModalBody>
                        <form>
                      <label
                        htmlFor="defaultFormCardNameEx"
                        className="grey-text font-weight-light"
                      >
                        Sujet
                      </label>
                      <input
                        value={item.title}
                        type="text"
                        id="defaultFormCardNameEx"
                        className="form-control"
                        name="title"
                        disabled
                      />
                      <br />
                      <label
                        htmlFor="defaultFormCardEmailEx"
                        className="grey-text font-weight-light"
                      >
                        Texte
                      </label>
                      <textarea
                        value={item.text}
                        id="defaultFormCardEmailEx"
                        className="form-control"                
                        name="text"
                        Style="height:25rem;"
                        disabled
                      />            
                    </form>
                        </MDBModalBody>
                      <MDBModalFooter>
                      </MDBModalFooter>
                  </MDBModal>
                </div>
                );
        })}
            </div>
        )
    } 
    else {
      return(
        <div></div>
      );
    }
};} 

export default Lecture;