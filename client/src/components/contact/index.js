import React, { Component } from 'react';
import NavBar from '../layout/NavBar'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';


class contacts extends Component {
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
          <div className="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 className="mt 0">Contactanos.</h2>
              <hr className="divider my-4"></hr>
                <p className="text-muted">La Facultad de Ingenieria de la Universidad Dr.Jose Gregorio Hernandez posee distintas maneras con las que puedes comunicarte e informarte sobre todo lo que necesites.</p>
                <h2 className="mt 0">Ubicanos en Nuestras Redes Sociales.</h2>
        </div>
      </div>
    </div>
   
                <div className="col-lg-12 justify-content-center">
                    <div className="container-fluid" style={{ padding: 15 }}>
                    <div className="row h-100 align-items-center justify-content-center text-center">
                      <a href="https://linkedin.com/FacultadIngenieriaUJGH"><LinkedInIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</LinkedInIcon></a>
                      <a href="https://facebook.com/FacultadIngenieriaUJGH"><FacebookIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</FacebookIcon></a>
                      <a href="https://instagram.com/FacultadIngenieriaUJGH"><InstagramIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</InstagramIcon></a>
                      <a href="https://twitter.com/FacultadIngenieriaUJGH"><TwitterIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</TwitterIcon></a>
                      <a href="mailto:FacultadIngenieria@gmail.com"><EmailIcon style={{ fontSize:'5rem'}}>FacultadIngenieriaUJGH</EmailIcon></a>
                        </div>
                    </div>
                  </div>

       <div className="container-fluid">
          <div className="row justify-content-center">
           <div class="col-lg-8 text-center">
             <h2 className="mt 0">Visitanos.</h2>
               <hr className="divider my-4"></hr>
               <img src={require("../../assets/map.png")} href='' img class='map' width='100%' height='100%' alt='map'/>
        </div>
      </div>
    </div> 
</section>

  <footer class="bg-light py-5">
    <div class="container">
      <div class="small text-center text-muted">Derechos Reservados &copy; 2019 Universidad Dr. Jose Gregorio Hernandez.</div>
    </div>
  </footer>
                </div>
    )
  }
}  

export default contacts;