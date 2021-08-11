import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Buscar from './Buscar';
import PowerStat from './PowerStat';
import Swal from 'sweetalert2'
import Heroe from './Heroe';
import HeroeDetallado from './HeroeDetallado';
import AutenticacionServicio from "../services/AutenticacionServicio";
import UsuarioServicio from "../services/UsuarioServicio";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: ""
    }
    this.agregarCampeon = this.agregarCampeon.bind(this);
    this.eliminarCampeon = this.eliminarCampeon.bind(this);
  }
  errorMensaje = (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: error
    })
  }
  agregarCampeon(heroe)  {
      const resultado = UsuarioServicio.agregarHeroeEquipo(heroe);
      if (resultado.status == 'error')
          this.errorMensaje(resultado.mensaje);
      this.setState((state) => (
          { nuevoCampeon: state.nuevoCampeon+1 }
      ));
  }
  eliminarCampeon(heroe)  {
      UsuarioServicio.borrarHeroeEquipo(heroe);
      this.setState((state) => (
          { nuevoCampeon: state.nuevoCampeon+1 }
      ));
  }



  render() {
    const equipo = UsuarioServicio.mostrarEquipo();

    return (
      <div>
        <Container style={{backgroundColor: '#000'}}>
        <div class="jumbotron">
          <h1 class="display-6">{"SuperHeroChallenge"}</h1>
          <p class="lead">En esta aplicación podrás analizar y comparar fácilmente la inteligencia, la fuerza, la velocidad, el poder, el peso, la altura del superhéroe que quieras. ¿Quién es más alto <Link to={`/detalle/332`}>Hulk</Link> o <Link to={`/detalle/655`}>Thanos</Link>? ¿Quién es más inteligente <Link to={`/detalle/644`}>Superman</Link> o <Link to={`/detalle/70`}>Batman</Link>? También podrás crear tu propio equipo de superhéroes y observar sus fortalezas y debilidades.</p>
          <hr class="my-4"/>
        </div>
            {equipo?.length > 0
                ?
                <>
                    <PowerStat equipo={equipo}/>
                    <hr/>
                    <h3 className="text-warning text">Miembros de tu Equipo:</h3>
                    <div class="row">
                        {equipo?.map(post =>
                            <HeroeDetallado eliminarCampeon={this.eliminarCampeon} agregarCampeon={this.agregarCampeon} heroe={post}/>
                        )}
                    </div>
                </>
                :
                <Alert variant="dark">Busca y agrega un superhéroe. Cuando agregues un superhéroe al equipo, aquí se mostrarán las estadísticas de cada uno y del equipo.</Alert>
            }

        </Container>
      </div>
    );
  }
}

export default Inicio;
