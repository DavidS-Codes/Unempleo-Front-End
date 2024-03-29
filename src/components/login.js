import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import login from "../img/login.jpg";
import Modal from "./modal";

const Login = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/profile");
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const form = useRef(null);
  const showPasswordIcon = useRef(null);

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
  };
  const handleShowModalMensaje = () => {
    setModalMensaje(true);
  };
  const showPassword = () => {
    if (form.current.pass.type === "password") {
      form.current.pass.type = "text";
      showPasswordIcon.current.className = "fa fa-eye-slash";
    } else {
      form.current.pass.type = "password";
      showPasswordIcon.current.className = "fa fa-eye";
    }
  }

  const submit = (e) => {
    e.preventDefault();
    const url = "https://unempleo-api.azurewebsites.net/unempleo/oauth/token";

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
        if (response.data.rol === "ADMIN"){
          setRedirectUrl("/adminReporter")
        }
        setRedirect(true);
      })
      .catch((err) => {
        setModalMensajeTexto("Usuario y/o contraseña invalidos");
        handleShowModalMensaje();
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to={redirectUrl} />;
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
                  Correo electrónico
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
                
                <div className="input-group">
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="form-control input-custom"
                  placeholder=""
                  aria-describedby="helpId"
                />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={showPassword}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden="true"
                      ref={showPasswordIcon}
                    ></i>
                  </button>
                </div>
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
