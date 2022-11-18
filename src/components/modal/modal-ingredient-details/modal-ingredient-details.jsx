import ingredientDetails from './modal-ingredient-details.module.css';
import IngredientInfo from './ingredient-Info/ingredient-Info';
import { useParams } from "react-router";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT_DETAILS } from '../../../services/actions/ingredient-details';

const IngredientDetails = () => {
	const data = useSelector(state => state.ingredients.data);
	const params = useParams();
	const elem = data.find(elem => elem._id === params.id);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch({ type: ADD_INGREDIENT_DETAILS, payload: elem })
	}, [elem]);

	return (
		elem && <>
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