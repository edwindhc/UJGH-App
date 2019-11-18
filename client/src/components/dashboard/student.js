import React, { Component } from 'react'
import { Fab, Icon, Typography, Tooltip, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Upload from '../proyect/upload'
import ListProyect from '../proyect/list'
const styles = theme => ({
    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: 2,
        textAlign: 'left'
    },
    card: {
        border: '1px solid #fefe'
    },
    icon: {
        marginRight: 10
    }
})
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openUpload: false,
            updateProyect: 0
        }
    }

    closeUpload() {
        this.setState({ openUpload: false })
    }
    openUpload() {
        this.setState({ openUpload: true })
    }

    updateProyect(value) {
        this.setState({ updateProyect: this.state.updateProyect + value })
    }

    render() {
        var settings = {
            defaultExpanded: true,
            elevation: 0
        };
        const { classes } = this.props
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography style={{ marginBottom: 15 }} color="secondary" className={classes.title} variant="h5" component="h3">Mi Proyecto</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ExpansionPanel className={classes.card} {...settings}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Icon color="primary" className={`${classes.icon} icon-Contratos`}>description</Icon>
                                <Typography color="primary" className={classes.title} variant="h5" component="h3">Versiones de proyecto</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <ListProyect updateProyect={this.state.updateProyect} />
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5">
                        <ExpansionPanel className={classes.card} {...settings}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Icon color="primary" className={`${classes.icon} icon-Contratos`}>description</Icon>
                                <Typography color="primary" className={classes.title} variant="h5" component="h3">Revisiones</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    No tienes revisiones pendientes
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
                <Tooltip title="Agregar proyecto" aria-label="add">
                    <Fab onClick={() => this.openUpload()} color="secondary" aria-label="add" style={{ position: 'fixed', bottom: 30, right: 30 }} >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Upload open={this.state.openUpload} onClose={this.closeUpload.bind(this)} updateProyect={this.updateProyect.bind(this)} />
            </div>
        );
    }
}

export default withStyles(styles)(Student);