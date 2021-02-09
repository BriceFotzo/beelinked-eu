import React, {Component} from "react"; 
import ReactCardFlip from "react-card-flip";
import { FaPlus } from 'react-icons/fa';
import { MDBBtn } from "mdbreact";
import axios from "axios";
const env = require('../../../config');

class RucherForm extends Component{
    state = {
        nomNouveauRucher :'',
        nbreRuchesNouveauRucher:'0', 
        addressNouveauRucher:'',
        isFlipped :false
    }
    async componentWillMount(){
        
            this.getPosition()
            .then((position) => {​​​​​​​​
         this.getPosition().then()
            console.log(position.coords.latitude);

            }​​​​​​​);
        
        }
   getPosition = function (options) 
        {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        }

    handleFlip =(event)=>{
        this.setState({isFlipped : (!this.state.isFlipped)});
    }

    handleChange = (event) => {
        if(event.target.type ==="text"){
            this.setState({nomNouveauRucher:event.currentTarget.value});
        }
        else if(event.target.type ==="number"){
            this.setState({nbreRuchesNouveauRucher:event.currentTarget.value});
        }

      };

      handleSubmit = async (event) => {
        event.preventDefault();
        let res = await axios.get(env.serverPath+':'+env.serverPort+'/idRucher'); 
        const id= res.data +1;
        //const id = new Date().getTime();
        const nom = this.state.nomNouveauRucher;
        const nbreRuches = this.state.nbreRuchesNouveauRucher;
        this.props.handleChange({ id, nom, nbreRuches });
        this.setState({ nomNouveauRucher:'',nbreRuchesNouveauRucher:'0'});
      };
    
    render(){
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <div className="Ruchers" onMouseEnter={this.handleFlip} style={{backgroundColor : '#FFC733',width:'300px',height:'276px', padding:'10px', margin :'5px 11.4px' }}>
                   
                        <div className="card-body">
                            <h1>
                                <FaPlus/>
                            </h1>
                        </div>
                    
                </div>
                <div className="Ruchers" onMouseLeave={this.handleFlip}  style={{backgroundColor : '#FFC733',width:'300px',height:'276px',padding:'10px' }}>
                    <div className="card text-center" >
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <p className="h4 text-center mb-4">Ajouter un rucher</p>
                                    <input onChange={this.handleChange} value={this.state.nomNouveauRucher} type="text" className="form-control" placeholder="nom du rucher" required/>
                                <br />
                                
                                <label className="grey-text">
                                nombre de ruches
                                </label>
                                <input onChange={this.handleChange} value={this.state.nbreRuchesNouveauRucher} type="number" min="0" placeholder ="Nombre de ruches" required></input>
                                <br />
                                
                                <MDBBtn color="warning" size="sm" type="submit">
                                    Valider
                                </MDBBtn>
                            </form>
                        </div>
                    </div>
                </div>
            </ReactCardFlip>
        )
       
    }
}
export default RucherForm;