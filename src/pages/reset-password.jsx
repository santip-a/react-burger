import React from 'react';
import resetPassword from './reset-password.module.css';
import { Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { ressetPassword } from '../services/actions/auth-user';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';

const ResetPassword = () => {
	const { values, handleChange } = useForm({ password: '', token: '' });
	const [visiblePassword, setvisiblePassword] = React.useState('password');
	const [visiblePasswordIcon, setvisiblePasswordIcon] = React.useState(false);
	const inputRef = React.useRef(null);
	const history = useHistory();
	const isAuth = useSelector(state => state.authUser.userAuth);
	const { state } = useLocation();
	const dispatch = useDispatch();
	const resetPasswordSuccess = useSelector(state => state.authUser.resetPassword);

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
		alert('Icon Click Callback');
	}

	const navigation = React.useCallback(
		(e, f,) => {
			history.replace({ pathname: f });
		},
		[history]
	);

	const toggleVisiblePassword = () => {
		if (visiblePassword === 'password') {
			setvisiblePassword('text');
			setvisiblePasswordIcon(true)
		}
		else {
			setvisiblePassword('password');
			setvisiblePasswordIcon(false)
		}
	}

	const getResset = (e) => {
		e.preventDefault();
		dispatch(ressetPassword(values))
	}

	if (state === undefined) {
		return (
			<Redirect
				to={{ pathname: '/forgot-password' }}
			/>
		);
	};

	if (resetPasswordSuccess) {
		return (
			<Redirect
				to={{ pathname: '/login' }}
			/>
		)
	};

	if (isAuth) {
		return (
			<Redirect
				to={state?.from || '/'}
			/>
		)
	};

	return (
		<div className={`${resetPassword.section}`}>
			<h1 className={`${resetPassword.title} text text_type_main-medium  mb-5`}>Восстановление пароля</h1>
			<form name='reset-password' onSubmit={e => getResset(e)}>
				<div className='mb-6'>
					<Input
						type={visiblePassword}
						placeholder={'Введите новый пароль'}
						onChange={e => handleChange(e)}
						value={values.password}
						name={'password'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
					<span className={resetPassword.icon} onClick={e => { toggleVisiblePassword(e) }}>
						{!visiblePasswordIcon ? <HideIcon type="secondary" /> : <ShowIcon type="secondary" />}
					</span>
				</div>
				<div className='mb-6'>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={e => handleChange(e)}
						value={values.token}
						name={'token'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button type="primary" size="medium" >
					Зарегистрироваться
				</Button>
			</form>
			<p className={`${resetPassword.link} text text_type_main-default text_color_inactive mt-20 pt-1`}>
				Уже зарегистрированы?
				<Button type="secondary" size="medium" onClick={(e) => { navigation(e, '/login') }}>Войти</Button>
			</p>
		</div>
	);
}

export default ResetPassword;