import React, {useState, useRef} from 'react';
import Heroe from './Heroe';
import HeroeEstadistica from './HeroeEstadistica';
import { Popover, Overlay,  Button } from 'react-bootstrap';

function OverlayHeroe(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tooltipshow, setTooltipshow] = useState(false);
  const target = useRef(null);

   return (
          <span key={props.heroe.id} class="col-6 col-sm-6 col-md-4 col-lg-3 m-0 p-0">
       {props.heroe &&
         <a href="#" ref={target} onMouseEnter={() => setTooltipshow(true)} onMouseLeave={() => setTooltipshow(false)}>
         <Heroe heroe={props.heroe} />
        </a>

       }

      {props.heroe 
      ? (
      <Overlay target={target.current} show={tooltipshow} placement="auto left" >
        <Popover id="popover-basic">
          <Popover.Body>
          {props.heroe.name}
          </Popover.Body>
        </Popover>
      </Overlay>
      ) : 
      <Overlay target={target.current} show={tooltipshow} placement="auto">
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover bottom</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      </Overlay>
       }

    </span>
  );
}

export default OverlayHeroe;
