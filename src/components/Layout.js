import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import AppNavbar from './AppNavbar';
import Ingresar from './Ingresar';
import Inicio from './Inicio';
import Buscar from './Buscar';
import Detalle from './Detalle';
import AutenticacionServicio from '../services/AutenticacionServicio';
import { withRouter } from 'react-router-dom';



export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { estaAutenticado: false }
  }
 
  componentDidMount() {
    const usuario = AutenticacionServicio.obtenerUsuarioActual();

    if (usuario) {
      console.log(usuario);
      this.setState(state => ({
        estaAutenticado: true
      }));
    }
  }


  ingresar = () => {
    this.setState((state) => (
        { estaAutenticado: true }
    ));
    this.props.history.push('/');
  }

  salir = () => {
    AutenticacionServicio.salir();
    this.props.history.push('/ingresar');
    this.setState(state => ({
      estaAutenticado: false
    }));
  }

  render () {
    const usuario = AutenticacionServicio.obtenerUsuarioActual();

    if(!usuario && window.location.pathname !== '/ingresar') {
      this.props.history.push('/ingresar');
    }

    return (
    <div>
        <AppNavbar estaAutenticado={this.state.estaAutenticado} salir={this.salir}/>
            <div>
                <Switch>
                  <Route exact path='/' component={Inicio} />
                  <Route exact path='/ingresar'>
                    <Ingresar ingresar={this.ingresar} />
                  </Route>
                  <Route path='/detalle/:id' exact component={Detalle}/>
                  <Route path='/buscar' exact component={Buscar}/>
                  {/*<Route path='/ver/:id' exact component={GetPost}/>
                  <Route path='/cat/:categoria' exact component={FetchDataCategoria}/>*/}
                </Switch>
              {this.props.children}
            </div>
    </div>
    );
  }
}

export default withRouter(Layout);

