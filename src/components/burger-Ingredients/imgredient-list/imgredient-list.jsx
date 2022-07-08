import React from 'react';
import imgredientList from './imgredient-list.module.css';
import ImgredientItem from '../imgredient-item/imgredient-item';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../../constants/constants';

const ImgredientList = (props) => {

  ImgredientList.propTypes = {
    elem:  PropTypes.shape({
        nameEn: PropTypes.string.isRequired, 
        nameRu: PropTypes.string.isRequired
      }).isRequired ,
    dataList: PropTypes.arrayOf(
      PropTypes.shape(ingredientForPropTypes).isRequired      
      ).isRequired,
    onClose: PropTypes.func.isRequired,
    setElem: PropTypes.func.isRequired
  }

  const ingredientsList = props.dataList;
  const elem = props.elem;
  const onClose = props.onClose;
  const setElem = props.setElem;

  const sort = (type) => {
    const ingr = ingredientsList.filter(item => item.type === type);
    return ingr;
  }

  return (
    <ul className={` ${imgredientList.lists} mb-15`}>
      <p className='text text_type_main-medium'>{elem.nameRu}</p>
      <div className={`${imgredientList.list} ml-4`}>
        {        
            sort(elem.nameEn).map(item => (<ImgredientItem key={item._id} item={item} onClose={onClose} setElem={setElem}/>))
        }
      </div>

    </ul>
  )
}

export default ImgredientList;