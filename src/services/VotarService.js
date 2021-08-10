import axios from "axios";

class VotarService {
  votar = async (id_comentario, opcion, accessToken) => {
    console.log(accessToken);
      return axios.post(`/comments/votar/${id_comentario}`, {opcion}, {headers: {"X-Auth-Token": accessToken, "content-type": "application/json" }})
        .then(response => {
          if (response.data) {
            console.log("that is this"+ response.data.mensaje);
          }
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }
}

export default new VotarService();
