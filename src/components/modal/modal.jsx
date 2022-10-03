import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const Modal = ({open, onClose, children }) => {

  React.useEffect(() => {
    const pressEsc = (e) => {
        if (e.key === 'Escape')
          onClose();
    }

    document.addEventListener('keydown', pressEsc);
    return () => document.removeEventListener('keydown', pressEsc);

  }, [])

  if (!open) return null;

  return ReactDOM.createPortal (
    ( <>
     <div className={modalStyles.window}>
       <button className={`${modalStyles.buttonClose} mt-15 mr-10`} onClick={onClose}>
         <CloseIcon />
       </button>
       {children}
     </div>
     <ModalOverlay onCloseOverlay={onClose}/>
     </>), document.getElementById("modal")
   )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;