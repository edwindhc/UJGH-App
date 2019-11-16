import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from "@material-ui/core/styles";

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
        }
    }
    render() {
        const { classes, open } = this.props
        console.log(classes.buttonStyle, ' button')
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
                        <form noValidate>
                            <FormControl>
                            </FormControl>
                            {/* <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Switch checked={fullWidth} onChange={handleFullWidthChange} value="fullWidth" />
                                }
                                label="Full width"
                            /> */}
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button classes={{ root: classes.buttonStyle }} variant="contained" onClick={() => this.props.onClose()} color="primary">
                            Subir
                        </Button>
                        <Button onClick={() => this.props.onClose()} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(Styles)(UploadProyect);