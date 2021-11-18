// import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Navbar from "./header";
import Modal from "./modal";

const LayoutUserLogged = (props) => {
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [offers, setOffers] = useState(false);
  // let offers = false;

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    setRedirect(true);
  };

  function logOut() {
    Cookies.remove("token");
    Cookies.remove("usuario");
    Cookies.remove("persona");
    setRedirect(true);
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      let url = window.location.pathname;
      if (url === "/offers") {
        setOffers(true);
      }else{
        setOffers(false);
      }
    } else {
      setModalMensajeTexto("Usted no tiene acceso para acceder a este recurso");
      setModalMensaje(true);
    }
  }, []);

  // validateToken()

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <Navbar logged={true} />
      <div className="row w-100 h-auto">
        {offers ? (
          <div className="col-md-2 section-left-simple text-center position-static">
            <Link
              to="/offersApplied"
              className="btn btn-outline-secondary m-2 p-3"
              replace
            >
              Consultar ofertas aplicadas
            </Link>
            <Link
              to="/offersOwner"
              className="btn btn-outline-secondary m-2 p-3"
              replace
            >
              Consultar candidatos por oferta{" "}
            </Link>
            <button
              className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"
              onClick={logOut}
            >
              {" "}
              <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar
              sesión
            </button>
          </div>
        ) : (
          <div className="col-md-2 section-left-simple text-center position-static">
            <Link
              to="/offers?filter=todo"
              className="btn btn-outline-secondary m-2 p-3"
              replace
            >
              Buscar Ofertas
            </Link>
            <button
              className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"
              onClick={logOut}
            >
              {" "}
              <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar
              sesión
            </button>
          </div>
        )}

        <div className="col-md-10 h-100">
          <div className="m-5  border border-dark">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutUserLogged;
