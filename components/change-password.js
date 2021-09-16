  
import Link from "next/link";

const ChangePassword = () => {
  return (
    <>
        <div className="row m-5 text-center">
            <div className="w-100 text-center">
                <label className="text-change-password">Cambiar contraseña</label>
            </div>
            <div className="w-100">
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="typeDni" className="col-sm-3 col-form-label">Usuario</label>
                            <div className="col-sm-9 mt-4">
                            <input type="text" className="form-control" id="typeDni"  />
                            </div>
                        </div>
                        <div className="form-group row mt-5">
                            <label htmlFor="date" className="col-sm-5 col-form-label">Contraseña actual</label>
                            <div className="col-sm-7 mt-4">
                            <input type="text" className="form-control" id="dni" />
                            </div>
                        </div>
                        <div className="form-group row mt-5">
                            <label htmlFor="date" className="col-sm-5 col-form-label">Contraseña nueva</label>
                            <div className="col-sm-7 mt-4">
                            <input type="text" className="form-control" id="dni" />
                            </div>
                        </div>
                        <div className="form-group row mt-5">
                            <label htmlFor="date" className="col-sm-5 col-form-label">Confirmar contraseña</label>
                            <div className="col-sm-7 mt-4">
                            <input type="text" className="form-control" id="dni" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="w-100 text-center mr-5 mb-2 mt-5">
                                <a name="" id="" className="btn btn-primary rounded button-red-custom-profile" href="#" role="button">Cancelar</a>
                                <a name="" id="" className="btn btn-primary rounded button-green-custom-profile ml-5" href="#" role="button">Guardar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default ChangePassword;