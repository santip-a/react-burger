import burgerFiling from './burger-filling.module.css'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../constants/constants';

const BurgerFiling = (props) => {
  const item = props.elem;

    return (
    <li className={`${burgerFiling.item } mr-2`}>
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  )
}

BurgerFiling.propTypes = {
  elem: PropTypes.shape(ingredientForPropTypes).isRequired
};

export default BurgerFiling;
