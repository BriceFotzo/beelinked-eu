import React, { Component } from "react";
import axios from "axios";
const env = require('../../config');

class RapportForm extends Component {
    state = {
      idUserConnected: '',
      ListFormGroups:[
        {
          "elements":[
            {
              "elementId":'inputListRuche', 
              "elementValue":''
            }
          ]
        }, 
        {
          "elements":[
            {
              "elementId":'inputListTypeIntervention', 
              "elementValue":''
            }
          ]
        }, 
        {
          "elements":[
            {
              "elementId":'inputTextAreaCommentaire', 
              "elementValue":''
            }
          ]
        },
        {
          "checkId": 'inputCheckCouvainMale',
          "checkValue" : false ,
          "elements": [
            { "elementId":'inputNumberCouvainMale',
              "elementValue":0
            }
          ]
        },
        {
          "checkId":'inputCheckComportementAbeilles',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputListComportementAbeilles',
              "elementValue":'calmes'
            }
          ] 
        }, 
        {
          "checkId":'inputCheckActiviteRuche',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputNumberActiviteRuche',
              "elementValue":10
            }
          ] 
        }, 
        {
          "checkId":'inputCheckPresenceCellulesReines',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioPresenceCellulesReines1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioPresenceCellulesReines2',
              "elementValue":'non'
            },
            {
              "elementId":'inputNumberPresenceCellulesReines',
              "elementValue":''
            }
          ] 
        }, 
        {
          "checkId":'inputCheckUniformitePonte',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioUniformitePonte1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioUniformitePonte2',
              "elementValue":'non'
            }
          ]
        },
        { 
          "checkId":'inputCheckPresencePollen',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioPresencePollen1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioPresencePollen2',
              "elementValue":'non'
            }
          ]
        },
        {
          "checkId":'inputCheckFrelonAsiatique',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioFrelonAsiatique1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioFrelonAsiatique2',
              "elementValue":'non'
            }
          ]
        },
        {
          "checkId":'inputCheckPresenceReine',
          "checkValue" :false, 
          "elements":[ 
            {
              "elementId":'inputRadioPresenceReine1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioPresenceReine2',
              "elementValue":'non'
            }
          ]
        },
        {
          "checkId":'inputCheckEssaimage',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioEssaimage1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioEssaimage2',
              "elementValue":'non'
            }
          ]
        },
        {
          "checkId":'inputCheckPresenceMaladie',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioPresenceMaladie1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioPresenceMaladie2',
              "elementValue":'non'
            },
            {
              "elementId":'inputTextPresenceMaladie',
              "elementValue":''
            }
          ]
        },
        {
          "checkId":'inputCheckMateriel',
          "checkValue" :false, 
          "elements":[
            {
              "elementId":'inputRadioMateriel1',
              "elementValue":'oui'
            },
            {
              "elementId":'inputRadioMateriel2',
              "elementValue":'non'
            }, 
            {
              "elementId":'inputListMateriel',
              "elementValue":''
            }, 
            {
              "elementId":'inputNumberMateriel', 
              "elementValue":''
            }
          ]
        }, 
        {
          "checkId":'inputCheckPositionnement', 
          "checkValue":false,
          "elements":[
            {
              "elementId":'inputListPositionnement',
              "elementValue":''
            }
          ]
        },
        {
          "checkId":'inputCheckCadresCouvain', 
          "checkValue":false,
          "elements":[
            {
              "elementId":'inputNumberCadresCouvain',
              "elementValue":''
            }
          ]
        }
      ], 
      ListTypesIntervention:[],
      ListMaterielsUser:[], 
      ListRuchesUser:[],
      ListFormInputs:{
          typeInterventionId:'',
          rucheId:'',
          commentaire:'',
          comportementAbeille:'',
          pctCouvain:'',
          activiteRuche:'',
          nbreCellulReines:'',
          uniformitePonte:'',
          pollen:'',
          frelon:'',
          presenceReine:'',
          essaimage:'',
          maladie:'',
          materielId:'',
          quantiteMateriel:'',
          nbreCadreCouvain:'',
          positionnement:'',
          autreIntervention:'',
        }
    }

    componentDidMount() {

      let userCo = JSON.parse(localStorage.getItem('userCo'));
      axios.post(env.serverPath+':'+env.serverPort+'/login/', { Email: userCo.Email, Password: userCo.Mdp }).then(
      res => {
        if (res.data.message == null) {
          // id = res.data[0].idUser
          this.setState({ idUserConnected: res.data[0].idUser })
          const dataResearch = {
            idUser: res.data[0].idUser
          };
          console.log(res.data[0].idUser)
          axios.post(env.serverPath+':'+env.serverPort+'/getAllMaterielByIdUser/', dataResearch).then((res) => {
      
            let listeMateriels = [...this.state.ListMaterielsUser];
            console.log(res.data)
            res.data.map((element) => {
              listeMateriels.push(
                { id: element.idMateriel, nom: element.Nom, stock: element.Stock, seuil:element.Seuil, unite:element.Unite }
              )
            });
      
            this.setState({
              ListMaterielsUser: listeMateriels
            });
          });
          axios.post(env.serverPath+':'+env.serverPort+'/getAllRuchesByIdUser/', dataResearch).then((res) => {
      
            let ListRuchesUser = [...this.state.ListRuchesUser];
            console.log(res.data)
            res.data.map((element) => {
              ListRuchesUser.push(
                { id: element.id_ruche, nom: element.nom_ruche }
              )
            });
      
            this.setState({
              ListRuchesUser: ListRuchesUser
            });
          })


        }
      });
      axios.get(env.serverPath+':'+env.serverPort+'/getAllTypeInterventionsRucher').then((res)=>{ 
        
            let ListTypesIntervention=[...this.state.ListTypesIntervention];
  
            res.data.map((element) => {
              ListTypesIntervention.push(
                    { name:element.nom,id:element.idTypeInter }
                    ) 
            });
            
            this.setState({
              ListTypesIntervention:ListTypesIntervention
            });
            })


      this.state.ListFormGroups.forEach((element) => {

          if(element.checkValue==true){
            
            document.getElementById(element.checkId).checked=true;

            element.elements.forEach(elt=>{
              document.getElementById(elt.elementId).disabled=false;
            });

          }else if(element.checkValue==false){
            element.elements.forEach(elt=>{
              document.getElementById(elt.elementId).disabled=true;
            });
          }

      });

    }
    

    handleChange = (event) => {

      var checkId=event.target.id;
      let list = [...this.state.ListFormGroups];
      var radio;
      var indice;
      if(event.currentTarget.value==='non'){
          radio=true;
          indice=1;
      }else if(event.currentTarget.value==='oui'){
          radio=false;
          indice=2;
      }

      if(event.currentTarget.value==='non' || 'oui'){

        this.state.ListFormGroups.forEach((element,index) => {        
          element.elements.forEach((elt,ind)=>{
            
            if(checkId==elt.elementId){
              for(var i=ind+indice;i<element.elements.length;i++){
                document.getElementById(element.elements[i].elementId).disabled=radio;
              }             
            }
           
          });
        });
      }
      
      this.state.ListFormGroups.forEach((element,index) => {        
        element.elements.forEach((elt,ind)=>{
          if(checkId==elt.elementId){
           
            list[index].elements[ind].elementValue=event.currentTarget.value;
            this.setState({ ListFormGroups : list });
          }
         
        });
      });
    }
    
    handleCheck = (event) => {

     
      
     var checkId=event.target.id;
     let list = [...this.state.ListFormGroups];
     
      this.state.ListFormGroups.forEach((element,index) => {
      if(element.checkId===checkId){
        element.elements.forEach((elt,ind)=>{
          if(element.checkValue===true){
            if(document.getElementById(elt.elementId).type !== 'radio'){
              list[index].elements[ind].elementValue="";
              this.setState({ ListFormGroups : list });
            }
          }
          document.getElementById(elt.elementId).disabled=!document.getElementById(elt.elementId).disabled;
          element.checkValue=!element.checkValue;
        });
      }
      
    });
  }

  checkFormInputRadio = function (checkId) {
    return checkId
  }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.ListFormGroups)

        let infoCR = {};

        let infoForm=[...this.state.ListFormGroups];
