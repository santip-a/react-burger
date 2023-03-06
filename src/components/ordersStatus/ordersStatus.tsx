import ordersStatusStyle from './ordersStatus.module.css';
import { useSelector } from '../../services/types/hooks';
import { useEffect, useState } from 'react';
import { Loader } from '../loader/loader';
import {TBurger} from '../../utils/types'

const OrdersStatus = () => {
  const data = useSelector(state => state.webSoket);
  const [ordersDone, setOrdersDone] = useState<number[]>([]);
  const [ordersNotDone, setOrdersNotDone] = useState<number[]>([]);
  let orderIsDone: number[] = [];
  let orderIsNotDone: number[] = [];

  const sortOrders = () => {
    data.orders.forEach((item: TBurger) => {
      if (item.status === 'done') {
        orderIsDone.push(item.number);
      }
      else {
        orderIsNotDone.push(item.number)
      }
    })
    setOrdersDone(orderIsDone);
    setOrdersNotDone(orderIsNotDone);
  }

  useEffect(() => {
    sortOrders()
  }, [data])

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={`${ordersStatusStyle.ordersStatus} mt-1`}>
      <div className={`${ordersStatusStyle.info} `}>
        <div className={`${ordersStatusStyle.ready} `}>
          <p className={`${ordersStatusStyle.title} text text_type_main-medium`}>Готовы:</p>
          <ul className={`${ordersStatusStyle.list} `}>
            {ordersDone.map(item => (
              <li key={item} className={`${ordersStatusStyle.numberReady} text text_type_digits-default mb-2`}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${ordersStatusStyle.inWork} `}>
          <p className={`${ordersStatusStyle.title} text text_type_main-medium`}>В&nbsp;работе:</p>
          <ul className={`${ordersStatusStyle.list} `}>
            {ordersNotDone.map(item => (
              <li key={item} className={`${ordersStatusStyle.numberInWork} text text_type_digits-default mb-2`}>
                {item}
              </li>
            ))}

          </ul>
        </div>
      </div>
      <div className={`${ordersStatusStyle.total}`}>
        <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
        <p className={`text text_type_digits-large`}><>{data.total}</></p>
      </div>
      <div className={`${ordersStatusStyle.today}`}>
        <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large`}><>{data.totalToday}</></p>
      </div>
    </div>
  )
}

export default OrdersStatus;