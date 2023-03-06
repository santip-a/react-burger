import ingredientList from './ingredient-list.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { useSelector } from '../../../services/types/hooks';
import  { FC, MutableRefObject }  from "react";
import {TItemIngredient} from '../../../utils/types'

type TIngredientList = {  
  elem: {nameEn: string, nameRu: string},
  onClose: () => void,
  bunRef: React.MutableRefObject<HTMLUListElement | undefined>
  sauceRef: React.MutableRefObject<HTMLUListElement | undefined>
  mainRef: any
}

const IngredientList: FC<TIngredientList> = ({ elem, onClose, bunRef, sauceRef, mainRef }) => {
  let refUl
  if (elem.nameEn === 'bun') { refUl = bunRef }
  if (elem.nameEn === 'sauce') { refUl = sauceRef }
  if (elem.nameEn === 'main') { refUl = mainRef }

  const dataList = useSelector(state => state.ingredients.data)

  const sort = (type: string) => {
    const ingr = dataList.filter((item: TItemIngredient) => item.type === type);
    return ingr;
  }

  return (
    <ul className={` ${ingredientList.lists} mb-15`} ref={refUl} >
      <p id={elem.nameEn} className='text text_type_main-medium ml-4'>{elem.nameRu}</p>
      <div className={`${ingredientList.list} ml-8`}>
        {
          sort(elem.nameEn).map((item: TItemIngredient) => (<IngredientItem key={item._id} item={item} onClose={onClose} />))
        }
      </div>
    </ul>
  )
}

// IngredientList.propTypes = {
//   elem: PropTypes.shape({
//     nameEn: PropTypes.string.isRequired,
//     nameRu: PropTypes.string.isRequired
//   }).isRequired,
//   onClose: PropTypes.func.isRequired
// }

export default IngredientList;

