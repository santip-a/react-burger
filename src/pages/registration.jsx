import React from 'react';
import registration from './registration.module.css';
import { getRegistration, setPassword } from '../services/actions/auth-user'
import { Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';

const Registration = () => {
	const { values, handleChange } = useForm({ name: '', email: '', password: '' });
	const [visiblePassword, setvisiblePassword] = React.useState('password');
	const [visiblePasswordIcon, setvisiblePasswordIcon] = React.useState(false);
	const inputRef = React.useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.authUser.userAuth);

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
		alert('Icon Click Callback');
	}

	const navigation = React.useCallback(
		(e, path,) => {
			history.replace({ pathname: path });
		},
		[history]
	);

	const toggleVisiblePassword = (e) => {
		e.preventDefault();
		if (visiblePassword === 'password') {
			setvisiblePassword('text');
			setvisiblePasswordIcon(true)
		}
		else {
			setvisiblePassword('password');
			setvisiblePasswordIcon(false)
		}
	}


	const registerInApp = (e) => {
		e.preventDefault();
		dispatch(getRegistration(values));
		dispatch(setPassword(values.password))
	}

	if (isAuth) {
		return (
			<Redirect
				to={'/'}
			/>
		)
	}

	return (
		<div className={`${registration.section}`}>
			<h1 className={`${registration.title} text text_type_main-medium  mb-5`}>Регистрация</h1>
			<form name='registration' onSubmit={e => registerInApp(e)}>
				<div className='mb-6'>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={e => handleChange(e)}
						value={values.name}
						name={'name'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type={'text'}
						placeholder={'E-mail'}
						onChange={e => handleChange(e)}
						value={values.email}
						name={'email'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type={visiblePassword}
						placeholder={'Пароль'}
						onChange={e => handleChange(e)}
						value={values.password}
						name={'password'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
					<span className={registration.icon} onClick={e => { toggleVisiblePassword(e) }}>
						{!visiblePasswordIcon ? <HideIcon type="secondary" /> : <ShowIcon type="secondary" />}
					</span>
				</div>
				<Button type="primary" size="medium" >
					Зарегистрироваться
				</Button>
			</form>
			<p className={`${registration.link} text text_type_main-default text_color_inactive mt-20 pt-1`}>
				Уже зарегистрированы?
				<Button type="secondary" size="medium" onClick={(e) => { navigation(e, '/login') }}>Войти</Button>
			</p>
		</div>
	);
}

export default Registration;