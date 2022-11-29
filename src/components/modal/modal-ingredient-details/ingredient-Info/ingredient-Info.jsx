import ingredientInfo from './ingredient-Info.module.css';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';

const IngridientInfo = () => {
  const data = useSelector(state => state.ingredients.data);
  const params = useParams();
  const elem = data.find(elem => elem._id === params.id);
  
  if (!elem) return null;

  return (
    elem && <div className={`${ingredientInfo.window} pl-10 pr-10 pt-5 pb-10`}>
      <img src={elem.image_large} alt={elem.name} className="mb-1 " />
      <h2 className={`${ingredientInfo.ingredient} text text_type_main-medium mb-8 mt-5  `}>{elem.name}</h2>
      <ul className={`${ingredientInfo.list} text_type_main-default text_color_inactive`}>
        <li className={ingredientInfo.item}>
          <p className='text mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default'>{elem.calories}</p>
        </li>
        <li className={ingredientInfo.item}>
          <p className='text mb-2'>Белки, г</p>
          <p className='text text_type_digits-default'>{elem.proteins}</p>
        </li>
        <li className={ingredientInfo.item}>
          <p className='text mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default'>{elem.fat}</p>
        </li>
        <li className={ingredientInfo.item}>
          <p className='text mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{elem.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngridientInfo;