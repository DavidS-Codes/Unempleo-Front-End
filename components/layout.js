import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./header";
import PropTypes from "prop-types";
import NProgress from "nprogress";
import nProgress from "nprogress";
import classNames from "classnames";

const Layout = ({ children}) => {
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

  return (
    <div className="divMain">
      <Navbar />
      <main className="container h-100">
        {children}
      </main>
    </div>
  );
};

Layout.proptypes = {
  children: PropTypes.node,
};

export default Layout;