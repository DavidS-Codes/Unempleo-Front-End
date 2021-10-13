import React from "react";
import { Route } from "react-router-dom";
import logo from "../img/logo.png";

// export class Navbar extends Component {
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      cssLogin: "nav-link header-link",
      cssRegister: "nav-link header-link",
    };
  }
  componentDidMount() {
    let url = window.location.pathname;
    
    if (url === "/register") {
      console.log("aca!!!");
      this.setState = {
        cssRegister: "nav-link header-link bottom",
      };
    } else if (url === "/login") {
      this.setState = {
        cssLogin: "nav-link header-link bottom",
      };
    }
  }

  render() {
    return (
      <>
        {this.props.logged ? (
          <nav className="navbar navbar-expand-lg p-0 navbar-logged">
            <div className="container-fluid">
              <a href="/" className="navbar-brand">
                <img src={logo} className="img-fluid" alt="" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto ">
                  <li className="nav-item ml-2 mt-1">Buscar por</li>

                  <li className="nav-item ml-2 ">
                    <select
                      className="form-control search-select"
                      name="search"
                      id="search"
                    >
                      <option default> Seleccione</option>
                      <option>Ofertas</option>
                      <option>Personas</option>
                    </select>
                  </li>
                  <li className="nav-item ml-2">
                    <div className="input-group search-input ">
                      <span className="input-group-append">
                        <button
                          className="btn btn-outline-secondary border-right-0 btn-search-custom"
                          type="button"
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </span>
                      <input
                        className="form-control py-2 border-left-0 input-search-custom"
                        id="example-search-input"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          
          <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid">
              <Route path="/" className="navbar-brand">
                <img src={logo} className="img-fluid" alt="" />
              </Route>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a name="" id="" className={this.state.cssRegister} href="/register" role="button">Registrarse</a>
                    {/* <Route path="/register" className={this.state.cssRegister}>
                      
                    </Route> */}
                  </li>
                  <li className="nav-item">
                  <a name="" id="" className={this.state.cssRegister} href="/login" role="button">Iniciar Sesión</a>
                    {/* <Route path="/login" className={this.state.cssLogin}>
                      
                    </Route> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </>
    );
  }
}

export default Navbar;

// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const Navbar = ({ logged }) => {
//   const router = useRouter();
//   const [cssLogin, setCssLogin] = useState("nav-link header-link");
//   const [cssRegister, setRegister] = useState("nav-link header-link");

//   useEffect(() => {
//     if (router.pathname === "/register") {
//       setRegister("nav-link header-link bottom");
//     } else if (router.pathname === "/login") {
//       setCssLogin("nav-link header-link bottom");
//     }
//   }, []);

//   return (

//   );
// };

// Navbar.proptypes = {
//   logged: PropTypes.bool,
// };

// export default Navbar;
