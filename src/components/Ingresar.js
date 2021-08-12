import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {  Alert, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';

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


  iniciarSesion = (values,{
      props = this.props,
      setSubmitting
   }) => {
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
          this.setState({error: error.response.data.error});
        }
    );
    setSubmitting(false);
    return ;
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
                  <>
                   <Form>
                      <Field 
                        type="email"
                        className="mt-3 form-control"
                        id="username"
                        name="username"
                        placeholder="Email"
                        />
                       <ErrorMessage name="username" render={msg => <Alert variant="danger">{msg}</Alert>} />
                       <Field className="mt-3 form-control" id="password" name="password" type="password" placeholder="Contraseña" />
                       <ErrorMessage name="password" render={msg => <Alert variant="danger">{msg}</Alert>} />

                      <button type="submit" className="btn btn-warning btn-lg btn-block" disabled={formProps.isSubmitting}>
                         Ingresar
                      </button>
                   </Form>
                  {
                    this.state.error && (
                      <Alert variant="danger">
                        {this.state.error}
                      </Alert>
                    )
                  }
                  </>
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

