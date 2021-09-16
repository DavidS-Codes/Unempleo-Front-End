  
import Link from "next/link";

const LayoutUserLogged = ({children}) => {
  return (
    <div className="row w-100 h-auto">
        <div className="col-md-2 section-left-simple text-center position-static">
            <button className="btn btn-outline-secondary m-2">Ver ofertas aplicadas</button>
            <button className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"> <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</button>
        </div>
        <div className="col-md-10 h-100">
            <div className="m-5  border border-dark">
                {children}
            </div>
           
        </div>
    </div>
    );
};

export default LayoutUserLogged;