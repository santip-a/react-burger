import ingredients from './ingredients.module.css'
import IngredientInfo from '../components/modal/modal-ingredient-details/ingredient-Info/ingredient-Info';

const Ingredients = () => {
  return (
    <>
      <h1 className={`${ingredients.title} text text_type_main-large pl-10 pr-10 pt-10 `}>Детали ингридиента</h1>
      <IngredientInfo />
    </>
  )
}

export default Ingredients;