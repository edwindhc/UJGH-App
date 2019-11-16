import React, { Component } from 'react';
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
// import { Link } from 'react-router-dom'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      theposition: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    this.setState({
      theposition: scrolled,
    })
  }

  setIsOpen = () => this.setState({ isOpen: !this.state.isOpen })
  render() {
    const top = window.pageYOffset;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar style={{ position: 'fixed', width: '100%', backgroundColor: top >= 100 ? 'white' : 'transparent' }} default expand="md">
          <NavbarBrand style={{ width: '30%' }} href="/"><img alt="logo" style={{ width: '100%' }} className="logo" src={require('../../assets/logo.png')}></img></NavbarBrand>
          <NavbarToggler onClick={() => this.setIsOpen()} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
              </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                </DropdownItem>
                  <DropdownItem>
                    Option 2
                </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;