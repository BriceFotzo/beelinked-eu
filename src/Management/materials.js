import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import axios from "axios";
import { MDBBtn, MDBCard, MDBCardBody,  MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
const env = require('../config');

class Materials extends React.Component {
    state = {
        Email: "",
        Materiels:[],
      };
  
    async getMateriel(Email){
      let materiels =[];
      await axios.get(env.serverPath+':'+env.serverPort+'/materielOfUser/'+Email).then((res)=>{
        materiels = res.data.map((item,index)=>{
        item.idMateriel = res.data[index].idMateriel;
        item.nom = res.data[index].nom;
        item.stock = res.data[index].stock;
        item.seuil = res.data[index].seuil;
        return item;             
        }); 
      })   
      console.log('materiel',materiels);   
      return materiels; 
    }

    async componentWillReceiveProps(nextProps){
        //console.log('rucher0',nextProps.Email); 
        let materiels = await this.getRucherByUser(nextProps.Email);
        this.setState({
            Email : nextProps.Email,
            Materiels: materiels
          },()=>console.log('statecahnged',this.state,nextProps.Email)) ;    
      }

      async componentDidMount() {
        let userCo = JSON.parse(localStorage.getItem('userCo'));
        let materiels = await this.getMateriel(userCo.Email);
        console.log('state',userCo.Email);
        this.setState({
          Email : userCo.Email,
          Materiels: materiels
        },()=>console.log('initialstate',this.state));
      };

      Click_plus = e => {
        //console.log('test'+ idmat);
        let data ={idMateriel : e};
        axios.put(env.serverPath+':'+env.serverPort+'/updateStockPlus/', data);
        this.componentDidMount();
        this.componentDidMount();
      }
      Click_delete = e => {
        let data ={idMateriel : e};
        axios.put(env.serverPath+':'+env.serverPort+'/deleteMateriel/', data);
        this.componentDidMount();
        this.componentDidMount();
      }

      Click_moins = e => {
        //console.log('test'+ idmat);
        let data ={idMateriel : e};
        axios.put(env.serverPath+':'+env.serverPort+'/updateStockMoins/', data);
        this.componentDidMount();
        this.componentDidMount();
      }
      
    
      render() {
        return(        
           this.state.Materiels.map((item)=>{ 
            if(item.stock < item.seuil){
                return ( 
                    <div className=" text-center card_rucher" Style="margin-bottom : 10px">
                    <MDBRow>
                    <MDBCol style={{ maxWidth: "40rem" }}>
                    <MDBCard border="danger" style={{ borderWidth: '8px' }} reverse>
                        <MDBCardBody cascade className="text-center">
                        <MDBCardTitle>{item.nom}</MDBCardTitle>
                        <MDBBtn rounded onClick={() => this.Click_delete(item.idMateriel)} style={{ position: 'absolute' , top: 2, right: 20}} color="danger">X</MDBBtn>
                            <MDBCardText className="text-info" style={{ fontSize: '25px' }}>
                                Type de materiel : {item.Nom}
                            </MDBCardText>
                        <MDBCardText style={{fontWeight: 'bold'}}>Stock restant : {item.stock}</MDBCardText>
                        <MDBBtn rounded onClick={() => this.Click_plus(item.idMateriel)} color="success">+</MDBBtn>
                        <MDBBtn rounded onClick={() => this.Click_moins(item.idMateriel)} color="danger">-</MDBBtn>
                        <MDBCardText>Seuil critique : {item.seuil}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    </MDBRow>
                    </div>
                    );
                }else{
                    return ( 
                        <div className=" text-center card_materiel" Style="margin-bottom : 10px">
                        <MDBRow>
                        <MDBCol style={{ maxWidth: "40rem" }}>
                        <MDBCard border="success" style={{ borderWidth: '5px' }} reverse>
                            <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>{item.nom}</MDBCardTitle>
                            <MDBBtn rounded onClick={() => this.Click_delete(item.idMateriel)} style={{ position: 'absolute' , top: 2, right: 20}} color="danger">X</MDBBtn>
                                <MDBCardText className="text-info" style={{ fontSize: '25px' }}>
                                    Type de materiel : {item.Nom}
                                </MDBCardText>
                            <MDBCardText style={{fontWeight: 'bold'}}>Stock restant : {item.stock}</MDBCardText>
                            <MDBBtn rounded onClick={() => this.Click_plus(item.idMateriel)} color="success">+</MDBBtn>
                            <MDBBtn rounded onClick={() => this.Click_moins(item.idMateriel)} color="danger">-</MDBBtn>
                            <MDBCardText>Seuil critique : {item.seuil}</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                        </MDBRow>
                        </div>
                        );
                }
            }
            )

        )
        ;      
     }
     
   }

export default Materials;