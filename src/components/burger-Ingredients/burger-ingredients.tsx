import React, {SyntheticEvent} from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from './ingredient-list/ingredient-list';
import { nameTypeIngredients } from '../../constants/constants';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { DEL_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';





const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');
  const data = useSelector((state) => state.ingredients.data)
  const dispatch = useDispatch();

  const bunRef = React.useRef<HTMLUListElement>();
  const sauceRef = React.useRef<HTMLUListElement>();
  const mainRef = React.useRef<HTMLUListElement>();

  

  React.useEffect(() => {
    dispatch({ type: DEL_INGREDIENT_DETAILS })
  }, []);

  const scrollIngedients = (e: string) => {
    setCurrent(e);
    switch (e) {
      case 'bun':
        bunRef.current!.scrollIntoView({ behavior: "smooth" });
        break;
    }
    switch (e) {
      case 'sauce':
        sauceRef.current!.scrollIntoView({ behavior: "smooth" });
        break;
    }
    switch (e) {
      case 'main':
        mainRef.current!.scrollIntoView({ behavior: "smooth" });
        break;
    }
  }

  // ============ функция получения координат разделов ингредиентов
  function getCoordinates(elem: any) {
    const liElem = elem.current;
    const ulElem  = document.getElementById('ul') as Element;
    const rectUl = ulElem.getBoundingClientRect();
    const rectLi = liElem.getBoundingClientRect();
    return Math.abs(rectUl.y - rectLi.y)
  }

  // ============ функция переключения табов при скролле
  const scrollFun = () => {
    const bunY = getCoordinates(bunRef);
    const sauceY = getCoordinates(sauceRef);
    const mainY = getCoordinates(mainRef);

    const minY = Math.min(bunY, sauceY, mainY)
    if (minY === bunY) { setCurrent('bun') }
    else if (minY === sauceY) { setCurrent('sauce') }
    else if (minY === mainY) { setCurrent('main') }
  }

  const closeModal = () => {
    dispatch({ type: DEL_INGREDIENT_DETAILS })
  }

  return (
    <section className={`${burgerIngredients.section} pt-10`}>
      <h1 className="text text_type_main-large ml-4 ">Соберите бургер</h1>
      <div className={`${burgerIngredients.artile} mt-5 mb-10 ml-4`} >
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
              onClose={closeModal}
              bunRef={bunRef}
              sauceRef={sauceRef}
              mainRef={mainRef}
            />)
          )}
      </div>
    </section>
  )
}

export default BurgerIngredients;