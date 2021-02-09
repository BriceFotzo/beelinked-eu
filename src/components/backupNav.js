import React from 'react';
//libraries
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css';
import'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

//components
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBIcon ,MDBDropdownItem
  } from "mdbreact";
//style sheets
import logo from '../logo.svg';

const menu =[
  {"id":1,
  'title':'Découverte',
  'link':"#",
  'dropdown':true,
  'submenu':[{"title":"La vie dans la ruche",
              "link":"#"},
              {"title":"Mes apiculteurs",
              "link":"#"},
              {"title":"Ma formation",
              "link":"#"},
              {"title":"Mon forum",
              "link":"#"},
              {"title":"Ma ruche virtuelle",
              "link":"#"}
             ]
},
{"id":2,
'title':'Mes modules',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Commande",
            "link":"#"},
            {"title":"Installation",
            "link":"#"},
            {"title":"SAV",
            "link":"#"}
           ]
},
{"id":3,
'title':'Mes ruchers',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Création",
            "link":"#"},
            {"title":"Météo",
            "link":"#"},
            {"title":"Mes étiquettes",
            "link":"#"}
           ]
},
{"id":4,
'title':'Mes ruches',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Création",
            "link":"#"},
            {"title":"Tableau de bord",
            "link":"#"},
            {"title":"Compte rendu",
            "link":"#"},
            {"title":"Mes notifications",
            "link":"#"},
            {"title":"Mon matériel",
            "link":"#"}
           ]
},
{"id":5,
'title':'Mes demarches',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Déclaration de ruches",
            "link":"#"},
            {"title":"Convention d’occupation du ruche",
            "link":"#"},
            {"title":"Mon syndicat apicole",
            "link":"#"},
            {"title":"Mon service vétérinaire",
            "link":"#"},
            {"title":"Mon vétérinaire",
            "link":"#"}
           ]
},
{"id":6,
'title':'Shopping',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Acheter du miel",
            "link":"#"},
            {"title":"Acheter du matériel",
            "link":"#"},
            {"title":" Acheter un traitement",
            "link":"#"},
            {"title":"Faire une analyse",
            "link":"#"}
           ]
},
{"id":5,
'title':'Mon Agenda',
'link':"#",
'dropdown':true,
'submenu':[{"title":"Mes tâches",
            "link":"#"},
            {"title":"Mes rappels",
            "link":"#"}
           ]
}
]
class BeeNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: false,
          isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
      }

      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }

      render() {
        return (
          <div>
              <Router>
                <MDBNavbar color="amber darken-1" fixed="top" dark expand="md" scrolling transparent>
                  <MDBNavbarBrand href="#home">
                    <img src={logo} style={{width:50, marginTop: 3}} alt=""/>
                    <strong>Beelinked</strong>
                  </MDBNavbarBrand>
                  {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                  <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav right>
                      <MDBNavItem >
                        <MDBNavLink to="#">Connexion</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="#">Inscription</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem active rounded>
                        <MDBNavLink to="#">Commandez votre Module!</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

                      <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
                    </MDBNavbarNav>
                  </MDBCollapse>
                </MDBNavbar>
              </Router>
          </div>
        );
      }
    }
    
  export default BeeNav; 
  
  