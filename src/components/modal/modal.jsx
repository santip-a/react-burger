import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";



const Modal = ({open, onClose, children }) => {

  const [modalWindow, setModalWindow] = React.useState(null);

  React.useEffect(() => {
    const modalElement = document.createElement('div');
    modalElement.setAttribute('id', 'modal-window');
    document.body.appendChild(modalElement); 
    setModalWindow(modalElement);

  },[])

  React.useEffect(() => {
    const pressEsc = (e) => {
        if (e.key === 'Escape')
          onClose();
    }

    document.addEventListener('keydown', pressEsc);
    return () => document.removeEventListener('keydown', pressEsc);

}, [])

  if (!open) return null;
  return (
    ReactDOM.createPortal(
      (
          <>
              <ModalOverlay onClick={onClose} />
              <div className={modalStyles.window} >
                  <button className={`${modalStyles.buttonClose} mt-10 mr-10`} onClick={onClose}>
                      <CloseIcon type='primary' />
                  </button>
                  {children}
              </div>
          </>
      ), modalWindow)
  )

}
// ModalOverlay.propTypes = {
//     onClick: PropTypes.func.isRequired
// }

export default Modal;