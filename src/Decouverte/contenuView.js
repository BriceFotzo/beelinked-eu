import PostContenu from './PostComponents/postContenu'
import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';

export default class ApiApp extends Component {


    render() {
        return (
            <div>
                <MDBContainer>
                  <h2 className="card-title h1-responsive pt-3 mb-5 font-bold jumboTilte"><strong>{this.props.match.params.typePost}</strong></h2>
                  <PostContenu 
                  idPost={this.props.match.params.idPost} 
                  typePost={this.props.match.params.typePost} />
               </MDBContainer>
            </div>      
        )
    } 
}
