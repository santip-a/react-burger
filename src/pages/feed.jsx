import style from './feed.module.css';
import OrderFeed from '../components/orderFeed/orderFeed';
import OrdersStatus from '../components/ordersStatus/ordersStatus'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/wsAction';
import { Loader } from '../components/loader/loader';

const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.webSoket.orders)

  useEffect(() => {
    dispatch(wsConnectionStart('/all'));
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch])

  if (!data.length) {
    return <Loader />;
  }

  return (
   ( data.length &&
    <section className={`${style.section} mt-10 ml-5`}>
      <h1 className={`text text_type_main-large mb-4`}>Лента заказов</h1>
      <div className={`${style.table}`}>
        <div className={`${style.orders}`}>
          <OrderFeed />
        </div>
        {data && <OrdersStatus />}
      </div>
    </section>)
  )
}

export default Feed;