// import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Navbar from "./header";
import { Redirect } from "react-router";
// import Cookies from "js-cookie";

const LayoutUserLogged = (props) => {
  const {redirect, setRedirect} = useState(false);
  let offers = false

  const logOut = () => {
    // Cookies.remove("token");
    setRedirect(false);
  }

  function validatePath(){
    let url = window.location.pathname;
    console.log(url)
    if (url === "/offers") {
      offers = true;
      // getOffers();
    } 
  }
  // call function
  validatePath();

  // function getOffers(){
  //   let url = 
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       res.data.fechaNacimiento = res.data.fechaNacimiento.substr(0, 10);
  //       setUser(res.data);
  //       if (res.data.foto !== "") {
  //         setimgProfile(res.data.foto);
  //       }
  //       setLoad(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

 
  
  return (    
    
    < >
      {redirect ? (
        <Redirect to="/login" />
      ) : (
        <>
          <Navbar logged={true} />
          <div className="row w-100 h-auto">
            {offers ? (
              <div className="col-md-2 section-left-simple text-center position-static">
                <button className="btn btn-outline-secondary m-2 p-3">
                  Consultar ofertas aplicadas
                </button>
                <button className="btn btn-outline-secondary m-2 p-3">
                  Consultar candidatos por oferta{" "}
                </button>
                <button
                  className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"
                  onClick={logOut}
                >
                  {" "}
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar
                  sesión
                </button>
              </div>
            ) : (
              <div className="col-md-2 section-left-simple text-center position-static">
                <button className="btn btn-outline-secondary m-2">
                  Ver ofertas aplicadas
                </button>
                <button
                  className="btn btn-outline-secondary ml-5 mb-2 fixed-bottom"
                  onClick={logOut}
                >
                  {" "}
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar
                  sesión
                </button>
              </div>
            )}

            <div className="col-md-10 h-100">
              <div className="m-5  border border-dark">
                {props.children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LayoutUserLogged;
