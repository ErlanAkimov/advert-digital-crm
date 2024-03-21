import styles from './defaultbtn.module.scss';
export const ButtonDefault = ({ children, propStyle, onClick }) => {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				onClick();
			}}
			className={styles.btn}
			style={propStyle}
		>
			{children}
		</button>
	);
};
