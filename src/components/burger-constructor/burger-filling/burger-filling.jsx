import burgerFiling from './burger-filling.module.css'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../constants/constants';
import { useDrag } from "react-dnd";
import {useState} from 'react';


const BurgerFiling = (props) => {
  const {item, sortFilling, getElemIn, delIngredient} = props;


  const [, dragRef] = useDrag({
    type: "indred",
    item: item          
  });



 

  return (
    <li className={`${burgerFiling.item}  mr-2 `}
      ref={dragRef} 
      onDrop={(e) => (sortFilling(e, item))} 
      onDragStart={(e) => getElemIn(e, item) } 
      >
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}  
        handleClose = {() => {delIngredient(item)}}     
      />
    </li>
  )
}

BurgerFiling.propTypes = {
  item: PropTypes.shape(ingredientForPropTypes).isRequired
};

export default BurgerFiling;
