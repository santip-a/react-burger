import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';;

const ModalOverlay = ({onCloseOverlay}) => {  
    return (
        <div className={modalOverlay.overlay} onClick={onCloseOverlay}/>
    )
}

ModalOverlay.propTypes = {
    onCloseOverlay: PropTypes.func.isRequired
}

export default ModalOverlay;