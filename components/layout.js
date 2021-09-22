import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./header";
import PropTypes from "prop-types";
import NProgress from "nprogress";
import nProgress from "nprogress";
import cookieCutter from 'cookie-cutter'

const Layout = ({ children, userlogged}) => {
  const router = useRouter();

  useEffect(() => {
    
    
    const handleRouteChange = (url) => {
      NProgress.start();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    router.events.on("routeChangeComplete", () => NProgress.done());

    router.events.on("routeChangeError", () => nProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange); 
    };
  }, []);

//  Create cookie with time
//   var cookie = require('cookie-cutter');
//   var times = parseInt(cookie.get('times'), 10) || 0;
//   cookie.set('times', times + 1);
  // function checkToken()  {
  //   if (cookieCutter.get('token')){
  //     userlogged = true;
  //   }else{
  //     userlogged = false;
  //   }
  //   return userlogged;

  // };

  return (
    <div className="divMain" >
      <Navbar  logged={false}/>
      {
        userlogged ?(
          
          <main className="container h-100 main-usernotlogged">
          {children}
        </main>
        ):(
          <main className="container h-100 main-userlogged">
            {children}
          </main>
        )
      }
      
    </div>
  );
};

Layout.proptypes = {
  children: PropTypes.node,
  userlogged: PropTypes.bool,
};

export default Layout;