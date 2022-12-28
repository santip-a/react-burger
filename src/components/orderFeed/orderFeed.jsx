import orderFeedStyle from './orderFeed.module.css';
import OrderFeedCard from './orderFeedCard/orderFeedCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../loader/loader';

const OrderFeed = () => {
  const history = useHistory();
  const location = useLocation();
  const data = useSelector(state => state.webSoket.orders)

  const openOrderInfo = (path) => {
    history.replace({
      pathname: `/feed/${path}`,
      state: { background: location, statusOrderFlag: true }
    });
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <ul className={`${orderFeedStyle.list} custom-scroll`}>
      {data.map(item => (
        <li key={item._id}
          className={`${orderFeedStyle.listItem}`}
          onClick={e => openOrderInfo(item._id)}>
          <OrderFeedCard burger={item} />
        </li>
      ))}
    </ul>
  )
}

export default OrderFeed;