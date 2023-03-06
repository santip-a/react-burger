import React, {FormEvent}  from 'react';
import login from './forgot-password.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { forgotPassword, setForgotPasswor } from '../services/actions/auth-user';
import { useSelector, useDispatch } from '../services/types/hooks';
import { useForm } from '../hooks/useForm';

const ForgotPassword = () => {
	const { values, handleChange } = useForm({ email: '' });
	const [email, setEmail] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const history = useHistory();
	const isAuth = useSelector(state => state.authUser.userAuth);
	const forgotPasswordSuccess = useSelector(state => state.authUser.forgotPassword);
	const { state } = useLocation<LocationState>();
	const dispatch = useDispatch();

	interface LocationState {
		from: {
			pathname: string;
		};
	}


	const onIconClick = () => {
		setTimeout(() => inputRef.current!.focus(), 0);
		alert('Icon Click Callback');
	}


	const navigation = React.useCallback(
		(e: React.SyntheticEvent<Element, Event>, path: string,) => {
			history.replace({ pathname: path });
		},
		[history]
	);

	const getPasswordApi = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(forgotPassword(values))
	}

	if (forgotPasswordSuccess) {
		dispatch(setForgotPasswor)
		return (
			<Redirect
				to={{ pathname: '/reset-password', state: true }}
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
		<div className={`${login.section}`}>
			<h1 className={`${login.title} text text_type_main-medium  mb-5`}>Восстановление пароля</h1>
			<form name='forgot-password' onSubmit={e => getPasswordApi(e)}>
				<div className='mb-6'>
					<Input
						type={'text'}
						placeholder={'Укажите e-mail'}
						onChange={e => handleChange(e)}
						value={values.email ? values.email : ''}
						name={'email'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button htmlType='submit' type="primary" size="medium" >
					Восстановить
				</Button>
			</form>
			<p className={`${login.link} text text_type_main-default text_color_inactive mt-20 pt-1`}>
				Вспомнили пароль?
				<Button htmlType='button' type="secondary" size="medium" onClick={(e) => { navigation(e, '/login') }}>Войти</Button>
			</p>
		</div>
	);
}

export default ForgotPassword;