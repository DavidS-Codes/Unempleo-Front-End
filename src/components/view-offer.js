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
  const [modalAplicarOferta, setModalAplicarOferta] = useState(false)

  function getOffer(config) {
    let pathArray = window.location.pathname.split('/');
    // const url = "http://localhost:8080/unempleo/ofertas/" + pathArray[2];
    const url = "http://localhost:8080/unempleo/ofertas/10";
    axios
      .get(url, config)
      .then((response) => {
        if (
          !response.data.imagenOferta.startsWith("https://drive.google.com")
        ) {
          response.data.imagenOferta = testImage;
        }
        setOffer(response.data);
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
    getOffer(config);
  }, []);

  const handleCloseModalMensaje = (handlerRedirect) => {
    setModalMensaje(false);
    if(handlerRedirect){
        setRedirect(true)
    }
  };

  const handleCloseButtonCancelModalAplicarOferta = () => {
    setModalAplicarOferta(false);
  };

  const handleCloseModalAplicarOferta = () => {
    let url = "http://localhost:8080/unempleo/detallePersonaOfertas";

    let data = {
        fkPersonaAplicar: 1,
        fkOferta: offer.pkOferta
    };

    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(url,data,config)
    .then(() => {
        setModalAplicarOferta(false)
        setModalMensajeTexto(
            "Su información se ha guardado exitosamente"
        );
        setModalMensaje(true);
    })
    .catch(err => {
        setModalMensajeTexto(
            "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
          );
          setModalMensaje(true);
    })
  };


  if (redirect) {
    return <Redirect to="/offers" />;
  }

  return (
    <Loading loading={load}>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <Modal showModal={modalAplicarOferta} handleClose={handleCloseModalAplicarOferta} handleCloseCancel={handleCloseButtonCancelModalAplicarOferta} buttonCancelButton={true}>
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
            <b> Publicada por:</b> <u>{offer.fkPersonaCreador}</u>
            {/* <b> Publicada por:</b> <u>{"Test"}</u> */}
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
                {offer.fkArea}
              </label>
            </div>
            <div className="form-group row">
              <label htmlFor="area" className="col-sm-4 col-form-label">
                Empresa
              </label>
              <label className="col-sm-8 col-form-label-data border border-dark rounded text-center">
                {offer.fkEmpresa}
              </label>
            </div>
            <div className="form-group form-group-textarea-custom">
              <label htmlFor="description" className="col-sm-4 col-form-label">
                Descripción
              </label>
              <textarea
                className="form-control custom-text-area-profile"
                rows="5"
                defaultValue={offer.descripcionOferta}
                readOnly
              ></textarea>
            </div>
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
          </div>
        </div>
      </div>
    </Loading>
  );
};
export default ViewOffer;
