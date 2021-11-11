import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Modal from "./modal";
import Loading from "./page-load";
import testImage from "../img/usuario.png";

// export default class CreateOffer extends Component {
//   render() {

const ViewOffer = (props) => {
  const [load, setLoad] = useState(true);
  const [offer, setOffer] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [modalAplicarOferta, setModalAplicarOferta] = useState(false);
  const [ofertaAplicada, setOfertaAplicada] = useState(false);
  const [ofertaCreadaByUser, setOfertaCreadaByUser] = useState(false);
  const [pkDetPersonaOferta, setPkDetPersonaOferta] = useState("");

  const handleCloseModalMensaje = (handlerRedirect) => {
    setModalMensaje(false);
    if (handlerRedirect) {
      setRedirect(true);
    }
  };

  const handleCloseButtonCancelModalAplicarOferta = () => {
    setModalAplicarOferta(false);
  };

  const offerAplied = (config) => {
    let persona = Cookies.get("persona");
    let pathArray = window.location.pathname.split("/");
    let pkOferta = pathArray[2];
    axios
      .get(
        "https://unempleo-api.azurewebsites.net/unempleo/detallePersonaOfertas/PersonaAplica/" +
          persona,
        config
      )
      .then((response) => {
        response.data.map((oferta) => {
          if (oferta.oferta.pkOferta.toString() === pkOferta) {
            setOfertaAplicada(true);
            setPkDetPersonaOferta(oferta.pkDetPersonaOferta);
          }
          return null;
        });
      });
  };


  const handleCloseModalAplicarOferta = () => {
    let url = "https://unempleo-api.azurewebsites.net/unempleo/detallePersonaOfertas";


    let data = {
      fkPersonaAplicar: Cookies.get("persona"),
      fkOferta: offer.pkOferta,
     
    };
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, data, config)
      .then(() => {
        setModalAplicarOferta(false);
        setModalMensajeTexto(`Recuerde que al aplicar a esta oferta, se 
        adjuntara su nombre completo, contacto y 
        hoja de vida, por el cual se comunicaran con usted`);
        setModalMensaje(true);
      })
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true);
      });
  };
  function getOffer() {
    let pathArray = window.location.pathname.split("/");
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const persona = Cookies.get("persona");

    axios
      .get("https://unempleo-api.azurewebsites.net/unempleo/ofertas/" + pathArray[2], config)
      .then((response) => {
        if (
          !response.data.imagenOferta.startsWith("https://drive.google.com")
        ) {
          response.data.imagenOferta = testImage;
        }
        if (response.data.fkPersonaCreador.toString() === persona) {
          setOfertaCreadaByUser(true);
        }
        setOffer(response.data);
        setLoad(false);
      })
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true);
        setLoad(false);
      });
  }

  const cancelOffer = () => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(
        "https://unempleo-api.azurewebsites.net/unempleo/detallePersonaOfertas/" +
          pkDetPersonaOferta,
        config
      )
      .then((response) => {
        setModalMensajeTexto("Se ha cancelado la postulación a la oferta correctamente");
        setModalMensaje(true);
      })
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true);
        setLoad(false);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    getOffer(config);
    offerAplied(config);
  }, []);

  if (redirect) {
    return <Redirect to="/offers?filter=todo" />;
  }

  if (!load) {
    return (
      <>
        <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
          {modalMensajeTexto}
        </Modal>
        <Modal
          showModal={modalAplicarOferta}
          handleClose={handleCloseModalAplicarOferta}
          handleCloseCancel={handleCloseButtonCancelModalAplicarOferta}
          buttonCancelButton={true}
        >
          ¿Esta seguro que desea aplicar a esta oferta?
        </Modal>
        <div className="row border border-dark m-5">
          <div className="col-md-5">
            <div className="section-photo mt-5 ml-5 mb-3">
              <img
                src={offer.imagenOferta}
                className="border border-dark rounded-lg"
                alt=""
              />
            </div>
            <div className="ml-5 mb-2">
              <b> Publicada por:</b>{" "}
              <u>{offer.persona.nombres + " " + offer.persona.apellidos}</u>
            </div>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="name-offer"
              value={offer.nombreOferta}
              readOnly
            />
          </div>
        </div>
        <div className="row border border-dark m-5">
          <div className="w-100">
            <div className="w-100 ml-2">
              <label className="col-form-label font-weight-bold">
                {" "}
                Detalles Oferta
              </label>
            </div>
            <div className="container form-personal-information">
              <div className="form-group row">
                <label htmlFor="area" className="col-sm-4 col-form-label">
                  Área
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded text-center">
                  {offer.area.nombreArea}
                </label>
              </div>
              <div className="form-group row">
                <label htmlFor="area" className="col-sm-4 col-form-label">
                  Empresa
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded text-center">
                  {offer.empresa.nombreEmpresa}
                </label>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label
                  htmlFor="description"
                  className="col-sm-4 col-form-label"
                >
                  Descripción
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  rows="5"
                  defaultValue={offer.descripcionOferta}
                  readOnly
                ></textarea>
              </div>
              {ofertaAplicada ? (
                <div className="row">
                  <div className="w-100 text-right mr-5 mb-2">
                    <Link
                      className="btn btn-primary rounded button-green-custom-profile"
                      to="/offersApplied"
                      role="button"
                    >
                      Volver
                    </Link>
                    <button
                      type="button"
                      className="btn rounded button-red-custom-cancel-offer"
                      onClick={cancelOffer}
                    >
                      Cancelar aplicación
                    </button>
                  </div>
                </div>
              ) : ofertaCreadaByUser ? (
                <div className="row ">
                  <div className="w-100 text-right mr-5 mb-2">
                    <Link
                      className="btn btn-primary rounded button-green-custom-profile mr-2"
                      to="/offersOwner"
                      role="button"
                    >
                      Volver
                    </Link>
                   
                    <Link
                      className="btn btn-primary rounded button-primary-custom-profile"
                      to={"/editOffer/" + offer.pkOferta}
                      role="button"
                    >
                      Modificar
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="w-100 text-right mr-5 mb-2">
                    <Link
                      className="btn btn-primary rounded button-red-custom-profile"
                      to="/offers"
                      role="button"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary rounded button-green-custom-profile ml-5"
                      onClick={() => setModalAplicarOferta(true)}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return <Loading loading={load}></Loading>;
};
export default ViewOffer;
