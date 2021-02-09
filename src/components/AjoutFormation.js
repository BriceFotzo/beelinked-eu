import React from "react"
import FormationList from "./formationList"
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardTitle,MDBTable,MDBTableBody,MDBTableHead} from 'mdbreact';
import image from '../assets/uploads/logos_esig (1).png'

// const names = ['a', 'b', 'c'];
// const imgs = names.map(function(name, i) {
//   return <img src={require("./icons/"+ name +".jpg")} alt="" className="img-responsive" key={i} />  
// });


class Form extends React.Component {
    state = {
        formationList: [{ index: Math.random(),  titreFormation: "", description: "", image: ""}],
        file:'',
        filename: 'Choisir une image',
        uploadedFile: {},
        message:'',
        uploadPercentage:0
        
    }
    // const [filename, setFilename] = useState('Choisir une image');
    // const [uploadedFile, setUploadedFile] = useState({});
    // const [message, setMessage] = useState('');
    // const [uploadPercentage, setUploadPercentage] = useState(0);
    handleChange = (e) => {
        
        if (["titreFormation", "description"].includes(e.target.name)) {
            let formationList = [...this.state.formationList]
            formationList[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else if (["image"].includes(e.target.name)) {
            let formationList = [...this.state.formationList]
            console.log(formationList)
            formationList[e.target.dataset.id][e.target.name] = e.target.value.split(`\\`)[2]
        }
         else {
            this.setState({ [e.target.name]: e.target.value })
        }
        console.log(this.state.formationList)
    }
    addNewRow = (e) => {
        this.setState((prevState) => ({
            formationList: [...prevState.formationList, { index: Math.random(),date:new Date(Date.now()).toLocaleDateString(), titreFormation: "", description: "", image: "" }],
        }));
        
    }

    deteteRow = (index) => {
        this.setState({
            formationList: this.state.formationList.filter((s, sindex) => index !== sindex),
        });

    }
    handleSubmit = async (e) => {
        
        
        console.log("data",e)
        if (this.state.date === '' || this.state.description === '') {
            NotificationManager.warning("Please Fill up Required Field . Please check chapitre and Date Field");
            return false;
        }
        for (var i = 0; i < this.state.formationList.length; i++) {
            if (this.state.formationList[i].titreFormation === '' || this.state.formationList[i].chapitre === '') {
                NotificationManager.warning("Please Fill up Required Field.Please Check Project name And chapitre Field");
                return false;
            }
        }
        this.state.formationList.map((item,key)=>{
            // console.log(i)
            axios.post('http://localhost:3000/ajoutFormation/', item).then(
              res => {
                console.log(res)
              }).catch((err) => {
                console.log("Erreur lors de l'ajout de la ruche : ", key, " ", err)
              })    
        }
  )

    }
    clickOnDelete(record) {
        this.setState({
            formationList: this.state.formationList.filter(r => r !== record)
        });
    }
    
    render() {
        let { formationList } = this.state//let { notes, date, description, formationList } = this.state
        console.log(formationList)
        return (
            <MDBContainer>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <MDBRow  style={{ marginTop: 100,}}>
                    <MDBCol></MDBCol>
                        {/* <div className="col-sm-1"></div> */}
                        <MDBCol className="col-sm-10" >
                            <MDBCard className="card" style={{backgroundColor:'transparent'}}>
                                <MDBCardTitle style={{color:'white'}} className="card-header text-center">Ajout d'articles de formation</MDBCardTitle>
                                <MDBCardBody className="card-body">

                                    <MDBTable className="table">
                                        <MDBTableHead>
                                            <tr>
                                                <th className="required" >Titre de formation</th>
                                                <th className="required" >Description</th>
                                                <th>Image</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <FormationList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} formationList={formationList} />
                                        </MDBTableBody>
                                        <tfoot>
                                            <tr><td colSpan="4">
                                                <button onClick={this.addNewRow} type="button" className="btn btn-warning text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                            </td></tr>
                                        </tfoot>
                                    </MDBTable>
                                </MDBCardBody>
                                <div className="card-footer text-center"> <button  type="submit" className="btn btn-warning text-center">Ajouter</button></div>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol className="col-sm-1"></MDBCol>
                    </MDBRow>
                </form>
                </MDBContainer>
        )
    }
}
export default Form