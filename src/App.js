import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// import ChangePasswordEmail from './components/change-password-email';
import Layout from "./components/layout";
import LayoutUserLogged from "./components/layout-user-logged";
import Login from "./components/login";
import Register from "./components/register";
import ChangePassword from "./components/change-password";
import ChangePasswordEmail from "./components/change-password-email";
import CreateOffer from "./components/create-offer";
import Offers from "./components/offers";
import EditOffer from "./components/edit-offer";
import OffersApplied from "./components/offers-applied";
import ViewOffer from "./components/view-offer";
import OffersOwner from "./components/candidate-offers";
import OffersCandidates from "./components/candidates-by-offers"
import Profile from "./components/profile";
import AdminReporter from "./components/admin";
import EmailForgotPassword from "./components/email-forgot-password";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Layout>
          <Login />
        </Layout>
      </Route>
      <Route path="/login">
        <Layout>
          <Login />
        </Layout>
      </Route>
      <Route path="/register">
        <Layout>
          <Register />
        </Layout>
      </Route>
      <Route path="/changePassword">
        <LayoutUserLogged>
          <ChangePassword />
        </LayoutUserLogged>
      </Route>
      <Route path="/ChangePasswordEmail">
        <Layout>
          <ChangePasswordEmail />
        </Layout>
      </Route>
      <Route path="/createOffer">
        <LayoutUserLogged>
          <CreateOffer />
        </LayoutUserLogged>
      </Route>
      <Route path="/offers">
        <LayoutUserLogged>
          <Offers />
        </LayoutUserLogged>
      </Route>
      <Route path="/profile">
        <LayoutUserLogged>
          <Profile />
        </LayoutUserLogged>
      </Route>
      <Route path="/offer/:id">
        <LayoutUserLogged>
          <ViewOffer />
        </LayoutUserLogged>
      </Route>
      <Route path="/editOffer/:id">
        <LayoutUserLogged>
          <EditOffer />
        </LayoutUserLogged>
      </Route>
      <Route path="/offersApplied">
        <LayoutUserLogged>
          <OffersApplied />
        </LayoutUserLogged>
      </Route>
      <Route path="/offersOwner">
        <LayoutUserLogged>
          <OffersOwner />
        </LayoutUserLogged>
      </Route>
      <Route path="/candidates-by-offer/:id">
        <LayoutUserLogged>
          <OffersCandidates />
        </LayoutUserLogged>
      </Route>
      <Route path="/adminReporter">
        <AdminReporter />
      </Route>
      <Route path="/layoutEmail">
        <EmailForgotPassword />
      </Route>
    </Router>
  );
}

export default App;
