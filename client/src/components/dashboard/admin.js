import React, { Component } from 'react'
import ListProyect from '../proyect/list'
import { Fab, Icon, Typography, Tooltip, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserList from '../user/list'

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
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const settings = {
            defaultExpanded: true,
            elevation: 0
        };
        const { classes } = this.props
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography style={{ marginBottom: 15 }} color="secondary" className={classes.title} variant="h5" component="h3">Panel Administrativo</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ExpansionPanel className={classes.card} {...settings}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Icon color="primary" className={`${classes.icon} icon-Contratos`}>description</Icon>
                                <Typography color="primary" className={classes.title} variant="h5" component="h3">Proyectos</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <ListProyect />
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

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5">
                        <ExpansionPanel className={classes.card} {...settings}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Icon color="primary" className={`${classes.icon} icon-Contratos`}>description</Icon>
                                <Typography color="primary" className={classes.title} variant="h5" component="h3">Usuarios</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <UserList />
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Admin);