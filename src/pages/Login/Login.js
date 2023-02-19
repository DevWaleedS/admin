import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '../../UI/Button/Button';
import Logo from '../../assets/images/Login_Logo.svg';
import Context from '../../store/context';
import axios from 'axios';

const MainPage = () => {
	const token = localStorage.getItem('token');
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [error, setError] = useState('');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const navigate = useNavigate();

	const Login = () => {
		setError('');
		setUsernameError('');
		setPasswordError('');
		const data = {
			user_name: username,
			password: password,
		};
		axios.post('https://backend.atlbha.com/api/loginapi', data).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				setEndActionTitle(res?.data?.message?.ar);
				localStorage.setItem('token', res?.data?.data?.token);
				navigate('/');
			} else {
				setUsernameError(res?.data?.message?.en?.user_name?.[0]);
				setPasswordError(res?.data?.message?.en?.password?.[0]);
				setError(res?.data?.message?.ar);
			}
		});
	};

	return token ? (
		<Navigate to='/' />
	) : (
		<div className={`${styles.login_page}`}>
			<div className='md:w-[550px] w-full max-w-full flex flex-col items-center md:p-16 p-8 bg-white rounded-xl'>
				<div className='flex flex-col items-center justify-center w-[200px]'>
					<img className='w-full' src={Logo} alt='logo' />
				</div>
				<div className='w-full'>
					<div className='flex flex-col'>
						<input
							className={`${styles.input} md:h-[55px] h-[45px] md:text-[18px] text-[16px] mb-4`}
							placeholder='ادخل اسم المستخدم'
							type='text'
							name='username'
							value={username}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
						/>
						{usernameError && <span className='text-red-500'>{usernameError}</span>}
					</div>
					<div className='flex flex-col'>
						<input
							className={`${styles.input} md:h-[55px] h-[45px] md:text-[18px] text-[16px] mb-4`}
							placeholder='ادخل كلمة المرور'
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						{passwordError && <span className='text-red-500'>{passwordError}</span>}
						{error && <span className='text-red-500'>{error}</span>}
					</div>
					<Button type={'normal'} className={'text-center w-full mt-12 md:h-14 h-[44px] text-xl'} style={{ backgroundColor: '#02466A' }} onClick={Login}>
						تسجيل الدخول
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
