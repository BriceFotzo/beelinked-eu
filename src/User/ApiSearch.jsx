import React, { Component } from 'react';
import { MDBInput } from "mdbreact";
import axios from "axios";
import AskDataAccess from './AskDataAccess';
const env = require('../config');

class ApiSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codeP: 0,
            apics: []
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({ codeP: event.target.value });
    }
    handleClick = async () => {
        console.log("code postal: ", this.state.codeP)
        await axios.post(env.serverPath+':'+env.serverPort+'/getApiByPC', this.state).then((result) => {
            let tampons = [...this.state.apics]
            console.log("tampons", tampons)
            result.data.map((element) => {
                tampons.push({ Nom: element.Nom, Prenom: element.Prenom, Email: element.Email, CP: element.CP, Telephone: element.Telephone })
                console.log("tampons", tampons)
                console.log("element", element)
            })
            this.setState({ apics: tampons })

        })
        console.log("apiculteurs vers le ", this.state.codeP, ": ", this.state.apics)
    }
    render() {
        return (
            <div class="container">
                <div className="row">
                    <div class="col col-12 col-md-12 form-inline">
                        <MDBInput label="Entrez votre code postal" icon="search" type="number" background color="amber" background size="sm" onChange={this.handleChange} value={this.state.codeP} />
                        <button className="btn btn-sm btn-amber" onClick={this.handleClick}>Rechercher</button>
                    </div>
                </div>
                <div className={this.state.apics.length > 0 ? "d-block-inline" : "d-none"} >
                    <div className="row justify-content-start" style={{width: 800}}>
                        <AskDataAccess userCo ={this.props.userCo}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default ApiSearch;