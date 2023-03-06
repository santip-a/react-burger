import { Input, ShowIcon, HideIcon, EditIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import profile from './profile-data.module.css';
import React, { FC, FormEvent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { updateUserData } from '../../services/actions/auth-user';
import { useForm } from '../../hooks/useForm';
import {TInitialAuthUser} from '../../services/reducers/auth-user'

export const ProfileData: FC = () => {
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [visiblePasswordIcon, setVisiblePasswordIcon] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState<"password" | "email" | "text">('password');
  const [visibleButtonSave, setVisibleButtonSave] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const userData: TInitialAuthUser = useSelector(state => state.authUser);
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
    setTimeout(() => inputRef.current!.focus(), 0);
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

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name: values.name,
      email: values.email
    }
    dispatch(updateUserData(form));
    setVisibleButtonSave(false);
  }

  const cancelFormSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setValues({
      name: userData.user.name,
      email: userData.user.email,
      password: userData.user.password
    })
  }

  const check = (stateData: 'name' | 'email' | 'password' , inputData: string) => {
    userData.user[stateData] === inputData ? setVisibleButtonSave(false) : setVisibleButtonSave(true)
  }

  return (
    <form onSubmit={e => onFormSubmit(e)} name='prfofile'>
      <div  className={`${profile.inputs} ml-15 mt-30`}>
        <div className='mb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => { handleChange(e); check('name', e.target.value) }}
            // value={values.name}
            value={values.name ? values.name : ''}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.pen} onClick={toggleVisiblePassword}>
            <EditIcon type="secondary" />
          </span>
        </div>
        <div className='mb-6'>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => { handleChange(e); check('email', e.target.value) }}
            value={values.email ? values.email : ''}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.pen} onClick={toggleVisiblePassword}>
            <EditIcon type="secondary" />
          </span>
        </div>
        <div className='mb-6'>
          <Input
            type={visiblePassword}
            placeholder={'Пароль'}
            onChange={e => { handleChange(e); check('email', e.target.value) }}
            value={values.password ? values.password : ''}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <span className={profile.icon} onClick={toggleVisiblePassword}>
            {!visiblePasswordIcon ? <HideIcon type="secondary" /> : <ShowIcon type="secondary" />}
          </span>
        </div>
        {visibleButtonSave ?
          <div className={profile.button}>
            <Button htmlType='button' type="secondary" size="large" onClick={e => cancelFormSubmit(e)}>
              Отмена
            </Button>
            <Button htmlType='submit' type="primary" size="medium" >
              Сохранить
            </Button>
          </div>
          : ''
        }
      </div>
    </form>
  )
}


