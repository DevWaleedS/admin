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
		<div className={`fixed top-20 left-0 md:pt-5 bg-slate-50 z-50  full_screen_page flex  flex-col justify-between`} style={{ width: '100%', maxWidth: '100%', height: 'calc(100vh - 4rem)' }}>
			<div className='flex-1 h-4 flex flex-col md:pl-36 md:pr-72 md:pt-5 md:pb-4 px-4 py-8' style={{ backgroundColor: '#F7F7F7' }}>
				<div className='md:h-[120px] flex md:flex-row flex-col items-center justify-between gap-y-4 rounded-lg md:pr-12 md:pl-5 pt-2 pb-4 px-3' style={{ maxWidth: '100%', backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50 text-3xl font-normal text-center'>{role}</h2>
					<div className='flex md:flex-row flex-col gap-4'>
						<label className={`flex-1 md:h-14 h-[45px] md:w-[356px] w-full relative `}>
							<input className='outline-0 md:w-[356px] w-[254px] md:h-14 h-[45px] pr-9 rounded-lg text-lg font-normal text-[#FAFAFA] ' placeholder=' ابحث عن صلاحية' type='text' name='name' />
							<div className={`absolute top-1/2 right-4 -translate-y-1/2`}>
								<AiOutlineSearch color='#A7A7A7' size={'18px'}></AiOutlineSearch>
							</div>
						</label>
						<Button
							className='text-2xl font-normal md:h-14 h-[45px] md:w-[181px] w-[254px]'
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
					<div className='flex md:mb-10 mb-3'>
						<div className={`flex items-center gap-2 `}>
							<div onClick={cancel} className={`flex items-center gap-2 bg-[#02466a17] justify-center h-6 w-6 rounded-full cursor-pointer`}>
								<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
							</div>
							<h2 className='font-medium md:text-lg text-[16px] ml-4'> الأدوار الوظيفية </h2>
						</div>

						<h3 className='font-medium md:text-lg text-[16px] text-[#7C7C7C]'> / صلاحيات الادمن</h3>
					</div>
					{dataTitle.map((item, index) => {
						return (
							<div key={index} className='mb-10'>
								<div className='flex items-center gap-4 p-4'>
									<CustomSwitch />
									<h2 className='font-medium md:text-lg text-[16px] text-[#011723]'>{item.title}</h2>
								</div>
								<div className='max-w-full overflow-hidden'>
									<div className='w-full'>
										<div className='fbc p-4' style={{ backgroundColor: '#EFF9FF',overflow:'auto' }}>
											<h2 className='font-medium md:text-lg text-[16px] whitespace-nowrap min-w-[180px]' style={{ width: '578px' }}>
												اسم الصلاحيات
											</h2>
											<div className='flex '>
												{permissionsTitle.map((item, idx) => {
													return (
														<h2 key={idx} className='text-center font-medium md:text-lg text-[16px] whitespace-nowrap' style={{ width: '82px', color: '#011723' }}>
															{item}
														</h2>
													);
												})}
											</div>
										</div>
										{item.children.map((child, i) => {
											return (
												<div key={i} className='fbc p-4' style={{ backgroundColor: '#fff',overflow:'auto' }}>
													<h2 className=' font-medium md:text-lg text-[16px] whitespace-nowrap min-w-[180px]'>
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
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default EditRole;
