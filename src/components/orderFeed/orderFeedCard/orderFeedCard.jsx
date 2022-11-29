import orderFeedCardStyle from './orderFeedCard.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { uuid, placeOrderDate } from '../../../utils/utils';

const OrderFeedCard = ({ burger, visibleStatus = false }) => {
  const dataIngredients = useSelector(state => state.ingredients.data);
  let status = '';
  let totalPrice = 0;
  let statusColor = null;

  switch (burger.status) {
    case 'done':
      status = "Выполнен";
      statusColor = orderFeedCardStyle.status;
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

  const getImgIngredient = (ingredients) => {
    let itemIngredient = dataIngredients.find(item => item._id === ingredients);
    totalPrice = totalPrice + itemIngredient.price;
    return itemIngredient.image_mobile
  }

  const visibleOrderStatus = () => {
    if (visibleStatus) {
      return orderFeedCardStyle.visible
    }
    return orderFeedCardStyle.unVisible
  }

  return (
    <div className={`${orderFeedCardStyle.card} p-6`} >
      <div className={`${orderFeedCardStyle.info} mt-1`}>
        <p className={`${orderFeedCardStyle.number} text text_type_digits-default`}>#{burger.number}</p>
        <p className="text text_type_main-default text_color_inactive">{placeOrderDate(burger.updatedAt)}</p>
      </div>
      <p className={`${orderFeedCardStyle.info} text text_type_main-medium mt-6 `}>{burger.name}</p>
      <p className={` text text_type_main-default mt-2 ${visibleOrderStatus()} ${statusColor} `}>{status}</p>
      <div className={`${orderFeedCardStyle.total} mt-6`}>
        <ul className={`${orderFeedCardStyle.list} `}>
          {burger.ingredients.map(item => (
            <li className={`${orderFeedCardStyle.iconElem}`} key={uuid()} >
              <img src={getImgIngredient(item)} className={`${orderFeedCardStyle.icon} `} alt="картинка ингредиента" />
            </li>
          ))}
        </ul>
        <div className={`${orderFeedCardStyle.totalPrice} text text_type_digits-default mb-6`}>
          <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div >
  )
}

export default OrderFeedCard;