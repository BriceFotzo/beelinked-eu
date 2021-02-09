import React, { Component } from 'react';
import { MDBNavLink, MDBAlert } from 'mdbreact';
import { Redirect } from "react-router-dom";
import axios from 'axios';
const env = require('../config');

export default class Connection extends Component {

    constructor() {
        super();
    }
    state = {
        message: null

    };


    handleLogin = e => {
        // localStorage.removeItem('userCo');
        
        // localStorage.clear();
        e.preventDefault();
        this.setState({ message: null })
        const dataLogin = {
            Email: this.email,
            Password: this.password
        };
        const { history } = this.props;



      axios.post(env.serverPath+':'+env.serverPort+'/login/', dataLogin).then(
            res => {
                console.log(res)
                
                    console.log('data login',res)
                    // console.log()
                    console.log(this.props.history)
                    localStorage.setItem('userCo', JSON.stringify({id: res.data[0].idUser, NAPI: res.data[0].NAPI, Email: res.data[0].Email, mdp: res.data[0].Password, statut: res.data[0].StatutId, Nom: res.data[0].Nom, Prenom: res.data[0].Prenom }))
                    history.push('/Userpage')
                    history.push({
                        pathname: '/Userpage',
                        state: { userCo: JSON.parse(localStorage.getItem('userCo')) }
                    });
                    
                    // return(
                    //     <Redirect to="/Userpage" />
                    // )
                }
                // else {
                //     this.setState({ message: "erreur" })
                // }

            // }
        )


    };
    render() {

        return (

            <div >
                <div className="App-header" style={{height: 532}}>
                    <form onSubmit={this.handleLogin} class="text-center" action="#!">
                        <br />
                        <br />

                        <p class="h4 mb-4">Sign in</p>


                        <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail"
                            onChange={e => this.email = e.target.value} />


                        <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"
                            onChange={e => this.password = e.target.value} />

                        <div class="d-flex justify-content-around">
                            <div>

                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="FormRemember" />
                                    <label class="custom-control-label" for="defaultLoginFormRemember">Remember me </label>
                                </div>
                            </div>
                            <br />
                            <div>

                                <a href="#">Forgot password?</a>
                            </div>
                        </div>


                        <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>
                        <p>Not a member?
                             <MDBNavLink to={'/register'}>Register</MDBNavLink>

                        </p>
                        <p>or sign in with:</p>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
                    </form>
                    <MDBAlert color="warning" className={this.state.message == "erreur" ? "d-block-inline" : "d-none"}>
                        Les identifiants sont incorrects. veuillez réessayer
                    </MDBAlert>
                </div>
            </div>

        )

    }

}