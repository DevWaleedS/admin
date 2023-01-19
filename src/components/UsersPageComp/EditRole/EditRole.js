import React, { useState, useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../../../UI/Button/Button';
import CustomSwitch from '../../../UI/CustomSwitch/CustomSwitch';

import Context from '../../../store/context';
import { GoArrowRight } from 'react-icons/go';
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
		children: ['مستخدمى المنصة'],
	},
	{
		title: 'الاشتركات',
		children: ['اشتركات المنصة', 'اشعارات الاشتراكات', 'تمديد الاشتراكات', 'تفعيل اشتراكات جديدة'],
	},
	{
		title: 'كوبونات التخفيض',
		children: ['الكوبون', 'احصائيات الكوبونات', 'تفعيل كوبون'],
	},
	{
		title: 'اعدادات المنصة',
		children: ['تفعيل الاعدادات', 'احصائيات الكوبونات', 'بيانات المنصة الرئيسية', 'بيانات التواصل', 'حسابات المنصة', 'اعدادت التنبيهات', 'اعدادات العملات', 'التكم بالرصيد'],
	},
	{
		title: 'طرق الدفع',
		children: ['تفاصيل طرق الدفع', 'حساب بنكى', 'حساب باى بال'],
	},
	{
		title: 'المتاجر',
		children: ['تفاصيل المتجر', 'البحث عن شريك', 'قبول متجر'],
	},
	{
		title: 'الدعم الفنى',
		children: ['الرد على استفسار'],
	},
	{
		title: 'اعدادات الملف الشخصى',
		children: ['الاسم', 'البريد الالكترونى', 'كلمة المرور'],
	},
	{
		title: 'المالية',
		children: ['العمليات المحاسبية'],
	},
];
const permissionsTitle = ['عرض', 'تعديل', 'إضافة', 'حذف'];

const EditRole = ({ cancel, role }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	return (
		<div className={`fixed top-20 left-0 pt-5 bg-slate-50 z-50  full_screen_page flex  flex-col justify-between`} style={{ width: '100%', height: 'calc(100vh - 4rem)' }}>
			<div className='flex-1 h-4 flex flex-col pl-36 pr-72 pt-5 pb-4 ' style={{ backgroundColor: '#F7F7F7' }}>
				<div className='fbc rounded-lg pr-12 pl-5' style={{ height: '120px', backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50 text-3xl font-normal'>{role}</h2>
					<div className='flex gap-4'>
						<label className={`flex-1 h-14 w-[356px] relative `}>
							<input className='outline-0 w-full h-14 pr-9 rounded-lg text-lg font-normal text-[#FAFAFA] ' placeholder=' ابحث عن صلاحية' type='text' name='name' />
							<div className={`absolute top-1/2 right-4 -translate-y-1/2`}>
								<AiOutlineSearch color='#A7A7A7' size={'18px'}></AiOutlineSearch>
							</div>
						</label>
						<Button
							className='text-2xl font-normal h-14 w-[181px]'
							type={'normal'}
							fontWeight={'font-light'}
							style={{ backgroundColor: '#02466A' }}
							onClick={() => {
								setEndActionTitle('تم تحديث الصلاحية بنجاح');
								cancel();
							}}
						>
							حفظ واعتماد
						</Button>
					</div>
				</div>
				<div className='mt-7 overflow-scroll hide_scrollbar flex-1 '>
					<div className='flex mb-10'>
						<div className={`flex items-center gap-2 `}>
							<div onClick={cancel} className={`flex items-center gap-2 bg-[#02466a17] flex justify-center items-center h-6 w-6 rounded-full cursor-pointer`}>
								<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
							</div>

							<h2 className='font-medium text-lg ml-4'> الأدوار الوظيفية </h2>
						</div>

						<h3 className='font-medium text-lg text-[#7C7C7C]'> / صلاحيات الادمن</h3>
					</div>
					{dataTitle.map((item, index) => {
						return (
							<div key={index} className='mb-10'>
								<div className='flex items-center gap-4 p-4'>
									<CustomSwitch />
									<h2 className='font-medium text-xl text-[#011723]'>{item.title}</h2>
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
											<h2 className=' font-medium text-lg' style={{}}>
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
		</div>
	);
};

export default EditRole;
