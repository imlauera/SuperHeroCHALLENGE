import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutenticacionServicio from "../services/AutenticacionServicio";
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";



export default class Detalle extends Component {

constructor(props) {
super(props);
this.state = { post: [], loading: true, nuevo_comentario: false, texto_comentario: '', comentario: '', user: undefined };
this.renderPostsTable = this.renderPostsTable.bind(this);
}

nuevoComentario = (texto_comentario) => {
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'info',
  title: 'Nuevo comentario'
})
this.setState({nuevo_comentario: true, texto_comentario: texto_comentario});
}

componentDidMount() {
const user = AutenticacionServicio.obtenerUsuarioActual();
this.setState({user});

this.populatePostData();
}

componentDidUpdate(prevProps) {
	if (prevProps.match.params.id !== this.props.match.params.id) {
	    this.populatePostData();
	}
}

changeHandler = (event) => {
	let nam = event.target.name;
	let val = event.target.value;
	this.setState({[nam]: val});
}


renderPostsTable(heroe) {

let adminControl = "";
const user = this.state.user;

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
								<a href={heroe.image.url} target="_blank">
									<img src={heroe.image.url} alt="Admin" class="roundedbg-primary" width="110"/>
								</a>
								<div class="mt-3">
									<h4>{heroe.name}</h4>
									<p class="text-secondary mb-1">{heroe.biography['full-name']}</p>
                  { (equipo.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)) 
                      &&
                      <button class="badge bg-dark">Este héroe pertenece a tu equipo</button>
                  }
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
      : this.renderPostsTable(this.state.post);

    return (
      <div class="container">
              {contents}
      </div>
    );
  }

  async populatePostData() {
    const { id } = this.props.match.params;
    const API_URL = "https://superheroapi.com/api.php/4363178927077672/";
    let fetch_post = API_URL + id;
    const response = await fetch(fetch_post);
    const data = await response.json();
    this.setState({ post: data, loading: false });
  }
}
