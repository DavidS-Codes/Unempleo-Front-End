import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "./modal";
import Loading from "./page-load";
import { Link } from "react-router-dom";

// export default class ChangePassword extends Component {
// render() {
const ChangePassword = (props) => {
  const formPasword = useRef(null);
  const [load, setLoad] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");
  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    let verify = verifyPassword() 
    if (verify) {
      window.location = "/profile";
    }
    
  };

  const verifyPassword = () => {
    if (formPasword.current.newPassword.value !== formPasword.current.newPasswordConfirm.value) {
      return false;
    }
    return true;
  };
  const submit = (e) => {
    e.preventDefault();
    setLoad(true);
    let passVerified = verifyPassword();
    if (passVerified) {
      const url = "http://localhost:8080/unempleo/usuarios";

      const data = {
        nombre_usuario: formPasword.current.email.value,
        contrasena: formPasword.current.newPassword.value,
      };
  
      axios
      .post(url, data)
      .then((response) => {
        setModalMensajeTexto("Los datos han sido guardados exitosamente");
        // setLoad(false);
      })
      .then(() => {
        setModalMensaje(true)
        setLoad(false);
      })
  
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        setModalMensaje(true)
        setLoad(false);
      });
    }else{
      setModalMensajeTexto("Las contraseñas no coinciden");
      setModalMensaje(true);
      setLoad(false)
    }

    
};

  return (
    <Loading loading={load}>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <div className="row m-5 text-center">
        <div className="w-100 text-center">
          <label className="text-change-password">Cambiar contraseña</label>
        </div>
        <div className="w-100">
          <div className="container">
            <form ref={formPasword} onSubmit={submit}>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">
                  Correo
                </label>
                <div className="col-sm-9 mt-4">
                  <input type="text" className="form-control" name="email" />
                </div>
              </div>
              <div className="form-group row mt-5">
                <label htmlFor="date" className="col-sm-5 col-form-label">
                  Contraseña actual
                </label>
                <div className="col-sm-7 mt-4">
                  <input type="text" className="form-control" name="passwordActual" />
                </div>
              </div>
              <div className="form-group row mt-5">
                <label htmlFor="newPassword" className="col-sm-5 col-form-label">
                  Contraseña nueva
                </label>
                <div className="col-sm-7 mt-4">
                  <input type="text" className="form-control" name="newPassword"/>
                </div>
              </div>
              <div className="form-group row mt-5">
                <label htmlFor="newPasswordConfirm" className="col-sm-5 col-form-label">
                  Confirmar contraseña
                </label>
                <div className="col-sm-7 mt-4">
                  <input type="text" className="form-control" name="newPasswordConfirm" />
                </div>
              </div>
              <div className="row">
                <div className="w-100 text-center mr-5 mb-2 mt-5">
                  <Link
                    to="/profile"
                    className="btn btn-primary rounded button-red-custom-profile"
                    replace
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary rounded button-green-custom-profile ml-5"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Loading>
  );
};
// }

export default ChangePassword;
