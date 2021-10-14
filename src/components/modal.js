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
                <button
                  type="button"
                  className="btn btn-primary rounded button-green-custom-profile mt-5"
                  onClick={this.props.handleClose}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>

      // < className={styles.overlay}>
      //   <Modal
      //     className={styles.modal}
      //     show={this.props.showModal}
      //     onHide={this.props.handleClose}
      //   >
      //     <Modal.Header closeButton className={styles.header}>
      //       <Modal.Title>Modal heading</Modal.Title>
      //     </Modal.Header>
      //     <Modal.Body className={styles.body}>
      //       Woohoo, you're reading this text in a modal!
      //     </Modal.Body>
      //     <Modal.Footer>
      //       {/* <div className="text-center">
      //         <button
      //           type="button"
      //           className="btn btn-primary rounded button-green-custom-profile mt-5"
      //           onClick={this.props.handleClose}
      //         >
      //           Aceptar
      //         </button>
      //       </div> */}
      //     </Modal.Footer>
      //   </Modal>
      // </>
    );
  }
}

export default ModalComponent;
