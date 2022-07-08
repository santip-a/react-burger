import React from 'react';
import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';;

const ModalOverlay = ({onClick}) => {

  
    return (
        <div className={modalOverlay.overlay} onClick={onClick}/>
    )
}

// ModalOverlay.propTypes = {
//     onClick: PropTypes.func.isRequired
// }

export default ModalOverlay;