import ingridientInfo from  './ingridient-Info.module.css';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../../constants/constants';

const IngridientInfo = ({info }) => {
  return (
    <ul className={`${ingridientInfo.list} text_type_main-default text_color_inactive` }>
      <li className={ingridientInfo.item}>
        <p className='text mb-2'>Калории, ккал</p>
        <p className='text text_type_digits-default'>{info.calories}</p>
      </li>
      <li className={ingridientInfo.item}>
        <p className='text mb-2'>Белки, г</p>
        <p className='text text_type_digits-default'>{info.proteins}</p>
      </li>
      <li className={ingridientInfo.item}>
        <p className='text mb-2'>Жиры, г</p>
        <p className='text text_type_digits-default'>{info.fat}</p>
      </li>
      <li className={ingridientInfo.item}>
        <p className='text mb-2'>Углеводы, г</p>
        <p className='text text_type_digits-default'>{info.carbohydrates}</p>
      </li>
    </ul> 
  ) 
}

IngridientInfo.propTypes = {
  info: PropTypes.shape(ingredientForPropTypes).isRequired 
};

export default IngridientInfo;