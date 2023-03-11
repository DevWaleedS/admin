import React, { useState, useContext } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';
import Button from '../../../../UI/Button/Button';
import styles from './TraderAlert.module.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FiSend } from 'react-icons/fi';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const TraderAlert = ({ cancel, traderPackageDetails, showEmailInfo, reload, setReload }) => {
	const userEmail = traderPackageDetails?.store?.user?.email;

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

	// add email function
	const addEmail = () => {
		const data = {
			subject: subject,
			message: description?.htmlValue,
			store_id: traderPackageDetails?.store?.id,
		};
		axios
			.post('https://backend.atlbha.com/api/Admin/addEmail', data, {
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
				className='fixed trader_alert   flex flex-col top-1/2 translate-x-2/4 -translate-y-2/4 right-2/4 z-20 rounded-2xl overflow-hidden'
				style={{ width: '51.25rem', maxWidth: '90%', maxHeight: '662px' }}
			>
				<div className='h-16 w-full flex items-center justify-center py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 style={{ color: '#ECFEFF' }} className='md:text-[22px] text-[18px] font-medium text-center'>
						{showEmailInfo ? 'تفاصيل الرسالة ' : 'ارسال تنبيه للتاجر'}
					</h2>
				</div>
				<div className='flex-1 pb-4' style={{ backgroundColor: '#FAFAFA' }}>
					<div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }} className='flex flex-row items-center gap-4 px-5 py-4'>
						<h2 className='md:text-[20px] text-[16px] font-medium' style={{ color: '#011723' }}>
							إلى
						</h2>
						<span className='md:text-[20px] text-[16px] font-medium' style={{ color: '#67747B' }}>
							{userEmail}
						</span>
					</div>
					<textarea
						disabled={showEmailInfo && true}
						style={{ color: '#67747B' }}
						className='w-full md:text-[18px] text-[16px] p-4 text-md font-medium outline-none'
						value={showEmailInfo ? traderPackageDetails?.subject : subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder='الموضوع'
						rows={3}
					></textarea>
					<div style={{ backgroundColor: '#F4F5F7', border: '1px solid #67747B33' }} className='flex flex-row items-center gap-4 px-5 py-4'>
						<h2 className='md:text-[20px] text-[16px] font-medium'>نص الرسالة</h2>
					</div>
					<div className={styles.editor}>
						{showEmailInfo ? (
							<Editor
								readOnly
								className='text-black text-xl'
								toolbarHidden={false}
								editorState={description.editorState}
								onEditorStateChange={onEditorStateChange}
								inDropdown={true}
								placeholder={
									<div className='flex flex-col'>
										<div className='flex flex-row'>
											<p className='md:text-[20px] text-[16px]' style={{ fontWeight: '500', color: '#011723' }}>
												{traderPackageDetails?.message}
											</p>
										</div>
									</div>
								}
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
						) : (
							<Editor
								className='text-black text-xl'
								toolbarHidden={false}
								editorState={description.editorState}
								onEditorStateChange={onEditorStateChange}
								inDropdown={true}
								placeholder={
									<div className='flex flex-col'>
										<div className='flex flex-row'>
											<p className='md:text-[20px] text-[16px]' style={{ fontWeight: '500', color: '#011723' }}>
												صديقنا التاجر،
											</p>
											<span className='md:text-[20px] text-[16px]' style={{ fontWeight: '500', color: '#FF9F1A' }}>
												{' '}
												باقي 20يوم على انتهاء اشتراكك{' '}
											</span>
										</div>
										<p className='md:text-[20px] text-[16px]' style={{ fontWeight: '500', color: '#011723' }}>
											تواصل مع الدعم الفني للحصول على كود خصم لتجديد اشتراكك
										</p>
									</div>
								}
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
						)}
					</div>
					{showEmailInfo ? (
						<div className='flex gap-5 justify-center'>
							<Button type={'outline'} className={'md:text-[20px] text-[16px] text-center  mt-12'} style={{ borderColor: '#02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
								إغلاق
							</Button>
						</div>
					) : (
						<div className='flex gap-5 justify-center'>
							<Button onClick={addEmail} type={'normal'} className={'md:text-[20px] text-[16px] text-center mt-12'} style={{ backgroundColor: '#02466A' }} svg={<FiSend color={'#fff'} />}>
								ارسال
							</Button>
							<Button type={'outline'} className={'md:text-[20px] text-[16px] text-center  mt-12'} style={{ borderColor: '#02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
								الغاء
							</Button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TraderAlert;
