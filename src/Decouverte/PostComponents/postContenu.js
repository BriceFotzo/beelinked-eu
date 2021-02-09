import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import Section from './sectionCollapse'
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import AjoutContenu from './AjoutContenu'
const env = require('../../config');
export default class ApiApp extends Component {
    state = {
        posts: [],
        idPost:null,
        userCo : JSON.parse(localStorage.getItem('userCo'))
      }
      clickOnDelete(record) {
        console.log(record)
        this.setState({
            posts: this.state.posts.filter(r => r !== record)
        });
        axios.post(env.serverPath+':'+env.serverPort+'/suppressionContenu/', record).then(
              res => {
                console.log(res)
              }).catch((err) => {
                console.log("Erreur lors de la suppression du contenu: ",  " ", err)
              })
    }

       componentWillMount () {
        console.log(this.props)
        const { idPost } = this.props.idPost
        const { typePost } = this.props.typePost
        
           axios.post(env.serverPath+':'+env.serverPort+'/getContenu',this.props)
          .then((res) => {
            this.setState({ posts: res.data,
                idPost:idPost })
          })
          
      }

      
    render() {

        console.log("test",this.props)
        return (
            <div>
                
                    {this.state.posts.length!==0?
                    <MDBContainer >
                        {this.state.userCo.statut===300? 
                        <AjoutContenu titrePost={this.state.posts[0].titre} idPost={this.props.idPost}/> : ''}
                       
                    <div className="row col-12 justify-content-center ">
                        <Fade top delay={1000} duration={1000}>
                        <MDBContainer >
                            {this.state.posts.map((item, key) =>
                                    <Section 
                                    title={item.section} 
                                    description={item.contenu} 
                                    access={this.state.userCo.statut}
                                    onDelete={this.clickOnDelete.bind(this)} 
                                    val={item}/>)
                                }
                                </MDBContainer>
                        </Fade>
                    </div>
                    </MDBContainer >
                    :<div></div>}
                
            </div>
        )
    }
}
