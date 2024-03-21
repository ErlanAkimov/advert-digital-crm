import styles from './catalog.module.scss';
export default function OrderComments({ comments }) {
	return (
		<div className={styles.comments}>
			<div className={styles.imgside}>
				<div className={styles.avatar}>
					<img src={comments.image} alt="" />
				</div>
                <p>{comments.username}</p>
			</div>

			{comments.comment}
		</div>
	);
}
