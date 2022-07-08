import React from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerFiling from './burger-filling/burger-filling';
import OrderDetails from '../modal/modal-order-details/modal-order-details';
import PropTypes from 'prop-types';
import {ingredientForPropTypes} from '../../constants/constants';

const BurgerConstructor = (props) => {
  const data = props.dataList;
  const [openModal,setOpenModal] = React.useState(false);

  const bunItem = data.find(item => item.type === 'bun');

  BurgerConstructor.propTypes = {
    dataList: PropTypes.arrayOf(
      PropTypes.shape(ingredientForPropTypes).isRequired      
      ).isRequired
  };

  

  return (
    <section className='mt-25 pr-0'>
      <div className={`${burgerConstructor.content}`}>
        <div className='mr-5 ml-7'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunItem.name } (верх)`}
          price={bunItem.price}
          thumbnail={bunItem.image}
        />
      </div>
   
      <ul className={`${burgerConstructor.list} custom-scroll`}>
        {data.map(item => (
          item.type != 'bun' &&
          <BurgerFiling key={item._id} elem={item}/>
          ))}    
      </ul>

      <div className='mr-5 ml-7'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunItem.name } (низ)`}
          price={bunItem.price}
          thumbnail={bunItem.image}
        />
      </div>
      </div>

      <div className={`${burgerConstructor.totalOrder} mt-10 mr-3`}>
        <div className={`${burgerConstructor.totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2"> 610</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type="primary" size="large" onClick={() => {setOpenModal(true)}}>Оформить заказ</Button>
      </div>

      <OrderDetails open={openModal} onClose={setOpenModal} />

    </section>

  )

  
  
}

export default BurgerConstructor;