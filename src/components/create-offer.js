import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import blankProfile from "../img/Blank-profile.png";
import Modal from "./modal";
import UploadImage from "./UploadImage";
import Loading from "./page-load";

// export default class CreateOffer extends Component {
//   render() {
const CreateOffer = (props) => {
  const [imgProfile, setimgProfile] = useState(blankProfile);
  const [modalImage, setModalImage] = useState(false);

  // Modal to create Area
  const [modalArea, setModalArea] = useState(false);
  const formArea = useRef(null);

  // Modal to create Empresa
  const [modalEmpresa, setModalEmpresa] = useState(false);
  const formEmpresa = useRef(null);

  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeTexto, setModalMensajeTexto] = useState("");

  const [load, setLoad] = useState(true);
  const [dataImg, setDataImg] = useState();

  const [dataArea, setDataArea] = useState([])
  const [dataEmpresa, setDataEmpresa] = useState([]);

  const [user, setUser] = useState([]);
  const formOferta = useRef(null);
  const formNombreOferta = useRef(null);

  const handleShowModalMensaje = () => {
    setModalMensaje(true);
  };

  const handleCloseModalMensaje = () => {
    setModalMensaje(false);
    window.location = "/profile";
  };

  //crear Id automaticamente
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

  //Modal image
  const handleCloseModalImage = () => {
    setModalImage(false);
    setLoad(true);
    let Image = dataImg.replace(/^data:image\/[a-z]+;base64,/, "");
    let temp = dataImg.split(";", 1);
    let TypeImage = temp[0].split(":", 2);
  
    let url = "http://localhost:8080/unempleo/GoogleDrive/uploadFile";
    let bodyJson = {
      folderId: "1JB2UAsUJ3hRkkqBjspth01G7EKcpK4iO",
      type: TypeImage[1],
      name: makeid(10),
      base64Image: Image,
    };
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, bodyJson,config)
      .then((data) => {
        setimgProfile("https://drive.google.com/uc?id=" + data.data.id);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShow = () => {
    setModalImage(true);
  };

  //Modal Area
  const handleCloseModalArea = () => {
    setLoad(true);
    let nombreArea = formArea.current.nombreArea.value;

    if (nombreArea !== "") {
      
      const url = "http://localhost:8080/unempleo/area";
      const data = {
        nombreArea: nombreArea,
      };
      const token = Cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(url, data, config)
        .then((response) => {
          datosArea(config);
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setModalArea(false);
    setLoad(false);
  };

  const handleShowArea = () => {
    setModalArea(true);
  };

  //Modal Empresa
  const handleCloseModalEmpresa = () => {
    setLoad(true);
    let nombreEmpresa = formEmpresa.current.nombreEmpresa.value;
    if (nombreEmpresa !== "") {
      const url = "http://localhost:8080/unempleo/empresa";
      const data = {
        nombreEmpresa: nombreEmpresa,
      };
      const token = Cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(url, data, config)
        .then((response) => {
         
          datosEmpresa(config)
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setModalEmpresa(false);
    setLoad(false);
  };

  const handleShowEmpresa = () => {
    setModalEmpresa(true);
  };
  //Data from image
  const sendDataFromImageComponent = (data) => {
    setDataImg(data);
  };

  function datosArea(config){
    axios
    .get("http://localhost:8080/unempleo/area/", config)
    .then((res) => {
      setDataArea(res.data)
      setLoad(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function datosEmpresa(config){
    axios
    .get("http://localhost:8080/unempleo/empresa/",config)
    .then((res) => {
      setDataEmpresa(res.data)
      setLoad(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function getProfile(id, config) {
    axios
      .get("http://localhost:8080/unempleo/persona/" + id, config)
      .then((res) => {
        res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
        setUser(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    datosArea(config);
    datosEmpresa(config)
    setLoad(false);
    getProfile(1,config);
  }, []);

  //function to submit offer
  const submit = (e) => {
    e.preventDefault();
    setLoad(true);
    const url = "http://localhost:8080/unempleo/ofertas";

    const data = {
      descripcionOferta: formOferta.current.description.value,
      fkEmpresa: formOferta.current.company.value,
      fkArea: formOferta.current.area.value,
      fkPersonaCreador: user.pkPersona,
      nombreOferta: formNombreOferta.current.nombreOferta.value,
      imagenOferta: imgProfile,
    };
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, data,config)
      .then((response) => {
        setModalMensajeTexto("Los datos han sido guardados exitosamente");
        // setLoad(false);
      })
      .then(() => {
        handleShowModalMensaje();
        setLoad(false);
      })
      .catch((err) => {
        setModalMensajeTexto(
          "Ups..... ha surgido un problema, disculpanos las molestias, intentalo de nuevo mas tarde"
        );
        handleShowModalMensaje();
        setLoad(false);
      });
  };

  return (
    <Loading loading={load}>
      <Modal showModal={modalMensaje} handleClose={handleCloseModalMensaje}>
        {modalMensajeTexto}
      </Modal>
      <Modal showModal={modalImage} handleClose={handleCloseModalImage}>
        <UploadImage
          dataFromImageComponent={sendDataFromImageComponent}
        ></UploadImage>
      </Modal>
      <Modal showModal={modalArea} handleClose={handleCloseModalArea}>
        <form ref={formArea}>
          <div className="form-group">
            <label htmlFor="nombreArea" className="font-weight-bold">
              A continuación digite el área que desea agregar
            </label>
            <input
              type="text"
              className="form-control"
              name="nombreArea"
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
            <small className="form-text text-muted">
              Si desea agregar la nueva área, seleccione aceptar, de lo
              contrario seleccione cancelar
            </small>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={handleCloseModalArea}
              className="btn btn-danger btn-lg "
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <Modal showModal={modalEmpresa} handleClose={handleCloseModalEmpresa}>
        <form ref={formEmpresa}>
          <div className="form-group">
            <label htmlFor="nombreEmpresa" className="font-weight-bold">
              A continuación digite la empresa que desea agregar
            </label>
            <input
              type="text"
              className="form-control"
              name="nombreEmpresa"
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
            <small className="form-text text-muted">
              Si desea agregar la nueva empresa, seleccione aceptar, de lo
              contrario seleccione cancelar
            </small>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={handleCloseModalEmpresa}
              className="btn btn-danger btn-lg "
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <div className="row border border-dark m-5">
        <div className="col-md-5">
          <div className="section-photo mt-5 ml-5 mb-3">
            <img
              src={imgProfile}
              className="border border-dark rounded-lg"
              alt=""
            />
            <button onClick={handleShow} type="button" className="btn-icon-custom">
              <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
            </button>
          </div>
          <div className="ml-5 mb-2">
            <b> Publicada por:</b> <u>{user.nombres + " " + user.apellidos}</u>
          </div>
        </div>
        <form ref={formNombreOferta}>
          <div className="col-md-5">
            <input
              type="text"
              className="name-offer"
              placeholder="Nombre de la oferta"
              name="nombreOferta"
            />
          </div>
        </form>
      </div>
      <div className="row border border-dark m-5">
        <div className="w-100">
          <div className="w-100 ml-2">
            <label className="col-form-label font-weight-bold">
              {" "}
              Detalles Oferta
            </label>
          </div>
          <div className="container form-personal-information">
            <form ref={formOferta} onSubmit={submit}>
              <div className="form-group row">
                <label htmlFor="area" className="col-sm-4 col-form-label">
                  Área
                </label>
                <div className="col-sm-4">
                  <select className="form-control" name="area" id="area">
                    {dataArea.map((area) => (
                      <option
                        value={area.pkArea}
                        key={area.pkArea}
                      >
                        {area.nombreArea}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-4">
                  <button
                    className="btn add-icon"
                    type="button"
                    onClick={handleShowArea}
                  ></button>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="company" className="col-sm-4 col-form-label">
                  Empresa
                </label>
                <div className="col-sm-4">
                  <select className="form-control" name="company" id="company">
                  {dataEmpresa.map((empresa) => (
                      <option
                        value={empresa.pkEmpresa}
                        key={empresa.pkEmpresa}
                      >
                        {empresa.nombreEmpresa}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-4">
                  <button
                    className="btn add-icon"
                    type="button"
                    onClick={handleShowEmpresa}
                  ></button>
                </div>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label
                  htmlFor="description"
                  className="col-sm-4 col-form-label"
                >
                  Descripción
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  name="description"
                  id="description"
                  rows="5"
                ></textarea>
                {/* <a name="" id="" href="#" role="button">
                  <i
                    className="fa fa-pencil-square-o fa-2x"
                    width="500vw"
                    aria-hidden="true"
                  ></i>
                </a> */}
              </div>
              <div className="row">
                <div className="w-100 text-right mr-5 mb-2">
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
                    Publicar
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

export default CreateOffer;
