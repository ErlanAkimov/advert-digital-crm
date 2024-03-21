import { api_url } from '../..';
import styles from './authmodal.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../redux/reducers/userReducer';

export default function AuthModal() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [rememberCheckbox, setRememberCheckbox] = useState(true);
	const [username, setUsername] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [message, setMessage] = useState(null);

	const handleRememberer = () => {
		setRememberCheckbox((prev) => !prev);
	};

	const handlePasswordChange = (e) => {
		setPasswordValue(e.target.value);
	};
	const handleLoginChange = (e) => {
		setUsername(e.target.value);
	};

	useEffect(() => {
		const session = sessionStorage.getItem('auth');
		if (session) {
			dispatch(authUser(JSON.parse(session)));
		}
		const local = localStorage.getItem('auth');
		if (local) {
			dispatch(authUser(JSON.parse(local)));
		}
	}, []);

	const Login = () => {
		setPasswordValue('');
		setUsername('');
		const loginData = {
			username,
			passwordValue,
		};
		axios.post(`${api_url}/login`, loginData).then((res) => {
			if (res.data.status !== 'logged on') {
				setMessage(res.data);
				return;
			}
			if (res.data.status === 'logged on') {
				dispatch(authUser(res.data.user));
			}

			if (rememberCheckbox) {
				localStorage.setItem('auth', JSON.stringify(res.data.user));
			}

			if (!rememberCheckbox) {
				sessionStorage.setItem('auth', JSON.stringify(res.data.user));
			}
		});
	};

	return (
		<div className={styles.wrapperOuter} style={user.auth ? { display: 'none' } : null}>
			<div className={styles.overlay}>
				<div className={styles.wrapper}>
					<div className={styles.form}>
						<h1>Hi, who are you?</h1>
						<input
							onKeyDown={(e) => e.key === 'Enter' && Login()}
							onChange={handleLoginChange}
							value={username}
							type="text"
							placeholder="Use your login"
						/>
						<input
							onKeyDown={(e) => e.key === 'Enter' && Login()}
							onChange={handlePasswordChange}
							value={passwordValue}
							type="password"
							placeholder="Enter your password"
						/>
						<label onClick={handleRememberer} className={styles.remember}>
							<div className={styles.checkbox}>{rememberCheckbox && <div className={styles.checker}></div>}</div>
							<span>Remember me</span>
						</label>
						{message && <div className={styles.message}>{message}</div>}

						<button onClick={Login}>Sign in</button>
					</div>
				</div>
			</div>
		</div>
	);
}
