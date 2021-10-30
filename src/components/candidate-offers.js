import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import offersData from "../dataTest/data";
import testImage from "../img/usuario.png";
import Loading from "./page-load";
import Modal from "./modal";

// export default class Offers extends Component {
const OffersOwner = (props) => {
  const [load, setLoad] = useState(true);
  const [offers, setOffers] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  function getOffers(config) {
      
    const url = "https://unempleo-api.azurewebsites.net/unempleo/ofertas/PersonaCreadora/"+Cookies.get("persona");
    axios
      .get(url, config)
      .then((response) => {
          console.log(response.data)
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
        <h1 className="label-custom">Ofertas creadas por mi</h1>
      </div>
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
              <pre className="font-weight-bold">Empresa</pre>
              <pre>{ ' ' + offer.empresa.nombreEmpresa + ' '}</pre>
              <pre className="font-weight-bold">Área </pre>
              <pre>{ ' ' + offer.area.nombreArea + ' '}</pre>
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

export default OffersOwner;
