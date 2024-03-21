import React, { useRef, useState } from 'react';
import Layout from '../Layout/Layout';
import styles from './home.module.scss';
import MemberCard from '../../components/MemberCard/MemberCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { CiHardDrive, CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { FaArrowAltCircleUp } from 'react-icons/fa';
function Home() {
	const listRef = useRef(null);

	const [data, setData] = useState();
	const [currentData, setCurrentData] = useState([]);
	const [searchBlockVisibility, setSearchBlockVisibility] = useState('0px');
	const [searchValue, setSearchValue] = useState('');
	const [goTop, setGoTop] = useState(0);
	const [renderValue, setRenderValue] = useState(20);
	React.useEffect(() => {
		const filteredData = data?.filter((item) => item.country.toUpperCase().startsWith(searchValue.toUpperCase()));
		setCurrentData(filteredData);

		if (searchValue === '') {
			setCurrentData(data);
		}
	}, [searchValue]);

	React.useEffect(() => {
		setCurrentData(data);
		// let result = [];
		// data?.map((a) => {
		// 	const newd = data.filter((item) => item.phone_number == a.phone_number);
		// 	if (newd.length > 1) {
		// 		console.log(newd);
		// 	}
		// });
		// console.log(result);
	}, [data]);

	React.useEffect(() => {
		const handleScroll = () => {
			if (listRef.current.scrollHeight - window.scrollY < 800) {
				setRenderValue((prev) => prev + 20);
			}
			if (window.innerWidth > 900 && listRef.current.scrollHeight - window.scrollY > 4000) {
				setRenderValue((prev) => prev - 20);
			}

			if (window.innerWidth < 900 && listRef.current.scrollHeight - window.scrollY > 7000) {
				setRenderValue((prev) => prev - 20);
			}
			const scrollTop = window.scrollY;
			scrollTop < 300 ? setGoTop(0) : setGoTop(1);
		};

		// Добавление слушателя события при монтировании компонента
		window.addEventListener('scroll', handleScroll);

		// Удаление слушателя события при размонтировании компонента
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Layout>
			{/* <div className={styles.info} style={{
				position: 'fixed',
				transform: 'translate(-50%, -50%)',
				top: '50%',
				left: '50%',
				zIndex: 1000,
				backgroundColor: '#fff',
				fontSize: 30,
			}}>
				{info}
			</div> */}
			<div
				className="go-top"
				style={{
					opacity: goTop,
					visibility: goTop ? 'initial' : 'hidden',
				}}
			>
				<FaArrowAltCircleUp
					onClick={() => {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
					size={60}
					fill={'black'}
				/>
			</div>
			<Sidebar setData={setData} />
			<div className={styles.wrapper}>
				<div className={styles.mobileSearch}>
					<input type="text" placeholder="search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
					<CiSearch size="30px" onClick={(e) => setSearchBlockVisibility('200px')} />
				</div>
				<div className={styles.toplist}>
					<div className={styles.lor}>
						<p className={styles.name}>Name</p>
						<p className={styles.name}>Phone number</p>
						<p className={styles.native}>Native</p>
						<p className={styles.name}>Other langs</p>
						<p className={styles.name}>Contacts</p>
						<p className={styles.name}>Date</p>
						<div className={styles.search}>
							<div className={styles.searchInput} style={{ maxWidth: searchBlockVisibility }}>
								<input placeholder="search..." type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
							</div>

							{searchBlockVisibility === '0px' ? (
								<CiSearch size="20px" onClick={(e) => setSearchBlockVisibility('240px')} />
							) : (
								<MdClose
									size="20px"
									onClick={(e) => {
										setSearchBlockVisibility('0px');
										setSearchValue('');
									}}
								/>
							)}
						</div>
					</div>
				</div>

				<div ref={listRef} className={styles.list}>
					{currentData && currentData.slice(0, renderValue).map((item) => <MemberCard key={item.id} member={item} />)}
				</div>
			</div>

			{/* <div
				className={styles.logoutBtn}
				onClick={(e) => {
					setOpacity('1');
					setTimeout(() => {
						setOpacity('0');
					}, 3000);
				}}
			>
				Logout
				<div
					className={styles.stillbeta}
					style={{ opacity: opacity, pointerEvents: 'none', transition: '.2s' }}
				>
					doesn't work yet =(
					<br />
					still beta, bro...
				</div>
			</div> */}
		</Layout>
	);
}
export default Home;
