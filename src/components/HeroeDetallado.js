import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";

export default class HeroeFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nuevoCampeon: 0
    }
  }


  render () {
    const {heroe} = this.props;
    const equipo = UsuarioServicio.mostrarEquipo();
let total = {
	'Inteligencia': parseInt(heroe.powerstats['intelligence']),
	'Fuerza': parseInt(heroe.powerstats['strength']),
	'Velocidad': parseInt(heroe.powerstats['speed']),
	'Durabilidad': parseInt(heroe.powerstats['durability']),
	'Poder': parseInt(heroe.powerstats['power']),
	'Combate': parseInt(heroe.powerstats['combat'])
};
let totalAlturaCm = parseInt(heroe.appearance.height[1]);

let totalKilos = parseInt(heroe.appearance.weight[1]);


var ordenado = [];
for (var poderes in total) {
    ordenado.push([poderes, total[poderes]]);
}

ordenado.sort(function(a, b) {
  return b[1] - a[1];
});

    return (
    <span key={heroe.id} className="col-6 col-sm-6 col-md-6 col-lg-4 m-0 p-0">

					<div class="card">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
								<img src={heroe.image.url} alt="Admin" class="roundedbg-primary" width="110"/>
								<div class="mt-3">
									<h4>{heroe.name}</h4>
									<p class="text-secondary mb-1">{heroe.biography['full-name']}</p>
                      { (equipo.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)) 
                          ?
                          <button class="btn btn-danger" onClick={()=>this.props.eliminarCampeon(heroe)}>Eliminar</button>
                          :
                          <button class="btn btn-primary" onClick={()=>this.props.agregarCampeon(heroe)}>Agregar</button>
                      }
                              <Link to={`/detalle/${heroe.id}`}><button class="btn btn-dark">Detalle</button></Link>


								</div>
							</div>
							<hr class="my-4"/>
	            {ordenado?.map(([key,value]) => 
	                <>
	                    <p>{key} ({value.toFixed(2)}%)</p>
	                    <div class="progress mb-1" style={{height: '5px'}}>
	                            <div class={`progress-bar ${value>80 ? 'bg-danger' : value>50 ? 'bg-warning' : 'bg-info' }`} role="progressbar" style={{width: `${value.toFixed(2)}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
	                    </div>
	                </>
	            )}
	            <hr/>
	            <p>Altura: {totalAlturaCm.toFixed(2)} centímetros</p>
	            <p>Peso: {totalKilos.toFixed(2)} kilos</p>
            </div>
        </div>
    </span>

    );
  }
}
