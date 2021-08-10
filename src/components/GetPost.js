import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GetComments } from './GetComments';
import AuthenticationService from "../services/AuthenticationService";
import processString from 'react-process-string';
import moment from 'moment';
import BanearUsuario from './BanearUsuario'
import BanearIP from './BanearIP'
import BanearService from "../services/BanearService";
import Swal from 'sweetalert2'
import DeletePost from './DeletePost'
import FijarPost from './FijarPost'
import ModalYouTube from './ModalYouTube.js';
import ModalOcultarPublicacion from './ModalOcultarPublicacion.js';
import ModalSeguirPublicacion from './ModalSeguirPublicacion.js';
import ModalFav from './ModalFav.js';
import ModalVideo from './ModalVideo.js';
import {MostrarEncuesta} from './MostrarEncuesta';
import ModalImagen from './ModalImagen.js';
import { Spinner } from 'reactstrap';
import ModalDenunciar from './ModalDenunciar';


const IMGUR_IMAGE = 'https://i.imgur.com/';
const IMGUR_VIDEO = 'https://i.imgur.com/';
const YouTubeURL = 'https://i.ytimg.com/vi';


export class GetPost extends Component {

  constructor(props) {
    super(props);
    this.state = { post: [], loading: true, nuevo_comentario: false, texto_comentario: '', comentario: '', user: undefined };
    this.renderPostsTable = this.renderPostsTable.bind(this);
  }

  nuevoComentario = (texto_comentario) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'info',
      title: 'Nuevo comentario'
    })
    this.setState({nuevo_comentario: true, texto_comentario: texto_comentario});
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});

    this.populatePostData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
        this.populatePostData();
    }
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  adminControl = (commentId, autor, user_id, ip) => {
    const user = this.state.user;
    if (user && user.userType === 'Destacado') {
      return (
                <>
                    <BanearUsuario usuario={autor}/>
                    <p>IP: {ip}</p>
                    <BanearIP user_id={user_id} ip={ip}/>
                </>
      );
    }
  }

  doRegex(word){
    let config = [{
        regex: />(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
        fn: (key, result) => <span key={key}>
                                 <a target="_blank" rel="noreferrer" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
                             </span>
      },
      {
        regex: />(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
        fn: (key, result) => <span key={key}>
                                 <a target="_blank" rel="noreferrer" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
                             </span>
      },
      {
        regex: /[\n]/gim,
        fn: (key, result) => <br/>
      },
      {
        regex: />[^\r\n]+/gim,
        fn: (key, result) => <span key={key} className='text-success'>{result[0]}</span>
      },
      {
        regex: /<[^\r\n]+/gim,
        fn: (key, result) => <span key={key} className='text-danger'>{result[0]}</span>
      },
      {
        regex: /\*\*[^\r\n]+/gim,
        fn: (key, result) => <span key={key} className='font-weight-bold'>{result[0]}</span>
      },
      {
        regex: /yt=([^ ]+)/gim,
        fn: (key, result) => <span key={key}> 
          <ModalYouTube video_id={result[1]}/>
          {/*<iframe title={result[1]} style={{"margin": "10px 20px"}} width="315" height="225" src={"https://youtube.com/embed/"+result[1]+"?autoplay=0&html5=0"} allowFullScreen frameBorder="0"/>*/}
        </span>
      },
    ];

    return(<span>{processString(config)(word)}</span>);
  }



  renderPostsTable(post) {

    let adminControl = "";
    const user = this.state.user;

    // login
    if (user && user.userType === 'Destacado') {
      adminControl = (
          <>
                <DeletePost id={post._id}/>{' '}
                <BanearUsuario usuario={post.autor}/>
                <p>IP: {post.ip}</p>
                <BanearIP user_id={0} ip={post.ip}/>
                <FijarPost id={post._id}/>
          </>
      );
    }

    return (
      <>
      <div class="col-12 p-2 rounded vox-item-darked">
        <img src={`/categorias/${post.categoria}.jpg`} alt="" class="cat-thubm rounded"/>
        <Link to={`/cat/${post.categoria}`} class="ml-2 pt-1"><b>{post.categoria}</b></Link>
      </div>
      <div class="col-12 my-1 p-2 rounded vox-item-darked vox-options d-flex justify-content-between">
          <div class="vox-user-actions pt-1">
        {/*<a href="#" class="ml-2 pt-1 vox-flag flag-mox" data-id="1"><i class="fa fa-flag" aria-hidden="true"></i> Denunciar</a>*/}
        { this.state.user && <><ModalDenunciar id={this.props.match.params.id}/><ModalOcultarPublicacion id={this.props.match.params.id}/><ModalSeguirPublicacion id={this.props.match.params.id}/><ModalFav id={this.props.match.params.id}/></> }
          </div>
        <div class="vox-info-user-more">
          {post.userType === 'Destacado'
            ? <><a href="#"><b>{post.autor}</b></a><span class="badge badge-danger">Admin</span></>
            : <><a href="#">
              <b>{ 
                post.serio ? post.autor.slice(0,10) : 'Argero'
              }
              </b>
                </a><span class="badge badge-danger">Anon</span></>
          }
          {adminControl}
        {/*{ this.adminControl(this.props.comment._id,this.props.comment.autor, this.props.comment.user_id, this.props.comment.ip) }*/}


          <span> {moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <div class="vox-main-post mt-2">
     { post.encuesta && <span class="badge badge-danger">Este Arg tiene una encuesta.</span> }
     { (this.state.user && post.encuesta) && <MostrarEncuesta id={post._id}/> }

      { post.videoYoutube 
          ? 
            <ModalYouTube video_id={post.videoYoutube}/>
      :
          <>
              { post.video 
                ?
                <ModalVideo video={post.video} public_id={post.public_id}/>
                :
                  <>
                  <ModalImagen image={post.thumbnail} />
                  {/*<figure class="vox-attach border border-light p-1 bg-white"> <a href={post.thumbnail} target="_blank" rel="noreferrer"> <img src={post.thumbnail} class="img-fluid rounded" alt=""/> </a> </figure>*/}
                  </>
              }
          </>
      }
        <div class="vox-container p-1"> {/* acá empieza el post */}
          <h2 class="vox-content-title font-weight-bold">{post.titulo}</h2>
          <p>
          </p>
          <div>{this.doRegex(post.desc)}</div>
          <p></p>
        </div>
      </div> 
      </>
    );
  }

  render() {
    let contents = this.state.loading
      ? <center><div className="lds-hourglass"></div></center>
      : this.renderPostsTable(this.state.post);

    return (
      <div class="container-flex vox-main-thread-container">
          <div class="row vox-main-thread-container-row m-0 mt-2">
            <div class="col-12 col-md-7 vox-data rounded p-4"> {/* aca empieza */}
              {contents}
            </div>{/* artículos */}
            {/* comentarios */}
              <GetComments op={this.state.post.autor} id={this.props.match.params.id} />
          </div>
      </div>
    );
  }

  async populatePostData() {
    const { id } = this.props.match.params;
    let fetch_post = "/posts/" + id;
    const response = await fetch(fetch_post);
    const data = await response.json();
    this.setState({ post: data, loading: false });
  }
}
