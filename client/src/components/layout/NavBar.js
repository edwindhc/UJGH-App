import React, { Component } from 'react';
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'

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
      theposition: scrolled + 100,
    })
  }

  setIsOpen = () => this.setState({ isOpen: !this.state.isOpen })
  render() {
    const top = window.pageYOffset;
    const { isOpen } = this.state;
    const headerUpdate = top >= 100 ? true : false;
    return (
      <div>
        <Navbar style={{ position: 'fixed', width: '100%', backgroundColor: headerUpdate ? 'white' : 'transparent' }} default expand="md">
          <div className="container">
            <NavbarBrand style={{ width: '30%' }} href="/"><img alt="logo" style={{ width: '100%' }} className="logo" src={require('../../assets/logo.png')}></img></NavbarBrand>
            <NavbarToggler onClick={() => this.setIsOpen()} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link className={headerUpdate ? 'textMenu2' : 'textMenu1'} to='/login'>Login</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;