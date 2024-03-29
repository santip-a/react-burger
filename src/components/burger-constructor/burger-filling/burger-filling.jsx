import burgerFiling from './burger-filling.module.css'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from '../../../constants/constants';
import { useDrag } from "react-dnd";


const BurgerFiling = ({ item, sortFilling, getElemIn, delIngredient }) => {
  const [, dragRef] = useDrag({
    type: "indred",
    item: item
  });

  return (
    <li className={`${burgerFiling.item}  mr-2 `}
      ref={dragRef}
      onDrop={(e) => (sortFilling(e, item))}
      onDragStart={(e) => getElemIn(e, item)}
    >
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => { delIngredient(item) }}
      />
    </li>
  )
}

BurgerFiling.propTypes = {
  item: ingredientPropTypes
};

export default BurgerFiling;
