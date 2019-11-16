import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { auth } from '../../services/auth';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: "",
                name: ""
            }
        }
    }

    async register() {
        const { email, password, name } = this.state
        let user = { name, email, password }
        const response = await auth.register(user)
        if (response.status === 200) this.props.history.push('/dashboard')
    }
    handleChange(evt) {
        const { value, name } = evt.target
        this.setState({ [name]: value })
    }
    render() {
        const { name, email, password } = this.state
        return (
            <div className="register d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-md-4">
                    <div className="card" style={{ padding: 15 }}>
                        <div><img alt="logo" style={{ width: '100%' }} src={require('../../assets/logo.png')} /></div>
                        <h2 className="h2-default my-4">REGISTRO</h2>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Input value={this.state.name} type="text" name="name" id="name" onChange={(e) => this.handleChange(e)} placeholder="Nombre Completo" />
                                </FormGroup>
                                <FormGroup>
                                    <Input value={this.state.email} type="email" name="email" id="email" onChange={(e) => this.handleChange(e)} placeholder="Correo" />
                                </FormGroup>
                                <FormGroup>
                                    <Input value={this.state.password} type="password" name="password" id="password" onChange={(e) => this.handleChange(e)} placeholder="Contraseña" />
                                </FormGroup>

                                <Button disabled={!email || !password || !name} onClick={() => this.register()} style={{ width: '100%' }} className="bg-default">REGISTRARSE</Button>
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