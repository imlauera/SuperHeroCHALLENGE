import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {  Alert, Row, Col } from "react-bootstrap";
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';

import { Button } from 'react-bootstrap';
import { ingresar } from './AppNavbar';
import { withRouter } from 'react-router-dom';
import AutenticacionServicio from "../services/AutenticacionServicio";

export class Ingresar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      humanKey: null,
      human: true,
      error: ""
    };
  }


  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }


  iniciarSesion = (values)=> {
    AutenticacionServicio
      .ingresar(values.username, values.password)
      .then(response => {
          this.setState({
            username: response.username,
            successful: true
          });
          this.props.ingresar();
        })
      .catch(error => {
          console.log(error);
        }
    );
  } 

  render() {
    return ( 
      <div>
        <Container style={{maxWidth: '500px'}}>
          <Row>
          <Col>
            <h3 className="text-center mb-5">Ingresar</h3>
             <Formik
                initialValues={{
                   username: '',
                   password: ''
                }}
                validate={(values) => {
                   let errors = {};  
                   if(!values.username)
                      errors.username = "El correo electrónico es requerido.";
                   if(!values.password)
                      errors.password = "La contraseña es requerida.";

                   //check if my values have errors
                   return errors;
                }
             }
             onSubmit={this.iniciarSesion}
             render={formProps => {
                return(
                   <Form>
                      <Field type="email" className="mt-3 form-control" id="username" name="username" type="email" placeholder="Email"/>
                      <ErrorMessage name="username" render={msg => <Alert variant="danger">{msg}</Alert>} />
                      <Field type="text" className="mt-3 form-control" id="password" name="password" type="password" placeholder="Contraseña" />
                      <ErrorMessage name="password" render={msg => <Alert variant="danger">{msg}</Alert>} />

                      <button type="submit" className="btn btn-primary" disabled={formProps.isSubmitting}>
                         Ingresar
                      </button>
                   </Form>
                );
             }}
          />
            </Col>
          </Row>
        </Container>
      </div>);
  }
}
export default withRouter(Ingresar);

