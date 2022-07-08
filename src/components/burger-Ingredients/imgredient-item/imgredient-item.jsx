import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import imgredientItem from './imgredient-item.module.css';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../constants/constants';

const ImgredientItem = (props) => {

  ImgredientItem.propTypes = {
    item: PropTypes.shape(ingredientForPropTypes).isRequired,
    onClose: PropTypes.func.isRequired,
    setElem: PropTypes.func.isRequired
  };
  

  const item = props.item;
  const onClose = props.onClose;
  const setElem = props.setElem;

  return (
    <li className={`${imgredientItem.item} mt-6 mb-1`} onClick={()=> {onClose(true); setElem(item)}}>
      <img src={item.image} alt={item.name} />
      <div className={`${imgredientItem.price} mt-2 mb-2`}>
        <span className='pr-2 text text_type_digits-default'>{item.price}</span>      
        <CurrencyIcon type='primary' className='pl-5'/>
      </div>
      <p className='text text_type_main-default'>{item.name}  </p>              
      <Counter count={1} size='default' />
  
    </li>
  )

  
}



export default ImgredientItem;