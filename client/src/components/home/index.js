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
                            <h1>TRABAJO DE TITULACION ESPECIAL.</h1>
                            <hr className="divider my-4 bc-default" />
                            <div className="col-lg-12 align-self-baseline">
                                <p className="mb-5 text-1">Registra tu Proyecto y Facilita tus Asesorias.</p>
                                <a className="btn btn-primary btn-x1" href="#about">Informacion.</a>
                            </div>
                        </div>
                    </div>

                    <section className="section-1 bg-default">
                        <div className="container mx-8 d-flex justify-content-center">
                            <div className="col-md-8">
                                <h2>¿Como Funciona?</h2>
                                <hr className="divider bc-white my-4" />
                                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, vel excepturi? Fugit numquam ab aliquam dignissimos expedita, quaerat sit animi excepturi recusandae voluptatum accusantium? Asperiores itaque illum labore nisi omnis.</p>
                                <button className="btn btn-white btn-x1">EMPIEZA POR REGISTRARTE</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Home;