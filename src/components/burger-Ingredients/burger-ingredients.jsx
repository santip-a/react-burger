import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientDetails from '../modal/modal-ingredient-details/modal-ingredient-details';
import ImgredientList from './imgredient-list/imgredient-list';
import { nameTypeIngredients } from '../../constants/constants';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  DEL_INGREDIENT_DETALIS
} from '../../services/actions/ingredient-details';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');
  const [openModal, setOpenModal] = React.useState(false);
  const data = useSelector(state => state.ingredients.data)
  const dispatch = useDispatch();
  const elemIngridient = useSelector(state => state.ingredientDetalis.elem)

  const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

  const ulID = document.getElementById('ul')
  const bunID = document.getElementById('bun')
  const sauceID = document.getElementById('sauce')
  const mainID = document.getElementById('main')

  const scrollIngedients = (e) => {
    setCurrent(e);
    switch(e) {
      case 'bun' :
        bunRef.current.scrollIntoView({behavior: "smooth"});
        break;
    }
    switch(e) {
      case 'sauce' :
        sauceRef.current.scrollIntoView({behavior: "smooth"});
        break;
    }
    switch(e) {
      case 'main' :
        mainRef.current.scrollIntoView({behavior: "smooth"});
        break;
    }
  }


// ============ функция переключения табов при скролле
  const scrollFun = () => {
    const bunY = Math.abs(ulID.getBoundingClientRect().y - bunID.getBoundingClientRect().y);
    const sauceY = Math.abs(ulID.getBoundingClientRect().y - sauceID.getBoundingClientRect().y);
    const mainY = Math.abs(ulID.getBoundingClientRect().y - mainID.getBoundingClientRect().y);

    const minY = Math.min(bunY,sauceY,mainY)
    if (minY === bunY) {setCurrent('bun')}
    else if (minY === sauceY) {setCurrent('sauce')}
    else if (minY === mainY) {setCurrent('main')}
  }
    

  

  return (
    <section className={`${burgerIngredients.section} pt-10 `}>
      <h1 className="text text_type_main-large ">Соберите бургер</h1>
      <div className={`${burgerIngredients.artile} mt-5 mb-10 `} >
        <Tab value="bun" active={current === 'bun'} onClick={scrollIngedients}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={scrollIngedients}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={scrollIngedients}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredients.list} custom-scroll`} id='ul' onScroll={scrollFun}>
        {
          nameTypeIngredients.map(item => (
            <ImgredientList 
              key={item.nameEn}
              elem={item}
              onClose={setOpenModal}
              bunRef = {bunRef}
              sauceRef = {sauceRef}
              mainRef = {mainRef}
            />)
          )}
      </div>

      <Modal open={openModal} onClose={() => {setOpenModal(false); dispatch({type: DEL_INGREDIENT_DETALIS})}}>
        <IngridientDetails />
      </Modal>

    </section>
  )
}


export default BurgerIngredients;