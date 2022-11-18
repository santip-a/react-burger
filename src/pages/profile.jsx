import profile from './profile.module.css';
import { ProfileData } from '../components/profile-data/profile-data';
import { Route, Switch, NavLink, useHistory, Redirect } from 'react-router-dom';
import { getCookie } from '../services/api/api';
import { useDispatch } from 'react-redux';
import { exitUser } from '../services/actions/auth-user';
import { useSelector } from 'react-redux';
import React from 'react';
import { getUserData } from '../services/actions/auth-user';


const Profile = () => {
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
    <div className={`${profile.section} mt-30`}>
      <div className={profile.nav}>
        <NavLink to='/profile/user' className={profile.link} activeClassName={profile.activeLink}>
          <p className="text text_type_main-medium text_color_inactive pt-5 pb-5 pl-5">Профиль</p>
        </NavLink>
        <NavLink to='/profile/orders' className={profile.link} activeClassName={profile.activeLink}>
          <p className="text text_type_main-medium text_color_inactive pt-3 pb-5 pl-5">История заказов</p>
        </NavLink>
        <p className={`${profile.button} text text_type_main-medium text_color_inactive pt-4 pb-5 pl-5`} onClick={profileExit}>Выход</p>
        <p className="text text_type_main-default text_color_inactive mt-15 pt-4 pb-5 pl-5">В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </div>
      <Switch>
        <Route path='/profile' exact={true} render={() => <Redirect to="/profile/user" />} />
        <Route path='/profile/user' exact={true} component={ProfileData} />
        <Route path='/profile/orders' exact={true} ><h1>orders history</h1></Route>
      </Switch>
    </div>
  );
}

export default Profile;