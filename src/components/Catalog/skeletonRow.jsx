import styles from './catalog.module.scss';

export const SkeletonRow = () => {
	return (
		<div className={`${styles.row} ${styles.skeletonRow}`} style={{ maxHeight: 30, height: 30 }}>

		</div>
	);
};
