function Profile({ preferences }) {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            <img
              src="Blank-profile.png"
              className="img-fluid img-thumbnail border border-dark rounded-circle mb-2 mt-2 position-relative"
              width="250vw"
              alt="..."
            />
            <div className="icon-edit">
              <a name="" id="" href="#" role="button">
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
          <div className="text-left">
            <p className="text-name-profile mt-5">
              Raúl Antonio Gomez Rodriguez{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="row ml-5 mr-5 mt-2 mb-5 border border-dark">
        <div className="w-100 text-right">
          <a name="" id="" href="#" role="button">
            <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
          </a>
        </div>
        <div className="w-100">
          <div className="container form-personal-information">
            <form>
              <div className="form-group row">
                <label htmlFor="typeDni" className="col-sm-4 col-form-label">
                  Tipo Documento
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="typeDni" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="date" className="col-sm-4 col-form-label">
                  Número documento
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="dni" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="dateBorn" className="col-sm-4 col-form-label">
                  Fecha Nacimiento
                </label>
                <div className="col-sm-8">
                  <input type="date" className="form-control" id="dateBorn" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="names" className="col-sm-4 col-form-label">
                  Nombres
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="names" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lastnames" className="col-sm-4 col-form-label">
                  Apellidos
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="lastnames" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-4 col-form-label">
                  Correo Electronico
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="email" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="hdv" className="col-sm-4 col-form-label">
                  Adjuntar hoja de vida
                </label>
                <div className="col-sm-8">
                  <input type="file" className="form-control" id="hdv" />
                </div>
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
                    name="preferences"
                    id="prefenrences"
                    multiple
                  >
                    <option value="">  {preferences}</option>
                    {/* {preferences.map((d) => (
                      <option>{d.situacionActual}</option>
                    ))} */}
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
                    name="level-academic"
                    id="level-academic"
                    multiple
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
              <div className="form-group form-group-textarea-custom">
                <label htmlFor="experience" className="col-sm-4 col-form-label">
                  Experiencia laboral
                </label>
                <textarea
                  className="form-control custom-text-area-profile"
                  name="experience"
                  id="experience"
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
              <div className="form-group form-group-textarea-custom">
                <label
                  htmlFor="profile-resumen"
                  className="col-sm-4 col-form-label"
                >
                  Perfil laboral
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
                    Guardar
                  </a>
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
            href="#"
            role="button"
          >
            Publicar oferta
          </a>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
    const res = await fetch('https://api.github.com/repos/developit/preact')
    const json = await res.json()
  
    return {
      props: {
        preferences: json,
      },
    }
  }
export default Profile;
