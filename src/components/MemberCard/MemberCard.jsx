import React from 'react';
import styles from './s.module.scss';
import { IoMdDoneAll } from 'react-icons/io';
import { api_url } from '../..';
import axios from 'axios';

function MemberCard({ member }) {
	const [done, setDone] = React.useState(false);

	React.useEffect(() => {
		member.done === 0 ? setDone(true) : setDone(false);
	}, []);
	return (
		<div className={styles.wrapper}>
			<p className={styles.id}>id: {member.id}</p>
			<div className={styles.names}>
				<p className={styles.name}>{member.name}</p>
				<p className={styles.country}>{member.country}</p>
			</div>

			<div className={styles.phone}>
				{window.innerWidth < 1219 && <div className={styles.type}>Phone:</div>}
				<p>({member.code})</p>
				<p> {member.phone}</p>
			</div>

			<div className={styles.native}>
				{window.innerWidth < 1219 && <div className={styles.type}>Native:</div>}
				<p>{member.native}</p>
			</div>

			<div className={styles.other}>
				{window.innerWidth < 1219 && <div className={styles.type}>Other:</div>}
				<p>{member.other}</p>
			</div>

			<div className={styles.contacts}>
				{window.innerWidth < 1219 && <div className={styles.type}>Contacts:</div>}
				<p>{member.contacts}</p>
			</div>

			<div className={styles.date}>
				{window.innerWidth < 1219 && <div className={styles.type}>Date:</div>}
				<p>
					{member.date.split(' ')[0].split('-')[2]}.{member.date.split(' ')[0].split('-')[1]}
				</p>

				<p>
					{member.date.split(' ')[1].split(':')[0]}:{member.date.split(' ')[1].split(':')[1]}
				</p>
			</div>

			{done && (
				<button onClick={MemberIsDone} className={styles.done}>
					<IoMdDoneAll fill="white" size="20px" />
				</button>
			)}
		</div>
	);

	async function MemberIsDone() {
		axios.post(`${api_url}/order-is-done`, member);
		const url = 'https://admin.advert-digital.com/backend/member-is-done.php';
		const id = member.id;

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ id }),
		};

		try {
			const response = await fetch(url, options);
		} catch (error) {
			console.error(error);
		}
	}
}

export default MemberCard;
