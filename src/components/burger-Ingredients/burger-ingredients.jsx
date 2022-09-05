import React, { useEffect } from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientDetails from '../modal/modal-ingredient-details/modal-ingredient-details';
import ImgredientList from './imgredient-list/imgredient-list';
import { nameTypeIngredients } from '../../constants/constants';
import Modal from '../modal/modal';
import { BurgerConstructorContext } from '../../context/context';


const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');
  const [openModal, setOpenModal] = React.useState(false);
  const data = React.useContext(BurgerConstructorContext);
  const [elemIngridient, setElemIngridient] = React.useState(data[0]);

  const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

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


  return (
    <section className={`${burgerIngredients.section} pt-10 `}>
      <h1 className="text text_type_main-large ">Соберите бургер</h1>
      <div className={`${burgerIngredients.artile} mt-5 mb-10 `}>
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
      <div className={`${burgerIngredients.list} custom-scroll`}>
        {
          nameTypeIngredients.map(item => (
            <ImgredientList key={item.nameEn}
              elem={item}
              onClose={setOpenModal}
              setElem={setElemIngridient} 
              bunRef = {bunRef}
              sauceRef = {sauceRef}
              mainRef = {mainRef}
            />)
          )}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <IngridientDetails elem={elemIngridient} />
      </Modal>

    </section>
  )
}


export default BurgerIngredients;