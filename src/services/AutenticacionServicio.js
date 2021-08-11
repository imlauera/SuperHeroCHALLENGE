import axios from "axios";

const API_URL = "http://challenge-react.alkemy.org/";

class AutenticacionServicio {
  ingresar = (email, password) => {
      return axios.post(API_URL, {email, password})
        .then(response => {
          if (response.data) {
            localStorage.setItem("usuario", JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch(err => {
          throw err;
        });
  }

  salir() {
    localStorage.removeItem("usuario");
  }

  obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem('usuario'));;
  }
}

export default new AutenticacionServicio();
