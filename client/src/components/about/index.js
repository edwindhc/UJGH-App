import React, { Component } from 'react';
import NavBar from '../layout/NavBar'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


class about extends Component {
  constructor(props) {
      super(props);
      this.state = {

      };
  }

render() {
  return (
    <div>
      <NavBar />
      <section className='page-section'>
        <div className="container-fluid">
          <div className="row justify-content-center justify-text">
          <div class="col-lg-8 text-center justify-text">
            <h2 className="mt 0">Acerca de Trabajo de Titulacion Especial de Grado.</h2>
            <b><p> Una tesis de titulación o trabajo especial de titulacion es una disertación escrita que, en el continente americano, el estudiante presenta a la facultad de su universidad, para obtener el título de licenciatura, especialidad, maestría o doctorado.</p></b>
              <hr className="divider my-4"></hr>
                <p className="text-muted"></p>
                <h2 className="mt 0">Formatos TET</h2>
                <p>Descarga los Formatos Necesarios para la Propuesta y Evaluacion de tu TET.</p>
                <a href="link-de-descargas"><CloudDownloadIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</CloudDownloadIcon></a>
            </div>
         </div>
    </div>
 </section>

 </div>
     )
    }
  }
  export default about;   