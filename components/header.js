  
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
const Navbar = () => {
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/register">
                {/* <a className="nav-link header-link" aria-current="page" > */}
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
        </div>
      </div>
    </nav>
  );
};


export default Navbar;