import { Input, ShowIcon, HideIcon, EditIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import profile from './profile-data.module.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../services/actions/auth-user'

export const ProfileData = () => {
  const [visiblePasswordIcon, setVisiblePasswordIcon] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState('password');
  const [visibleButtonSave, setVisibleButtonSave] = React.useState(false);
  const inputRef = React.useRef(null);
  const userData = useSelector(state => state.authUser);
  const [nameUser, setName] = React.useState('');
  const [emailUser, setEmail] = React.useState('');
  const [passwordUser, setPasswordUser] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userData.userAuth) {
      setName(userData.user.name);
      setEmail(userData.user.email);
      setPasswordUser(userData.user.password);
    }
    setPasswordUser(userData.user.password);
  }, [userData]);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  }

  const toggleVisiblePassword = () => {
    if (visiblePassword === 'password') {
      setVisiblePassword('text');
      setVisiblePasswordIcon(true)
    }
    else {
      setVisiblePassword('password');
      setVisiblePasswordIcon(false)
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const form = {
      name: nameUser,
      email: emailUser
    }
    console.log(passwordUser)
    dispatch(updateUserData(form));
    setVisibleButtonSave(false);
  }

  const cancelFormSubmit = (e) => {
    e.preventDefault();
    setName(userData.user.name);
    setEmail(userData.user.email);
    setPasswordUser(userData.user.password);
  }

  const check = (stateData, inputData) => {
    userData.user[stateData] === inputData ? setVisibleButtonSave(false) : setVisibleButtonSave(true)
  }

  return (
    <form onSubmit={e => onFormSubmit(e)} name='prfofile'>
      <div name="profileData" className={`${profile.inputs} ml-15`}>
        <div className='mb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => { setName(e.target.value); check('name', e.target.value) }}
            value={nameUser === undefined ? '' : nameUser}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.pen} onClick={e => { toggleVisiblePassword(e) }}>
            <EditIcon type="secondary" />
          </span>
        </div>
        <div className='mb-6'>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => { setEmail(e.target.value); check('email', e.target.value) }}
            value={emailUser === undefined ? '' : emailUser}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.pen} onClick={e => { toggleVisiblePassword(e) }}>
            <EditIcon type="secondary" />
          </span>
        </div>
        <div className='mb-6'>
          <Input
            type={visiblePassword}
            placeholder={'Пароль'}
            onChange={e => { setPasswordUser(e.target.value); check('email', e.target.password) }}
            value={passwordUser === undefined ? '' : passwordUser}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.icon} onClick={e => { toggleVisiblePassword(e) }}>
            {!visiblePasswordIcon ? <HideIcon type="secondary" /> : <ShowIcon type="secondary" />}
          </span>
        </div>
        {visibleButtonSave ?
          <div className={profile.button}>
            <Button type="secondary" size="large" onClick={e => cancelFormSubmit(e)}>
              Отмена
            </Button>
            <Button type="primary" size="medium" >
              Сохранить
            </Button>
          </div>
          : ''
        }
      </div>
    </form>
  )
}


