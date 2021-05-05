//Utviklet av: Gruppe 2
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import authService from '../services/auth.service';
import BoxImg from '../assets/images/Bruker/box_ico.png'

function MyVerticallyCenteredModal(props) {
  let history = useHistory();

  function redirect () {
    history.push('/Profil');
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Velkommen! <img src={BoxImg} alt="MB Box" height="30px" className="ml-3"/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Førstegangsbruk</h4>
        <p>Som førstegangsbruker av portalen er det en rekke ting som må gjøres:</p>
        <li>Bytte passord</li>
        <li>Fylle inn informasjon om deg selv</li>
        <p>Dette kan du gjøre inne på din profilside, ved å trykke på "Til profilsiden"</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={redirect}>Til profilsiden</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const CenterModal = function CenterModal() {
    const [modalShow, setModalShow] = useState(false);
    var pswStatus = authService.getPswstatus();

    useEffect(() => {
        if(pswStatus === '0') {
            setModalShow(true);
        }
    }, [pswStatus])
   
    return (
        <div>
        
        <MyVerticallyCenteredModal
            show={modalShow}
        />
        </div>
    );
}
export default CenterModal;

