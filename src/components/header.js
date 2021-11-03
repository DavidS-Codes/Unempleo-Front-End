import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
// export class Navbar extends Component {
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      cssLogin: "nav-link header-link",
      cssRegister: "nav-link header-link",
      value: "/offers?filter=todo"
    };
    this.handleDataChange = this.handleDataChange.bind(this);
  }


  handleDataChange(event){
    this.setState({value: event.target.value});
  
  }
 
  componentDidMount() {
    let url = window.location.pathname;

    if (url === "/register") {
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
              <Link to="/profile" className="navbar-brand" replace>
                <img src={logo} className="img-fluid" alt="" />
              </Link>
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
                      value={this.state.value} 
                      onChange={this.handleDataChange}
                    >
                      <option value="/offers?filter=offers">Ofertas</option>
                      <option value="/offers?filter=people">Personas</option>
                    </select>
                  </li>
                  <li className="nav-item ml-2">
                    <div className="input-group search-input ">
                      <span className="input-group-append">
                        <Link
                          to={this.state.value}
                          className="btn btn-outline-secondary border-right-0 btn-search-custom"
                          onClick={() =>   window.location.reload(false)}
                          replace
                        >
                          <i className="fa fa-search"></i>
                        </Link>
                      </span>
                      <input
                        className="form-control py-2 border-left-0 input-search-custom"
                        id="example-search-input"
                        placeholder="Digite lo que desee buscar..."
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
              <Link to="/login" className="navbar-brand" replace>
                <img src={logo} className="img-fluid" alt="" />
              </Link>

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
                    <Link
                      to="/register"
                      className={this.state.cssRegister}
                      replace
                    >
                      {" "}
                      Registrarse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className={this.state.cssLogin} replace>
                      {" "}
                      Iniciar Sesión
                    </Link>
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
