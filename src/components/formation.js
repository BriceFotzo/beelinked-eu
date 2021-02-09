import React, { Component } from 'react';
import Sujet from '../Decouverte/Ma formation/SujetFormation'
import AddSujet from './AddSujet'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';


class CollapsePage extends Component {
  state = {
    collapseID: 'collapse1'
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {
    const { collapseID } = this.state;

    return (
      <MDBContainer>
          <AddSujet/>
            <MDBContainer className="accordion-gradient-bcg p-5">
                <Sujet title='Formation 1' subtitle='Chapitre 1' description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'/>
            </MDBContainer>
      </MDBContainer>
    );
  }
}

export default CollapsePage;