import React, { Component } from 'react';
import {
  MDBCol,
  MDBCollapse,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBView,
  MDBIcon
} from 'mdbreact';
import ReactHtmlParser from 'react-html-parser';
class CollapsePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapseID: 'collapse' + props.id,
      title: props.title,
      subtitle: props.subtitle,
      description: props.description,
      collapsed:false
    }
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {
    const { collapseID } = this.state;

    return (

      <MDBCard style={{ backgroundColor: 'transparent' }}>
        <button
          onClick={this.toggleCollapse('collapse1')}
          className="my-1">
          <span className='white-text font-weight-bold'>
            {this.state.title}
          </span>
          <MDBIcon
            icon={collapseID === 'collapse1' ? 'angle-up' : 'angle-down'}
            className="white-text"
            style={{ float: "right" }}/>
        </button>
        <MDBCollapse id='collapse1' isOpen={collapseID}>
          <MDBCardBody>
            <MDBRow className='my-4'>
              <MDBCol md='10'>
                <h2 className='font-weight-bold mb-3 black-text'>
                  {this.state.subtitle}
                </h2>
                <p>
                  {ReactHtmlParser(this.state.description)}
                </p>
              </MDBCol>
              <MDBCol md='2' className='mt-3 pt-2'>
                {this.props.access === 300 ?
                  <div className="editionButtons">
                    {/* <button className="btn btn-warning"  >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </button> */}
                    <button onClick={(() => window.confirm('Êtes vous sur de vouloir supprimer cet objet?') ? this.props.onDelete(this.props.val) : '')} className="btn btn-danger"  >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>

                  </div>
                  : ''}
                <MDBView className='z-depth-1'>
                </MDBView>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCollapse>
      </MDBCard>

    );
  }
}

export default CollapsePage;

