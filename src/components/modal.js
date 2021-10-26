import React from "react";
import styles from "../Modal.module.css";

class ModalComponent extends React.Component {
  render() {
    const modal = this.props.showModal;
    return (
      <>
        {modal ? (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <div className={styles.header}></div>
              <div className={styles.body}>{this.props.children}</div>
              <div className="text-center">
                {this.props.buttonCancelButton ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary rounded button-red-custom-profile mt-5 mr-5"
                      onClick={this.props.handleCloseCancel}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary rounded button-green-custom-profile mt-5"
                      onClick={this.props.handleClose}
                    >
                      Aceptar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary rounded button-green-custom-profile mt-5"
                    onClick={this.props.handleClose}
                  >
                    Aceptar
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default ModalComponent;
