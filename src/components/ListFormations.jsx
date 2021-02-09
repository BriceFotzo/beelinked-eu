import React, { Component } from 'react'
import FormationsServices from '../BackOffice/Formations/FormationsServices'

class ListFormationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                formations: []
        }
        this.addFormation = this.addFormation.bind(this);
        this.editFormation = this.editFormation.bind(this);
        this.deleteFormation = this.deleteFormation.bind(this);
    }

    deleteFormation(id){
        FormationService.deleteFormation(id).then( res => {
            this.setState({formations: this.state.formations.filter(formation => formation.id !== id)});
        });
    }
    viewFormation(id){
        this.props.history.push(`/view-formation/${id}`);
    }
    editFormation(id){
        this.props.history.push(`/add-formation/${id}`);
    }

    componentDidMount(){
        FormationService.getFormations().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addFormation(){
        this.props.history.push('/add-formation/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Formations List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addFormation}> Add Formation</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Formations First Name</th>
                                    <th> Formations Last Name</th>
                                    <th> Formations Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.formations.map(
                                        formation => 
                                        <tr key = {formation.id}>
                                             <td> { formation.firstName} </td>   
                                             <td> {formation.lastName}</td>
                                             <td> {formation.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editFormation(formation.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFormation(formation.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFormation(formation.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListFormationComponent