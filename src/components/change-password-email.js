import React, { Component } from "react";
import register from "../img/register.jpg";
import Modal from "../components/modal";

// export default class ChangePasswordEmail extends Component {
class ChangePasswordEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  

  render() {
    const handleShow = () =>
      this.setState({
        show: true,
      });
      const handleClose = () => this.setState({
        show: false,
      });

    return (
      <div className="row register-login-section ">
        <Modal showModal={this.state.show} handleClose={handleClose}>
        Se ha realizado el envío de un correo electrónico. Por favor ingrese y
          reestablezca la contraseña
        </Modal>
        <div className="col-md-6">
          <img src={register} className="img-fluid h-100" alt="" />
        </div>
        <div className="col-md-6">
          <div className="container h-100 register-login-form">
            <div className="row h-100 align-items-center ml-5 mr-5">
              <form>
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
                    placeholder=""
                    aria-describedby="helpId"
                  />
                </div>
                <div className=" form-group text-center">
                  <button
                    name=""
                    id=""
                    className="btn btn-primary rounded button-red-custom-profile"
                  >
                    Cancelar
                  </button>
                  <button
                    name=""
                    id=""
                    type="button"
                    className="btn btn-primary rounded button-green-custom-profile ml-5"
                    onClick={handleShow}
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
    );
  }
}

export default ChangePasswordEmail;
