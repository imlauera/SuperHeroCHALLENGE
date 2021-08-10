import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap"
import { withRouter } from 'react-router-dom';


import AuthenticationService from '../services/AuthenticationService';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});
  }

  render() {
    let userInfo = "";
    const user = this.state.user;

    // login
    if (user && user.accessToken) {
      console.log(user);
      userInfo = (
                <div>
                    <h5><i className="fa fa-user"></i>Hola <span className="text-break">{user.username}</span>!</h5>
                </div>
              );
    } else { // not login
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert variant="primary">
                      <h2>Te desconectaste, actualizá la página.</h2>
                      <Button color="success"><Link to="/signin"><span style={{color:"white"}}>Login</span></Link></Button>
                    </Alert>
                  </div>
    }

    return (
        <div className="">
      <div className="">
        {userInfo}
            <a
              href="https://webchat.freenode.net/?channels=argnews"
              target="_blank"
              rel="noopener noreferrer"
            >
              >Uníte al IRC
            </a>
            <p><a href="#" onClick={this.props.signOut}>Salir</a></p>

      </div>
        </div>
    );
  }
}

export default withRouter(Profile);
