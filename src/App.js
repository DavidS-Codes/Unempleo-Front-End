import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
// import ChangePasswordEmail from './components/change-password-email';
import Layout from './components/layout';
import LayoutUserLogged from './components/layout-user-logged';
import Login from './components/login';
import Register from './components/register';
import ChangePassword from './components/change-password';
import ChangePasswordEmail from './components/change-password-email';
import CreateOffer from './components/create-offer';
import Offers from './components/offers';
import ViewOffer from './components/view-offer';
import Profile from './components/profile';
import EmailForgotPassword from './components/email-forgot-password';

function App() {
  return (
      <Router>
        <Route exact path="/" > 
          <Layout>
          <Login />
          </Layout>
        </Route>
        <Route path="/login" > 
          <Layout> 
            <Login />
          </Layout>
        </Route>
        <Route path="/register" > 
          <Layout> 
            <Register />
          </Layout>
        </Route>
        <Route path="/changePassword" > 
          <LayoutUserLogged> 
            <ChangePassword />
          </LayoutUserLogged>
        </Route>
        <Route path="/ChangePasswordEmail" > 
          <Layout> 
            <ChangePasswordEmail />
          </Layout>
        </Route>
        <Route path="/createOffer" > 
          <LayoutUserLogged> 
            <CreateOffer />
          </LayoutUserLogged>
        </Route>
        <Route path="/offers" > 
          <LayoutUserLogged> 
            <Offers />
          </LayoutUserLogged>
        </Route>
        <Route path="/profile" > 
          <LayoutUserLogged> 
            <Profile />
          </LayoutUserLogged>
        </Route>
        <Route path="/offer/:id" > 
          <LayoutUserLogged> 
              <ViewOffer />
          </LayoutUserLogged>
        </Route>
        <Route path="/layoutEmail" > 
        <EmailForgotPassword />
        </Route>
        
      </Router>
  );
}

export default App;
