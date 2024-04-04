import { useEffect, useState } from 'react';
import { Row } from './Row';
import styles from './catalog.module.scss';
import { FaFilter } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';
import { api_url } from '../..';
import { SkeletonRow } from './skeletonRow';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction, setOrdersList } from '../../redux/reducers/catalogReducer';
import { logout } from '../../redux/reducers/userReducer';

const skeletonArray = Array(30).fill('');

export default function Catalog() {
	const dispatch = useDispatch();
	const catalog = useSelector((state) => state.catalog);
	const user = useSelector((state) => state.user);
	const [renderValue, setRenderValue] = useState(31);
	const [tab, setTab] = useState('pass');
	const [searchValue, setSearchValue] = useState('');
	const [searchBy, setSearchBy] = useState('country');
	const [filterForm, setFilterForm] = useState(false);

	useEffect(() => {
		fetchData(tab);
		document.addEventListener('scroll', scrollHandler);
		return () => document.removeEventListener('scroll', scrollHandler);
	}, []);

	useEffect(() => {
		fetchData(tab);
	}, [user.auth]);

	const scrollHandler = (e) => {
		const scrollHeight = e.target.documentElement.scrollHeight;
		const innerHeight = window.innerHeight;
		const scrollTop = e.target.documentElement.scrollTop;

		if (scrollHeight - (scrollTop + innerHeight) < 300) {
			setRenderValue((prev) => prev + 10);
		}
		if (scrollHeight - (scrollTop + innerHeight) > 1300) {
			setRenderValue((prev) => prev - 30);
		}
	};

	const handleSearchValue = (e) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		dispatch(searchAction({ searchBy, searchValue }));
	}, [searchValue]);

	return (
		<div className={styles.catalog}>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<div className={styles.tabTitle}>
						<p
							onClick={() => {
								fetchData('pass');
								setSearchValue('');
							}}
							className={tab === 'pass' ? styles.active : null}
						>
							PASS
						</p>
						<p
							onClick={() => {
								fetchData('recommend');
								setSearchValue('');
							}}
							className={tab === 'recommend' ? styles.active : null}
						>
							RECOMMENDS
						</p>
						<p
							onClick={() => {
								fetchData('done');
								setSearchValue('');
							}}
							className={tab === 'done' ? styles.active : null}
						>
							DONE
						</p>
						<p
							onClick={() => {
								fetchData('casting');
								setSearchValue('');
							}}
							className={tab === 'casting' ? styles.active : null}
						>
							CASTING
						</p>
						<p
							onClick={() => {
								fetchData('cast-recs');
								setSearchValue('');
							}}
							className={tab === 'cast-recs' ? styles.active : null}
						>
							CASTING RECOMMENDS
						</p>
					</div>
					<div className={styles.counter}>Total: {catalog.total}</div>
				</div>
				<div className={styles.search}>
					<div className={styles.filter}>
						<div
							className={styles.filterIconBlock}
							onClick={() => {
								setFilterForm(true);
							}}
						>
							<FaFilter className={styles.filterIcon} />
						</div>
						{filterForm && (
							<div className={styles.filterForm}>
								<p className={styles.formTitle}>
									{user.language === 'ru' ? 'Фильтровать по' : 'Filter by'}
									<span
										onClick={() => {
											setFilterForm(false);
										}}
										className={styles.closeIcon}
									>
										<IoIosClose className={styles.ioIcon} />
									</span>
								</p>
								<ul>
									<label onClick={() => setSearchBy('name')}>
										<div className={`${styles.radio} ${searchBy === 'name' ? styles.pickedFilter : null}`}></div>
										{user.language === 'ru' ? 'Имени' : 'Name'}
									</label>
									<label onClick={() => setSearchBy('country')}>
										<div className={`${styles.radio} ${searchBy === 'country' ? styles.pickedFilter : null}`}></div>
										{user.language === 'ru' ? 'Стране' : 'Country'}
									</label>
									<label onClick={() => setSearchBy('phone')}>
										<div className={`${styles.radio} ${searchBy === 'phone' ? styles.pickedFilter : null}`}></div>
										{user.language === 'ru' ? 'Телефону' : 'Phone number'}
									</label>
									<span>
										{user.language === 'ru' ? 'Только номер, без международного кода' : 'Only phone number, without country code'}
									</span>
								</ul>
							</div>
						)}
					</div>
					<input type="text" placeholder={user.language === 'ru' ? `Поиск` : `Search `} onChange={handleSearchValue} value={searchValue} />
					<button className={styles.search__btn}>
						<CiSearch size={20} />
					</button>
				</div>

				{catalog.list.length === 0
					? skeletonArray.map((item, index) => <SkeletonRow key={index} />)
					: catalog.list.slice(0, renderValue).map((item) => <Row key={item.id} data={item} />)}
			</div>
		</div>
	);

	async function fetchData(type) {
		setTab(type);
		await axios.post(`${api_url}/get-orders/${type}`, { requestType: type }).then((res) => {
			console.log(res.data);
			if (res.data.list) {
				dispatch(setOrdersList(res.data));
				res.data.list.length < 31 ? setRenderValue(res.data.list.length) : setRenderValue(30);
			}

			if (res.data === 'invalid authToken') {
				dispatch(setOrdersList({ list: [], total: 0 }));
				dispatch(logout());
				return;
			}
		});

		if (type === 'pass' && user.auth) {
			axios.post(`${api_url}/get-orders/${type}`, { requestType: 'all' + type }).then((res) => {
				dispatch(setOrdersList(res.data));
			});
		}
	}
}
