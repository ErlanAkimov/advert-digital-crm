import { BiLogoTelegram } from 'react-icons/bi';
import styles from './catalog.module.scss';

export default function ContactsRecycler({ contacts }) {
	const splitted = contacts.split(' ');
	let tgaccount;
	splitted.map((word) => {
		if (word.startsWith('@')) {
			tgaccount = word;
		}
	});
	if (tgaccount?.startsWith('@')) {
		return (
			<a target="_blank" href={`https://t.me/${tgaccount.substring(1)}`}>
				<button className={styles.tgIconBlock}>
					<BiLogoTelegram fill={'white'} />
				</button>
			</a>
		);
	} else {
		return contacts;
	}
}
