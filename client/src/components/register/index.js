import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    render() {
        return (
            <div className="register d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-md-4">
                    <div className="card" style={{ padding: 15 }}>
                        <div><img alt="logo" style={{ width: '100%' }} src={require('../../assets/logo.png')} /></div>
                        <h2 className="h2-default my-4">REGISTRO</h2>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Input type="name" name="name" id="name" placeholder="Nombre Completo" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="email" id="email" placeholder="Correo" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" id="password" placeholder="Contraseña" />
                                </FormGroup>

                                <Button style={{ width: '100%' }} className="bg-default">REGISTRARSE</Button>
                            </Form>
                            <div>

                                <p className="mt-4">¿Ya tienes cuenta? <Link to="/login">Ingresa</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Register;