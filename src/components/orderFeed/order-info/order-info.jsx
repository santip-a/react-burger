import orderInfoStyle from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../../loader/loader';
import { uuid, placeOrderDate } from '../../../utils/utils';
import { useEffect } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../../services/actions/wsAction'

const OrderInfo = () => {
  const params = useParams();
  const location = useLocation();
  const data = useSelector(state => state.webSoket.orders);
  let status = null;
  let statusColor = null;
  let totalPrice = 0;
  const dataIngredients = useSelector(state => state.ingredients.data);
  const dispatch = useDispatch();
  let uniqueIngredients = [];
  let ingredientItem = {};

  const burger = data.find(elem => elem._id === params.id);

  const f = () => {
    return location.state ? orderInfoStyle.numberOrderModal : orderInfoStyle.numberOrder
  }

  useEffect(() => {
    if (data.length === 0) {
      dispatch(wsConnectionStart());
      return () => {
        dispatch(wsConnectionClosed());
      }
    }
  }, [dispatch])

  if (burger) {
    switch (burger.status) {
      case 'done':
        status = "Выполнен";
        statusColor = orderInfoStyle.status;
        break;
      case 'pending':
        status = "Готовится";
        break;
      case 'created':
        status = "Создан";
        break;
      default:
        break;
    }
    uniqueIngredients = Array.from(new Set(burger.ingredients)); 
  }

    function getQuantity (elem) {
    let result = burger.ingredients.reduce((sum, current) => current === elem ? sum = sum + 1 : sum, 0);
    return result
  }

  const getImgIngredient = (ingredients) => {
    let itemIngredient = dataIngredients.find(item => item._id === ingredients);
    const quantity = getQuantity(ingredients)
    totalPrice = totalPrice + (itemIngredient.price * quantity);
    ingredientItem = { img: itemIngredient.image_mobile, name: itemIngredient.name, price: itemIngredient.price, quantity: quantity }
  }

  if (!burger) {
    return <Loader />;
  }

  return (
    <section className={location.state ? orderInfoStyle.sectionModal : orderInfoStyle.section}>
      <h1 className={`text text_type_digits-default ${f()}`}>#{burger.number}</h1>
      <p className={`${orderInfoStyle.title} text text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</p>
      <p className={`${statusColor} text text_type_main-default mt-3`}>Выполнен</p>
      <p className={`${orderInfoStyle.listHeader} text text_type_main-medium mb-2`}>Состав:</p>
      <ul className={`${orderInfoStyle.list} custom-scroll`} >

        {uniqueIngredients.map(item => ( 
          <li key={uuid()} className={`${orderInfoStyle.itemList} mt-4 ml-4`} > {getImgIngredient(item)}
            <div className={`${orderInfoStyle.nameItem}`}>
              <img src={ingredientItem.img} className={`${orderInfoStyle.icon} `} alt="картинка ингредиента" />
              <p className={`text text_type_main-default ml-4`}>{ingredientItem.name}</p>
            </div>
            <div className={`${orderInfoStyle.price} mr-5`}>
              <p className={`text text_type_digits-default mr-2`}>{ingredientItem.quantity} x {ingredientItem.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}

      </ul>
      <div className={`${orderInfoStyle.total} mt-10`}>
        <p className={`text text_type_main-default `}>{placeOrderDate(burger.updatedAt)}</p>
        <div className={`${orderInfoStyle.price} `}>
          <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  )
}

export default OrderInfo;