import React, { Component } from 'react';
import NavBar from '../layout/NavBar'
// import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="home">
                    <div className="banner" style={{ height: '100vh' }}>
                        <div className="container">
                            <h1>Universidad Dr.Jose Gregorio Hernández.</h1>
                            <hr className="divider my-4 bc-default" />
                            <div className="col-lg-12 align-self-baseline">
                                <p className="mb-5 text-1">Mira Hacia el Futuro con Nosotros.</p>
                            </div>
                        </div>
                    </div>

<footer class="bg-light py-5">
    <div class="container">
      <div class="small text-center text-muted">Derechos Reservados &copy; 2019 Universidad Dr. Jose Gregorio Hernandez.</div>
    </div>
  </footer>
                </div>
            </div>
        )
    }
}

export default Home;