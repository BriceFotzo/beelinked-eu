import React from "react"
import PostList from "./addPostList"
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import {MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardTitle,MDBTable,MDBTableBody,MDBTableHead} from 'mdbreact';
const env = require('../../config');


class Form extends React.Component {
    state = {
        postList: [{ index: Math.random(),  titrePost: "", description: "", image: "",typePost:this.props.typePost}],
        file:'',
        filename: 'Choisir une image',
        uploadedFile: {},
        message:'',
        uploadPercentage:0
        
    }

    handleChange = (e) => {
        
        if (["titrePost", "description"].includes(e.target.name)) {
            let postList = [...this.state.postList]
            postList[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else if (["image"].includes(e.target.name)) {
            let postList = [...this.state.postList]
            console.log(postList)
            postList[e.target.dataset.id][e.target.name] = e.target.value.split(`\\`)[2]
        }
         else {
            this.setState({ [e.target.name]: e.target.value })
        }
        console.log(this.state.postList)
    }
    addNewRow = (e) => {
        this.setState((prevState) => ({
            postList: [...prevState.postList, { index: Math.random(),date:new Date(Date.now()).toLocaleDateString(), titrePost: "", description: "", image: "",typePost:this.props.typePost }],
        }));
        
    }

    deteteRow = (index) => {
        this.setState({
            postList: this.state.postList.filter((s, sindex) => index !== sindex),
        });

    }
    handleSubmit = async (e) => {
        
        
        console.log("data",e)
        if (this.state.date === '' || this.state.description === '') {
            NotificationManager.warning("Please Fill up Required Field . Please check chapitre and Date Field");
            return false;
        }
        for (var i = 0; i < this.state.postList.length; i++) {
            if (this.state.postList[i].titrePost === '' || this.state.postList[i].chapitre === '') {
                NotificationManager.warning("Please Fill up Required Field.Please Check Project name And chapitre Field");
                return false;
            }
        }
        this.state.postList.map((item,key)=>{
            // console.log(i)
            axios.post(env.serverPath+':'+env.serverPort+'/ajoutDePost/', item).then(
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
            postList: this.state.postList.filter(r => r !== record)
        });
    }
    
    render() {
        let { postList } = this.state
        console.log(postList)
        return (
            <MDBContainer>  
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <MDBRow  style={{ marginTop: 100,}}>
                    <MDBCol></MDBCol>
                        <MDBCol className="col-sm-10" >
                            <MDBCard className="card" style={{backgroundColor:'transparent'}}>
                                <MDBCardTitle style={{color:'white'}} className="card-header text-center">Ajout d'articles</MDBCardTitle>
                                <MDBCardBody className="card-body">
                                    <MDBTable className="table">
                                        <MDBTableHead>
                                            <tr>
                                                <th className="required" >Titre du post</th>
                                                <th className="required" >Description</th>
                                                <th>Image</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <PostList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} postList={postList} />
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