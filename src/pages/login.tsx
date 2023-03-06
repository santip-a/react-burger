import React, {FormEvent} from 'react';
import login from './login.module.css';
import { Input, ShowIcon, Button, HideIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import { getAuth, setPassword } from '../services/actions/auth-user';
import { useForm } from '../hooks/useForm'

const Login = () => {
	const { values, handleChange } = useForm({ email: '', password: '' });
	const [visiblePassword, setvisiblePassword] = React.useState<"text" | "password" | "email">('password');
	const [visiblePasswordIcon, setvisiblePasswordIcon] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.authUser.userAuth);
	const { state } = useLocation<LocationState>();

	interface LocationState {
		from: {
			pathname: string;
		};
	}

	const onIconClick = () => {
		setTimeout(() => inputRef.current!.focus(), 0);
		alert('Icon Click Callback');
	}

	const navigation = (e: React.SyntheticEvent<Element, Event>, f: string,) => {
		history.replace({ pathname: f });
	}

	const toggleVisiblePassword = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
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

	function getAuthorisation(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(getAuth(values));
		dispatch(setPassword(values.password))
	}

	if (isAuth) {
		return (
			<Redirect
				to={state?.from || '/'}
			/>
		)
	}

	return (
		<div className={`${login.section}`}>
			<h1 className={`${login.title} text text_type_main-medium  mb-5`}>Вход</h1>
			<form name='login' onSubmit={e => getAuthorisation(e)}>
				<div className='mb-6'>
					<Input
						type={'text'}
						placeholder={'E-mail'}
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
				<div className='mb-6'>
					<Input
						type={visiblePassword}
						placeholder={'Пароль'}
						onChange={e => handleChange(e)}
						value={values.password ? values.password : ''}
						name={'password'}
						error={false}
						ref={inputRef}
						onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
					/>
					<span className={login.icon} onClick={e => { toggleVisiblePassword(e) }}>
						{!visiblePasswordIcon ? <HideIcon type="secondary" /> : <ShowIcon type="secondary" />}
					</span>
				</div>
				<Button htmlType='submit' type="primary" size="medium" >
					Войти
				</Button>
			</form>
			<p className={`${login.link} text text_type_main-default text_color_inactive mt-20 pt-1`}>
				Вы — новый пользователь?
				<Button htmlType='button' type="secondary" size="medium" onClick={(e) => { navigation(e, '/register') }}>Зарегистрироваться</Button>
			</p>
			<p className={`${login.link} text text_type_main-default text_color_inactive mt-4`}>
				Забыли пароль?
				<Button htmlType='button' type="secondary" size="medium" onClick={(e) => { navigation(e, '/forgot-password') }}>Восстановить пароль</Button>
			</p>
		</div>
	);
}

export default Login;