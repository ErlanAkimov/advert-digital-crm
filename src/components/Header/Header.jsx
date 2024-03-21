import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, switchLanguage } from '../../redux/reducers/userReducer';
import { api_url } from '../..';
import axios from 'axios';
import AuthModal from '../AuthModal/AuthModal';

export default function Header() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [showAccount, setShowAccount] = useState(false);

	const handleSwitchLang = () => {
		dispatch(switchLanguage());
	};

	const handleLogout = () => {
		axios.post(`${api_url}/logout`, { username: user.username, session: user.session });
		dispatch(logout());
	};

	return (
		<div className={styles.header}>
			<AuthModal />
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<h1>WA</h1>
					<nav>
						{/* <Link className={styles.active}>{user.language === 'ru' ? 'заявки' : 'orders'}</Link>
							<Link className={styles.active}>{user.language === 'ru' ? 'рекоммендации' : 'recommends'}</Link> */}
					</nav>
				</div>

				<div className={styles.right}>
					<button onClick={handleSwitchLang} className={styles.langSwitcher}>
						{user.language}
					</button>
					<Link className={styles.avatar} onClick={() => setShowAccount((prev) => !prev)}>
						<img src={user.image} alt="" />
					</Link>
				</div>

				{showAccount && (
					<div className={styles.account}>
						<div className={styles.title}>
							<h3>{user.username}</h3>
							{/* <p className={styles.country}>Country: {user.defaultCountry}</p> */}
							<button onClick={handleLogout} className={styles.logout}>
								logout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
