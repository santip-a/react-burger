import { Input, ShowIcon, HideIcon, EditIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import profile from './profile-data.module.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../services/actions/auth-user';
import { useForm } from '../../hooks/useForm';

export const ProfileData = () => {
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [visiblePasswordIcon, setVisiblePasswordIcon] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState('password');
  const [visibleButtonSave, setVisibleButtonSave] = React.useState(false);
  const inputRef = React.useRef(null);
  const userData = useSelector(state => state.authUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userData.userAuth) {
      setValues({
        name: userData.user.name,
        email: userData.user.email,
        password: userData.user.password
      })
    }
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
      name: values.name,
      email: values.email
    }
    dispatch(updateUserData(form));
    setVisibleButtonSave(false);
  }

  const cancelFormSubmit = (e) => {
    e.preventDefault();
    setValues({
      name: userData.user.name,
      email: userData.user.email,
      password: userData.user.password
    })
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
            onChange={e => { handleChange(e); check('name', e.target.value) }}
            value={values.name}
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
            onChange={e => { handleChange(e); check('email', e.target.value) }}
            value={values.email}
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
            onChange={e => { handleChange(e); check('email', e.target.password) }}
            value={values.password}
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


