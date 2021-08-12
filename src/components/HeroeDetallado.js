import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsuarioServicio from "../services/UsuarioServicio";

export default class HeroeFull extends Component {
  constructor(props) {
    super(props);
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
		let totalAlturaPies = parseInt(heroe.appearance.height[0]);
		let totalLibras = parseInt(heroe.appearance.weight[0]);
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
					<div class="card m-1">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
			  			<div class="item">
			        <span class="notify-badge">
			                    {heroe.biography['alignment']==='good' && '😊'}
			                    {heroe.biography['alignment']==='neutral' && '😐'}
			                    {heroe.biography['alignment']==='bad' && '😠' }{' '}
					    </span>
					    <img src={heroe.image.url} width="150" alt={heroe.name}/>
							</div>
							<div class="mt-3">
								<h4>{heroe.name}</h4>
								<p class="text-secondary mb-1">{heroe.biography['full-name']}</p>
                    { (equipo.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)) 
                        ?
                        <button 
                        className="btn btn-danger"
                        onClick={()=>this.props.eliminarCampeon(heroe)}
                        >
                        	Eliminar
                        </button>
                        :
                        <button
                        className="btn btn-primary"
                        onClick={()=>this.props.agregarCampeon(heroe)}
                        >
	                        Agregar
                        </button>
                    }
                    <Link
                    to={`/detalle/${heroe.id}`}
                    >
	                    <button
	                    className="btn btn-dark"
	                    >
	                    Detalle
	                    </button>
                    </Link>
							</div>
							</div>
							<hr class="my-4"/>
	            {ordenado?.map(([key,value]) => 
	                <>
	                    <strong>{key} ({value.toFixed(2)}%)</strong>
	                    <div class="progress mb-3">
	                            <div className={
	                            	`progress-bar ${value>80 ? 'bg-danger' : value>50 
	                            	? 'bg-warning' : 'bg-info' }`
	                            }
	                            role="progressbar"
	                            style={{width: `${value.toFixed(2)}%`}}
	                            aria-valuenow={value}
	                            aria-valuemin="0"
	                            aria-valuemax="100"
	                            >
	                            </div>
	                    </div>
	                </>
	            )}
	            <hr/>
	            <div><strong>Peso</strong>: {totalKilos.toFixed(2)} Kg, {' '}
	            {totalLibras.toFixed(2)} Lb</div>
	            <div><strong>Altura</strong>: {totalAlturaCm.toFixed(2)} CM, 
                {' '}{totalAlturaPies.toFixed(2)} pies</div>
            </div>
        </div>
    </span>

    );
  }
}
