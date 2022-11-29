import IngredientInfo from './ingredient-Info/ingredient-Info';

const IngredientDetails = () => {

	return (
		<>
			<h1 className={`text text_type_main-large pl-10 pr-10 pt-10 `}>Детали ингридиента</h1>
			<IngredientInfo />
		</>
	);
}

export default IngredientDetails;