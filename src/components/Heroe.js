import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";

export default class Arg extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nuevoCampeon: 0
    }
  }


  render () {
    const {heroe} = this.props;
    const equipo = UsuarioServicio.mostrarEquipo();

    return (
    <span key={heroe.id} className="col-6 col-sm-6 col-md-4 col-lg-3 m-0 p-0">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
  	<div class="item">
			<span class="notify-badge">
                        {heroe.biography['alignment']==='good' && '😊'}
                        {heroe.biography['alignment']==='neutral' && '😐'}
                        {heroe.biography['alignment']==='bad' && '😠' }{' '}
        </span>
            <img src={heroe.image.url} width="150"/>
	</div>
                    <div class="mt-3">
                      <h4>{heroe['name']}</h4>
                      <p class="text-secondary mb-1">{heroe.biography['full-name']}</p>
                      { (equipo.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)) 
                          ?
                          <button class="btn btn-danger" onClick={()=>this.props.eliminarCampeon(heroe)}>Eliminar</button>
                          :
                          <button class="btn btn-success" onClick={()=>this.props.agregarCampeon(heroe)}>Agregar</button>
                      }
                      <Link to={`/detalle/${heroe.id}`}><button class="btn btn-dark">Detalle</button></Link>
                    </div>
                  </div>
                </div>
        </div>
    </span>

    );
  }
}
