import Post from './PostComponents/posts'
import React, {Component} from 'react';
import { MDBContainer } from 'mdbreact';

export default class ApiApp extends Component{
  

    render(){
        console.log(this.props.match.params.typePost)
        return(
            <div>
                <MDBContainer>
                  <h2 className="card-title h1-responsive pt-3 mb-5 font-bold jumboTilte"><strong>{this.props.match.params.typePost}</strong></h2>
                  <Post 
                  post_type={this.props.match.params.typePost}/>
                </MDBContainer>
            </div>      
        )
    }
}
