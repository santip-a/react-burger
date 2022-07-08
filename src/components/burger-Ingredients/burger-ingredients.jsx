import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientDetails from '../modal/modal-ingredient-details/modal-ingredient-details';
import ImgredientList from './imgredient-list/imgredient-list';
import {nameTypeIngredients} from '../../constants/constants';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../constants/constants';


const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState('bun');
  const [openModal,setOpenModal] = React.useState(false);
  const [elemIngridient,setElemIngridient] = React.useState(props.dataList[0]);


  BurgerIngredients.propTypes = {
    dataList: PropTypes.arrayOf(
      PropTypes.shape(ingredientForPropTypes).isRequired      
      ).isRequired
  };
 
  const ss ='ss'
  return (
    <section className={`${burgerIngredients.section} pt-10 `}>
      <h1 className="text text_type_main-large ">Соберите бургер</h1>
      <div className={`${burgerIngredients.artile} mt-5 mb-10 ` }>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredients.list} custom-scroll`}>
        {
          nameTypeIngredients.map(item => 
            <ImgredientList key={item.nameEn} 
              elem={item} 
              dataList={props.dataList} 
              onClose={setOpenModal} 
              setElem={setElemIngridient} />)
        }
      </div>
      
            <IngridientDetails open={openModal} onClose={setOpenModal} elem={elemIngridient}/>

    </section>

  )

}

export default BurgerIngredients;