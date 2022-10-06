import ingredientDetails from './modal-ingredient-details.module.css';
import IngredientInfo from './ingredient-Info/ingredient-Info';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
	const elem = useSelector(state => state.ingredientDetalis.elem)

	return (
		<>
			<h1 className={`${ingredientDetails.title} text text_type_main-large pl-10 pr-10 pt-10 `}>Детали ингридиента</h1>
			<div className={`${ingredientDetails.window} pl-10 pr-10 pt-5 pb-10`}>
					<img src={elem.image_large} alt={elem.name} className="mb-1 " />
					<h2 className={`${ingredientDetails.ingredient} text text_type_main-medium mb-8 mt-5  `}>{elem.name}</h2>
					<IngredientInfo info={elem} />
			</div>
		</>
	);
}

export default IngredientDetails;