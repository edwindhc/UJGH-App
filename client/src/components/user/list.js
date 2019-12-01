import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import { Button, TextField, Grid, MenuItem } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { user } from '../../services/user'
import Tooltip from '@material-ui/core/Tooltip';
import { TableHead } from '@material-ui/core';
import TablePaginationActions from '../proyect/pagination'
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '../layout/alert'
import EditIcon from '@material-ui/icons/Edit';
import Select from 'react-select';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
const useStyles2 = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    header: {
        fontWeight: 'bold'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15
    },
    select: {
        height: 50
    }
});

const role = [
    {
        id: 0,
        name: 'Estudiante'
    },
    {
        id: 1,
        name: 'Profesor'
    },
    {
        id: 2,
        name: 'Administrador'
    }
]

const career = [
    {
        id: 0,
        name: 'Ing.Sistemas'
    }
]
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            rows: [],
            numeration: [],
            updateProyect: 0,
            open: false,
            newUser: { role: 0 },
            editUser: {},
            openEdit: false,
            teachers: [],
            alert: {
                open: false,
                message: "",
                status: 'success'
            },
            selectedOption: null,
        }
    }

    handleCloseAlert() {
        this.setState(state => state.alert.open = false)
    }

    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    async getData() {
        const getUsers = await user.listUsers();
        const getTeachers = await user.listUsers({ role: 1 })
        const transTeacher = getTeachers.data.rows.map(v => {
            v.value = v.id;
            v.label = v.name
            return v;
        })
        this.setState({ teachers: transTeacher })
        const rows = getUsers.data.rows.sort((a, b) => (a.id < b.id ? -1 : 1))
        const count = getUsers.data.count;
        if (count < 5) return this.setState({ rows, rowsPerPage: count, numeration: [count, 5, 10, 25, { label: 'Todo', value: -1 }] })
        this.setState({ rows, numeration: [5, 10, 25, { label: 'Todo', value: -1 }] })
    }
    async componentDidMount() {
        this.getData()
    }
    setPage(page) {
        this.setState({ page })
    }
    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    setRowsPerPage(rowsPerPage) {
        this.setState({ rowsPerPage })
    }

    handleChangeRowsPerPage = event => {
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
    };
    async delete(file) {
        await user.drop(file.id);
        let { message, status, open } = this.state.alert;
        message = "Usuario eliminado"
        status = "success"
        open = true
        this.setState({ alert: { open, status, message } })
        this.getData()
    }
    componentWillReceiveProps(props) {
        if (props.updateProyect !== this.state.updateProyect) {
            this.setState({ updateProyect: props.updateProyect })
            this.getData();
        }
    }

    async download(file) {

    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.setState({ open: false })
    };

    handleChange(e) {
        const name = e.target.name
        let value = e.target.value
        const { newUser } = this.state
        let result;
        if (name === 'career' || name === 'role') {
            if (name === 'career') result = career.filter(v => v.name === value);
            else if (name === 'role') result = role.filter(v => v.name === value);
            newUser[name] = result[0].id
        } else newUser[name] = value;

        this.setState({ newUser })
    }

    handleChangeEdit(e) {
        const name = e.target.name
        let value = e.target.value
        const { editUser } = this.state
        let result;
        if (name === 'career' || name === 'role') {
            if (name === 'career') result = career.filter(v => v.name === value);
            else if (name === 'role') result = role.filter(v => v.name === value);
            editUser[name] = result[0].id
        } else editUser[name] = value;

        this.setState({ editUser })
    }

    async saveUser() {
        const save = await user.create(this.state.newUser);
        if (save.status === 200) {
            let { message, status, open } = this.state.alert;
            message = "Usuario creado"
            status = "success"
            open = true
            this.setState({ alert: { open, status, message } })
            this.handleClose()
            this.getData()
        }
    }

    async edit(id) {
        const get = await user.get(id);
        if (get.status === 200) {
            this.setState({ editUser: get.data, openEdit: true })
        }
    }

    async updateUser() {
        const update = await user.update(this.state.editUser);
        if (update.status === 200) {
            let { message, status, open } = this.state.alert;
            message = "Usuario Actualizado"
            status = "success"
            open = true
            this.setState({ alert: { open, status, message } })
            this.handleCloseEdit()
            this.getData()
        }
    }

    handleCloseEdit = () => this.setState({ openEdit: false })

    render() {
        console.log(this.state.teachers)
        const { classes } = this.props
        const { page, rowsPerPage, rows, numeration, alert, selectedOption } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Button style={{ float: 'right', color: 'white', fontWeight: 'bold' }} onClick={() => this.handleClickOpen()} variant="contained" color="secondary" >NUEVO USUARIO</Button>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header} align="center">Nombre del Archivo</TableCell>
                                <TableCell className={classes.header} align="center">Rol</TableCell>
                                <TableCell className={classes.header} align="center">Fecha de Creación</TableCell>
                                <TableCell className={classes.header} align="center">Fecha de última Actualización</TableCell>
                                <TableCell className={classes.header} align="center">Opciones</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length ? (
                                (rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.role === 0 ? 'Estudiante' : row.role === 1 ? 'Profesor' : row.role === 2 ? 'Administrador' : 'Estudiante'}</TableCell>
                                        <TableCell align="center"><Moment format="DD/MM/YYYY">{row.createdAt}</Moment></TableCell>
                                        <TableCell align="center"><Moment format="DD/MM/YYYY">{row.updatedAt}</Moment></TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Editar" aria-label={`Editar`}>
                                                <EditIcon onClick={() => this.edit(row.id)} color="secondary" style={{ marginTop: 3, marginRight: 15, cursor: 'pointer' }} />
                                            </Tooltip>
                                            <Tooltip title="Eliminar" aria-label={`Eliminar`}>
                                                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => this.delete(row)} />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5}>
                                            No tienes proyectos
                                        </TableCell>
                                    </TableRow>
                                )}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    labelDisplayedRows={({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`}
                                    labelRowsPerPage="Proyectos por pagina"
                                    rowsPerPageOptions={numeration}
                                    colSpan={5}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Proyectos por pagina' },
                                        native: false,
                                    }}
                                    onChangePage={this.handleChangePage.bind(this)}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
                <Alert open={alert.open} message={alert.message} status={alert.status} handleClose={this.handleCloseAlert.bind(this)} />

                <Dialog onClose={() => this.handleClose()} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <Typography color="primary" className={classes.title} variant="h5" component="h3">Crear Usuario</Typography>
                    <DialogContent dividers>
                        <form>
                            <Grid xs={12}>
                                <TextField
                                    style={{ width: '100%', paddingRight: 15 }}
                                    required
                                    id="outlined-required"
                                    label="Nombres y Apellidos"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Correo"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="email"
                                    onChange={(e) => this.handleChange(e)}
                                />

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Contraseña"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="password"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Cedula"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="dni"
                                    onChange={(e) => this.handleChange(e)}
                                />

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Dirección"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="address"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Telefono"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                />

                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    color="secondary"
                                    label="Rol"
                                    className={classes.textField}
                                    value={this.state.newUser.role ? role[this.state.newUser.role].name : role[0].name}
                                    name="role"
                                    onChange={(e) => this.handleChange(e)}
                                    //onChange={handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    //helperText="Please select your currency"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {role.map(option => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    style={{ width: '100%', paddingRight: 15 }}
                                    id="outlined-select-currency"
                                    select
                                    color="secondary"
                                    label="Carrera"
                                    className={classes.textField}
                                    value={career[0].name}
                                    name="career"
                                    onChange={(e) => this.handleChange(e)}
                                    //onChange={handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    //helperText="Selecciona una carrera"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {career.map(option => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {this.state.newUser.role === 0 ? (
                                <Grid xs={12}>
                                    <Select
                                        placeholder="Selecciona un tutor"
                                        className={classes.select}
                                        value={selectedOption}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.teachers}
                                    />
                                </Grid>
                            ) : ''}


                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!this.state.newUser.email || !this.state.newUser.password || !this.state.newUser.name} style={{ color: 'white', fontWeight: 'bold' }} autoFocus onClick={() => this.saveUser()} color="secondary" variant="contained">
                            Guardar
                        </Button>

                        <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => this.handleClose()} color="primary" variant="contained" >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>






                <Dialog onClose={() => this.handleCloseEdit()} aria-labelledby="customized-dialog-title" open={this.state.openEdit}>
                    <Typography color="primary" className={classes.title} variant="h5" component="h3">Editar Usuario</Typography>
                    <DialogContent dividers>
                        <form>
                            <Grid xs={12}>
                                <TextField
                                    style={{ width: '100%', paddingRight: 15 }}
                                    required
                                    id="outlined-required"
                                    label="Nombres y Apellidos"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="name"
                                    value={this.state.editUser.name}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Correo"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="email"
                                    value={this.state.editUser.email}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Contraseña"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="password"
                                    value={this.state.editUser.password}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Cedula"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="dni"
                                    value={this.state.editUser.dni}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Dirección"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="address"
                                    value={this.state.editUser.address}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Telefono"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    color="secondary"
                                    name="phone"
                                    value={this.state.editUser.phone}
                                    onChange={(e) => this.handleChangeEdit(e)}
                                />

                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    color="secondary"
                                    label="Rol"
                                    className={classes.textField}
                                    value={this.state.editUser.role ? role[this.state.editUser.role].name : role[0].name}
                                    name="role"
                                    onChange={(e) => this.handleChangeEdit(e)}
                                    //onChange={handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    //helperText="Please select your currency"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {role.map(option => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    style={{ width: '100%', paddingRight: 15 }}
                                    id="outlined-select-currency"
                                    select
                                    color="secondary"
                                    label="Carrera"
                                    className={classes.textField}
                                    value={career[0].name}
                                    name="career"
                                    onChange={(e) => this.handleChangeEdit(e)}
                                    //onChange={handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    //helperText="Selecciona una carrera"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {career.map(option => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>


                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!this.state.editUser.email || !this.state.editUser.password || !this.state.editUser.name} style={{ color: 'white', fontWeight: 'bold' }} autoFocus onClick={() => this.updateUser()} color="secondary" variant="contained">
                            Actualizar
                        </Button>

                        <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => this.handleCloseEdit()} color="primary" variant="contained" >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

export default withStyles(useStyles2, { withTheme: true })(UserList);