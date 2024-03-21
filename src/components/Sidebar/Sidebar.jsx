import React from 'react';
import styles from './sidebar.module.scss';
import { FaUserFriends, FaClone } from 'react-icons/fa';
import { BiSolidCameraMovie } from 'react-icons/bi';
import { IoCloudDone } from 'react-icons/io5';
import { BiSolidChevronsRight } from 'react-icons/bi';
import { RiNumbersFill } from 'react-icons/ri';
import axios from 'axios';
import { api_url } from '../..';

function Sidebar({ setData }) {
	const [left, setLeft] = React.useState('-250px');
	const [dataLength, setDataLength] = React.useState(0);
	const [active, setActive] = React.useState('pass');

	const getOrders = async (requestType) => {
		window.innerWidth > 1919 ? setLeft('0px') : setLeft('-250px');
		await axios
			.post(`${api_url}/get-orders`, { requestType })
			.then((res) => {
				setDataLength(res.data.length);
				setActive('rec');
				setData(res.data);
				switch (requestType) {
					case 'recommend':
						setActive('rec');
						break;
					case 'finished':
						setActive('proc');
						break;
					default:
						setActive('pass');
						break;
				}
			})
			.catch((error) => {
				console.error('Произошла ошибка:', error);
			});
	};

	React.useEffect(() => {
		getOrders('pass');
	}, []);
	return (
		<div className={styles.wrapper} style={{ left: left }}>
			<div className={styles.menu}>
				<BiSolidChevronsRight
					onClick={(e) => {
						setLeft((prev) => {
							return prev === '0px' ? '-250px' : '0px';
						});
					}}
					size="30px"
					fill="black"
					style={{ transition: '.5s ease-in-out', rotate: left === '0px' ? '-180deg' : '0deg' }}
				/>
			</div>
			<div className={styles.logo}>
				<h1 className={styles.title}>
					advert
					<br /> <span>digital</span>
				</h1>
				<p className={styles.subtitle}>manager's web-app</p>
			</div>

			<ul className={styles.nav}>
				<li onClick={() => getOrders('pass')} className={`${styles.nav__item} ${active === 'pass' ? styles.active : null}`}>
					<BiSolidCameraMovie className={styles.icon} />
					PASS THE CASTING
				</li>

				<li onClick={() => getOrders('recommend')} className={`${styles.nav__item} ${active === 'rec' ? styles.active : null}`}>
					<FaUserFriends className={styles.icon} />
					RECOMMEND'S
				</li>

				<li onClick={() => getOrders('finished')} className={`${styles.nav__item} ${active === 'proc' ? styles.active : null}`}>
					<IoCloudDone className={styles.icon} />
					PROCESSED
				</li>

				<li className={`${styles.nav__item} ${styles.nav__item2}`}>
					<RiNumbersFill size={22} fill="white" />
					Total: {dataLength}
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
