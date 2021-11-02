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
      .get("https://unempleo-api.azurewebsites.net/unempleo/persona/filtrarUsuario/" + id, config)
      .then((res) => {
        // res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
        res.data.fechaNacimiento = new Date(res.data.fechaNacimiento);
        res.data.fechaNacimiento = new Intl.DateTimeFormat("es-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(res.data.fechaNacimiento);
        dataProfile = res.data
       
          axios.get("https://unempleo-api.azurewebsites.net/unempleo/usuarios/"+ id, config)
          .then((res) => {
            if (!Cookies.get("persona")){
              Cookies.set("persona",dataProfile["pkPersona"], { expires: 0.24 });
            }
            dataProfile["fkUsuario"] = res.data.nombreUsuario
            setUser(dataProfile);
            setLoad(false)
          })
          .catch((err) => {
            console.error(err);
          })
       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
   
    getProfile( Cookies.get("usuario"));
  }, []);

  if(!load){
    return (
      <>
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
                    {user.tipoDocumento.nombreTipoDocumento}
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
                    {user.fkUsuario}
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
                    {user.preferenciasEmpleo.situacionActual}
                  </label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Formación Academica
                  </label>
                  <label className="col-sm-8 col-form-label-data border border-dark rounded  text-center">
                    {user.formacionAcademica.nombreFormacion}
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
      </>
    );
  }

  return (
    <Loading loading={load}>

    </Loading>
  )
  
};

export default ProfileNonEdit;
