import React, { Component } from 'react';
import AutenticacionServicio from "../services/AutenticacionServicio";
import { errorMensaje } from './aux'
import { Spinner } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";
import {  Alert } from "react-bootstrap";


export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            heroe: [], 
            loading: true, 
            nuevo_comentario: false, 
            texto_comentario: '', 
            comentario: '', 
            user: undefined,
            nuevoCampeon: ''
        };
        this.agregarCampeon = this.agregarCampeon.bind(this);
        this.eliminarCampeon = this.eliminarCampeon.bind(this);
        this.renderHeroeDetalle = this.renderHeroeDetalle.bind(this);
    }


    agregarCampeon(heroe)  {
      const resultado = UsuarioServicio.agregarHeroeEquipo(heroe);
      if (resultado.status === 'error')
          errorMensaje(resultado.mensaje);

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


    componentDidMount() {
    const user = AutenticacionServicio.obtenerUsuarioActual();
    this.setState({user});

    this.obtenerHeroeDetalle();
    }


    renderHeroeDetalle(heroe) {
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

    const equipo = UsuarioServicio.mostrarEquipo();

    return (
    <>
    <div class="container">
            <div class="main-body">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <a href={heroe.image.url} target="_blank" rel="noreferrer">
                                    <div class="item">
                                        <span class="notify-badge">
                                            {heroe.biography['alignment']==='good' && '😊'}
                                            {heroe.biography['alignment']==='neutral' && '😐'}
                                            {heroe.biography['alignment']==='bad' && '😠' }{' '}
                                        </span>
                                        <img src={heroe.image.url} width="150" alt={heroe.name}/>
                                    </div>
                                    </a>
                                    <div class="mt-3">
                                        <h4>{heroe.name}</h4>
                                        <p class="mb-1">{heroe.biography['full-name']}</p>
                                        { (equipo.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)) 
                                            ?
                                            <button 
                                            className="btn btn-danger"
                                            onClick={()=>this.eliminarCampeon(heroe)}
                                            >
                                                Eliminar
                                            </button>
                                            :
                                            <button
                                            className="btn btn-success"
                                            onClick={()=>this.agregarCampeon(heroe)}
                                            >
                                                Agregar
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Nombre Completo</h6>
                                    </div>
                                    <div class="col-sm-9">
                                       {heroe?.biography['full-name']}
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Color de Ojos</h6>
                                    </div>
                                    <div class="col-sm-9">
                                      {heroe?.appearance['eye-color']}
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Cabello</h6>
                                    </div>
                                    <div class="col-sm-9">
                                      {heroe?.appearance['hair-color']}
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Lugar de Trabajo</h6>
                                    </div>
                                    <div class="col-sm-9">
                                      {heroe?.work['base']}
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Orientación</h6>
                                    </div>
                                    <div class="col-sm-9">
                                        {heroe?.biography['alignment']}
                                        {heroe.biography['alignment']==='good' && '😊'}
                                        {heroe.biography['alignment']==='neutral' && '😐'}
                                        {heroe.biography['alignment']==='bad' && '😠' }{' '}
                                    </div>
                                </div>

                                {ordenado?.map(([key,value]) => 
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">{key}</h6>
                                        </div>
                                        <div class="col-sm-9">
                                            <div style={{height: '25px', width: `${value.toFixed(2)}%`}}
                                            className={`progress-bar ${value>80 
                                                ? 'bg-danger' : value>50 ? 'bg-warning' : 'bg-info' }`
                                            } 
                                            role="progressbar"
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >{value}%</div>
                                        </div>
                                    </div>
                                )}
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Peso (Kilos)</h6>
                                    </div>	
                                    <div class="col-sm-9">
                                        {totalKilos.toFixed(2)}
                                    </div>
                                </div>    
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Peso (Libras)</h6>
                                    </div>	
                                    <div class="col-sm-9">
                                        {totalLibras.toFixed(2)}
                                    </div>
                                </div>  
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Altura (CM)</h6>
                                    </div>	
                                    <div class="col-sm-9">
                                        {totalAlturaCm.toFixed(2)}
                                    </div>
                                </div>  
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Altura (Pies)</h6>
                                    </div>	
                                    <div class="col-sm-9">
                                        {totalAlturaPies.toFixed(2)}
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
      );
  }

  render() {
    let contents = this.state.loading
      ? <center><Spinner animation="border" /> </center>
      : this.renderHeroeDetalle(this.state.heroe);

    return (
      <div class="container">
              {contents}
      </div>
    );
  }

  async obtenerHeroeDetalle() {
    const { id } = this.props.match.params;
    UsuarioServicio.obtenerInformacionHeroe(id).then(
        response => {
          this.setState({
            heroe: response, loading: false
          });
        })
  }
}
