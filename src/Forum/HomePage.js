import React, { MDBContainer,Component } from 'react';
import CarouselPage from './CarouselPage';
import { Row } from 'react-bootstrap';
import Ecriture from './Ecriture';
import PaginationPage from "./Pagination";

export default class ForumHome extends Component {

  render() {

    return (
      <div>
             <div class="container" Style="margin-top:7rem">
                 <Row>
                    <CarouselPage/>
                    <Ecriture />
                 </Row>
                 <div Style="margin-top:2rem;height:2000px ;background-color:white">
                 <PaginationPage />
                 </div>
            </div>     
      </div>


    )

  }

    }
 


