
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
const env = require('../config');

export default class Register extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            Nom: this.firstName,
            Prenom: this.lastName,
            Email: this.email,
            Password: this.password,

        };
        Axios.post(env.serverPath+':'+env.serverPort+'/register/', data).then(
            res => {
                console.log(res)
            }

        )
    };
    render() {

        return (

            <div>

                    <form onSubmit={this.handleSubmit} class="text-center" action="#!">
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                        <p class="h4 mb-4">Sign up</p>

                        <input type="text" id="defaultLoginFormNom" class="form-control mb-4" placeholder="Nom"
                            onChange={e => this.firstName = e.target.value} />


                        <input type="text" id="defaultLoginFormPrenom" class="form-control mb-4" placeholder="Prenom"
                            onChange={e => this.lastName = e.target.value} />

                        <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail"
                            onChange={e => this.email = e.target.value} />


                        <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"
                            onChange={e => this.password = e.target.value} />

                        <input type="password" id="defaultLoginFormConfirmPassword" class="form-control mb-4" placeholder="Confirm Password"
                            onChange={e => this.confirmPassword = e.target.value} />

                        <div class="d-flex justify-content-around">
                            <div>

                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
                                    <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                                </div>
                            </div>
                            <div>

                                <a href="">Forgot password?</a>
                            </div>
                        </div>

                        <button class="btn btn-info btn-block my-4">Sign in</button>

                        <p>or sign in with:</p>

                        <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                        <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

                    </form>

            </div>
        )

    }

}