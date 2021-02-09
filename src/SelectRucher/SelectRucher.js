import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import axios from "axios";
import { Link, MDBAlert,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import error from './error.jpg';
const env = require('../config');

class RucherPage extends React.Component {
    state = {
      Email: "",
      Ruchers:[],
    };

  async getRucherByUser(Email){
    let ruchers =[];
    //console.log('rucher1',ruchers,Email) ;
    await axios.get(env.serverPath+':'+env.serverPort+'/ruchersOfUser/'+Email).then((res)=>{
      ruchers = res.data.map((item,index)=>{
      item.idRucher = res.data[index].idRucher;
      item.nom = res.data[index].nom;
      item.latitude = res.data[index].latitude;
      item.longitude = res.data[index].longitude;
      item.Address = res.data[index].Address;
      return item;             
      }); 
    })   
    //console.log('rucher2',ruchers,idUser);   
    return ruchers; 
  }

   async componentWillReceiveProps(nextProps){
    //console.log('rucher0',nextProps.Email); 
    let ruchers = await this.getRucherByUser(nextProps.Email);
    this.setState({
        Email : nextProps.Email,
        Ruchers: ruchers
      },()=>console.log('rucher',this.state.Ruchers.length ===0)) ;    
  }

    async componentDidMount() {
      let userCo = JSON.parse(localStorage.getItem('userCo'));
      let ruchers = await this.getRucherByUser(userCo.Email);
      console.log('staet',userCo.Email);
      this.setState({
        Email : userCo.Email,
        Ruchers: ruchers
      },()=>console.log('initialstate',this.state));
    };
  
    render() {
      if (this.state.Ruchers.length !==0 ){
        return(
          this.state.Ruchers.map((item)=>{ 
          return ( 
            <div className="card_rucher" Style="margin-bottom : 15px">
              <MDBRow>
              <MDBCol style={{ maxWidth: "40rem" }}>
              <MDBCard reverse>
                <Link to={'/pageRuche/'+item.idRucher} >
                  <MDBCardImage cascade style={{ height: '20rem' }} src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" />
                </Link>
                <MDBCardBody cascade className="text-center">
                  <MDBCardTitle>{item.nom}</MDBCardTitle>
                  <h5 className="indigo-text"><strong>Type de miel</strong></h5>
                  <MDBCardText>Address: {item.adresse}</MDBCardText>
                  <a href="#!" className="icons-sm li-ic ml-1">
                    <MDBIcon fab icon="linkedin-in" /></a>
                  <a href="#!" className="icons-sm tw-ic ml-1">
                    <MDBIcon fab icon="twitter" /></a>
                  <a href="#!" className="icons-sm fb-ic ml-1">
                    <MDBIcon fab icon="facebook-f" /></a>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
              </MDBRow>
           </div>
           );
          })
       );      
      }
      else{
        return(
          <div Style="margin-bottom:223px; margin-top:50px ; background: white" >
            <MDBAlert color="danger" >
             Aucune information trouvée  
          </MDBAlert>
          <img src={error} Style="Height:50%; width:50%" className="rounded mx-auto d-block" alt="aligment" />

          </div>
          
        );
      }


       
    }
    
  }

  export default RucherPage;
