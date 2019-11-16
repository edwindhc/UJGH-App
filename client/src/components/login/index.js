import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { auth } from '../../services/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPasswordInput: false,
            email: "",
            password: "",
            forgotPassword: ""
        }
    }

    login() {
        const { email, password } = this.state
        let user = { email, password }
        auth.login(user)
    }
    handleChange(evt) {
        const { value, name } = evt.target
        this.setState({ [name]: value })
    }
    render() {
        const { email, password } = this.state
        return (
            <div className="login d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-md-4">
                    <div className="card" style={{ padding: 15 }}>
                        <div><img alt="logo" style={{ width: '100%' }} src={require('../../assets/logo.png')} /></div>
                        <h2 className="h2-default my-4">INGRESO</h2>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Input value={this.state.email} type="email" name="email" id="email" onChange={(e) => this.handleChange(e)} placeholder="Correo" />
                                </FormGroup>
                                <FormGroup>
                                    <Input value={this.state.password} type="password" name="password" id="password" onChange={(e) => this.handleChange(e)} placeholder="Contraseña" />
                                </FormGroup>

                                <Button style={{ width: '100%' }} className="bg-default" disabled={!email || !password} onClick={() => this.login()}>ENTRAR</Button>
                            </Form>
                            <div>
                                <p className="mt-3">
                                    <button className="button-article" onClick={() => this.setState({ forgotPasswordInput: !this.state.forgotPasswordInput })}>
                                        {this.state.forgotPasswordInput ? 'Ocultar formulario de recuperar contraseña' : '¿Olvidaste tu contraseña?'}
                                    </button>
                                </p>
                                {this.state.forgotPasswordInput ? (
                                    <Form>
                                        <FormGroup>
                                            <Input value={this.state.forgotPassword} type="email" name="forgotPassword" id="forgotPassword" onChange={(e) => this.handleChange(e)} placeholder="Correo asociado a la cuenta" />
                                        </FormGroup>

                                        <Button style={{ width: '100%' }} className="">Recuperar Contraseña</Button>
                                    </Form>
                                ) : ""}
                                <hr />
                                <p>¿No tienes cuenta aun? <Link to='/register'>Registrate</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Login;