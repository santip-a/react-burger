import React, { useMemo, FC, DragEvent  } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerFiling from './burger-filling/burger-filling';
import OrderDetails from '../modal/modal-order-details/modal-order-details';
import Modal from "../modal/modal";
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../services/types/hooks';
import { getOrder } from '../../services/actions/order';
import { useDrop } from "react-dnd";
import { checkIngredientType, sortInToConstructor } from '../../services/actions/ingredients-in-constructor';
import {
  DEL_FILLING_T0_CONSTRUCTOR,
  SORT_IN_TO_CONSTRUCTOR,
  RESET_IN_TO_CONSTRUCTOR
} from '../../services/actions/ingredients-in-constructor';
import { useHistory } from 'react-router-dom';
import { Loader } from '../loader/loader';
import {useSelector} from '../../services/types/hooks'
import {TItemIngredient} from '../../utils/types'


const BurgerConstructor: FC= () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const bun = useSelector((state) => state.ingredientsInConstructor.bunType);
  const fillings = useSelector((state) => state.ingredientsInConstructor.filling);
  const orderNumber = useSelector((state) => state.orderDetalis.order.order);
  const userAuth = useSelector((state) => state.authUser.userAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingOrder = useSelector((state) => state.orderDetalis.isLoading);
  // let elemIn: any = {};
  let elemIn: TItemIngredient = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    idInBurger: '',
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: ''
  } ;


  const priceFillings = useMemo(() => {
    return fillings.reduce(function (sum: number, current: TItemIngredient) {
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

  const requestNumberOrder = (listId: string[]) => {
    if (userAuth) {
      setModalOpen(true);
      dispatch(getOrder(listId));
    }
    else {
      history.replace({ pathname: '/login' })
    }
  }

  //===== функция добавления игредиента в конструкор =========
  function addToConstructor(item: TItemIngredient | unknown) {
    dispatch(checkIngredientType(item));
  }

  // получаем перетаскиваемый элемент
  function getElemIn(e: DragEvent<HTMLElement>, item: TItemIngredient) {
    elemIn = item
  }

  // ==== функция перетаскивание елементов внутри списка начинок
  function sortFilling(e: DragEvent<HTMLElement>, elemOut: TItemIngredient) {
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
    elemIn = {    
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      idInBurger: '',
      image: '',
      image_large: '',
      image_mobile: '',
      name: '',
      price: 0,
      proteins: 0,
      type: '',
      __v: 0,
      _id: ''}
  }

  // удаление ингридиента по корзине
  const delIngredient = (item: TItemIngredient) => {
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
          htmlType="button"
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