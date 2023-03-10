import React, { useState, useContext } from 'react';
import styles from './TraderAlert.module.css';
import Button from '../../../../UI/Button/Button';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FiSend } from 'react-icons/fi';
import Context from '../../../../store/context';
import axios from 'axios';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const TraderAlert = ({ cancel, traderPackageDetails, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState({
		htmlValue: '<h1></h1>\n',
		editorState: EditorState.createEmpty(),
	});

	const onEditorStateChange = (editorValue) => {
		const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
		setDescription({
			htmlValue: editorStateInHtml,
			editorState: editorValue,
		});
	};

	const addProductNote = () => {
		const data = {
			product_id: traderPackageDetails?.id,
			store_id: traderPackageDetails?.store?.id,
			subject: subject,
			details: description?.htmlValue,
		};
		axios
			.post('https://backend.atlbha.com/api/Admin/addProductNote', data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	};

	return (
		<>
			<BackDrop onClick={cancel} />
			<div
				className='fixed trader_alert   flex flex-col md:top-1/2 top-[55%] translate-x-2/4 -translate-y-2/4 right-2/4 z-20 rounded-2xl overflow-hidden'
				style={{ width: '51.25rem', maxWidth: '90%', maxHeight: '662px' }}
			>
				<div className='h-16 w-full flex items-center justify-center py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 style={{ fontSize: '', color: '#ECFEFF' }} className='md:text-[22px] text-[18px] font-medium text-center'>
						?????????? ????????????
					</h2>
				</div>
				<div className='flex-1 pb-4' style={{ backgroundColor: '#FAFAFA' }}>
					<div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }} className='flex flex-row items-center gap-4 px-5 py-4'>
						<h2 style={{ color: '#011723' }} className='md:text-[20px] text-[16px] font-medium'>
							??????
						</h2>
						<span style={{ color: '#67747B' }} className='md:text-[20px] text-[16px] font-medium'>
							{traderPackageDetails?.store?.store_name}
						</span>
					</div>
					<textarea
						style={{ color: '#67747B' }}
						className='md:text-[18px] text-[16px] w-full p-4 text-md font-medium outline-none'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder='??????????????'
						rows={3}
					></textarea>
					<div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }} className='flex flex-row items-center gap-4 px-5 py-4'>
						<h2 className='md:text-[20px] text-[16px] font-medium'>???? ??????????????</h2>
					</div>
					<div className={styles.editor}>
						<Editor
							toolbarHidden={false}
							editorState={description.editorState}
							onEditorStateChange={onEditorStateChange}
							inDropdown={true}
							placeholder='?????????????? ????????????'
							editorClassName='demo-editor'
							toolbar={{
								options: ['inline', 'textAlign', 'image', 'list'],
								inline: {
									options: ['bold'],
								},
								list: {
									options: ['unordered', 'ordered'],
								},
							}}
						/>
					</div>
					<div className='flex gap-5 justify-center'>
						<Button onClick={addProductNote} type={'normal'} className={'md:text-[20px] text-[18px] text-center mt-12'} style={{ backgroundColor: '#02466A' }} svg={<FiSend color={'#fff'} />}>
							??????????
						</Button>
						<Button type={'outline'} className={'md:text-[20px] text-[18px] text-center  mt-12'} style={{ borderColor: '#02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
							??????????
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TraderAlert;
