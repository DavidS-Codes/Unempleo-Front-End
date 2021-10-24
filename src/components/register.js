import React, { useState, useRef } from "react";
import register from "../img/register.jpg";
import axios from "axios";
import Modal from "./modal";
import { Link } from "react-router-dom";
// export default class Register extends Component {
const Register = (props) => {
  const form = useRef(null);
  const [modal, setModal] = useState(false);
  const [data, setDataModal] = useState("");
  const submit = (e) => {
    e.preventDefault();
    let passVerified = verifyPassword();
    if (passVerified) {
      const url = "http://localhost:8080/unempleo/usuarios"
      const body = {
        nombreUsuario: form.current.email.value,
        contrasena: form.current.pass.value,
        fkRol: 2,
      };
      axios.post(url, body)
      .then(response => {
        axios.post("http://localhost:8080/unempleo/persona", {
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
        .then(response => {
          setDataModal("La información ha sido guardada exitosamente")
          setModal(true)
        })
        .catch(err => {
          console.error(err)
        })
      })
      .catch(err => {
        console.error(err)
      })
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
    let verify = verifyPassword() 
    if (verify) {
      window.location = "/profile?edit=true";
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
                  Correo electronico
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
              <div className="form-group">
                <label htmlFor="passConfirm" className="label-custom">
                  Confirmar contraseña
                </label>
                <input
                  type="text"
                  name="passConfirm"
                  id="passConfirm"
                  className="form-control input-custom"
                  placeholder=""
                  aria-describedby="helpId"
                />
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
