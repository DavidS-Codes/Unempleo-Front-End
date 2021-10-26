import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import offersData from "../dataTest/data";
import testImage from "../img/usuario.png";
import Loading from "./page-load";
import Modal from "./modal";

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

  function getOffers(config) {
    const url = "http://localhost:8080/unempleo/ofertas";
    axios
      .get(url, config)
      .then((response) => {
        setOffers(response.data);
        
      })
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true);
        setLoad(false);
      })
      .finally(() => {
        setLoad(false);
      });
  }
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    getOffers(config);
  }, []);

  return (
    <Loading loading={load}>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      {offers.map((offer) => (
        <div className="row m-5 border border-dark" key={offer.pkOferta}>
          <div className="col-md-3">
            <img
              src={
                !offer.imagenOferta.startsWith("https://drive.google.com")
                  ? testImage
                  : offer.imagenOferta
              }
              className="img-thumbnail rounded-circle position-relative"
              width="250vw"
              alt="..."
            />
          </div>
          <div className="col-md-9">
            <div className="row ml-2 mt-5">
              <p className="font-weight-bold">{offer.nombreOferta}</p>
            </div>
            <div className="row ml-2">
              <p> {offer.descripcionOferta}</p>
            </div>
            <div className="row ml-2">
              <p> {"Empresa: " + offer.fkEmpresa + " área: " + offer.fkArea}</p>
            </div>
            <div className="row ml-2 float-right">
              <Link
                to={"/offer/" + offer.pkOferta}
                className="btn btn-outline-secondary m-2 p-3"
                replace
              >
                Ver Oferta
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Loading>
  );
};

export default Offers;
