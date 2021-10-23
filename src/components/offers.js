import React, { useState, useEffect } from "react";
import offersData from "../dataTest/data";
import testImage from "../img/usuario.png";
import Loading from "./page-load";
import Modal from "./modal";
import axios from "axios";

// export default class Offers extends Component {
const Offers = (props) => {

  const [load, setLoad] = useState(true);
  const [offers, setOffers] = useState([]);
    const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  function getOffers() {
    const url = "http://localhost:8080/unempleo/ofertas";

    axios
      .get(url)
      .then((response) => {
        setModalMensajeTexto("Los datos han sido guardados exitosamente");
        setLoad(false);
        setOffers(response.data);
      })
      .then(() => {
        setModalMensaje(true)
        setLoad(false);
      })

      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true)
        setLoad(false);
      });
  }
  useEffect(() => {
    getOffers()
  }, []);


  return (
    <Loading loading={load}>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
       {/* {offersData.map((offer, i) => ( */}
      {offers.map((offer, i) => ( 
        <div className="row m-5 border border-dark" key={i}>
          <div className="col-md-2">
            <img
              src={testImage}
              className="img-fluid img-thumbnail rounded-circle mb-2 mt-2 position-relative"
              width="250vw"
              alt="..."
            />
          </div>
          <div className="col-md-10">
            <div className="row ml-2 mt-5">
              <p className="font-weight-bold">{offer.oferta}</p>
            </div>
            <div className="row ml-2">
              <p> {offer.ubicacion}</p>
            </div>
            <div className="row ml-2">
              <p> {offer.tipo_contrato}</p>
            </div>
          </div>
        </div>
      ))}
    </Loading>
  );
};

export default Offers;
