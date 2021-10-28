import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import login from "../img/login.jpg";
import Modal from "./modal";

const Login = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const form = useRef(null);

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
  };
  const handleShowModalMensaje = () => {
    setModalMensaje(true);
  };

  const submit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/unempleo/oauth/token";

    const params = new URLSearchParams();
    params.append("username", form.current.email.value);
    params.append("password", form.current.pass.value);
    params.append("grant_type", "password");

    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: "user",
          password: "12345",
        },
      })
      .then((response) => {
        Cookies.set("token", response.data.access_token, { expires: 0.24 });
        Cookies.set("usuario", response.data.pkUsuario, { expires: 0.24 })
        setRedirect(true);
      })
      .catch((err) => {
        setModalMensajeTexto("Usuario y/o contraseña invalidos");
        handleShowModalMensaje();
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="row register-login-section ">
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <div className="col-md-6">
        <div className="container h-100 w-100 register-login-form">
          <div className="row h-100 align-items-center justify-content-center">
            <form ref={form} onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email" className="label-custom">
                  Correo electronico o usuario
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control input-custom"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass" className="label-custom">
                  Contraseña
                </label>
                <input
                  type="text"
                  name="pass"
                  id="pass"
                  className="form-control input-custom"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-primary rounded button-custom"
                  type="submit"
                >
                  Aceptar
                </button>
              </div>
              <div className="form-group links-custom text-center">
                <Link to="/register" className="card-link" replace>
                  {" "}
                  Registrarse ahora
                </Link>
              </div>
              <div className="form-group links-custom text-center">
                <Link to="/changePasswordEmail" className="card-link" replace>
                  {" "}
                  ¿Olvido su contraseña?
                </Link>
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
      <div className="col-md-6">
        <img src={login} className="img-fluid h-100" alt="" />
      </div>
    </div>
  );
};

export default Login;
