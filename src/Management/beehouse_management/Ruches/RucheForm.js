import React, {Component} from "react"; 
import { Multiselect } from 'multiselect-react-dropdown';
import { MDBBtn } from "mdbreact";
import axios from "axios";
const env = require('../../../config');

class RucheForm extends Component{
    state = {
        newName: '',
        number_of_cadres: '0',
        taille: 0,
        numeroSerie: '',
        TypeRucheId:'', 
        ListTypeRuches:[]
    }

    componentDidMount() {
        axios.get(env.serverPath+':'+env.serverPort+'/getAllTypeRuches').then((res)=>{  
            console.log(res.data);
          
            let listTypeRuches=[...this.state.ListTypeRuches];
  
            res.data.map((element) => {
                listTypeRuches.push(
                    { name:element.valeur,id:element.idTypeRuche }
                    ) 
            });
            
            this.setState({
                ListTypeRuches: listTypeRuches
            });
            })
    }
    handleChange = (event) => {

        if (event.target.id === "name") {
            this.setState({ newName: event.currentTarget.value });
        } else if (event.target.id === "numSerie") {
            this.setState({ numeroSerie: event.currentTarget.value });

        }
        else if (event.target.id === "taille") {
            this.setState({ taille: event.currentTarget.value });
        }
        else if (event.target.id=== "cadre"){
            this.setState({ number_of_cadres: event.currentTarget.value });
        }
    };
     onSelect = async (selectedList, selectedItem)=>{
        console.log(selectedItem.id)
        await this.setState({ TypeRucheId: selectedItem.id });
    }
    handleSubmit = async (event) => {

        console.log(this.state)

        event.preventDefault();
        
        const name = this.state.newName;
        const number_of_cadres = this.state.number_of_cadres;
        const taille = this.state.taille ;
        const numSerie=this.state.numeroSerie;
        const TypeRucheId=this.state.TypeRucheId;


        this.props.handleChange({ name, number_of_cadres, taille, numSerie, TypeRucheId });
        this.setState({ newName: '', number_of_hives: '0', newHiveAddress:'',Long:'', Lat: '', check : false });
    };

    render(){
        return (
                <div className="Ruches"   style={{backgroundColor : '#3369FF',width:'400px', padding:'10px', margin :'5px auto' }}>
                    <div className="card text-center" >
                        <div className="card-body">
                        <h5 className="card-title">Ajouter une nouvelle ruche</h5>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} value={this.state.newName} type="text" className="form-control" id="name" placeholder="nom de la ruche" required />
                            <br />

                            <input onChange={this.handleChange} value={this.state.numeroSerie} type="text" className="form-control" id="numSerie" placeholder="numero de serie" required />
                            <br />
                            
                            <Multiselect
                                    options={this.state.ListTypeRuches} // Options to display in the dropdown
                                    singleSelect={true}
                                   // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                   // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                            />
                            <br />
                            <label className="grey-text">
                                taille de la ruche (m)
                                </label>
                            <input onChange={this.handleChange} value={this.state.taille} type="number" min="0" id="taille" placeholder="taille de la ruche" required></input>
                            <br />
                            <label className="grey-text">
                                nombre de cadres
                                </label>
                            <input onChange={this.handleChange} value={this.state.number_of_cadres} type="number" min="0" id="cadre" placeholder="Nombre de cadres" required></input>
                            <br />
                           
                            <MDBBtn color="warning" size="sm" type="submit">
                                Valider
                            </MDBBtn>
                        </form>
                        </div>
                    </div>
                </div>
        )
       
    }
}
export default RucheForm;