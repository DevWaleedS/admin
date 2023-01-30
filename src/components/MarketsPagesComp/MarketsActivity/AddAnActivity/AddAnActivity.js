import React, { useContext, useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Button from '../../../../UI/Button/Button';
import Context from '../../../../store/context';
import styles from './AddAnActivity.module.css';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed opacity-25 back_drop top-0 left-0 h-full w-full bg-slate-900  z-10 `}></div>;
};

const AddAnActivity = ({ cancel, editActivity }) => {
	const contextStore = useContext(Context);
	const [showAddActivity, setShowAddActivity] = useState(false);
	const [activiyName, setActitviyName] = useState('');
	const { setEndActionTitle } = contextStore;

	useEffect(() => {
		if (editActivity) {
			setActitviyName(editActivity.title);
		}
	}, [editActivity]);
	return (
		<>
			<BackDrop onClick={cancel} />
			{showAddActivity && (
				<AddAnActivity
					cancel={() => {
						setShowAddActivity(false);
					}}
					editProduct={editActivity}
				></AddAnActivity>
			)}
			<div className='fixed flex flex-col top-24 translate-x-2/4 right-2/4 z-20 md:rounded-md rounded-2xl overflow-hidden md:h-[36rem] h-[25rem]' style={{ width: '51.25rem',maxWidth:'90%' }}>
				<div className='h-16 w-full flex items-center justify-between px-4' style={{ backgroundColor: '#02466A' }}>
					<h2 className='text-slate-50 text-center md:text-[22px] text-[18px] font-medium flex-1 text-center'>اضافة نشاط جديد </h2>
					<IoMdCloseCircleOutline color={'#fff'} className={'cursor-pointer w-5 h-20 '} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 md:px-44 md:pt-10 p-4' style={{ backgroundColor: '#FFFFFF' }}>
					<h2 className='font-normal text-lg'>اسم النشاط</h2>
					<label>
						<input
							className='w-full outline-none shadow-[0px_3px_6px_#00000029] rounded-md p-4 my-4 h-[60px] text-lg'
							placeholder='ادخل اسم النشاط'
							type='text'
							name='name'
							value={activiyName}
							onChange={(e) => {
								setActitviyName(e.target.value);
							}}
						/>
					</label>
					<div className='flex gap-4'>
						<Button
							type={'normal'}
							className={'text-center w-full mt-12 md:h-14 h-[44px] text-xl '}
							style={{ backgroundColor: '#02466A' }}
							onClick={() => {
								setEndActionTitle('تم إضافة نشاط جديد بنجاح');
								cancel();
							}}
						>
							حفظ
						</Button>
						<Button type={'outline'} className={'text-center w-full mt-12 md:h-14 h-[44px] text-xl '} style={{ border: ' 1px solid #02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
							الغاء
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddAnActivity;
