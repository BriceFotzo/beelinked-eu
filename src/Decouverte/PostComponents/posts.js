import AjoutPost from './AjoutPost'
import React, { Component} from 'react';
import { MDBContainer } from 'mdbreact';
import CustomCards from '../../components/CustomCards'
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import "react-simple-flex-grid/lib/main.css";
// import "../../App.css"
const env = require('../../config');

export default class ApiApp extends Component {
    state = {
        postList: [],
        typePost:this.props.post_type,
        userCo : JSON.parse(localStorage.getItem('userCo'))

    }
    handleClick = (event) => {
        console.log(event.target)
    };

    
    clickOnDelete(record) {
        console.log(record)
        this.setState({
            postList: this.state.postList.filter(r => r !== record)
        });
        axios.post(env.serverPath+':'+env.serverPort+'/suppressionPost/', record).then(
              res => {
                console.log(res)
              }).catch((err) => {
                console.log("Erreur lors de l'ajout de la ruche : ",  " ", err)
              })
    }
    componentWillMount() {
        console.log("inmount",this.state.typePost)
        axios.post(env.serverPath+':'+env.serverPort+'/getAllPosts/',{'typePost':this.state.typePost})
            .then((response) => {
                
                this.setState({ postList: response.data })
            }).catch((err) => {
                console.log("Erreur lors de la sélection : ",  " ", err)
              })
    }
    render() {
        console.log(this.state.typePost)
        return (
            <div>
                    {this.state.userCo.statut===300? <AjoutPost typePost={this.state.typePost} /> : ''}
                    
                    <div className="row col-12 justify-content-center ">
                        <Fade top delay={1000} duration={1000}>
                        <MDBContainer className="trainingCards">
                        {/* <div className="row justify-content-center"> */}
    
                                {this.state.postList.map((item, key) =>
                                    item.image?

                                    <CustomCards 
                                    id={item.id} 
                                    handleClick={this.handleClick}
                                    cardTitle={item.titre} 
                                    image={item.image} 
                                    cardText={item.description} 
                                    link={"/contenu/"+this.state.typePost+"/"+item.id} 
                                    btnText="Voir plus" 
                                    access={this.state.userCo.statut}
                                    val={item}
                                    onDelete={this.clickOnDelete.bind(this)}/>
                                    :
                                    <CustomCards 
                                    id={item.id} 
                                    handleClick={this.handleClick}
                                    cardTitle={item.titre} 
                                    cardText={item.description} 
                                    link={"/contenu/"+this.state.typePost+"/"+item.id} 
                                    btnText="Voir plus" 
                                    access={this.state.userCo.statut}
                                    val={item}
                                    onDelete={this.clickOnDelete.bind(this)}/>
                                    )
                                }
                                {/* </div> */}
                                </MDBContainer>
                        </Fade>
                    </div>
            </div>
        )
    }
}
