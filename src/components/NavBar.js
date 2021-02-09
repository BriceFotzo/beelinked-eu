import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css';
import'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {MDBNavItem, MDBNavLink, MDBCollapse, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu,MDBDropdownItem
  } from "mdbreact";



class MenuNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: false
        };
        this.onClick = this.onClick.bind(this);
      }

      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }

      render() {
        console.log(this.props)
        return (
          <div>
            <MDBCollapse isOpen={this.state.collapse} navbar>
            
                <MDBNavItem  className="nav-item-home" >
                {this.props.dropdown ?  
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">{this.props.title}</div>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        {this.props.submenu.map((item,key)=> <MDBDropdownItem key={key} href={item.link}>{item.title}</MDBDropdownItem> )}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                :
                <MDBNavItem>
                <MDBNavLink 
                
                  // key={this.props.key} 
                  // link={true}
                  to={this.props.link}>
                  {this.props.title}
                  </MDBNavLink>
                  </MDBNavItem>}
                </MDBNavItem>
            
            </MDBCollapse>
                
          </div>
        );
      }
    }
    
  export default MenuNav; 
  
  