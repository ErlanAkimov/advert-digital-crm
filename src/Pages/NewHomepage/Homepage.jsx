import Catalog from '../../components/Catalog/Catalog';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './homepage.module.scss';

export default function Homepage() {
	return (
		<div className={styles.wrapper}>
			<Header />
			<Catalog />
			{/* <Footer /> */}
		</div>
	);
}
