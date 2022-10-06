import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../modal/modal-ingredient-details/modal-ingredient-details';
import IngredientList from './ingredient-list/ingredient-list';
import { nameTypeIngredients } from '../../constants/constants';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  DEL_INGREDIENT_DETAILS
} from '../../services/actions/ingredient-details';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');
  const [modalOpen, setModalOpen] = React.useState(false);
  const data = useSelector(state => state.ingredients.data)
  const dispatch = useDispatch();

  const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

  const ulID = document.getElementById('ul');
  const bunID = bunRef.current;
  const sauceID = sauceRef.current;
  const mainID = mainRef.current;

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
    

  const openModal = () => {
    setModalOpen(false); 
    dispatch({type: DEL_INGREDIENT_DETAILS})
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
            <IngredientList 
              key={item.nameEn}
              elem={item}
              onClose={setModalOpen}
              bunRef = {bunRef}
              sauceRef = {sauceRef}
              mainRef = {mainRef}
            />)
          )}
      </div>

    {modalOpen && <Modal onClose={openModal}>
      <IngredientDetails />
    </Modal>}

    </section>
  )
}


export default BurgerIngredients;