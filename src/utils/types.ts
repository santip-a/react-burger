export interface ILocationState {
  background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
}


export type TItemIngredient = {
	calories: number
	carbohydrates: number
	fat: number
	idInBurger: string
	image: string
	image_large: string
	image_mobile: string
	name: string
	price: number
	proteins: number
	type: string
	__v: number
	_id: string
}


export type TBurger = {
	createdAt: string
	ingredients: string[]
	length: 2
	name: string
	number: number
	status: string
	updatedAt: string
	_id: string
}