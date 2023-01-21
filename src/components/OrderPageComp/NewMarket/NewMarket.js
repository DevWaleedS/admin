import React, { useContext } from 'react';
import Context from '../../../store/context';
import Button from '../../../UI/Button/Button';
import styles from './NewMarket.module.css';

import { GoArrowRight } from 'react-icons/go';
import { ReactComponent as PdfIcon } from '../../../assets/Icons/pfd.svg';
import { ReactComponent as MadaIcon } from '../../../assets/Icons/mada.svg';
import { ReactComponent as STCIcon } from '../../../assets/Icons/stc.svg';
import { ReactComponent as BankIcon } from '../../../assets/Icons/Bank.svg';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

const BackDrop = ({ onClick, complaintDetails }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const AddCountry = ({ cancel, complaintDetails }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle, setActionWarning } = contextStore;
	const [value, setValue] = React.useState('1');
	const { variety, marketLinkAddress, packageType, email, marketType, marketName, phoneNumber, deliveryAddress, neighborHood, mailAddress, deliveryCompany } = complaintDetails;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div
				className={`fixed bottom-0 left-0 bg-slate-50 z-20  ${styles.container}`}
				style={{
					width: '1104px',
					height: 'calc(100% - 5rem)',
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<div className='flex h-full flex-col justify-between mb-8'>
					<div
						className='p-4 flex justify-between items-center pl-36 pr-16'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<div>
							<h2 className='font-bold text-2xl  mb-3'>تفاصيل الطلب</h2>
							<div className='flex'>
								<div className={`flex items-center gap-2 `}>
									<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
										<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
									</div>

									<h2 className='font-normal text-lg ml-4 text-[#011723]'> الطلبات </h2>
								</div>

								<h2 className='font-normal ml-4' style={{ color: '#011723' }}>
									/ جدول الطلبات
								</h2>

								<h3 className='font-normal text-lg' style={{ color: '#7C7C7C' }}>
									/ تفاصيل طلب متجر جديد
								</h3>
							</div>
						</div>
						<div>
							<h2 className={'font-normal text-lg'} style={{ color: '#4D4F5C' }}>
								رقم الطلب
							</h2>
							<div className='mt-1 flex items-center shadow-lg rounded-lg justify-center  h-16 w-44' style={{ backgroundColor: '#B6BE34' }}>
								<h2 className='text-slate-50 text-2xl font-bold'>{complaintDetails.orderNumber} </h2>
							</div>
						</div>
					</div>
					<div className={`flex-1 overflow-y-scroll pl-36   ${styles.content}`} style={{ backgroundColor: 'rgb(235, 235, 235)' }}>
						<Box className=' py-10 pr-16' style={{ backgroundColor: '#F6F6F6' }}>
							<TabContext value={value}>
								<Box className='pl-24' sx={{}}>
									<TabList
										sx={{
											'& .MuiButtonBase-root': {
												backgroundColor: '#EAE8FF',
												ml: '1rem',
												borderRadius: '8px',
												color: '#8D8AD3',
												transition: '0.1s',
												fontSize: '22px',
												fontWeight: '500',
											},
											'& .MuiButtonBase-root.Mui-selected': {
												backgroundColor: '#A4A1FB',
												color: '#FFFFFF',
												boxShadow: '-1px 0px 13px 3px rgb(0 0 0 / 20%) inset',
											},
											'& .MuiTabs-indicator': { display: 'none' },
										}}
										onChange={handleChange}
										variant='fullWidth'
									>
										<Tab disableRipple={true} label='بيانات المتجر الأساسية' value='1' />
										<Tab disableRipple={true} label='بيانات الشحن والدفع' value='2' />
									</TabList>
								</Box>
								<Box sx={{ height: '600px', mt: '1.25rem' }}>
									<TabPanel value='1' className='pr-0 '>
										<div className='flex gap-28'>
											<div className='flex-1'>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														اسم المتجر
													</h2>
													<label>
														<input
															value={marketName}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														رابط المتجر
													</h2>
													<label>
														<input
															value={marketLinkAddress}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														نوع الباقة
													</h2>
													<label>
														<input
															value={packageType}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														البريد الالكترونى
													</h2>
													<label>
														<input
															value={email}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														رقم الجوال
													</h2>
													<label>
														<input
															value={phoneNumber}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
											</div>
											<div className='flex-1'>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														نوع الكيان
													</h2>
													<label>
														<input
															value={marketType}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														فئة المتجر
													</h2>
													<label>
														<input
															value={variety}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														رخصة تجارية
													</h2>
													<div
														className='flex w-full  items-center gap-2 rounded-lg p-4 '
														style={{
															backgroundColor: '#EFF9FF',
															border: '1px solid #A7A7A7',
														}}
													>
														<h2
															value={'ترخيص '}
															className='outline-none text-xl  font-medium'
															style={{
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														>
															ترخيص الشركة
														</h2>
														<PdfIcon></PdfIcon>
													</div>
													<a style={{ color: '#0077FF' }} href='_' download>
														تنزيل الملف
													</a>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														بطاقة الهوية
													</h2>
													<div
														className='flex w-full  items-center gap-2 rounded-lg p-4 '
														style={{
															backgroundColor: '#EFF9FF',
															border: '1px solid #A7A7A7',
														}}
													>
														<h2
															value={'ترخيص '}
															className='outline-none font-normal text-lg'
															style={{
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														>
															الهوية
														</h2>
														<PdfIcon></PdfIcon>
													</div>
													<a style={{ color: '#0077FF' }} href='_' download>
														تنزيل الملف
													</a>
												</div>
												<div className='mb-6 flex gap-5'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														شعار المتجر
													</h2>
													<div className='w-28'>
														<img className='h-14 w-14 object-cover  rounded-full' src={'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png'} alt='' />
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
									<TabPanel value='2' className='pr-0 pt-0'>
										<div className='flex gap-28 mt-16'>
											<div className='flex-1'>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														عنوان الشحن
													</h2>
													<label>
														<input
															value={deliveryAddress}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														الحي
													</h2>
													<label>
														<input
															value={neighborHood}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-normal text-lg' style={{ color: '#011723' }}>
														الرمز البريدي
													</h2>
													<label>
														<input
															value={mailAddress}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
												<div className='mb-6'>
													<h2 className='mb-2 font-medium' style={{ color: '#011723' }}>
														شركة الشحن المعتمدة
													</h2>
													<label>
														<input
															value={deliveryCompany}
															className='w-full h-14 outline-none text-xl rounded-lg p-4 font-normal'
															placeholder='المنتجات المميزة'
															style={{
																backgroundColor: '#EFF9FF',
																border: '1px solid #A7A7A7',
																color: '#011723',
															}}
															disabled
															type='text'
															name='name'
														/>
													</label>
												</div>
											</div>
											<div className='flex-1'>
												<h2 className='text-lg font-normal'>خيارات الدفع</h2>
												<div className='mt-8 '>
													<div className='flex mb-6 item-center gap-4'>
														<div className={'h-5 w-5 rounded-full'} style={{ backgroundColor: '#0BF1D1' }}></div>
														<div>
															{' '}
															<MadaIcon />{' '}
														</div>
													</div>
													<div className='flex mb-6 item-center gap-4'>
														<div className={'h-5 w-5 rounded-full'} style={{ backgroundColor: '#0BF1D1' }}></div>
														<div>
															{' '}
															<STCIcon />{' '}
														</div>
													</div>
													<div className='flex mb-6 item-center gap-4'>
														<div className={'h-5 w-5 rounded-full'} style={{ backgroundColor: '#0BF1D1' }}></div>
														<div>
															{' '}
															<BankIcon />{' '}
														</div>
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Box>
							</TabContext>
						</Box>
					</div>
					<div
						className='p-8 flex justify-center gap-4'
						style={{
							height: '125px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className={'h-14 w-[180px] text-2xl font-bold'}
							style={{ backgroundColor: `#3AE374` }}
							type={'normal'}
							onClick={() => {
								setEndActionTitle('تم قبول طلب إضافة متجر جديد بنجاح');
								cancel();
							}}
						>
							قبول المتجر
						</Button>
						<Button
							className={'h-14  w-[180px] text-2xl font-bold'}
							style={{ borderColor: `#FF3838` }}
							textStyle={{ color: '#FF3838' }}
							type={'outline'}
							onClick={() => {
								setEndActionTitle('تم رفض طلب إضافة متجر جديد');
								setActionWarning(true);
								cancel();
							}}
						>
							رفض المتجر
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCountry;
