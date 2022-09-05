import React, { useMemo } from 'react';
import imgredientList from './imgredient-list.module.css';
import ImgredientItem from '../imgredient-item/imgredient-item';
import PropTypes from 'prop-types';
import {BurgerConstructorContext} from '../../../context/context';
 
const ImgredientList = ({elem, onClose, setElem, bunRef, sauceRef, mainRef}) => {
  let refUl;
  if (elem.nameEn === 'bun') {refUl = bunRef}
  if (elem.nameEn === 'sauce') {refUl = sauceRef}
  if (elem.nameEn === 'main') {refUl = mainRef}


  const dataList = React.useContext(BurgerConstructorContext);

  const sort = (type) => {
    const ingr = dataList.filter(item => item.type === type);  
    return ingr;
  }

  return (
    <ul className={` ${imgredientList.lists} mb-15`} ref={refUl}>
      <p className='text text_type_main-medium'>{elem.nameRu}</p>
      <div className={`${imgredientList.list} ml-4`}>
        {        
          sort(elem.nameEn).map(item => (<ImgredientItem key={item._id} item={item} onClose={onClose} setElem={setElem}/>))          
        }
      </div>
    </ul>
  )
}

ImgredientList.propTypes = {
  elem:  PropTypes.shape({
      nameEn: PropTypes.string.isRequired, 
      nameRu: PropTypes.string.isRequired
    }).isRequired ,
  onClose: PropTypes.func.isRequired,
  setElem: PropTypes.func.isRequired
}

export default ImgredientList;

