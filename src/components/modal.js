import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";

export default function Modal({ show, onClose, children }) {
  const [isBrowser, setiSBrowser] = useState(false);

  useEffect(() => {
    setiSBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}></div>
        <div className={styles.body}>{children}</div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary rounded button-green-custom-profile mt-5"
            onClick={handleClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
