import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://superheroapi.com/api.php/4363178927077672";

class UsuarioServicio {
  mostrarEquipo = () => {
    var listaHeroes = JSON.parse(localStorage.getItem("listaHeroes")) || [];
    return listaHeroes;
  }

  agregarHeroeEquipo = (heroe) => {
      var listaHeroes = JSON.parse(localStorage.getItem("listaHeroes")) || [];

      var limite = 6
      if (listaHeroes.length >= limite){
          return ({
              status: 'error',
              mensaje: 'Sólo se admite hasta '+ limite +' superhéroes en el equipo.'
          })
      }
      if (!listaHeroes.some(x => x.biography['full-name'] === heroe.biography['full-name'] && x.name === heroe.name)){
          if (
              listaHeroes.filter(
                  x => x.biography['alignment'] === heroe.biography['alignment']
              ).length < 3){
                  listaHeroes.push(heroe); 
                  localStorage.setItem("listaHeroes", JSON.stringify(listaHeroes));
                  return ({
                      status: 'ok',
                      mensaje: 'Se ha agregado el héroe correctamente'
                  })
              }else{ 
                  return ({
                      status: 'error', 
                      mensaje: 'Sólo podés agregar 3 superhéroes de la misma personalidad al equipo.'
                  })
              }
      }else{
          return ({
              status: 'error',
              mensaje: 'Error: Ya has agregado ese héroe anteriormente.'
          })
      }
  }
  borrarHeroeEquipo = (heroe) => {
      // Obtenemos la lista actual
      var listaHeroes = JSON.parse(localStorage.getItem("listaHeroes")) || [];

      var filtrado = listaHeroes.filter(
          x => x.biography['full-name'] !== heroe.biography['full-name'] && x.name !== heroe.name
      )
      localStorage.setItem("listaHeroes", JSON.stringify(filtrado));
  }

  buscarHeroe = (nombre) => {
      return axios.get(API_URL + `/search/${nombre}`)
        .then(response => {
          console.log(response.data);
          return response.data;
        })
        .catch(err => {
          throw err;
        });
  }

}

export default new UsuarioServicio();
