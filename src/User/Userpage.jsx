import React, { Component, useState  } from 'react';
import Profile from './profile';
import ApiAccesRequests from './ApiAccesRequests';
import ApiMap from '../components/ApiMap';
import ApiSearch from './ApiSearch';
import PartageAvecMoi from './PartageAvecMoi';

const Userpage = props => {
    // const { id, email, mdp, statut, Nom, Prenom, NAPI } =
    //     (props.location && props.location.state) || {};

    // if (JSON.parse(localStorage.getItem('userCo')) == null) {
    //     localStorage.setItem('userCo', JSON.stringify({ id: id, Email: email, Mdp: mdp, Statut: statut, Nom: Nom, Prenom: Prenom, NAPI: NAPI }))
    // }
    // let userCo = JSON.parse(localStorage.getItem('userCo'))
    const [table, setTable] = useState(true);
    const [userCo, setUserCo] = useState(JSON.parse(localStorage.getItem('userCo')));
    return (
        <div>
 
            <div className="App-header col-12">
                <div class="container fluid justify-content-around ">
                    <div>
                        <h2>Bienvenue sur votre espace Beelinked!</h2>
                        <hr />
                    </div>
                    <div class="row justify-content-around">

                        <div class="col-9">
                            <h3> Carte des apiculteurs enregistrés </h3>
                            <h5> Trouvez les apiculteurs proches de vous, contactez les, consultez leurs données </h5>
<br/>
                            <div class="row">
                                <div class="col cold-md-5">
                                    <ApiMap userCo={userCo} />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col cold-md-5">
                                    <ApiSearch userCo={userCo} />
                                </div>
                            </div>
                            {/* <AskDataAccess userCo={userCo} /> */}
                        </div>
                    </div>
                    <br />
                    <div class="row justify-content-center">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" onClick={()=> {setTable(true)}} disabled={table == true ? true: false}>Demandes en attente</button>
                            <button class="btn btn-amber" onClick={()=> {setTable(false)}} disabled={table == false ? true: false}>Partagés avec moi</button>
                        </div>
                    </div>
                    <h1 className={(userCo.statut == 200 || userCo.statut == 300)  && table ? "d-block-inline" : "d-none"}>Demandes en attente</h1>
                    <hr className={(userCo.statut == 200 || userCo.statut == 300)  && table ? "d-block-inline" : "d-none"} />
                    <div class="row justify-content-center " className={userCo.Statut == 200  && table ? "d-block-inline, row justify-content-center" : "d-none"}>
                        <div class="col-6">
                            <ApiAccesRequests userCo={userCo} />
                        </div>
                    </div>
                    <h1 className={(userCo.statut == 200 || userCo.statut == 300)  && !table ? "d-block-inline" : "d-none"}>Partagés avec moi</h1>
                    <hr className={(userCo.statut == 200 || userCo.statut == 300)  && !table ? "d-block-inline" : "d-none"} />
                    <div class="row justify-content-center " className={userCo.Statut == 200  && !table ? "d-block-inline, row justify-content-center" : "d-none"}>
                        <div class="col-6">
                            <PartageAvecMoi userCo={userCo} />
                        </div>
                    </div>
                    

                </div>


            </div>
        </div>
    );
}
export default Userpage;