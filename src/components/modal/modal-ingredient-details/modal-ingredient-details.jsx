import Modal from "../../modal/modal";
import ingridientDetails from './modal-ingredient-details.module.css';
import PropTypes from 'prop-types';
import IngridientInfo from './ingridient-Info/ingridient-Info';
import {ingredientForPropTypes} from '../../../constants/constants';

const IngridientDetails = ({ open, onClose, elem }) => {
    return (
        <Modal open={open} onClose={() => onClose(false)}>
            <h1 className={`${ingridientDetails.title} text text_type_main-large pl-10 pr-10 pt-10 `}>Детали ингридиента</h1>
            <div className={`${ingridientDetails.window} pl-10 pr-10 pt-5 pb-10`}>
                <img src={elem.image_large} alt={elem.name} className="mb-1 " />
                <h2 className={`${ingridientDetails.ingridient} text text_type_main-medium mb-8 mt-5  `}>{elem.name}</h2>
                <IngridientInfo info={elem}/>
            </div>
        </Modal>
    );
}

IngridientDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  elem: PropTypes.shape(ingredientForPropTypes).isRequired
}

export default IngridientDetails;