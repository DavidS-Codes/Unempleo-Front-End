import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./page-load";
import pdf from "../icons/pdf.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

// function Profile() {
const ProfileNonEdit = (props) => {
  const [user, setUser] = useState([]);

  const [load, setLoad] = useState(true);
  function getProfile(id) {
    let dataProfile;
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://localhost:8080/unempleo/persona/" + id, config)
      .then((res) => {
        // res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
        res.data.fechaNacimiento = new Date(res.data.fechaNacimiento);
        res.data.fechaNacimiento = new Intl.DateTimeFormat("es-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(res.data.fechaNacimiento);

        console.log(res.data.fechaNacimiento);
        dataProfile = res.data;
        axios
          .get(
            "http://localhost:8080/unempleo/tipoDocumento/" +
              dataProfile["fkTipoDocumento"],
            config
          )
          .then((res) => {
            dataProfile["fkTipoDocumento"] = res.data.nombreTipoDocumento;
            axios
              .get(
                "http://localhost:8080/unempleo/preferenciasEmpleo/" +
                  dataProfile["fkPreferenciasEmpleo"],
                config
              )
              .then((res) => {
                dataProfile["fkPreferenciasEmpleo"] = res.data.situacionActual;
                axios
                  .get(
                    "http://localhost:8080/unempleo/formacionAcademica/" +
                      dataProfile["fkFormacionAcademica"],
                    config
                  )
                  .then((res) => {
                    dataProfile["fkFormacionAcademica"] =
                      res.data.nombreFormacion;

                    setUser(dataProfile);
                    setLoad(false);
                    // axios.get("http://localhost:8080/unempleo/usuarios"+ dataProfile["fkUsuario"])
                    // .then((res) => {
                    //     dataProfile.correo = res.data.
                    // })
                  });
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProfile(1);
  }, []);

  return (
    <Loading loading={load}>
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            <img
              src={user.foto}
              className="img-fluid img-thumbnail border border-dark rounded-circle mb-2 mt-2 position-relative"
              width="250vw"
              alt="..."
            />
            <div>
              <p className="text-general-profile">Información basica</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="text-left">
            <p className="text-name-profile mt-5">
              {user.nombres + " " + user.apellidos + " "}
            </p>
          </div>
        </div>
      </div>
      <div className="row ml-5 mr-5 mt-2 mb-5 border border-dark">
        <div className="w-100 text-right">
          <a name="" id="" href="/profile?edit=true" role="button">
            <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
          </a>
        </div>
        <div className="w-100">
          <div className="container form-personal-information">
            <form>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Tipo Documento:
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded text-center">
                  {user.fkTipoDocumento}
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Número documento
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                  {user.noIdentificacion}
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Fecha Nacimiento
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                  {user.fechaNacimiento}
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Correo Electronico
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                  {user.correo}
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Hoja de vida</label>
                <div className="col-sm-8 text-center">
                  <a
                    href={user.hojaDeVida}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pdf} className="fluid" alt="" width="100px" />
                  </a>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Preferencia Empleo
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                  {user.fkPreferenciasEmpleo}
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Formación Academica
                </label>
                <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                  {user.fkFormacionAcademica}
                </label>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label className="col-sm-4 col-form-label">
                  Experiencia laboral
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  rows="5"
                  defaultValue={user.experienciaLaboral}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label className="col-sm-4 col-form-label">
                  Perfil laboral
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  rows="5"
                  defaultValue={user.perfilProfesional}
                  readOnly
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="w-100 text-right mr-5 mb-2">
          <Link
            to="/createOffer"
            className="btn btn-primary rounded button-publish-ofert"
            replace
          >
            Publicar oferta
          </Link>
        </div>
      </div>
    </Loading>
  );
};

export default ProfileNonEdit;
