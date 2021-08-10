import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
      return (
          <Layout/>
      );
  }
}

export default App;
