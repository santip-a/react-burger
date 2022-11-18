import ingredientInfo from './ingredient-Info.module.css';
import { ingredientPropTypes } from '../../../../constants/constants';

const IngridientInfo = ({ info }) => {
  return (
    <ul className={`${ingredientInfo.list} text_type_main-default text_color_inactive`}>
      <li className={ingredientInfo.item}>
        <p className='text mb-2'>Калории, ккал</p>
        <p className='text text_type_digits-default'>{info.calories}</p>
      </li>
      <li className={ingredientInfo.item}>
        <p className='text mb-2'>Белки, г</p>
        <p className='text text_type_digits-default'>{info.proteins}</p>
      </li>
      <li className={ingredientInfo.item}>
        <p className='text mb-2'>Жиры, г</p>
        <p className='text text_type_digits-default'>{info.fat}</p>
      </li>
      <li className={ingredientInfo.item}>
        <p className='text mb-2'>Углеводы, г</p>
        <p className='text text_type_digits-default'>{info.carbohydrates}</p>
      </li>
    </ul>
  )
}

IngridientInfo.propTypes = {
  info: ingredientPropTypes
};

export default IngridientInfo;