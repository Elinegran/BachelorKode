//Utviklet av: Gruppe 2
import React, { useState, useRef } from "react";
import { Button, Overlay } from 'react-bootstrap';

function Tooltip() {
    const [show, setShow] = useState(false);
    const target = useRef(null);
  
    return (
      <>
        <Button className="mb-5" variant="info" ref={target} onClick={() => setShow(!show)}>
         Hjelp?
        </Button>
        <Overlay target={target.current} show={show} placement="bottom">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                width: '65%',
                backgroundColor: 'rgba(94, 219, 219, 0.85)',
                padding: '2px 10px',
                color: 'black',
                borderRadius: 3,
                ...props.style,
              }}
            >
               
              <span style={{ fontWeight: "bolder", fontSize: '17px'}}>Nøkkelord: </span> Her kan du legge til de nøkkelordene du vil at Matchboten skal se etter i brukerens spørsmål.<br/>
              <span style={{ fontWeight: "bolder", fontSize: '17px'}}>Svar: </span> Her legger du inn svaret. F.eks: Leter du etter profilsiden? Se link nedenfor.<br/>
              <span style={{ fontWeight: "bolder", fontSize: '17px'}}>Lenketekst: </span>Teksten på lenken. F.eks Profilsiden<br/>
              <span style={{ fontWeight: "bolder", fontSize: '17px'}}>Lenke: </span>Skriv inn full lenke til eksterne nettsider, eller eventuelt /profil for profilsiden eller /tidsbank her på Matchbox-portalen.<br/><br/>
              <span style={{ fontWeight: "bolder", fontSize: '17px'}}>Tips: </span>Hvis du ikke ønsker svar med lenke, så lar du de siste to feltene stå tomme.
           
            </div>
          )}
        </Overlay>
      </>
    );
  }
  export default Tooltip