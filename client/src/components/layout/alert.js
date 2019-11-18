import React, { Component } from 'react'
import MySnackbarContentWrapper from './SnackBar';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';

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
        const { open, status, message } = this.props
        return (
            <div>
                <Snackbar
                    style={{ zIndex: 9999999999 }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => this.props.handleClose()}
                >
                    <MySnackbarContentWrapper
                        onClose={() => this.props.handleClose()}
                        variant={status ? status : "success"}
                        message={message ? message : "This is a success message!"}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(Styles)(Alert);