import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "./modal";
import register from "../img/register.jpg";

// export default class Register extends Component {
const Register = (props) => {
  const form = useRef(null);
  const showPassword = useRef(null);
  const showPasswordConfirm = useRef(null);
  const [modal, setModal] = useState(false);
  const [data, setDataModal] = useState("");

  function login() {
    const urlLogin = "http://localhost:8080/unempleo/oauth/token";


    const params = new URLSearchParams();
    params.append("username", form.current.email.value);
    params.append("password", form.current.pass.value);
    params.append("grant_type", "password");
    axios

      .post(urlLogin, params, {
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
        Cookies.set("usuario", response.data.pkUsuario, { expires: 0.24 });
        setDataModal("La información ha sido guardada exitosamente");
        setModal(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const submit = (e) => {
    e.preventDefault();
    let passVerified = verifyPassword();
    if (passVerified) {
      const url = "http://localhost:8080/unempleo/usuarios";
      const body = {
        nombreUsuario: form.current.email.value,
        contrasena: form.current.pass.value,
        fkRol: 1,
      };
      axios
        .post(url, body)
        .then((response) => {
          axios
            .post("http://localhost:8080/unempleo/persona", {
              fkUsuario: response.data.pkUsuario,
              noIdentificacion: response.data.pkUsuario,
              fkPreferenciasEmpleo: 1,
              fkTipoDocumento: 1,
              fkFormacionAcademica: 1,
              nombres: "",
              apellidos: "",
              fechaNacimiento: Date.now(),
              correo: "",
              perfilProfesional: "",
              hojaDeVida: "",
              experienciaLaboral: "",
              foto: "",
            })
            .then((response) => {
              login();
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setDataModal("Las contraseñas no coinciden");
      setModal(true);
    }
  };

  const verifyPassword = () => {
    if (form.current.passConfirm.value !== form.current.pass.value) {
      return false;
    }
    return true;
  };

  const handleClose = () => {
    setModal(false);
    let verify = verifyPassword();
    if (verify) {
      window.location = "/profile?edit=true";
    }
  };

  const showPasswordPass = () => {
    if (form.current.pass.type === "password") {
      form.current.pass.type = "text";
      showPassword.current.className = "fa fa-eye-slash";
    } else {
      form.current.pass.type = "password";
      showPassword.current.className = "fa fa-eye";
    }
  };
  const showPasswordConfirmPass = () => {
    if (form.current.passConfirm.type === "password") {
      form.current.passConfirm.type = "text";
      showPasswordConfirm.current.className = "fa fa-eye-slash";
    } else {
      form.current.passConfirm.type = "password";
      showPasswordConfirm.current.className = "fa fa-eye";
    }
  };
  // render() {
  return (
    <div className="row register-login-section ">
      <Modal showModal={modal} handleClose={handleClose}>
        {data}
      </Modal>
      <div className="col-md-6">
        <img src={register} className="img-fluid h-100" alt="" />
      </div>
      <div className="col-md-6">
        <div className="container h-100 w-100 register-login-form">
          <div className="row h-100 align-items-center justify-content-center">
            <form ref={form} onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email" className="label-custom">
                  Correo electrónico
                </label>
                <input
                  type="email"
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
                </label>{" "}
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
                    onClick={showPasswordPass}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden="true"
                      ref={showPassword}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="passConfirm" className="label-custom">
                  Confirmar contraseña
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    name="passConfirm"
                    id="passConfirm"
                    className="form-control input-custom"
                    placeholder=""
                    aria-describedby="helpId"
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={showPasswordConfirmPass}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden="true"
                      ref={showPasswordConfirm}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-primary rounded button-custom"
                  href="/login"
                  type="submit"
                >
                  Aceptar
                </button>
              </div>
              <div className="form-group links-custom text-center">
                <b>¿Tienes cuenta? </b>
                <Link to="/login" className="card-link" replace>
                  {" "}
                  Inicia sesión
                </Link>
                {/* <a className="card-link" href="/login">Inicia sesión</a> */}
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
  );
};
// }

export default Register;
