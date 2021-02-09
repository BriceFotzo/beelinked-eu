import React, { Component } from 'react';
import CustomCards from '../components/CustomCards'
import Fade from 'react-reveal/Fade';
import { MDBContainer } from 'mdbreact';
const cardsData = [
  {
      'cardTitle': 'First Card',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg',
      'cardText': "Some quick example text to build on the card title and make up the bulk of the card's content",
      'btnText': "Voir Plus"
  },
  {
      'cardTitle': 'Second Card',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg',
      'cardText': "Some quick example text to build on the card title and make up the bulk of the card's content",
      'btnText': "Voir Plus"
  },
  {
      'cardTitle': 'Third Card',
      'image': 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg',
      'cardText': "Some quick example text to build on the card title and make up the bulk of the card's content",
      'btnText': "Voir Plus"
  }
]
export default class Home extends Component {
  render() {

    return (

      <div>


        <div className="row2 container col-12">
                    <h1> Nos services</h1>
                    <hr className="col-12" />
                </div>
                {/* <div className="row3 cardContent"> */}
                <div className="row justify-content-center">
                <Fade  top delay={1000} duration={1000}>
                        <MDBContainer className="trainingCards">
                     
                            {cardsData.map((item, key) =>
                                <CustomCards cardTitle={item.cardTitle} image={item.image} cardText={item.cardText} btnText={item.btnText} />)
                            }
                            
                            </MDBContainer>
                        </Fade>
                    </div>

         </div>
      

    )
  }

}



