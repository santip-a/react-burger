import React, { FC } from 'react';
import style from './app.module.css';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { getData } from '../../services/actions/ingredients';
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';
import Constructor from '../../pages/constructor';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Ingredients from '../../pages/ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/modal-ingredient-details/modal-ingredient-details';
import Page404 from '../../pages/page_404';
import Feed from '../../pages/feed';
import OrderInfo from '../orderFeed/order-info/order-info';
import { getUserData } from '../../services/actions/auth-user';
import { getCookie } from '../../services/api/api';
import ProfileOrders from '../profile-orders/profile-orders';

import {ILocationState} from '../../utils/types';


const App: FC = () => {
  window.history.replaceState({}, document.title);

  const dispatch: any = useDispatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(getData());
  }, []);


  React.useEffect(() => {
    const tokenAvailable = getCookie('accessToken')
    if (tokenAvailable) { dispatch(getUserData()) }
  }, []);

  const closeModal = (path: string) => {
    history.replace({ pathname: path });
  };

  return (
    <div className={style.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <Constructor />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/register" exact={true}>
            <Registration />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrders />
          </ProtectedRoute>
          <Route path="/ingredients/:id" >
            <Ingredients />
          </Route>
          <Route path="/feed" exact={true}>
            <Feed />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderInfo />
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <OrderInfo />
          </Route>
          <Route path='*'>
            <Page404 />
          </Route>
        </Switch>

        {background &&
          (<Route path="/ingredients/:id" >
            <Modal onClose={() => closeModal('/')}>
              <IngredientDetails />
            </Modal>
          </Route>)}

        {background &&
          (<Route path="/feed/:id" >
            <Modal onClose={() => closeModal('/feed')}>
              <OrderInfo />
            </Modal>
          </Route>)}

        {background &&
          (<Route path="/profile/orders/:id" >
            <Modal onClose={() => closeModal('/profile/orders')}>
              <OrderInfo />
            </Modal>
          </Route>)}

      </DndProvider>
    </div>
  )
}

export default App;
