import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import offersData from "../dataTest/data";
import testImage from "../img/usuario.png";
import Loading from "./page-load";
import Modal from "./modal";

// export default class Offers extends Component {
const OffersApplied = (props) => {
  const [load, setLoad] = useState(true);
  const [offers, setOffers] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  function getOffers(config) {
    let persona = Cookies.get("persona");
    const url =
      "http://localhost:8080/unempleo/detallePersonaOfertas/PersonaAplica/" +
      persona;
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
      <div className="text-center">
        <h1 className="label-custom">Ofertas Aplicadas</h1>
      </div>

      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      {offers.map((offer) => (
        <div className="row m-5 border border-dark" key={offer.oferta.pkOferta}>
          <div className="col-md-3">
            <img
              src={
                !offer.oferta.imagenOferta.startsWith(
                  "https://drive.google.com"
                )
                  ? testImage
                  : offer.oferta.imagenOferta
              }
              className="img-thumbnail rounded-circle position-relative"
              width="250vw"
              alt="..."
            />
          </div>
          <div className="col-md-9">
            <div className="row ml-2 mt-5">
              <p className="font-weight-bold">{offer.oferta.nombreOferta}</p>
            </div>
            <div className="row ml-2">
              <p> {offer.oferta.descripcionOferta}</p>
            </div>
            <div className="row ml-2">
              <pre className="font-weight-bold">Empresa</pre>
              <pre>{" " + offer.oferta.empresa.nombreEmpresa + " "}</pre>
              <pre className="font-weight-bold">Área </pre>
              <pre>{" " + offer.oferta.area.nombreArea + " "}</pre>
            </div>

            <div className="row ml-2 float-right">
              <Link
                to={"/offer/" + offer.oferta.pkOferta}
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

export default OffersApplied;
