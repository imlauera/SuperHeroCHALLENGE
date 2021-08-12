import Swal from 'sweetalert2'

export function errorMensaje(error) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: error
    })
}

