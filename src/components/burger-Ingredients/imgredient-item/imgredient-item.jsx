import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import imgredientItem from './imgredient-item.module.css';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../constants/constants';
import { useDrag } from "react-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {ADD_INGREDIENT_DETALIS} from '../../../services/actions/ingredient-details'

const ImgredientItem = (props) => {

  const {item, onClose} = props;
  const dispatch = useDispatch();    
  const bunInConstructor = useSelector(state => state.ingredientsInConstructor.bunType)
  const fillingInConstructor = useSelector(state => state.ingredientsInConstructor.filling)

  // ------- подсчет счетчика ингредиентов----------
  let nunber = 0
  if (bunInConstructor._id === item._id) {
    nunber = 2
  }
  fillingInConstructor.forEach(elem => {
    if (elem._id === item._id) {
      nunber = nunber + 1
    }
  }) 
//=====================================================

  const setElem = () => {
    dispatch({type: ADD_INGREDIENT_DETALIS, payload: item});
  }


  const [, dragRef] = useDrag({
    type: "indredietItem",
    item: item           
  });

 

  return (
    <li className={`${imgredientItem.item} mt-6 mb-1`} onClick={()=> {onClose(true); setElem(item)}} ref={dragRef} >
      {nunber > 0 && <Counter count={nunber} size='default' />}
      <img src={item.image} alt={item.name} />
      <div className={`${imgredientItem.price} mt-2 mb-2`} >
        <span className='pr-2 text text_type_digits-default'>{item.price}</span>      
        <CurrencyIcon type='primary' className='pl-5'/>
      </div>
      <p className='text text_type_main-default'>{item.name}  </p>   
    </li>
  )  
}

ImgredientItem.propTypes = {
  item: PropTypes.shape(ingredientForPropTypes).isRequired,
  onClose: PropTypes.func.isRequired
};


export default ImgredientItem;