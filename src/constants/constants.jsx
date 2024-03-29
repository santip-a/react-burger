import PropTypes from 'prop-types';


export const nameTypeIngredients = [
  { nameEn: 'bun', nameRu: 'Булки' },
  { nameEn: 'sauce', nameRu: 'Соусы' },
  { nameEn: 'main', nameRu: 'Начинки' }
];

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const ingredientPropTypes = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "proteins": PropTypes.number.isRequired,
  "fat": PropTypes.number.isRequired,
  "carbohydrates": PropTypes.number.isRequired,
  "calories": PropTypes.number.isRequired,
  "price": PropTypes.number.isRequired,
  "image": PropTypes.string.isRequired,
  "image_mobile": PropTypes.string.isRequired,
  "image_large": PropTypes.string.isRequired,
  "__v": PropTypes.number.isRequired,
}).isRequired


