import React, { Component } from 'react';
//libraries
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import MenuNav from '../components/NavBar'
import UserCard from '../components/userCard'
//components
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBIcon, MDBDropdownItem, MDBNavLink, MDBBtn
} from "mdbreact";


//style sheets
import logo from '../assets/images/logo.svg.svg';
// if(JSON.parse(localStorage.getItem('userCo')) !== null)
// {
//   this.setState({userData:JSON.parse(localStorage.getItem('userCo'))})
// } 
//  else{
//   const userData= null
//  }

const menu = [
  {
    "id": 1,
    'title': 'Découverte',
    'access': '0',
    'link': "#",
    'dropdown': true,
    'submenu': [{
      "title": "La vie dans la ruche",
      "link": "/posts/vie-dans-la-ruche"
    },
    {
      "title": "Mes apiculteurs",
      "link": "/apiculteurs"
    },
    {
      "title": "Ma formation",
      "link": "/posts/formation"
    },
    {
      "title": "Mon forum",
      "link": "/forum"
    },
    {
      "title": "Ma ruche virtuelle",
      "link": "/posts/ma-ruche-virtuelle"
    }
    ]
  },
  {
    "id": 2,
    'title': 'Modules Beelinked',
    'access': '0',
    'link': "#",
    'dropdown': true,
    'submenu': [{
      "title": "Commandes",
      "link": "/commandes"
    },
    {
      "title": "Installation",
      "link": "/posts/installation"
    },
    {
      "title": "SAV",
      "link": "/sav"
    }
    ]
  },
  {
    "id": 3,
    'title': 'Mon Elevage',
    'access': '1',
    'link': "#",
    'dropdown': true,
    'submenu': [{
      "title": "Mes ruchers",
      "link": "/BeehouseManagement"
    },
    {
      "title": "Météo",
      "link": "/meteo"
    },
    {
      "title": "Mes étiquettes",
      "link": "/mes-etiquettes"
    },
    {
      "title": "Mon matériel",
      "link": "/matériel"
    }
    ]
  }
  ,
  {
    "id": 5,
    'title': 'Mes demarches',
    'access': '1',
    'link': "#",
    'dropdown': true,
    'submenu': [{
      "title": "Déclaration de ruches",
      "link": "declaration"
    },
    {
      "title": "Convention d’occupation du ruche",
      "link": "#"
    },
    {
      "title": "Mon syndicat apicole",
      "link": "#"
    },
    {
      "title": "Mon service vétérinaire",
      "link": "#"
    },
    {
      "title": "Mon vétérinaire",
      "link": "#"
    }
    ]
  },
  {
    "id": 6,
    'title': 'Shopping',
    'access': '0',
    'link': "/posts/shopping",
    'dropdown': false,
    'submenu': [{
      "title": "Acheter du miel",
      "link": "#"
    },
    {
      "title": "Acheter du matériel",
      "link": "#"
    },
    {
      "title": " Acheter un traitement",
      "link": "#"
    },
    {
      "title": "Faire une analyse",
      "link": "#"
    }
    ]
  },
  // {
  //   "id": 5,
  //   'title': 'Mon Agenda',
  //   'access': '1',
  //   'link': "#",
  //   'dropdown': true,
  //   'submenu': [{
  //     "title": "Mes tâches",
  //     "link": "/Taches"
  //   },
  //   {
  //     "title": "Mes rappels",
  //     "link": "#"
  //   },
  //   {
  //     "title": "Récapitulatif des Tâches",
  //     "link": "AllTaches"
  //   }
  //   ]
  // }
]

class BeeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      disconnect: false,
      connected:0,
      userData:[]
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  handleDeco = () => {
    this.setState({ disconnect: true,connected:0 })
    // this.props.history.push('/')
    localStorage.clear();
   
  }
  componentDidMount(){
    if(JSON.parse(localStorage.getItem('userCo')) ===null)
    {
    //   this.setState({userData:JSON.parse(localStorage.getItem('userCo')),
    // connected:JSON.parse(localStorage.getItem('userCo')).Statut})
    console.log("userCo",JSON.parse(localStorage.getItem('userCo')))
      
    } 
    else{
      this.setState({userData:JSON.parse(localStorage.getItem('userCo')),
    connected:this.props.connected})
      console.log("props",this.props)
      console.log("state",this.state.connected)
      console.log("userCo",JSON.parse(localStorage.getItem('userCo')))
    }
  }
   render() {
     console.log("the render",this.state.connected )
    if(JSON.parse(localStorage.getItem('userCo')) !==null){
      if (this.state.connected == 101) {
      
        return (
          <div>
            <MDBNavbar color="amber darken-1" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand>
                <a href='/'><img src={logo} style={{ height: 50, width: 50, marginTop: 3 }} alt="" /></a>
                <a href='/' class='text-decoration-none text-white'>
                  <strong>Beelinked</strong>
                </a>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBNavbarNav right>
                {menu.filter((item => item.access < 1)).map((item, key) => <MenuNav title={item.title} link={item.link} dropdown={item.dropdown}
                  submenu={item.submenu} className="ml-1" />)}
                <MDBNavItem>
                  <MDBNavLink to="/passerApiculteur" >
                    Devennez Apiculteur
                    </MDBNavLink>
                </MDBNavItem>

                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default user-card-dropdown">
                    <MDBDropdownItem className="user-card-item" ><UserCard onDeco={this.handleDeco} statut="Abonné" name={this.state.userData.Prenom+' '+this.state.userData.Nom} email={this.state.userData.Email}/></MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarNav>
            </MDBNavbar>
          </div>
        )
      }
      //apiculteur
      else if (this.state.connected  == 200) {
        
        return (
          <div>
            <MDBNavbar color="amber darken-1" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand>
                <a href='/'><img src={logo} style={{ height: 50, width: 50, marginTop: 3 }} alt="" /></a>
                <a href='/' class='text-decoration-none text-white'>
                  <strong>Beelinked</strong>
                </a>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBNavbarNav right>
                {menu.filter((item => item.access <= 1)).map((item, key) => <MenuNav link={item.link}  title={item.title} dropdown={item.dropdown}
                  submenu={item.submenu} className="ml-1" />)}
                {/* <MDBNavItem >
                  <MDBNavLink to={'/pageRucher/'}><strong>SelectRucher</strong></MDBNavLink>
                </MDBNavItem> */}

                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default user-card-dropdown">
                    <MDBDropdownItem className="user-card-item" ><UserCard onDeco={this.handleDeco} statut="Apiculteur" name={this.state.userData.Prenom+' '+this.state.userData.Nom} email={this.state.userData.Email}/></MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarNav>
            </MDBNavbar>
          </div>
        );
      }
      else if (this.state.connected  == 300) {
        
        return (
          <div>
            <MDBNavbar color="amber darken-1" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand>
                <a href='/'><img src={logo} style={{ height: 50, width: 50, marginTop: 3 }} alt="" /></a>
                <a href='/' class='text-decoration-none text-white'>
                  <strong>Beelinked</strong>
                </a>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBNavbarNav right>
                {menu.filter((item => item.access <= 1)).map((item, key) => <MenuNav link={item.link} title={item.title} dropdown={item.dropdown}
                  submenu={item.submenu} className="ml-1" />)}
                {/* <MDBNavItem >
                  <MDBNavLink to={'/pageRucher/'}><strong>SelectRucher</strong></MDBNavLink>
                </MDBNavItem> */}
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default user-card-dropdown">
                    <MDBDropdownItem className="user-card-item" ><UserCard onDeco={this.handleDeco} statut="Administrateur" name={this.state.userData.Prenom+' '+this.state.userData.Nom} email={this.state.userData.Email}/></MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarNav>
            </MDBNavbar>
          </div>
        );
      }
    }
    //invité
    
      return (
        <div>
          <MDBNavbar color="amber darken-1" fixed="top" dark expand="md" scrolling transparent>
            <MDBNavbarBrand>
              <a href='/'><img src={logo} style={{ height: 50, width: 50, marginTop: 3 }} alt="" /></a>
              <a href='/' class='text-decoration-none text-white'>
                <strong>Beelinked</strong>
              </a>
            </MDBNavbarBrand>
            {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="sign-in-alt" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="/inscriptionNAPI">Inscription</MDBDropdownItem>
                    <MDBDropdownItem href="/connection">Connexion</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              {menu.filter((item => item.access < 1)).map((item, key) => <MenuNav link={item.link} title={item.title} dropdown={item.dropdown}
                submenu={item.submenu} className="ml-1" />)}
            </MDBNavbarNav>
          </MDBNavbar>
        </div>
      );
    }

  }


export default BeeNav;
