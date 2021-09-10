  
import Link from "next/link";

const Register = () => {
  return (
    <div className="row register-section ">
        <div className="col-md-6">
          <img src="register.jpg" className="img-fluid h-100" alt=""/>
        </div>
        <div className="col-md-6">
        <div className="container h-100 w-100 form-register">
            <div className="row h-100 align-items-center justify-content-center"> 
              <form>
                <div className="form-group">
                  <label for="">Correo electronico</label>
                  <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                  <label for="">Contraseña</label>
                  <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                  <label for="">Confirmar contraseña</label>
                  <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                </div>
                <div className="form-group text-center">
                  <a name="" id="" class="btn btn-primary rounded" href="#" role="button">Aceptar</a>
                </div>
                <div className="form-group">
                  <helpId>¿Tienes cuenta?  </helpId>
                  <Link href="/login"> 
                    <helpId className="link-register">Inicia sesión</helpId>
                  </Link>
                </div>
                </form>
            </div>
          </div>
        <img src="register-circulos.png" className="img-fluid h-100 img-register-circles" alt=""/>
          
        </div>
    </div>
  );
};

export default Register;