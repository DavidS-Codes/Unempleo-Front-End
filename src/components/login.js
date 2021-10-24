import React, { Component } from "react";
import login from "../img/login.jpg";
import {
  Link
} from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div className="row register-login-section ">
        <div className="col-md-6">
          <div className="container h-100 w-100 register-login-form">
            <div className="row h-100 align-items-center justify-content-center">
              <form>
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
                  <a
                    name=""
                    id=""
                    className="btn btn-primary rounded button-custom"
                    href="/login"
                    role="button"
                  >
                    Aceptar
                  </a>
                </div>
                <div className="form-group links-custom text-center">
                  {/* <Link href="/login">
                    <a className="card-link">Registrarse ahora</a>
                  </Link> */}
                  {/* <a className="card-link" href="/register">Registrarse ahora</a> */}
                  <Link to="/register" className="card-link" replace > Registrarse ahora</Link>
                </div>
                <div className="form-group links-custom text-center">
                  {/* <Link href="/login">
                    <a className="card-link">¿Olvido su contraseña?</a>
                  </Link> */}
                  {/* <a className="card-link" href="/login">¿Olvido su contraseña?</a> */}
                  <Link to="/changePasswordEmail" className="card-link" replace > ¿Olvido su contraseña?</Link>
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
  }
}
