import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "reactstrap";
import {Button} from 'react-bootstrap';
import { Spinner } from 'reactstrap';
import VotarService from "../services/VotarService";
import Authentication from '../services/AuthenticationService'
import socket from './socketConfig'
import '../App.css';


class OperacionesHeroe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: "",
      loading: false,
    };
  }

    componentDidMount() {
        const user = Authentication.getCurrentUser();
        this.setState({user: user});
    }

  doVotar = (opcion) => {
    this.setState((state) => ({loading: true}));

    VotarService
      .votar(this.props.id, opcion, this.state.user.accessToken)
      .then(response => {
          socket.emit('nuevovoto');
          this.setState((state) => ({loading: false}));
        })
      .catch(error => {
          console.log(error);
          this.setState({error: error.response.data.message, loading: false});
          //this.setState({error: error.response});
        }
    );
  } 

  render() {
    return ( 
      <span>
           {this.state.loading ?
            <div className="lds-hourglass"></div>
           :
               <>
              <button type="button" class="btn badge badge-neutral" title="" onClick={() => this.doVotar('positivo')}><i class="fa fa-thumbs-up" aria-hidden="true"></i> {this.props.comment.votos_positivos}</button>
              <button type="button" class="btn badge badge-neutral" title="" onClick={() => this.doVotar('negativo')}><i class="fa fa-thumbs-down" aria-hidden="true"></i> {this.props.comment.votos_negativos}</button>
              {
                this.state.error && (
                  <Alert color="danger">
                    {this.state.error}
                  </Alert>
                )
              }
               </>
           }
      </span>
    );
  }
}

export default OperacionesHeroe;
