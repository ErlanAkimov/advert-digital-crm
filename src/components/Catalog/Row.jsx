import { useEffect, useRef, useState } from 'react';
import styles from './catalog.module.scss';
import { FaRegCopy, FaComments } from 'react-icons/fa';
import copy from 'clipboard-copy';
import ContactsRecycler from './ContactsRecycler';
import OrderComments from './OrderComments';
import { IoSend } from 'react-icons/io5';
import { api_url } from '../..';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pushNewComment } from '../../redux/reducers/catalogReducer';

export const Row = ({ data }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [copyMessage, setCopyMessage] = useState(false);
	const code = data.code?.replace(/\D/g, '');
	const [maxHeight, setMaxHeight] = useState(() => (window.innerWidth < 1219 ? 50 : 30));
	const [textareaValue, setTextareaValue] = useState();
	const contentRef = useRef();
	const topsideRef = useRef();

	const [resizeRow, setResizeRow] = useState(0);

	useEffect(() => {
		if (resizeRow > 0) {
			setMaxHeight(contentRef.current.clientHeight + topsideRef.current.clientHeight);
		}
	}, [resizeRow]);

	const handleCopy = () => {
		setCopyMessage(true);
		if (code) {
			copy(`${data.code}${data.phone}`);
		} else {
			copy(`+${data.phone}`);
		}
		setTimeout(() => setCopyMessage(false), 2000);
	};

	const handleOpenRow = (e) => {
		if (e.target.tagName != 'A') {
			if (window.innerWidth < 1219) {
				maxHeight === 50 ? setMaxHeight(contentRef.current.clientHeight + topsideRef.current.clientHeight) : setMaxHeight(50);
				return;
			}
			if (
				!e.target.classList.contains(styles.phone) &&
				e.target.tagName !== 'svg' &&
				!e.target.tagName !== 'path' &&
				e.target.tagName !== 'A'
			) {
				maxHeight === 30 ? setMaxHeight(contentRef.current.clientHeight + topsideRef.current.clientHeight) : setMaxHeight(30);
			}
		}
	};

	const handleCommitComment = (e) => {
		if (textareaValue.length > 4) {
			const dateObj = new Date();
			const day = dateObj.getDate();
			const month = dateObj.getMonth();
			const year = dateObj.getFullYear();

			const newComment = {
				username: user.username,
				image: user.image,
				date: `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`,
				comment: textareaValue,
			};
			axios.post(`${api_url}/set-comment`, { newComment, orderId: data.id }).then((res) => {
				dispatch(pushNewComment({ newComment, data }));
				setResizeRow((prev) => prev + 1);
				setTextareaValue('');
			});
		}
	};

	if (window.innerWidth > 1219) {
		return (
			<div className={styles.row} style={{ maxHeight: maxHeight }}>
				<div ref={topsideRef} className={styles.rowtopside} onClick={handleOpenRow}>
					<div className={styles.date}>
						{data.date.split(' ')[0]}
						<div className={styles.id}>ID: {data.id}</div>
					</div>

					<div className={`${styles.name} ${styles.rowItem}`}>{data.name}</div>
					<div className={`${styles.country} ${styles.rowItem}`}>{data.country}</div>
					<div className={`${styles.phone} ${styles.rowItem}`} onClick={handleCopy}>
						{<p>{copyMessage ? <span>Copied!</span> : `${code ? code : ''} ${data.phone}`}</p>}
						<FaRegCopy className={styles.copyIcon} />
					</div>
					<div className={`${styles.lang}  ${styles.rowItem}`}>{data.native}</div>
					<div className={`${styles.lang}  ${styles.rowItem}`}>{data.other}</div>
					<div className={styles.contacts}>
						<ContactsRecycler contacts={data.contacts} />
					</div>
					{data.comments.length > 0 && (
						<div className={styles.edit}>
							<FaComments />
						</div>
					)}
				</div>

				<div className={styles.content} ref={contentRef}>
					{data.comments.map((commentObj, index) => (
						<OrderComments key={index} comments={commentObj} />
					))}

					<div className={styles.textareaBlock}>
						<textarea
							value={textareaValue}
							onChange={(e) => {
								setTextareaValue(e.target.value);
							}}
							onKeyDown={(e) => e.shiftKey && e.key === 'Enter' && handleCommitComment(e)}
							placeholder="Shift + Enter to send"
						/>
						<button className={styles.sendBtn} onClick={(e) => handleCommitComment(e)}>
							<IoSend className={styles.sendIcon} />
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.rowMobileWrapper} style={{ maxHeight: maxHeight }}>
				<div ref={topsideRef} className={styles.mobTopside} onClick={handleOpenRow}>
					<div className={styles.id}>id: {data.id}</div>
					<div className={styles.date}>
						{data.comments.length > 0 && <div className={styles.redDot}></div>}
						{data.date.split(' ')[0].split('-')[2]}.{data.date.split(' ')[0].split('-')[1]}.{data.date.split(' ')[0].split('-')[0]}
					</div>
					<div className={styles.name}>
						{data.name}
						<p className={styles.language}>{data.native}</p>
					</div>
					<div className={styles.country}>
						{data.country}
						<br />
						<a href={`tel: ${data.code}${data.phone}`} className={styles.phone}>
							{data.code} {data.phone}
						</a>
					</div>
				</div>

				<div ref={contentRef} className={styles.mobContent}>
					<div className={styles.otherLangs}>
						Other languages: {data.other}
						<br />
						Contacts: <span>{data.contacts}</span>
					</div>

					{data.comments.map((commentObj, index) => (
						<OrderComments key={index} comments={commentObj} />
					))}

					<div className={styles.textareaBlock}>
						<textarea
							value={textareaValue}
							onChange={(e) => {
								setTextareaValue(e.target.value);
							}}
							onKeyDown={(e) => e.shiftKey && e.key === 'Enter' && handleCommitComment(e)}
							placeholder="Shift + Enter to send"
						/>
						<button className={styles.sendBtn} onClick={(e) => handleCommitComment(e)}>
							<IoSend className={styles.sendIcon} />
						</button>
					</div>
				</div>
			</div>
		);
	}
};
