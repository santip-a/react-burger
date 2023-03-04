import orderInfoStyle from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector, useDispatch } from '../../../services/types/hooks';
import { Loader } from '../../loader/loader';
import { placeOrderDate } from '../../../utils/utils';
import { useEffect, FC } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../../services/actions/wsAction'
import {TBurger} from '../../../utils/types'


interface IIngredientItem {
  img: string,
  name: string,
  price: number,
  id: string,
  quantity: number,
}


const OrderInfo: FC = () => {
  const params: {id: string} = useParams();
  const location = useLocation();
  const data = useSelector(state => state.webSoket.orders);
  let status = null;
  let statusColor = null;
  let totalPrice = 0;
  const dataIngredients = useSelector(state => state.ingredients.data);
  const dispatch = useDispatch();
  let uniqueIngredients: string[] = [];
  let ingredientItem: IIngredientItem = {
    img: '',
    name: '',
    price: 0,
    id: '',
    quantity: 0,
  };

  const burger: any = data.find((elem: TBurger) => elem._id === params.id);
  
  const f = () => {
    return location.state ? orderInfoStyle.numberOrderModal : orderInfoStyle.numberOrder
  }

  function getPathWs() {
    const path = location.pathname.split('/');
    const previousPage = path[path.length - 2];
    if (previousPage === 'orders') {
      return wsConnectionStart(null, true)
    }
    return wsConnectionStart('/all')
  }


  useEffect(() => {
    if (data.length === 0) {
      dispatch(getPathWs());
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

  function getQuantity(elem: string) {
    let result = burger.ingredients.reduce((sum: number, current: string) => current === elem ? sum = sum + 1 : sum, 0);
    return result
  }

  const getImgIngredient = (ingredients: any) => {
    let itemIngredient: any = dataIngredients.find((item: any) => item._id === ingredients);
    const quantity = getQuantity(ingredients)
    totalPrice = totalPrice + (itemIngredient.price * quantity);
    ingredientItem = {
      img: itemIngredient.image_mobile,
      name: itemIngredient.name,
      price: itemIngredient.price,
      id: itemIngredient._id,
      quantity: quantity,
    }
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
          <li key={ingredientItem.id} className={`${orderInfoStyle.itemList} mt-4 ml-4`} > 
            <>
              {getImgIngredient(item)}
              <div className={`${orderInfoStyle.nameItem}`}>
                <img src={ingredientItem.img} className={`${orderInfoStyle.icon} `} alt="картинка ингредиента" />
                <p className={`text text_type_main-default ml-4`}>{ingredientItem.name}</p>
              </div>
              <div className={`${orderInfoStyle.price} mr-5`}>
                <p className={`text text_type_digits-default mr-2`}>{ingredientItem.quantity} x {ingredientItem.price}</p>
                <CurrencyIcon type="primary" />
              </div>    
              </> 
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