import React from "react";
import styles  from "../email.module.css";
class EmailForgotPassword extends React.Component {
  render() {
    return (
    
      <div>
        <div className={styles.first}>
        <img src='https://drive.google.com/uc?id=1RO5uiDM6ESaRI2nOdptNJy_v1nMWtXW3' alt='Google' className={styles.logo} /> 
        <br/>
        <h1>Ha solicitado reestablecer la contraseña</h1>
        <br/>
        <p>Correo</p>
        <br/>
        <p>Este proceso tiene valides por 24 horas. Si no realizo esta solicitud por favor haga 
caso omiso a este correo, de lo contrario haga clic en Reestablecer Contraseña</p>
<br/>
        <a href="https://unempleo.herokuapp.com/login" className={styles.buttonCustom}> Reestablecer contraseña</a>
        <br/>
        </div>
        
      </div>
    
  );
  }
 
};

export default EmailForgotPassword;
