import React, { useState, useRef } from "react";
import { Redirect } from "react-router";
import register from "../img/register.jpg";
import Modal from "./modal";
import Loading from "./page-load";
import { Link } from "react-router-dom";
import axios from "axios";


const ChangePasswordEmail = (props) => {
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [load, setLoad] = useState(false);
  const form = useRef(null);

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    setRedirect(true);

   
  };
  const handleShowModalMensaje = () => {
    
    setModalMensaje(true);
  };

  const SendEmail = () => {
    let email = form.current.email.value;

    if(email !== ""){
      setLoad(true);
      const url = "https://unempleo-api.azurewebsites.net/unempleo/EnviarCorreoAPI";
      let html =  `
      <div>
      <div style="margin: auto;
      width: 50%;
      border: 1px solid;
      padding: 10px;
      text-align: center;">
      <img src='https://drive.google.com/uc?id=1RO5uiDM6ESaRI2nOdptNJy_v1nMWtXW3' alt='Google' className={styles.logo} /> 
      <br/>
      <h1>Ha solicitado reestablecer la contraseña</h1>
      <br/>
      <p>`+
      email
      +`</p>
      <br/>
      <p>Este proceso tiene valides por 24 horas. Si no realizo esta solicitud por favor haga 
caso omiso a este correo, de lo contrario haga clic en Reestablecer Contraseña</p>
<br/>
      <a type="button" style="min-width: 193px ;
      min-height: 63px  ;
      background-color: #E2EBAB ;
      font-size: 20pt ;
      color: #707070 ;
      border-color: #E2EBAB ;
      border: 1px solid;
      text-decoration:none;
      padding: 0.5em;
      border-radius: 0.5em;
      margin-bottom: 5em;" href="http://localhost:3000/login"> Reestablecer contraseña</a>
      </div>
      
    </div>
      
      `
      const data = {
        to:  email,
        subject: "Cambio de contraseña",
        content: html,
      };
  
      axios
        .post(url, data)
        .then((response) => {
          setModalMensajeTexto(
            "Se ha realizado el envío de un correo electrónico. Por favor ingrese y reestablezca la contraseña"
          );
        })
        .catch((err) => {
          setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
          );
        })
        .finally(() => {
          handleShowModalMensaje()
          setLoad(false);
        });
    }else{
      setModalMensajeTexto(
        "El campo email esta vacio"
        );
        handleShowModalMensaje();
    }
    
  }
 if (redirect) {
    return <Redirect to="/login" />; 
  }
  
  return (
    <Loading loading={load}>
    <div className="row register-login-section ">
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <div className="col-md-6">
        <img src={register} className="img-fluid h-100" alt="" />
      </div>
      <div className="col-md-6">
        <div className="container h-100 register-login-form">
          <div className="row h-100 align-items-center ml-5 mr-5">
            <form ref={form}>
              <div className="text-center">
                <label className="text-change-password">
                  Recuperar contraseña
                </label>
                <p className="label-custom">
                  Para recuperar contraseña por favor diligencie su usuario o
                  correo electrónico.
                </p>
              </div>

              <div className="form-group mt-5">
                <label htmlFor="email" className="label-custom">
                  Correo electronico o usuario
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control input-custom"
                  aria-describedby="helpId"
                />
              </div>
              <div className=" form-group text-center">
                <Link to="/login"  className="btn btn-primary rounded button-red-custom-profile"> 
                Cancelar
                </Link>
                <button
                  name=""
                  id=""
                  type="button"
                  className="btn btn-primary rounded button-green-custom-profile ml-5"
                  onClick={SendEmail}
                >
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
        <img
          src="circulos.png"
          className="img-fluid h-100 img-register-login-circles"
          alt=""
        />
      </div>
    </div>
    </Loading>
  );
};

export default ChangePasswordEmail;
