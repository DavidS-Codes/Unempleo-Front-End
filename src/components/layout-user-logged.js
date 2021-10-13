import React from "react";
import Navbar from "./header";

class LayoutUserLogged extends React.Component {
  constructor() {
    super();
    this.state = {
      offers:   false,
    };
  }
  componentDidMount() {
    let url = window.location.pathname;
    if (url === "/offers") {
      this.setState = {
        offers: true,
      };
    } else{
      this.setState = {
        offers: false,
      };
    } 
  }

// const LayoutUserLogged = ({ children }) => {
//   const router = useRouter();
  render(){
    return (
      <>
      <Navbar logged={true} />
      <div className="row w-100 h-auto">
        {this.state.offers ? (
          <div className="col-md-2 section-left-simple text-center position-static">
            <button className="btn btn-outline-secondary m-2 p-3">
              Consultar ofertas aplicadas
            </button>
            <button className="btn btn-outline-secondary m-2 p-3">
              Consultar candidatos por oferta{" "}
            </button>
            <button className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom">
              {" "}
              <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="col-md-2 section-left-simple text-center position-static">
            <button className="btn btn-outline-secondary m-2">
              Ver ofertas aplicadas
            </button>
            <button className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom">
              {" "}
              <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión
            </button>
          </div>
        )}

        <div className="col-md-10 h-100">
          <div className="m-5  border border-dark">{this.props.children}</div>
        </div>
      </div>
      </>
    );
  }
};

export default LayoutUserLogged;
