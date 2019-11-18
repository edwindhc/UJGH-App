import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { proyect } from '../../services/proyect'
import Tooltip from '@material-ui/core/Tooltip';
import { TableHead } from '@material-ui/core';
import TablePaginationActions from './pagination'
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '../layout/alert'

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
    }
});


class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            rows: [],
            numeration: [],
            updateProyect: 0,
            alert: {
                open: false,
                message: "",
                status: 'success'
            }
        }
    }

    handleClose() {
        this.setState(state => state.alert.open = false)
    }

    async getData() {
        const getProyect = await proyect.listProyects();
        const rows = getProyect.data.rows.sort((a, b) => (a.id < b.id ? -1 : 1))
        const count = getProyect.data.count;
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
        await proyect.drop(file.id);
        let { message, status, open } = this.state.alert;
        message = "Proyecto eliminado"
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
        const response = await proyect.download(file);
        let { message, status, open } = this.state.alert;
        message = "Proyecto descargado"
        status = "success"
        open = true
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        this.setState({ alert: { open, status, message } })
    }
    render() {
        const { classes } = this.props
        const { page, rowsPerPage, rows, numeration, alert } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header} align="center">Nombre del Archivo</TableCell>
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
                                        <TableCell align="center"><Moment format="DD/MM/YYYY">{row.createdAt}</Moment></TableCell>
                                        <TableCell align="center"><Moment format="DD/MM/YYYY">{row.updatedAt}</Moment></TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Descargar" aria-label={`Descargar`}>
                                                <GetAppIcon onClick={() => this.download(row)} color="secondary" style={{ marginTop: 3, marginRight: 15, cursor: 'pointer' }} />
                                            </Tooltip>
                                            <Tooltip title="Eliminar" aria-label={`Eliminar`}>
                                                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => this.delete(row)} />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
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
                                    colSpan={3}
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
                <Alert open={alert.open} message={alert.message} status={alert.status} handleClose={this.handleClose.bind(this)} />
            </Paper>
        );
    }
}

export default withStyles(useStyles2, { withTheme: true })(ListTable);

// export default function CustomPaginationActionsTable() {
//     const classes = useStyles2();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//     const handleChangePage = (event, newPage) => {
//         console.log(newPage, 'newPage')
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = event => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <Paper className={classes.root}>
//             <div className={classes.tableWrapper}>
//                 <Table className={classes.table} aria-label="custom pagination table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="left">Calories</TableCell>
//                             <TableCell align="left">Fat&nbsp;(g)</TableCell>
//                             <TableCell align="left">Carbs&nbsp;(g)</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {(rowsPerPage > 0
//                             ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             : rows
//                         ).map(row => (
//                             <TableRow key={row.name}>
//                                 <TableCell component="th" scope="row">
//                                     {row.name}
//                                 </TableCell>
//                                 <TableCell align="left">{row.calories}</TableCell>
//                                 <TableCell align="left">{row.fat}</TableCell>
//                             </TableRow>
//                         ))}

//                         {emptyRows > 0 && (
//                             <TableRow style={{ height: 53 * emptyRows }}>
//                                 <TableCell colSpan={6} />
//                             </TableRow>
//                         )}
//                     </TableBody>
//                     <TableFooter>
//                         <TableRow>
//                             <TablePagination
//                                 labelDisplayedRows={({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`}
//                                 labelRowsPerPage="Proyectos por pagina"
//                                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                                 colSpan={3}
//                                 count={rows.length}
//                                 rowsPerPage={rowsPerPage}
//                                 page={page}
//                                 SelectProps={{
//                                     inputProps: { 'aria-label': 'Proyectos por pagina' },
//                                     native: false,
//                                 }}
//                                 onChangePage={handleChangePage}
//                                 onChangeRowsPerPage={handleChangeRowsPerPage}
//                                 ActionsComponent={TablePaginationActions}
//                             />
//                         </TableRow>
//                     </TableFooter>
//                 </Table>
//             </div>
//         </Paper>
//     );
// }