import React from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerFiling from './burger-filling/burger-filling';
import OrderDetails from '../modal/modal-order-details/modal-order-details';
import { baseUrl } from '../../constants/constants';
import Modal from "../modal/modal";
import { BurgerConstructorContext } from '../../context/context';
import { checkResponse } from '../../utils/utils';


const BurgerConstructor = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const data = React.useContext(BurgerConstructorContext);

  const bunItem = data.find(item => item.type === 'bun');
  const filling = React.useMemo(() => data.filter(item => item.type != 'bun'), data)  

  const [orderPrices, countOrderPrice] = React.useReducer(GetOrderList, 0)
  const [errorLoad, setErrorLoad] = React.useState(false);
  const [okLoad, setOKLoad] = React.useState(false);
  const [orderData, setOrderData] = React.useState(false);

  

  const requestNumberOrder = (listId) => {
    fetch(baseUrl + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': listId
      })

    })
      .then(checkResponse)
      .then(data => { setOKLoad(true); setOrderData(data) })
      .catch((err) => { setErrorLoad(true) })
  }


  function GetOrderList(state, stat) {
    const order = {
      listId: [],
      price: stat.bunItem.price * 2
    }
    order.listId = stat.filling.map(function (elem) { order.price = order.price + elem.price; return elem._id });
    order.listId.push(stat.bunItem._id, stat.bunItem._id);
    return order
  }


  React.useEffect(() => {
    countOrderPrice({ bunItem, filling })
  }, [data])

  

  return (
    <section className='mt-25 pr-0'>
      <div className={`${burgerConstructor.content}`}>
        <div className='mr-5 ml-7'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunItem.name} (верх)`}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </div>

        <ul className={`${burgerConstructor.list} custom-scroll`}>
          {data.map(item => (
            item.type != 'bun' &&
            <BurgerFiling key={item._id} elem={item} />
          ))}
        </ul>

        <div className='mr-5 ml-7'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunItem.name} (низ)`}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </div>
      </div>

      <div className={`${burgerConstructor.totalOrder} mt-10 mr-3`}>
        <div className={`${burgerConstructor.totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2"> {orderPrices.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type="primary" size="large" onClick={function () { setOpenModal(true); requestNumberOrder(orderPrices.listId) }}>Оформить заказ</Button>
      </div>

      {errorLoad && <p> --- Ошибка загрузки данных с сервера ---</p>}
      {orderData && (
        <>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <OrderDetails number={orderData.order.number} />
          </Modal>
        </>
      )}

    </section>
  )
}



export default BurgerConstructor;