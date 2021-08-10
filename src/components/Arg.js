import React, { Component } from 'react';
import { faFire, faBrain, faDice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { faPoll } from '@fortawesome/free-solid-svg-icons'


const IMGUR_IMAGE = 'https://i.imgur.com/';
const IMGUR_VIDEO = 'https://i.imgur.com/';
const YouTubeURL = 'https://i.ytimg.com/vi';


export default class Arg extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {post} = this.props;
    return (
               <Link to={`/ver/${post._id}`} key={post._id} class="embed-responsive contenedorubi col-6 col-sm-4 col-md-3 col-lg-2  m-0 p-0">
                  <div class="card text-white text-center align-bottom align-text-bottom">
                     <div class="card-img embed-responsive embed-responsive-1by1" style={{backgroundImage: post.videoYoutube ? `url(${YouTubeURL}/${post.videoYoutube}/hqdefault.jpg)` : post.video ? `url(${IMGUR_VIDEO}/${post.public_id}m.jpg)` : `url(${IMGUR_IMAGE}/${post.public_id}m.jpg)`,filter: (post.categoria==='XXX' || post.categoria==='HOT') && 'blur(15px)' }}></div>
                        <div class="card-img-overlay align-bottom align-text-bottom p-0">
                           <div class="card-void d-flex justify-content-between">
                              <span class="vox-badges">
                                 { post.sticky && <span class="badge badge-dark"><i className="fa fa-thumb-tack"></i></span> }
                                 { post.cant_comentarios > 20 && <span class="badge badge-warning"><FontAwesomeIcon icon={faFire} /> </span> }
                                 { post.serio && <span class="badge badge-warning"><FontAwesomeIcon icon={faBrain} /> </span> }
                                 { post.encuesta && <span class="badge badge-info"><FontAwesomeIcon icon={faPoll} /> </span> }
                                 { post.dados && <span class="badge badge-danger"><FontAwesomeIcon icon={faDice} /> </span> }
                                 <span class="badge badge-success text-uppercase">{post.categoria}|{post.cant_comentarios}</span>
                                 <span class="badge badge-primary text-uppercase">{post.img_format && post.img_format.split('/')[1]}</span>
                              </span>
                           </div>
                           <p class="card-text text-center text-shadow p-1">{post.titulo}</p>
                        </div>
                     </div>
               </Link>
    );
  }
}
