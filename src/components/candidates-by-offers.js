import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
// import offersData from "../dataTest/data";
import testImage from "../img/usuario.png";
import Loading from "./page-load";
import Modal from "./modal";

// export default class Offers extends Component {
const OffersCandidates = (props) => {
  const [load, setLoad] = useState(true);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  function getOffers(config) {
    let pathArray = window.location.pathname.split("/");
    const url =
      "https://unempleo-api.azurewebsites.net/unempleo/detallePersonaOfertas/filtrarOferta/" +
      pathArray[2];
    axios
      .get(url, config)
      .then((response) => {
        setProfiles(response.data);
        console.log(response.data);
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

  if (!load) {
    return (
      <>
        <div className="text-center">
          <h1 className="label-custom">
            Personas que se postularon a la oferta
          </h1>
        </div>
        <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
          {modalMensajeTexto}
        </Modal>
        {profiles.length === 0 ? (
          <div className="row m-5">
            No se han registrado personas en la oferta
          </div>
        ) : (
          profiles.map((profile) => (
            <div className="row m-5 border border-dark" key={profile.pkPersona}>
              <div className="col-md-3">
                <img
                  src={
                    testImage
                    // !profile.foto.startsWith("https://drive.google.com")
                    //   ? testImage
                    //   : profile.foto
                  }
                  className="img-thumbnail rounded-circle position-relative"
                  width="250vw"
                  alt="..."
                />
              </div>
              <div className="col-md-9">
                <div className="row ml-2 mt-5">
                  <p className="font-weight-bold">
                    {profile.nombres + " " + profile.apellidos}
                  </p>
                </div>
                <div className="row ml-2">
                  <p>
                    <b> Perfil profesional:</b>{" "}
                    {" " + profile.perfilProfesional}
                  </p>
                </div>
                <div className="row ml-2">
                  <p>
                    <b> Experiencia laboral:</b>{" "}
                    {" " + profile.experienciaLaboral}
                  </p>
                </div>

                <div className="row ml-2 float-right">
                  <a
                    href={profile.hojaDeVida}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary m-2 p-3"
                  >
                    Descargar hoja de vida
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
  }
  return <Loading loading={load}></Loading>;
};

export default OffersCandidates;
