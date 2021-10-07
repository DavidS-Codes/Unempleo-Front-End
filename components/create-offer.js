import Link from "next/link";

const CreateOffer = () => {
  return (
    <>
      <div className="row border border-dark m-5">
        <div className="col-md-5">
          <div className="section-photo mt-5 ml-5 mb-3">
            <img
              src="add-photo.png"
              className="border border-dark rounded-lg"
              alt=""
            />
            <a name="" id="" href="#" role="button">
              <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
            </a>
          </div>
          <div className="ml-5 mb-2">
            <b> Publicada por:</b> <u>Raúl Antonio Gomez Rodriguez</u>
          </div>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="name-offer"
            placeholder="Nombre de la oferta"
          />
        </div>
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
            <form>
              <div className="form-group row">
                <label htmlFor="area" className="col-sm-4 col-form-label">
                  Área
                </label>
                <div className="col-sm-4">
                  <select className="form-control" name="area" id="area">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <a
                    href="#"
                    className="btn add-icon"
                    role="button"
                    download
                  ></a>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="company" className="col-sm-4 col-form-label">
                  Empresa
                </label>
                <div className="col-sm-4">
                  <select className="form-control" name="company" id="company">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <a
                    href="#"
                    className="btn add-icon"
                    role="button"
                    download
                  ></a>
                </div>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label
                  htmlFor="profile-resumen"
                  className="col-sm-4 col-form-label"
                >
                  Descripción
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  name="profile-resumen"
                  id="profile-resumen"
                  rows="5"
                ></textarea>
                <a name="" id="" href="#" role="button">
                  <i
                    className="fa fa-pencil-square-o fa-2x"
                    width="500vw"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
              <div className="row">
                <div className="w-100 text-right mr-5 mb-2">
                  <a
                    name=""
                    id=""
                    className="btn btn-primary rounded button-red-custom-profile"
                    href="#"
                    role="button"
                  >
                    Cancelar
                  </a>
                  <a
                    name=""
                    id=""
                    className="btn btn-primary rounded button-green-custom-profile ml-5"
                    href="#"
                    role="button"
                  >
                    Publicar
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOffer;
