import React, {useMemo, useState} from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerFiling from './burger-filling/burger-filling';
import OrderDetails from '../modal/modal-order-details/modal-order-details';
import Modal from "../modal/modal";
import { useSelector, useDispatch } from 'react-redux';
import {getOrder} from '../../services/actions/order';
import { useDrop } from "react-dnd";
import {
  ADD_FILLING_T0_CONSTRUCTOR,
  ADD_BUN_T0_CONSTRUCTOR,
  DEL_FILLING_T0_CONSTRUCTOR,
  ADD_IN_T0_CONSTRUCTOR
} from '../../services/actions/ingredients-in-constructor';


const BurgerConstructor = () => {
  const [openModal, setOpenModal] = useState(false);
  const bun = useSelector(state => state.ingredientsInConstructor.bunType);
  const fillings = useSelector(state => state.ingredientsInConstructor.filling);
  const orderNumber = useSelector(state => state.orderDetalis.order.order);
  let elemIn = {};
  
  const priceFillings = useMemo(() => {return fillings.reduce(function(sum, current) {   
    return sum + current.price;
  }, 0)}, [fillings])

  const dispatch = useDispatch();


  const requestNumberOrder = (listId) => {
    dispatch(getOrder(listId));
  }


  //===== функция добавления игредиента в конструкор =========
  function addToConstructor(item) {
    const idNum = new Date().valueOf();
    let cloneItem = Object.assign({}, item);
    cloneItem.idInBurger = idNum;
    if (item.type === 'bun') {
      return dispatch({type: ADD_BUN_T0_CONSTRUCTOR, payload: cloneItem});
    }
    dispatch({type: ADD_FILLING_T0_CONSTRUCTOR, payload: cloneItem});
  }

  // получаем перетаскиваемый элемент
  function getElemIn(e, item){
    elemIn = item     
  }

  // ==== функция перетаскивание елементов внутри списка начинок
  function sortFilling(e, elemOut){
    e.preventDefault(); 
    // если оба одинаковы, то ничего не делаем, выходим
    if (elemOut._id === elemIn._id) {return}    

    // находим индексы задейственных объектов
    const indexOut = fillings.indexOf(elemOut);
    

    // меняем местами    
    if (elemIn._id )  {
      dispatch({type: DEL_FILLING_T0_CONSTRUCTOR, payload: elemIn});
      dispatch({type: ADD_IN_T0_CONSTRUCTOR, payload: {indexOut, elemIn}});
    }

    // обнуляем перетаскиваемый эелемент
    elemIn = {}
  }


  // удаление ингридиента по корзине
  const delIngredient = (item) => {    
    dispatch({type: DEL_FILLING_T0_CONSTRUCTOR, payload: item});
  }
  
  const [, dropTarget] = useDrop({
    accept: "indredietItem",
    drop(item) {
      addToConstructor(item);   
      
    },
  });

  const [, dropX] = useDrop({
    accept: "indred",
  });


  function GetOrderList() {
    const listId = fillings.map(elem => elem._id);
    listId.push(bun._id, bun._id,);
    return listId
  }


    function totalPrice () {
      const priceBun = bun.price ? bun.price * 2 : 0;    
      return (priceBun + priceFillings);
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
        <ul className={`${burgerConstructor.list} custom-scroll`}  ref={dropX} >
          {fillings.map((item) => (
            item.type != 'bun'  &&
            <BurgerFiling key={item.idInBurger} 
              item={item} 
              sortFilling={sortFilling} 
              getElemIn={getElemIn}
              delIngredient={delIngredient}
            />

          ))}
        </ul>
        { bun.type &&  
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
          <p className="text text_type_digits-medium mr-2"> {totalPrice()}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button 
          disabled = {!totalPrice()}
          type="primary" 
          size="large" 
          onClick={function () {setOpenModal(true); requestNumberOrder(GetOrderList())}}>
            Оформить заказ
        </Button>
      </div>

      
      {orderNumber && (
        <>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <OrderDetails number={orderNumber.number} />
          </Modal>
        </>
      )}  
     

    </section>
  )
}



export default BurgerConstructor;