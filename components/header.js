  
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";


const Navbar = ({logged}) => {
  const router = useRouter()
  const [cssLogin,setCssLogin] =  useState("nav-link header-link");
  const [cssRegister,setRegister] = useState("nav-link header-link");
 
  useEffect(() => {
    if (router.pathname === "/register"){
      setRegister("nav-link header-link bottom")
    }else if (router.pathname === "/login"){
      setCssLogin("nav-link header-link bottom")
    }

}, []);

console.log(logged)
 
 
  return (
    <nav className="navbar navbar-expand-lg p-0">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <img src="logo.png" className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""/>
          </a>
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
          {
            logged ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ml-2 mt-1">
                Buscar por
                </li>
                
                <li className="nav-item ml-2 ">
                    <select className="form-control search-select" name="search" id="search">
                      <option default> Seleccione</option>
                      <option>Ofertas</option>
                      <option>Personas</option>
                    </select>
                </li>
                <li className="nav-item ml-2">
                <div className="input-group search-input ">
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary border-right-0" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                  </span>
                  <input className="form-control py-2 border-left-0 border border-secondary"  id="example-search-input" />
                 
                </div>
                </li>
            </ul>
            ):(
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link href="/register">
                    <a className={cssRegister} >
                      Registrarse
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login">
                    <a className={cssLogin}>
                    Iniciar Sesión 
                    </a>
                  </Link>
                </li>
            </ul>
            )
          }
         
        </div>
      </div>
    </nav>
  );
};


Navbar.proptypes = {
  logged: PropTypes.bool,
};


export default Navbar;