// import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import Modal from "./modal";

const AdminReporter = (props) => {
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [redirect, setRedirect] = useState(false);
  const year = useRef(null);
  const month = useRef(null);
  const report = useRef(null);
  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    if(!Cookies.get("token")){
      setRedirect(true);
    }
   
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("usuario");
    setRedirect(true);
  };

  function validateToken() {
    if (!Cookies.get("token")) {
      setModalMensajeTexto("Usted no tiene acceso para acceder a este recurso");
      setModalMensaje(true);
    }
  }
  function GenerateFile(){
    if(year.current.value === "0"){
      setModalMensajeTexto("Por favor Seleccione un año");
      setModalMensaje(true);
    }else if(month.current.value === "0"){
      setModalMensajeTexto("Por favor Seleccione un mes");
      setModalMensaje(true);
    }else if(report.current.value === "0"){
      setModalMensajeTexto("Por favor Seleccione un reporte");
      setModalMensaje(true);
    }


};

  useEffect(() => {
    validateToken();
  }, []);


 


  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <nav className="navbar navbar-expand-lg p-0 navbar-logged">
        <div className="container-fluid">
          <Link to="/profile" className="navbar-brand" replace>
            <img src={logo} className="img-fluid" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item ml-2 mt-1">ADMINISTRADOR</li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row w-100 h-auto">
        <div className="col-md-2 section-left-simple text-center position-static">
          <p className="label-custom">Reportes</p>
          <button
            className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"
            onClick={logOut}
          >
            {" "}
            <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión
          </button>
        </div>

        <div className="col-md-10 h-100">
          <div className="m-5  border border-dark" >
            <div className="container text-center ">
              <p className="label-custom">Generar reporte por Año y Mes</p>

              <div className="row">
                <div className="col">
                  <div className="row">
                    <label className="label-custom">AÑO</label>

                    <select className="form-control mt-2 ml-2 select-admin-reporter" ref ={year}>
                      <option value="0">Seleccione</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <label className="label-custom">MES</label>

                    <select className="form-control mt-2 ml-2 select-admin-reporter"  ref ={month}>
                      <option value="0">Seleccione</option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <label className="label-custom">REPORTE</label>

                    <select className="form-control mt-2 ml-2 select-admin-reporter"  ref ={report}>
                    <option value="0">Seleccione</option>
                      <option value="1">Cantidad usuarios registrados</option>
                      <option value="2">Cantidad ofertas aplicadas</option>
                    </select>
                  </div>
                </div>


              </div>

              <div className="text-center mb-2">
                <button className="btn btn-primary" type="button" onClick={GenerateFile}> Generar reporte</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReporter;
