import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Alert, Row, Col } from "react-bootstrap";
import {Button} from 'react-bootstrap';
import AutenticacionServicio from "../services/AutenticacionServicio";
import UsuarioServicio from "../services/UsuarioServicio";
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OverlayHeroe from './OverlayHeroe';
import Swal from 'sweetalert2'
import { errorMensaje } from './aux';
import Heroe from './Heroe';

import '../App.css';

class Buscar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titulo: "",
      posts: [],
      error: "",
      loading: false,
      nuevoCampeon: ''
    };
    
    this.agregarCampeon = this.agregarCampeon.bind(this);
    this.eliminarCampeon = this.eliminarCampeon.bind(this);
  }

  agregarCampeon(heroe)  {
      const resultado = UsuarioServicio.agregarHeroeEquipo(heroe);
      if (resultado.status == 'error')
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

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  doBusqueda = async (event) => {
   event.preventDefault();


    if (this.state.titulo.length > 1){
    this.setState({ loading: true });
    UsuarioServicio
      .buscarHeroe(this.state.titulo)
      .then(response => {

          console.log(response);
          this.setState({
            posts: response.results,
            loading: false
          });
        })
      .catch(error => {
          console.log(error);
          this.setState({error: error.response.data.message});
        }
    );
    }
  } 
  renderPostsTable(posts) {
    return (
      <div class="container">
            {posts?.length > 0
                &&
                    <div class="row mainc">
                        {posts?.map(post =>
                            <Heroe eliminarCampeon={this.eliminarCampeon} agregarCampeon={this.agregarCampeon} heroe={post}/>
                        )}
                    </div>
            }
      </div>
    );
  }


  render() {
    let loading = this.state.loading
      && <strong><Spinner animation="border" /> Buscando</strong>
    let contents = this.renderPostsTable(this.state.posts);

    return ( 
      <div>
        <Container style={{maxWidth: '350px'}} className="mb-3 text-center">
          <Row >
          <Col>
            <small>Busca por el nombre del superhéroe.</small>
            <Form onSubmit={this.doBusqueda}>
            <div class="input-group">
                <Form.Control
                  type="text"
                  placeholder="Escribe el nombre del superhéroe"
                  name="titulo" id="titulo"
                  className="form-control"
                  value={this.state.titulo}
                  autoComplete="on"
                  onChange={this.changeHandler}
                />
            
              <Button type="submit" variant="dark">
                Buscar
              </Button>
              
        </div>
              {
                this.state.error && (
                  <Alert color="danger">
                    {this.state.error}
                  </Alert>
                )
              }
            </Form>
            </Col>
          </Row>
        </Container>
          {loading}
          {contents}
      </div>
    );

  }
}

export default Buscar;