/*
        typeInterventionId:'',
          rucheId:'',
          commentaire:'',
          comportementAbeille:'',
          pctCouvain:'',
          activiteRuche:'',
          nbreCellulReines:'',
          uniformitePonte:'',
          pollen:'',
          frelon:'',
          presenceReine:'',
          essaimage:'',
          maladie:'',
          materielId:'',
          quantiteMateriel:'',
          nbreCadreCouvain:'',
          positionnement:'',
          autreIntervention:'',
*/
        infoCR.rucheId=parseInt(infoForm[0].elements[0].elementValue);
        infoCR.typeInterventionId=parseInt(infoForm[1].elements[0].elementValue);
        infoCR.commentaire=infoForm[2].elements[0].elementValue; 
        infoCR.comportementAbeille='calmes';
        infoCR.pctCouvain=20;
        infoCR.activiteRuche=30;
        infoCR.nbreCellulReines=3
        infoCR.uniformitePonte=true;
        infoCR.pollen=false;
        infoCR.frelon=true;
        infoCR.presenceReine=false;
        infoCR.essaimage=true;
        infoCR.maladie="";
        infoCR.materielId=1;
        infoCR.quantiteMateriel=11;
        infoCR.nbreCadreCouvain=4;
        infoCR.positionnement="Bord";
        infoCR.autreIntervention="";


        console.log(infoCR)

        this.props.handleChange({ infoCR});
    };

    render() {
        return (
            <div > 
            <form onSubmit={this.handleSubmit}>
            <div class="row mb-10">
              
              <label for="exampleDataList" class="form-label"> Nom de la ruche </label>
              <select class="form-select form-control" required id="inputListRuche" onChange={this.handleChange}>
                <option disabled selected>De quelle ruche voulez-vous faire un compte-rendu ?</option>
              {
                    this.state.ListRuchesUser.map((ruche) => (
                      <option value={ruche.id}> {ruche.nom}</option> 
                    ))
                  }
              </select>
               
            </div>

            <br/>
              
            <div class="row mb-10">
              <label for="exampleDataList1" class="form-label">Type d'intervention</label>
                <select class="form-select form-control" required id="inputListTypeIntervention" onChange={this.handleChange}>
                <option disabled selected>Quelle intervention avez-vous réalisé ?</option>
                  {
                    this.state.ListTypesIntervention.map((intervention) => (
                      <option value={intervention.id}> {intervention.name}</option> 
                    ))
                  }
              </select>
                
            </div>
          <hr/>

          <div class="row mb-10">
              <div class="col">
                <div class="form-outline">
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckCouvainMale" onChange={this.handleCheck}/>
                      <label class="form-label" ><strong> Pourcentage couvain mâle  </strong>  </label>
                    </div>
                  <input type="number" id="inputNumberCouvainMale"  class="form-control" min="0" max="100" placeholder="pourcentage"  value={this.state.ListFormGroups[3].elements[0].elementValue}  onChange={this.handleChange}/>
                </div>
               
              </div>
              <div class="col">
                    <div clas="form-outline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckComportementAbeilles"  onChange={this.handleCheck}/>
                      <label  class="form-label"> <strong>Comportement des abeilles  </strong></label>
                      <input class="form-control" list="datalistOptionsComportementAbeilles" id="inputListComportementAbeilles" value={this.state.ListFormGroups[4].elements[0].elementValue} onChange={this.handleChange} placeholder="Type to search..."/>
                      <datalist id="datalistOptionsComportementAbeilles">
                          <option> Calmes  </option>
                          <option> Nerveuses </option>
                          <option> Agressives</option>
                      </datalist>
                    </div>
              </div>
              <div class="col">
                <div class="form-outline">
                      <div clas="form-inline">
                        <input class="form-check-input" type="checkbox"  id="inputCheckActiviteRuche"  onChange={this.handleCheck}/>
                        <label class="form-label" ><strong> Activité de la ruche   </strong>  </label>
                      </div>
                    <input type="number" id="inputNumberActiviteRuche" class="form-control" min="0" placeholder="Abeilles au départ par mn" value={this.state.ListFormGroups[5].elements[0].elementValue}  onChange={this.handleChange}/>
                  </div>
              </div>
          </div>

            <br/>

            <div class="row mb-10">
              <div class="col">
                      <input class="form-check-input" type="checkbox"  id="inputCheckPresenceCellulesReines"  onChange={this.handleCheck} />
                      <label class="form-label" > <strong> Présence de cellules reines ?   </strong></label>
              </div> 
              <br/>
              <div class="col">
                  <div clas="form-inline">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNamePresenceCellulesReines" id="inputRadioPresenceCellulesReines1" onChange={this.handleChange} value={this.state.ListFormGroups[6].elements[0].elementValue} />
                        <label class="form-check-label" for="inlineRadio1">Oui</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNamePresenceCellulesReines" id="inputRadioPresenceCellulesReines2" onChange={this.handleChange} value={this.state.ListFormGroups[6].elements[1].elementValue}/>
                        <label class="form-check-label" for="inlineRadio2">Non</label>
                      </div>
                    </div>
              </div> 
              <div class="col">
                <input type="number" id="inputNumberPresenceCellulesReines" class="form-control" min="0" onChange={this.handleChange} value={this.state.ListFormGroups[6].elements[2].elementValue} placeholder="Quantité"/>
              </div>
            </div>

            <hr />
            <div class="row mb-10">
              <div class="col">
                <div class="form-outline">
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckUniformitePonte" onChange={this.handleCheck} />
                      <label class="form-label" ><strong> Uniformité de la ponte ? </strong>  </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameUniformitePonte" id="inputRadioUniformitePonte1" onChange={this.handleChange} value={this.state.ListFormGroups[7].elements[0].elementValue}/>
                      <label class="form-check-label">Oui</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameUniformitePonte" id="inputRadioUniformitePonte2" onChange={this.handleChange} value={this.state.ListFormGroups[7].elements[1].elementValue}/>
                      <label class="form-check-label">Non</label>
                    </div>
                 
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckPresencePollen"  onChange={this.handleCheck} />
                      <label class="form-label" > <strong> Présence de pollen ?   </strong></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNamePresencePollen" id="inputRadioPresencePollen1" onChange={this.handleChange} value={this.state.ListFormGroups[8].elements[0].elementValue}/>
                      <label class="form-check-label">Oui</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNamePresencePollen" id="inputRadioPresencePollen2" onChange={this.handleChange} value={this.state.ListFormGroups[8].elements[1].elementValue}/>
                      <label class="form-check-label">Non</label>
                    </div>
                 
                </div>
              </div>
             
            </div>
              <br/>

            <div class="row mb-10">
              <div class="col">
                <div class="form-outline">
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckFrelonAsiatique"  onChange={this.handleCheck} />
                      <label class="form-label" for="form6Example1"><strong> Frelon asiatique  ? </strong>  </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameFrelonAsiatique" id="inputRadioFrelonAsiatique1" onChange={this.handleChange} value={this.state.ListFormGroups[9].elements[0].elementValue}/>
                      <label class="form-check-label">Oui</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameFrelonAsiatique" id="inputRadioFrelonAsiatique2" onChange={this.handleChange} value={this.state.ListFormGroups[9].elements[1].elementValue}/>
                      <label class="form-check-label">Non</label>
                    </div>
                 
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckPresenceReine" onChange={this.handleCheck} />
                      <label class="form-label" > <strong> Présence de la reine ?   </strong></label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNamePresenceReine" id="inputRadioPresenceReine1" onChange={this.handleChange} value={this.state.ListFormGroups[10].elements[0].elementValue}/>
                      <label class="form-check-label" for="inlineRadio1">Oui</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNamePresenceReine" id="inputRadioPresenceReine2" onChange={this.handleChange} value={this.state.ListFormGroups[10].elements[1].elementValue}/>
                      <label class="form-check-label" for="inlineRadio2">Non</label>
                    </div>
                 
                </div>
              </div>
             
            </div>
            <br/>
            <div class="row mb-10">
              <div class="col">
                      <input class="form-check-input" type="checkbox"  id="inputCheckEssaimage"  onChange={this.handleCheck} />
                      <label class="form-label"> <strong> Essaimage  ?   </strong></label>
              </div> 
              <div class="col">
                <div clas="form-inline">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameEssaimage" id="inputRadioEssaimage1" onChange={this.handleChange} value={this.state.ListFormGroups[11].elements[0].elementValue}/>
                      <label class="form-check-label" for="inlineRadio1">Oui</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inputNameEssaimage" id="inputRadioEssaimage2" onChange={this.handleChange} value={this.state.ListFormGroups[11].elements[1].elementValue}/>
                      <label class="form-check-label" for="inlineRadio2">Non</label>
                    </div>
                  </div>
                </div> 
            </div>
            <hr />
            <div class="row mb-10">
              <div class="col">
                <div class="form-outline">
                    <div clas="form-inline">
                      <input class="form-check-input" type="checkbox"  id="inputCheckPositionnement"  onChange={this.handleCheck} />
                      <label class="form-label" ><strong> Positionnement </strong>  </label>
                    </div>
                    <div  class="form-inline">
                      <div class="col">
                          <input class="form-control" list="datalistOptionsPositionnement" id="inputListPositionnement" value={this.state.ListFormGroups[14].elements[0].elementValue} onChange={this.handleChange} placeholder="---"/>
                          <datalist id="datalistOptionsPositionnement">
                              <option> Bord</option>
                              <option> Centre </option>
                          </datalist>
                      </div>
                    </div>
                </div>
              </div>
              <div clas="col"></div>
              <div class="col">
                <div class="form-outline">
                      <div clas="form-inline">
                        <input class="form-check-input" type="checkbox"  id="inputCheckCadresCouvain"  onChange={this.handleCheck}/>
                        <label class="form-label" ><strong> Nombre cadre de couvains </strong>  </label>
                      </div>
                    <input type="number" id="inputNumberCadresCouvain" class="form-control" min="0"  value={this.state.ListFormGroups[15].elements[0].elementValue} onChange={this.handleChange} placeholder="Cadres de couvains"/>
                  </div>
              </div>
            </div>
            <br />
            <div class="row mb-10">
              <div class="col">
                      <input class="form-check-input" type="checkbox"  id="inputCheckPresenceMaladie"  onChange={this.handleCheck} />
                      <label class="form-label"> <strong> Présence de maladie   ?   </strong></label>
              </div> 
              <br/>
              <div class="col">
                  <div clas="form-inline">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNamePresenceMaladie" id="inputRadioPresenceMaladie1" onChange={this.handleChange} value={this.state.ListFormGroups[12].elements[0].elementValue}/>
                        <label class="form-check-label" for="inlineRadio1">Oui</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNamePresenceMaladie" id="inputRadioPresenceMaladie2" onChange={this.handleChange} value={this.state.ListFormGroups[12].elements[1].elementValue}/>
                        <label class="form-check-label" for="inlineRadio2">Non</label>
                      </div>
                    </div>
              </div> 
              <input type="text" onChange={this.handleChange}  value={this.state.ListFormGroups[13].elements[2].elementValue}  id="inputTextPresenceMaladie" onChange={this.handleChange} class="form-control" value={this.state.ListFormGroups[12].elements[2].elementValue} placeholder="Maladie"/>
            </div>
            
            <hr />
            <div class="row mb-10">
              <div class="col">
                      <input class="form-check-input" type="checkbox"  id="inputCheckMateriel"  onChange={this.handleCheck} />
                      <label class="form-label" > <strong> Avez vous utilisé du matériel  ?  </strong></label>
              </div> 
              <br/>
              <div class="col">
                  <div class="form-inline">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNameMateriel" id="inputRadioMateriel1" onChange={this.handleChange} value={this.state.ListFormGroups[13].elements[0].elementValue}/>
                        <label class="form-check-label" for="inlineRadio1">Oui</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputNameMateriel" id="inputRadioMateriel2" onChange={this.handleChange} value={this.state.ListFormGroups[13].elements[1].elementValue}/>
                        <label class="form-check-label" for="inlineRadio2">Non</label>
                      </div>
                    </div>
              </div> 
              <div  class="form-inline">
                <div class="col">
                <select class="form-select form-control" required id="inputListMateriel" onChange={this.handleChange}>
                <option disabled selected>Lequel de vos matériels </option>
                  {
                    this.state.ListMaterielsUser.map((materiel) => (
                      <option value={materiel.id}> {materiel.nom}</option> 
                    ))
                  }
                </select>
                    
                </div>
                <div class="col">
                    <input type="number" id="inputNumberMateriel" class="form-control" min="0" onChange={this.handleChange} value={this.state.ListFormGroups[13].elements[3].elementValue} placeholder="Quantité"/>
                </div>
              </div>
             
             
            </div>
            <hr />

            <div class="form-outline mb-4">
              <textarea class="form-control" id="inputTextAreaCommentaire" rows="3" value={this.state.ListFormGroups[2].elements[0].elementValue}  onChange={this.handleChange} ></textarea>
              <label class="form-label">Commentaire</label>
            </div>



            <button type="submit" class="btn btn-primary btn-block mb-3"> Valider Compte rendu </button>
          </form>
        </div>

        )

    }
}
export default RapportForm;