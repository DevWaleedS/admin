import React, { useState, useContext } from 'react';
import styles from './CreateRole.module.css';
import Button from '../../../UI/Button/Button';
import CustomSwitch from '../../../UI/CustomSwitch/CustomSwitch';

import Context from '../../../store/context';

import { GoArrowRight } from 'react-icons/go';
import { AiFillStar } from 'react-icons/ai';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const dataTitle = [
	{
		title: 'عرض بيانات المستخدمين',
		children: ['عدد المستخدمين', 'رقم الجوال', 'البريد الالكتروني'],
	},
	{
		title: 'الرئيسية',
		children: ['ملخص الشهر', 'ملخص طلبات الاشتركات', 'التنبيهات'],
	},
	{
		title: 'المستخدمين',
		children: ['مستهدمى المنصة'],
	},
	{
		title: 'الاشتركات',
		children: ['اشتركات المنصة', 'اشعارات الاشتراكات', 'تمديد الاشتراكات', 'تفعيل اشتراكات جديدة'],
	},
];

const permissionsTitle = ['عرض', 'تعديل', 'إضافة', 'حذف'];

const CreateRole = ({ cancel }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	return (
		<div className={`fixed top-20  left-0 bg-slate-50 z-50 w-full full_screen_page flex h-screen pb-20 overflow-y-scroll flex-col justify-between `}>
			<div
				className='flex flex-col justify-end items-start pb-4 pr-14'
				style={{
					height: '135px',
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<h2 className='font-bold text-2xl mb-3'>انشاء دور جديد</h2>
				<div className='flex items-center'>
					<div onClick={cancel} className={`flex cursor-pointer items-center gap-2 `}>
						<div className={`flex items-center gap-2 bg-[#02466a17] flex justify-center items-center h-6 w-6 rounded-full ${styles.arrow_con}`}>
							<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
						</div>

						<h2 className='font-medium text-xl ml-4'> الأدوار الوظيفية </h2>
					</div>

					<h3 className='font-medium text-xl' style={{ color: '#7C7C7C' }}>
						/ انشاء دور جديد
					</h3>
				</div>
			</div>
			<div className={`flex-1 overflow-y-scroll pl-48 py-8 pr-36 ${styles.content}`} style={{ backgroundColor: '#F6F6F6' }}>
				<div className='my-6  '>
					<h2 className='font-normal text-xl mb-2' style={{ color: '#011723' }}>
						<AiFillStar
							style={{
								display: 'inline-block',
								marginLeft: '0.5rem',
								color: 'red',
							}}
						></AiFillStar>
						اسم الدور الوظيفي
					</h2>
					<label className='w-full' htmlFor=''>
						<input
							className='outline-none p-4 rounded-lg h-14'
							style={{
								border: '1px solid #A7A7A7',
								backgroundColor: '#FFFFFF',
								width: '376px',
								color: '#0099FB',
							}}
							type='text'
							placeholder='ادخل اسم الدور بالحروف فقط'
						/>
					</label>
				</div>
				<div className='mt-5'>
					<h2 className='font-normal text-xl mb-2' style={{ color: '#011723' }}>
						<AiFillStar
							style={{
								display: 'inline-block',
								marginLeft: '0.5rem',
								color: 'red',
							}}
						></AiFillStar>
						حدد الصلاحيات
					</h2>
				</div>
				<div className='py-4 pr-4 pl-12 overflow-scroll hide_scrollbar mr-24' style={{ backgroundColor: '#FAFAFA', height: '525px' }}>
					{dataTitle.map((item, index) => {
						return (
							<div className='mb-1' key={index}>
								<div className='flex items-center gap-4 p-4' style={{ backgroundColor: '#fff' }}>
									<CustomSwitch />
									<h2 className='font-medium text-xl' style={{ color: '#011723' }}>
										{item.title}{' '}
									</h2>
								</div>
								<div className='fbc p-4' style={{ backgroundColor: '#EFF9FF' }}>
									<h2 className='font-medium text-lg' style={{ width: '578px' }}>
										اسم الصلاحيات
									</h2>
									<div className='flex '>
										{permissionsTitle.map((item, idx) => {
											return (
												<h2 key={idx} className='text-center font-medium text-lg' style={{ width: '82px', color: '#011723' }}>
													{item}
												</h2>
											);
										})}
									</div>
								</div>
								{item.children.map((child, i) => {
									return (
										<div key={i} className='fbc p-4' style={{ backgroundColor: '#fff' }}>
											<h2 className='font-normal text-xl' style={{ width: '578px' }}>
												{child}
											</h2>
											<div className='flex gap-2'>
												<FormGroup className='flex-row' sx={{}}>
													{permissionsTitle.map((item, idx) => {
														return (
															<FormControlLabel
																sx={{
																	width: '82px',
																	margin: '0 auto',
																	'& .MuiButtonBase-root': {
																		margin: '0 auto',
																	},
																}}
																control={<Checkbox />}
															/>
														);
													})}
												</FormGroup>
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<div
				className='p-8 flex justify-center gap-4'
				style={{
					height: '135px',
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<Button
					className={'h-14 w-[189px] text-2xl '}
					style={{ borderColor: `rgba(2, 70, 106, 1)` }}
					type={'outline'}
					textStyle={{ color: '#02466A' }}
					onClick={() => {
						setEndActionTitle('تم انشاء دور جديد بنجاح');
						cancel();
					}}
				>
					حفظ واعتماد
				</Button>
			</div>
		</div>
	);
};

export default CreateRole;
