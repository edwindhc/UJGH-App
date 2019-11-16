import React, { Component } from 'react'
import MySnackbarContentWrapper from './SnackBar';
import { withStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';

const Styles = theme => ({
    margin: {
        margin: theme.spacing(1),
    },
});

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleClose() {
        this.setState({ open: false })
    }
    handleClick() {
        this.setState({ open: true })
    }
    render() {
        const { classes, open } = this.props
        return (
            <div>
                <MySnackbarContentWrapper
                    variant="error"
                    message="This is an error message!"
                />

                <Button variant="outlined" className={classes.margin} onClick={() => this.handleClick()}>
                    Open success snackbar
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => this.handleClose()}
                >
                    <MySnackbarContentWrapper
                        onClose={() => this.handleClose()}
                        variant="success"
                        message="This is a success message!"
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(Styles)(Alert);