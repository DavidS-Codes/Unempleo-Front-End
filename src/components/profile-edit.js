import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import blankProfile from "../img/Blank-profile.png";
import Modal from "./modal";
import UploadImage from "./UploadImage";
import Loading from "./page-load";
import pdf from "../icons/pdf.png";

// function Profile() {
const ProfileEdit = (props) => {
  const [academics, setAcademics] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [typeDni, setTypeDni] = useState([]);
  const [dataImg, setDataImg] = useState();
  const [user, setUser] = useState([]);

  const [imgProfile, setimgProfile] = useState(blankProfile);
  const [file, setFile] = useState("nada");

  const [modal, setModal] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [load, setLoad] = useState(true);
  const form = useRef(null);
  function getTypeDni() {
    axios
      .get("http://localhost:8080/unempleo/tipoDocumento")
      .then((res) => {
        setTypeDni(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAcademics() {
    axios
      .get("http://localhost:8080/unempleo/formacionAcademica")
      .then((res) => {
        setAcademics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPreferences() {
    axios
      .get("http://localhost:8080/unempleo/preferenciasEmpleo")
      .then((res) => {
        setPreferences(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getProfile(id) {
    axios
      .get("http://localhost:8080/unempleo/persona/" + id)
      .then((res) => {
        res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
        setUser(res.data);
        if (res.data.foto != "") {
          setimgProfile(res.data.foto);
        }
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getTypeDni();
    getAcademics();
    getPreferences();
    getProfile(3);
  }, []);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const handleShow = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    setLoad(true);
    let Image = dataImg.replace(/^data:image\/[a-z]+;base64,/, "");
    let temp = dataImg.split(";", 1);
    let TypeImage = temp[0].split(":", 2);

    let url = "http://localhost:8080/unempleo/GoogleDrive/uploadFile";
    let bodyJson = {
      folderId: "1sgAXa0wOTD3rdRwV5F-xFWVeQryoz4nw",
      type: TypeImage[1],
      name: makeid(10),
      base64Image: Image,
    };

    axios
      .post(url, bodyJson)
      .then((data) => {
        setimgProfile("https://drive.google.com/uc?id=" + data.data.id);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseSubmit = () => {
    setModalSubmit(false);
  };

  //Data from image
  const sendDataFromImageComponent = (data) => {
    setDataImg(data);
  };

  const submit = (e) => {
    e.preventDefault();
    setLoad(true);
    const url = "http://localhost:8080/unempleo/persona";

    const data = {
      pkPersona: 15,
      fkUsuario: 2,
      noIdentificacion: form.current.noIdentificacion.value,
      fkPreferenciasEmpleo: form.current.fkPreferenciasEmpleo.value,
      fkTipoDocumento: form.current.fkTipoDocumento.value,
      fkFormacionAcademica: form.current.fkFormacionAcademica.value,
      nombres: form.current.nombres.value,
      apellidos: form.current.apellidos.value,
      fechaNacimiento: form.current.fechaNacimiento.value,
      correo: form.current.correo.value,
      perfilProfesional: form.current.perfilProfesional.value,
      hojaDeVida: file,
      experienciaLaboral: form.current.experienciaLaboral.value,
      foto: imgProfile,
    };

    axios
      .put(url, data)
      .then((response) => {
        window.location = "/profile";
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UploadDocument = (e) => {
    let file = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      let filebase64 = fileReader.result
      
      filebase64 =  filebase64.replace(/^data:application\/[a-z]+;base64,/,"");
      let temp = fileReader.result.split(";", 1);
      let typePdf = temp[0].split(":", 2);

      let url = "http://localhost:8080/unempleo/GoogleDrive/uploadFile";
      let bodyJson = {
        folderId: "1F3uE2KGiGTRnXR8gzidSW88W13QnpvEa",
        type: typePdf[1],
        name: makeid(10),
        base64Image: filebase64,
      };
      setLoad(true);
      axios
        .post(url, bodyJson)
        .then((data) => {
          setFile("https://drive.google.com/uc?id=" + data.data.id);
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  return (
    <Loading loading={load}>
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            <img
              src={imgProfile}
              className="img-fluid img-thumbnail border border-dark rounded-circle mb-2 mt-2 position-relative"
              width="250vw"
              alt="..."
            />
            <div className="icon-edit">
              <Modal showModal={modalSubmit} handleClose={handleCloseSubmit}>
                Su Información ha sido guardada exitosamente
              </Modal>
              <Modal showModal={modal} handleClose={handleClose}>
                <UploadImage
                  dataFromImageComponent={sendDataFromImageComponent}
                ></UploadImage>
              </Modal>
              <a role="button" onClick={handleShow}>
                <i
                  className="fa fa-pencil-square-o fa-3x"
                  width="500vw"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
            <div>
              <p className="text-general-profile">Información basica</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* <div className="text-left">
            <p className="text-name-profile mt-5">
              {user.nombres + " " + user.apellidos + " "}
            </p>
          </div> */}
        </div>
      </div>
      <div className="row ml-5 mr-5 mt-2 mb-5 border border-dark">
        {/* <div className="w-100 text-right">
          <a name="" id="" href="/test" role="button">
            <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
          </a>
        </div> */}
        <div className="w-100">
          <div className="container form-personal-information">
            {/* <form ref="form" onSubmit={submit}> */}
            <form ref={form} onSubmit={submit}>
              <div className="form-group row">
                <label htmlFor="typeDni" className="col-sm-4 col-form-label">
                  Tipo Documento
                </label>

                <div className="col-sm-8">
                  <select
                    className="form-control mt-3"
                    id="typeDni"
                    name="fkTipoDocumento"
                    defaultValue={user.fkTipoDocumento}
                  >
                    {typeDni.map((td) => (
                      <option
                        value={td.pkTipoDocumento}
                        key={td.pkTipoDocumento}
                      >
                        {td.nombreTipoDocumento}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="date" className="col-sm-4 col-form-label">
                  Número documento
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    name="noIdentificacion"
                    maxlength="10"
                    defaultValue={user.noIdentificacion}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="dateBorn" className="col-sm-4 col-form-label">
                  Fecha Nacimiento
                </label>
                <div className="col-sm-8">
                  <input
                    type="date"
                    className="form-control"
                    id="dateBorn"
                    name="fechaNacimiento"
                    defaultValue={user.fechaNacimiento}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="names" className="col-sm-4 col-form-label">
                  Nombres
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="names"
                    name="nombres"
                    defaultValue={user.nombres}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lastnames" className="col-sm-4 col-form-label">
                  Apellidos
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="lastnames"
                    name="apellidos"
                    defaultValue={user.apellidos}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-4 col-form-label">
                  Correo Electronico
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="correo"
                    defaultValue={user.correo}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="hdv" className="col-sm-4 col-form-label">
                  Adjuntar hoja de vida
                </label>

                {file != "nada" ? (
                  <div className="col-sm-8 text-center">
                    <a href={file} target="_blank">
                      <img
                        src={pdf}
                        className="fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                        alt=""
                        width="100px"
                      />
                    </a>
                  </div>
                ) : (
                  <div className="col-sm-8">
                    <input
                      type="file"
                      className="form-control"
                      id="hdv"
                      name="file"
                      onChange={UploadDocument}
                      accept=".pdf"
                    />
                  </div>
                )}
              </div>
              <div className="form-group row">
                <label
                  htmlFor="preferences"
                  className="col-sm-4 col-form-label"
                >
                  Preferencia Empleo
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    id="prefenrences"
                    name="fkPreferenciasEmpleo"
                    defaultValue={user.fkPreferenciasEmpleo}
                  >
                    {preferences.map((p) =>
                      p.pkPreferenciasEmpleo === user.fkPreferenciasEmpleo ? (
                        <option
                          value={p.pkPreferenciasEmpleo}
                          key={p.pkPreferenciasEmpleo}
                          selected
                        >
                          {p.situacionActual}
                        </option>
                      ) : (
                        <option
                          value={p.pkPreferenciasEmpleo}
                          key={p.pkPreferenciasEmpleo}
                        >
                          {p.situacionActual}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="level-academic"
                  className="col-sm-4 col-form-label"
                >
                  Formación Academica
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    id="level-academic"
                    name="fkFormacionAcademica"
                    defaultValue={user.fkFormacionAcademica}
                  >
                    {academics.map((a) =>
                      a.pkFormacionAcademica === user.fkFormacionAcademica ? (
                        <option
                          value={a.pkFormacionAcademica}
                          key={a.pkFormacionAcademica}
                          selected
                        >
                          {a.nombreFormacion}
                        </option>
                      ) : (
                        <option
                          value={a.pkFormacionAcademica}
                          key={a.pkFormacionAcademica}
                        >
                          {a.nombreFormacion}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label htmlFor="experience" className="col-sm-4 col-form-label">
                  Experiencia laboral
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  id="experience"
                  rows="5"
                  name="experienciaLaboral"
                  defaultValue={user.experienciaLaboral}
                ></textarea>
                {/* <a name="" id="" href="/test" role="button">
                  <i
                    className="fa fa-pencil-square-o fa-2x"
                    width="500vw"
                    aria-hidden="true"
                  ></i>
                </a> */}
              </div>
              <div className="form-group form-group-textarea-custom">
                <label
                  htmlFor="profile-resumen"
                  className="col-sm-4 col-form-label"
                >
                  Perfil laboral
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  id="profile-resumen"
                  rows="5"
                  name="perfilProfesional"
                  defaultValue={user.perfilProfesional}
                ></textarea>
                {/* <a name="" id="" href="/test" role="button">
                  <i
                    className="fa fa-pencil-square-o fa-2x"
                    width="500vw"
                    aria-hidden="true"
                  ></i>
                </a> */}
              </div>
              <div className="row">
                <div className="w-100 text-right mr-5 mb-2">
                  <a
                    name=""
                    id=""
                    className="btn btn-primary rounded button-red-custom-profile"
                    href="/profile"
                    role="button"
                  >
                    Cancelar
                  </a>

                  <button
                    className="btn btn-primary rounded button-green-custom-profile ml-5"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="w-100 text-right mr-5 mb-2">
          <a
            name=""
            id=""
            className="btn btn-primary rounded button-publish-ofert"
            href="/test"
            role="button"
          >
            Publicar oferta
          </a>
        </div>
      </div>
    </Loading>
  );
};

export default ProfileEdit;
