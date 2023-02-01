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
		<div className={`fixed md:top-20 top-0 left-0 bg-slate-50 z-50 w-full full_screen_page flex h-screen md:pb-20 overflow-y-scroll flex-col justify-between `}>
			<div
				className='flex flex-col justify-end items-start md:pb-4 md:pr-14 px-4 py-8'
				style={{
					height: '135px',
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<h2 className='font-bold md:text-2xl text-[20px] mb-3'>انشاء دور جديد</h2>
				<div className='flex items-center'>
					<div onClick={cancel} className={`flex cursor-pointer items-center gap-2 `}>
						<div className={`gap-2 bg-[#02466a17] flex justify-center items-center h-6 w-6 rounded-full ${styles.arrow_con}`}>
							<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
						</div>

						<h2 className='font-medium md:text-[18px] text-[16px] ml-4'> الأدوار الوظيفية </h2>
					</div>

					<h3 className='font-medium md:text-[18px] text-[16px]' style={{ color: '#7C7C7C' }}>
						/ انشاء دور جديد
					</h3>
				</div>
			</div>
			<div className={`flex-1 overflow-y-scroll md:pl-48 md:py-8 md:pr-36 p-4 ${styles.content}`} style={{ backgroundColor: '#F6F6F6' }}>
				<div className='md:my-6 mb-4'>
					<h2 className='font-normal md:text-[18px] text-[16px] mb-2' style={{ color: '#011723' }}>
						<AiFillStar
							style={{
								display: 'inline-block',
								marginLeft: '0.5rem',
								color: 'red',
							}}
						></AiFillStar>
						اسم الدور الوظيفي
					</h2>
					<input
						className='w-full outline-none p-4 rounded-lg h-14'
						style={{
							border: '1px solid #A7A7A7',
							backgroundColor: '#FFFFFF',
							width: '376px',
							color: '#0099FB',
						}}
						type='text'
						placeholder='ادخل اسم الدور بالحروف فقط'
					/>
				</div>
				<div className='md:mt-5 mb-5'>
					<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap mb-2' style={{ color: '#011723' }}>
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
				<div className='md:py-4 md:pr-4 md:pl-12 overflow-scroll hide_scrollbar md:mr-24 md:bg-[#FAFAFA] bg-[#F6F6F6] md:h-[525px] h-full'>
					{dataTitle.map((item, index) => {
						return (
							<div className='max-w-full overflow-hidden md:mb-1 mb-4' key={index}>
								<div className='flex items-center gap-4 md:p-4 md:bg-[#ffffff] bg-[#F6F6F6] mb-5'>
									<CustomSwitch />
									<h2 className='font-medium md:text-[18px] text-[16px] whitespace-nowrap' style={{ color: '#011723' }}>
										{item.title}
									</h2>
								</div>
								<div className='overflow-auto fbc p-4' style={{ backgroundColor: '#EFF9FF' }}>
									<h2 className='font-medium md:text-[18px] text-[16px] whitespace-nowrap min-w-[180px]' style={{ width: '578px' }}>
										اسم الصلاحيات
									</h2>
									<div className='flex'>
										{permissionsTitle.map((item, idx) => {
											return (
												<h2 key={idx} className='text-center font-medium md:text-[18px] text-[16px] whitespace-nowrap' style={{ width: '82px', color: '#011723' }}>
													{item}
												</h2>
											);
										})}
									</div>
								</div>
								{item.children.map((child, i) => {
									return (
										<div key={i} className='overflow-auto fbc p-4' style={{ backgroundColor: '#fff' }}>
											<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap min-w-[180px]' style={{ width: '578px' }}>
												{child}
											</h2>
											<div className='flex gap-2'>
												<FormGroup className='flex-row flex-nowrap' sx={{}}>
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
				className='md:p-8 p-4 flex justify-center items-center gap-4 md:h-[135px] h-[100px]'
				style={{
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<Button
					className={'md:h-14 h-[45px] w-[189px] md:text-2xl text-[18px] '}
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
