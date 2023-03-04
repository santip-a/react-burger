import profileOrdersStyle from './profile-orders.module.css';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { getCookie } from '../../services/api/api';
import { useDispatch } from '../../services/types/hooks';
import { exitUser, getUserData } from '../../services/actions/auth-user';
import { useSelector } from '../../services/types/hooks';
import React from 'react';
import UserOrders from '../user-orders/user-orders';
import  { FC } from "react";


const ProfileOrders: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authUser);

  React.useEffect(() => {
    if (userData.userAuth) { dispatch(getUserData()) }
  }, []);

  React.useEffect(() => {
    if (!userData.userAuth) { history.replace({ pathname: '/login' }) }
  }, [userData.userAuth]);

  const profileExit = () => {
    dispatch(exitUser({
      "token": getCookie('token')
    }));
  }

  return (
    <div className={`${profileOrdersStyle.section}`}>
      <div className={`${profileOrdersStyle.nav} mt-30`}>
        <NavLink to='/profile' exact={true} className={profileOrdersStyle.link} activeClassName={profileOrdersStyle.activeLink}>
          <p className="text text_type_main-medium text_color_inactive pt-5 pb-5 pl-5">Профиль</p>
        </NavLink>
        <NavLink to='/profile/orders' exact={true} className={profileOrdersStyle.link} activeClassName={profileOrdersStyle.activeLink}>
          <p className="text text_type_main-medium text_color_inactive pt-3 pb-5 pl-5">История заказов</p>
        </NavLink>
        <p className={`${profileOrdersStyle.button} text text_type_main-medium text_color_inactive pt-4 pb-5 pl-5`} onClick={profileExit}>Выход</p>
        <p className="text text_type_main-default text_color_inactive mt-15 pt-4 pb-5 pl-5">В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </div>
      <UserOrders />
    </div>
  );
}

export default ProfileOrders;