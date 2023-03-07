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

const BackDrop = ({ onClick }) => {
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
				className={`fixed bottom-0 left-0 bg-slate-50 z-30  ${styles.container}`}
				style={{
					width: '1104px',
					maxWidth: '100%',
					height: 'calc(100% - 5rem)',
					backgroundColor: 'rgba(235, 235, 235, 1)',
				}}
			>
				<div className='flex h-full flex-col justify-between mb-8'>
					<div
						className='md:h-[135px] h-[100px] md:p-4 flex md:flex-row flex-col justify-between md:items-center items-start md:pl-36 md:pr-16 p-4 pt-0'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<div className='flex flex-col'>
							<h2 className='font-bold md:text-2xl text-[20px] mb-3'>تفاصيل الطلب</h2>
							<div className='flex items-start'>
								<div className={`flex items-center gap-2 `}>
									<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
										<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
									</div>
									<h2 className='font-normal md:text-[18px] text-[16px] md:ml-4 ml-2 text-[#011723] whitespace-nowrap'> الطلبات </h2>
								</div>
								<h2 className='font-normal md:text-[18px] text-[16px] md:ml-4 ml-2 whitespace-nowrap' style={{ color: '#011723' }}>
									/ جدول الطلبات
								</h2>

								<h3 className='font-normal md:text-[18px] text-[16px]' style={{ color: '#7C7C7C' }}>
									/ تفاصيل طلب متجر جديد
								</h3>
							</div>
						</div>
						<div className='md:flex hidden flex-col'>
							<h2 className={'font-normal md:text-[18px] text-[16px]'} style={{ color: '#4D4F5C' }}>
								رقم الطلب
							</h2>
							<div className='mt-1 flex items-center shadow-lg rounded-lg justify-center md:h-16 h-[45px] md:w-44 w-full' style={{ backgroundColor: '#B6BE34' }}>
								<h2 className='text-slate-50 md:text-2xl text-[18px] font-bold'>{complaintDetails.orderNumber} </h2>
							</div>
						</div>
					</div>
					<div className={`flex-1 overflow-y-scroll md:pl-36 p-4 ${styles.content}`} style={{ backgroundColor: 'rgb(235, 235, 235)' }}>
						<Box className='md:py-10 md:pr-16 p-3' style={{ backgroundColor: '#F6F6F6' }}>
							<div className='md:hidden flex flex-col mb-4'>
								<h2 className={'font-normal md:text-[18px] text-[16px]'} style={{ color: '#4D4F5C' }}>
									رقم الطلب
								</h2>
								<div className='mt-1 flex items-center shadow-lg rounded-lg justify-center md:h-16 h-[45px] md:w-44 w-full' style={{ backgroundColor: '#B6BE34' }}>
									<h2 className='text-slate-50 md:text-2xl text-[18px] font-bold'>{complaintDetails.orderNumber} </h2>
								</div>
							</div>
							<TabContext value={value}>
								<Box className='md:pl-24'>
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
										<Tab className='md:text-[18px] text-[16px]' disableRipple={true} label='بيانات المتجر الأساسية' value='1' />
										<Tab className='md:text-[18px] text-[16px]' disableRipple={true} label='بيانات الشحن والدفع' value='2' />
									</TabList>
								</Box>
								<Box className="md:h-[600px] h-full" sx={{ mt: '1.25rem' }}>
									<TabPanel value='1' className='md:pr-0 p-0'>
										<div className='flex md:flex-row flex-col md:gap-28 gap-4'>
											<div className='flex-1'>
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														اسم المتجر
													</h2>
													<label>
														<input
															value={marketName}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														رابط المتجر
													</h2>
													<label>
														<input
															value={marketLinkAddress}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														نوع الباقة
													</h2>
													<label>
														<input
															value={packageType}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														البريد الالكترونى
													</h2>
													<label>
														<input
															value={email}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														رقم الجوال
													</h2>
													<label>
														<input
															value={phoneNumber}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														نوع الكيان
													</h2>
													<label>
														<input
															value={marketType}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														فئة المتجر
													</h2>
													<label>
														<input
															value={variety}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														رخصة تجارية
													</h2>
													<div
														className='flex flex-row items-center gap-4 w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
														style={{
															backgroundColor: '#EFF9FF',
															border: '1px solid #A7A7A7',
														}}
													>
														<h2
															value={'ترخيص '}
															className='outline-none md:text-[18px] text-[16px] font-medium'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														بطاقة الهوية
													</h2>
													<div
														className='flex flex-row items-center gap-4 w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
														style={{
															backgroundColor: '#EFF9FF',
															border: '1px solid #A7A7A7',
														}}
													>
														<h2
															value={'ترخيص '}
															className='outline-none md:text-[18px] text-[16px] font-medium'
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
												<div className='md:mb-6 mb-4 flex gap-5'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														شعار المتجر
													</h2>
													<div className='w-28'>
														<img className='h-14 w-14 object-cover  rounded-full' src={'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png'} alt='' />
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
									<TabPanel value='2' className='md:pr-0 md:pt-0 p-0'>
										<div className='flex md:flex-row flex-col md:gap-28 gap-4 md:mt-16'>
											<div className='flex-1'>
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														عنوان الشحن
													</h2>
													<label>
														<input
															value={deliveryAddress}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														الحي
													</h2>
													<label>
														<input
															value={neighborHood}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														الرمز البريدي
													</h2>
													<label>
														<input
															value={mailAddress}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<div className='md:mb-6 mb-4'>
													<h2 className='mb-2 font-normal md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
														شركة الشحن المعتمدة
													</h2>
													<label>
														<input
															value={deliveryCompany}
															className='w-full md:h-14 h-[45px] outline-none md:text-[18px] text-[16px] rounded-lg p-4 font-normal'
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
												<h2 className='mb-2 font-normal md:text-[18px] text-[16px]'>خيارات الدفع</h2>
												<div className='md:mb-6 mb-4'>
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
						className='md:h-[125px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className={'md:h-14 h-[45px] md:w-[180px] w-full md:text-[22px] text-[18px] font-bold'}
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
							className={'md:h-14 h-[45px] md:w-[180px] w-full md:text-[22px] text-[18px] font-bold'}
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
