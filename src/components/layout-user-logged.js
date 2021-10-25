// import Cookies from "js-cookie";
import React, { useState,useEffect } from "react";

import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Navbar from "./header";
import Modal from "./modal";

const LayoutUserLogged = (props) => {
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [redirect, setRedirect] = useState(false);
  let offers = false;

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    setRedirect(true);
  };

  const logOut = () => {
    console.log("aca!!");
    // function logOut() {
    Cookies.remove("token");
    setRedirect(true);
  };

  function validatePath() {
    let url = window.location.pathname;
    if (url === "/offers") {
      offers = true;
      // getOffers();
    }
  }

  function validateToken() {
    
    if (Cookies.get("token")) {
      validatePath();
    }else{
      setModalMensajeTexto("Usted no tiene acceso para acceder a este recurso")
      setModalMensaje(true);
      
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  

  // function getOffers(){
  //   let url =
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
  //       setUser(res.data);
  //       if (res.data.foto !== "") {
  //         setimgProfile(res.data.foto);
  //       }
  //       setLoad(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
            <button className="btn btn-outline-secondary m-2 p-3">
              Consultar ofertas aplicadas
            </button>
            <button className="btn btn-outline-secondary m-2 p-3">
              Consultar candidatos por oferta{" "}
            </button>
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
            <button className="btn btn-outline-secondary m-2">
              Ver ofertas aplicadas
            </button>
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
