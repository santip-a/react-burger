import userOrdersStyle from './user-orders.module.css';
import OrderFeedCard from '../orderFeed/orderFeedCard/orderFeedCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsAction';
import { Loader } from '../loader/loader';

const UserOrders = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.webSoket.orders);

  let dataClone = Array.from(data);

  useEffect(() => {
    dispatch(wsConnectionStart(null,true));
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [])

  const openOrderInfo = (path) => {
    history.replace({
      pathname: `/profile/orders/${path}`,
      state: { background: location, statusOrderFlag: true }
    });
  }

  if (!data.length) {
    return <Loader />;
  }

  return (
    <ul className={`${userOrdersStyle.ordersList} mt-10 custom-scroll`}>
      {dataClone.reverse().map(item => (
        <li key={item._id}
          className={userOrdersStyle.ordersListItem}
          onClick={e => openOrderInfo(item._id)}>
          <OrderFeedCard burger={item} visibleStatus={true} />
        </li>
      ))}
    </ul>
  )
}

export default UserOrders;