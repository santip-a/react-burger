import React, { useMemo } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerFiling from './burger-filling/burger-filling';
import OrderDetails from '../modal/modal-order-details/modal-order-details';
import Modal from "../modal/modal";
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { useDrop } from "react-dnd";
import { checkIngredientType, sortInToConstructor } from '../../services/actions/ingredients-in-constructor';
import {
  DEL_FILLING_T0_CONSTRUCTOR,
  SORT_IN_TO_CONSTRUCTOR,
  RESET_IN_TO_CONSTRUCTOR
} from '../../services/actions/ingredients-in-constructor';
import { useHistory } from 'react-router-dom';
import { Loader } from '../loader/loader'


const BurgerConstructor = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const bun = useSelector(state => state.ingredientsInConstructor.bunType);
  const fillings = useSelector(state => state.ingredientsInConstructor.filling);
  const orderNumber = useSelector(state => state.orderDetalis.order.order);
  const userAuth = useSelector(state => state.authUser.userAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingOrder = useSelector(state => state.orderDetalis.isLoading);
  let elemIn = {};


  const priceFillings = useMemo(() => {
    return fillings.reduce(function (sum, current) {
      return sum + current.price;
    }, 0)
  }, [fillings])

  const priceBun = useMemo(() => {
    return bun.price ? bun.price * 2 : 0;
  }, [bun])

  const totalPrice = () => {
    if (priceBun > 0) {
      return priceBun + priceFillings;
    }
  }

  const requestNumberOrder = (listId) => {
    if (userAuth) {
      setModalOpen(true);
      dispatch(getOrder(listId));
    }
    else {
      history.replace({ pathname: '/login' })
    }
  }

  //===== функция добавления игредиента в конструкор =========
  function addToConstructor(item) {
    dispatch(checkIngredientType(item));
  }

  // получаем перетаскиваемый элемент
  function getElemIn(e, item) {
    elemIn = item
  }

  // ==== функция перетаскивание елементов внутри списка начинок
  function sortFilling(e, elemOut) {
    e.preventDefault();
    // если оба одинаковы, то ничего не делаем, выходим
    if (elemOut._id === elemIn._id) { return }

    // находим индексы задейственных объектов
    const indexOut = fillings.indexOf(elemOut);

    // меняем местами    
    if (elemIn._id) {
      dispatch({
        type: SORT_IN_TO_CONSTRUCTOR,
        payload: sortInToConstructor(indexOut, elemIn, fillings)
      });
    }

    // обнуляем перетаскиваемый эелемент
    elemIn = {}
  }

  // удаление ингридиента по корзине
  const delIngredient = (item) => {
    dispatch({ type: DEL_FILLING_T0_CONSTRUCTOR, payload: item });
  }

  const [, dropTarget] = useDrop({
    accept: "ingdredietItem",
    drop(item) {
      addToConstructor(item);
    },
  });

  const [, dropX] = useDrop({
    accept: "indred",
  });

  function getOrderList() {
    const listId = fillings.map(elem => elem._id);
    listId.unshift(bun._id)
    listId.push(bun._id);
    return listId
  }

  const closeModal = () => {
    dispatch({
      type: RESET_IN_TO_CONSTRUCTOR
    });
    setModalOpen(false);
  }

  return (
    <section className='mt-25 pr-0' ref={dropTarget}>
      <div className={`${burgerConstructor.content}`}>
        {bun.type &&
          (<div className='mr-5 ml-7'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>)
        }
        <ul className={`${burgerConstructor.list} custom-scroll`} ref={dropX} >

          {fillings.map((item) => (
            item.type != 'bun' &&
            (<BurgerFiling key={item.idInBurger}
              item={item}
              sortFilling={sortFilling}
              getElemIn={getElemIn}
              delIngredient={delIngredient}
            />)
          ))}

        </ul>
        {bun.type &&
          (<div className='mr-5 ml-7'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>)
        }
      </div>

      <div className={`${burgerConstructor.totalOrder} mt-10 mr-3`}>
        <div className={`${burgerConstructor.totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2"> {!totalPrice() ? 0 : totalPrice()}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          disabled={!totalPrice()}
          type="primary"
          size="large"
          onClick={() => requestNumberOrder(getOrderList())}>
          Оформить заказ
        </Button>
      </div>

      {loadingOrder && (
          <Loader />
      )}

      {orderNumber && (
        modalOpen &&
        <Modal onClose={closeModal}>
          <OrderDetails number={orderNumber.number} />
        </Modal>
      )}
    </section>
  )
}


export default BurgerConstructor;