import orderDetails from './modal-order-details.module.css';
import imageOK from '../../../images/orderDetailsOK.svg';

const ModalOrderDetails = () => {  
  return (
    <div className={`${orderDetails.container} pt-30 pb-30`}>
        <p className='text text_type_digits-large mb-8'>034563</p>
        <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
        <img src={imageOK} alt='Закза принят' className={`${orderDetails.image} mb-15`}/>
        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь
            готовности на орбитальной станции</p>
    </div>    
  )
}

export default ModalOrderDetails;