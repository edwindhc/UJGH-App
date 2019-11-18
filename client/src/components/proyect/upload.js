import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, FormGroup, Input } from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios'
import Alert from '../layout/alert'


const Styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    buttonStyle: {
        backgroundColor: '#29ABE2',
        '&:hover': {
            backgroundColor: '#2196f3'
        }
    }
});

class UploadProyect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: "",
            title: "",
            file: {},
            alert: {
                open: false,
                message: "",
                status: 'success'
            }
        }
    }

    async handleChange(e) {
        await this.setState({ filename: e.target.files[0].name, file: e.target.files[0] })
    }

    handleClose() {
        this.setState(state => state.alert.open = false)
    }

    async upload() {
        const formData = new FormData();
        formData.append('file', this.state.file)

        try {
            let local = JSON.parse(localStorage.getItem('user'))
            const res = await axios.post('/proyect/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${local.token.accessToken}`
                }
            })
            if (res) {
                this.props.updateProyect(1);
                let { message, status, open } = this.state.alert;
                message = "Proyecto cargado con exito"
                status = "success"
                open = true
                this.setState({ alert: { open, status, message } })
                this.props.onClose()
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        const { classes, open } = this.props
        const { alert } = this.state;
        return (
            <div>
                <Dialog
                    fullWidth={false}
                    maxWidth={'sm'}
                    open={open}
                    onClose={() => this.props.onClose()}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Subir Proyecto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Texto
                    </DialogContentText>
                        <Form>
                            <FormGroup>
                                <Input type="file" name="file" id="file" onChange={(e) => this.handleChange(e)} placeholder="Correo" />
                            </FormGroup>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button classes={{ root: classes.buttonStyle }} variant="contained" onClick={() => this.upload()} color="primary">
                            Subir
                        </Button>
                        <Button onClick={() => this.props.onClose()} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Alert open={alert.open} message={alert.message} status={alert.status} handleClose={this.handleClose.bind(this)} />
            </div>
        );
    }
}

export default withStyles(Styles)(UploadProyect);