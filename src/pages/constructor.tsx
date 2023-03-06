import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-Ingredients/burger-ingredients';
import constructor from './constructor.module.css';

const Constructor = () => {

  return (
    <div className={constructor.box}>
      <div className={constructor.table}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  )
}

export default Constructor;
