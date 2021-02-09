import React from "react"
import EditorList from "../../components/EditorList"
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import {MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardTitle,MDBTable,MDBTableBody} from 'mdbreact';
const env = require('../../config');

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];

    };
};

class Form extends React.Component {
    state = {
        editionList: [],
        contentList:[],
        newList:[]
    }

    handleContent = (idSection,idEdition,content) => {

        this.setState((prevState) => ({
            contentList: [...prevState.contentList,  { titreSection:document.getElementById(idSection).value,idEditeur:idEdition.split('_')[1],contenu:content,idPost:this.props.idPost}],
        }));
        const personGroupedByColor = this.groupBy(this.state.contentList);
        const list=[]
  
  Object.entries(personGroupedByColor).map((item, key) =>
  
 list.push(Object.values(item)[1].last())
  
);
this.setState((prevState) => ({
    newList: list,
}));
    }
    groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue.idEditeur] = result[currentValue.idEditeur] || []).push(
            currentValue
          );
    
          return result;
        }, {});
      };

    
    addNewRow = (e) => {
        console.log(e)
        this.setState((prevState) => ({
            editionList: [...prevState.editionList, { text:""}],
        }));
        
    }

    deteteRow = (index) => {
        this.setState({
            editionList: this.state.editionList.filter((s, sindex) => index !== sindex),
        });

    }
    handleSubmit = (e) => {
        // e.preventDefault();
        this.state.newList.map((item,key)=>{
            // console.log(i)
            axios.post(env.serverPath+':'+env.serverPort+'/ajoutDeContenu/', item).then(
              res => {
                console.log(res)
              }).catch((err) => {
                console.log("Erreur lors de l'ajout de la ruche : ", key, " ", err)
              })    
        }
  )
        // console.log("data",e)
    
        for (var i = 0; i < this.state.editionList.length; i++) {
            if (this.state.editionList[i].titrePost === '' || this.state.editionList[i].chapitre === '') {
                NotificationManager.warning("Please Fill up Required Field.Please Check Project name And chapitre Field");
                return false;
            }
        }
      
    }
    clickOnDelete(record) {
        this.setState({
            editionList: this.state.editionList.filter(r => r !== record)
        });
    }
    
    render() {
        
        let { editionList } = this.state
        let { contentList } = this.state
        let { newList } = this.state
        console.log('list',editionList)
        console.log('content',contentList)
        console.log('new',newList)
        console.log('idPost',this.props.idPost)
        return (
            <MDBContainer>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <MDBRow  style={{ marginTop: 100,}}>
                    <MDBCol></MDBCol>
                        <MDBCol className="col-sm-10" >
                            <MDBCard className="card" style={{backgroundColor:'transparent'}}>
                                <MDBCardTitle style={{color:'white'}} className="card-header text-center">Gestion de la Post: <span className="titrePost">{this.props.titrePost}</span> </MDBCardTitle>
                                <MDBCardBody className="card-body">
                                    <MDBTable className="table">
                                    <div className="form-group ">
                                                <label className="required sections">Sections</label>
                                            </div>
                                        <MDBTableBody>
                                            <EditorList onContentChange={this.handleContent} add={this.addNewRow} delete={this.clickOnDelete.bind(this)} editionList={editionList} />
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