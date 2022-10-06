import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItem from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../../constants/constants';
import { useDrag } from "react-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {ADD_INGREDIENT_DETAILS} from '../../../services/actions/ingredient-details'

const IngredientItem = (props) => {

  const {item, onClose} = props;
  const dispatch = useDispatch();    
  const bunInConstructor = useSelector(state => state.ingredientsInConstructor.bunType)
  const fillingInConstructor = useSelector(state => state.ingredientsInConstructor.filling)

  // ------- подсчет счетчика ингредиентов----------
  let number = 0
  if (bunInConstructor._id === item._id) {
    number = 2
  }
  else fillingInConstructor.forEach(elem => {
    if (elem._id === item._id) {
      number = number + 1
    }
  }) 

  const setElem = () => {
    dispatch({type: ADD_INGREDIENT_DETAILS, payload: item});
  }


  const [, dragRef] = useDrag({
    type: "ingdredietItem",
    item: item           
  });

 

  return (
    <li className={`${ingredientItem.item} mt-6 mb-1`} onClick={()=> {onClose(true); setElem(item)}} ref={dragRef} >
      {number > 0 && <Counter count={number} size='default' />}
      <img src={item.image} alt={item.name} />
      <div className={`${ingredientItem.price} mt-2 mb-2`} >
        <span className='pr-2 text text_type_digits-default'>{item.price}</span>      
        <CurrencyIcon type='primary' className='pl-5'/>
      </div>
      <p className='text text_type_main-default'>{item.name}  </p>   
    </li>
  )  
}

IngredientItem.propTypes = {
  item: ingredientPropTypes,
  onClose: PropTypes.func.isRequired
};


export default IngredientItem;