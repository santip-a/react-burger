import React,  {FC, ReactNode} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";


type TModal = {
  onClose: () => void
  children: ReactNode
}


const Modal: FC<TModal> = ({ onClose, children }) => {

  React.useEffect(() => {
    const pressEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape')
        onClose();
    }

    document.addEventListener('keydown', pressEsc);
    return () => document.removeEventListener('keydown', pressEsc);

  }, [])

  return ReactDOM.createPortal(
    (<>
      <div className={modalStyles.window}>
        <button className={`${modalStyles.buttonClose} mt-15 mr-10`}  >
          <CloseIcon type="secondary" onClick={onClose} />
        </button>
        {children}
      </div>
      <ModalOverlay onCloseOverlay={onClose} />
    </>), document.getElementById("modal")!
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;