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
  const [profiles, setProfiles] = useState([]);
  const [params, setParams] = useState("todo");
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  function getOffers(config) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let url;
    if (params.filter === "offers") {
      url = "http://localhost:8080/unempleo/ofertas";
      setParams("offers");
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
    } else if (params.filter === "people") {
      setParams("people");
      url = "http://localhost:8080/unempleo/persona";
      axios
        .get(url, config)
        .then((response) => {
          setProfiles(response.data);
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
    } else {
      setParams("todo");
      axios
        .get("http://localhost:8080/unempleo/ofertas", config)
        .then((response) => {
          setOffers(response.data);
          axios
            .get("http://localhost:8080/unempleo/persona", config)
            .then((response) => {
              setProfiles(response.data);
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
  }

  function loadView() {
    if (params === "offers") {
      return offers.map((offer) => (
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
              <pre>{" " + offer.empresa.nombreEmpresa + " "}</pre>
              <pre className="font-weight-bold">Área </pre>
              <pre>{" " + offer.area.nombreArea + " "}</pre>
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
      ));
    } else if (params === "people") {
      return profiles.map((profile) => (
        <div className="row m-5 border border-dark" key={profile.pkPersona}>
          <div className="col-md-3">
            <img
              src={
                !profile.foto.startsWith("https://drive.google.com")
                  ? testImage
                  : profile.foto
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
                <b> Perfil profesional:</b> {" " + profile.perfilProfesional}
              </p>
            </div>
            <div className="row ml-2">
              <p>
                <b> Experiencia laboral:</b> {" " + profile.experienciaLaboral}
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
      ));
    } else {
      return (
        <>
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
                  <pre>{" " + offer.empresa.nombreEmpresa + " "}</pre>
                  <pre className="font-weight-bold">Área </pre>
                  <pre>{" " + offer.area.nombreArea + " "}</pre>
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

          {profiles.map((profile) => (
            <div className="row m-5 border border-dark" key={profile.pkPersona}>
              <div className="col-md-3">
                <img
                  src={
                    !profile.foto.startsWith("https://drive.google.com")
                      ? testImage
                      : profile.foto
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
          ))}
        </>
      );
    }
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
        <h1 className="label-custom">
          Ofertas vigentes o usuarios disponibles
        </h1>
      </div>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      {loadView()}
    </Loading>
  );
};

export default Offers;
