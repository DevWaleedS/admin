import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import Button from '../../../../UI/Button/Button';
import Context from '../../../../store/context';
import styles from './AddNewCoupon.module.css';
import { GoArrowRight } from 'react-icons/go';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactComponent as DateIcon } from '../../../../assets/Icons/icon-date.svg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment/moment';

const AddNewUser = ({ reload, setReload, cancel, editCoupon, detailsCoupon }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [couponTypePercent, setCouponTypePercent] = useState(true);
	const [couponCode, setCouponCode] = useState(editCoupon?.code ||detailsCoupon?.code || '');
	const [discountPercent, setDiscountPercent] = useState('');
	const [discountFixed, setDiscountFixed] = useState('');
	const [dateRangeFixed, setDateRangeFixed] = useState([null, null]);
	const [startDateFixed, endDateFixed] = dateRangeFixed;
	const [dateRangePercent, setDateRangePercent] = useState([null, null]);
	const [startDatePercent, endDatePercent] = dateRangePercent;
	const [numberOfUesedPercent, setNumberOfUesedPercent] = useState('');
	const [numberOfUesedFixed, setNumberOfUesedFixed] = useState('');

	
	useEffect(() => {
		if (editCoupon) {
			if (editCoupon.discount_type === 'مبلغ ثابت') {
				setCouponTypePercent(false);
				setDiscountFixed(editCoupon?.discount);
				setNumberOfUesedFixed(editCoupon?.total_redemptions);
				setDateRangeFixed([moment(editCoupon?.start_at, moment.defaultFormat).toDate(), moment(editCoupon?.expire_date, moment.defaultFormat).toDate()]);
				setDateRangePercent([null, null]);
			}
			else {
				setCouponTypePercent(true);
				setDiscountPercent(editCoupon?.discount);
				setNumberOfUesedPercent(editCoupon?.total_redemptions);
				setDateRangePercent([moment(editCoupon?.start_at, moment.defaultFormat).toDate(), moment(editCoupon?.expire_date, moment.defaultFormat).toDate()]);
				setDateRangeFixed([null, null]);
			}
		}
		if (detailsCoupon) {
			if (detailsCoupon.discount_type === 'مبلغ ثابت') {
				setCouponTypePercent(false);
				setDiscountFixed(detailsCoupon?.discount);
				setNumberOfUesedFixed(detailsCoupon?.total_redemptions);
				setDateRangeFixed([moment(detailsCoupon?.start_at, moment.defaultFormat).toDate(), moment(detailsCoupon?.expire_date, moment.defaultFormat).toDate()]);
				setDateRangePercent([null, null]);
			}
			else {
				setCouponTypePercent(true);
				setDiscountPercent(detailsCoupon?.discount);
				setNumberOfUesedPercent(detailsCoupon?.total_redemptions);
				setDateRangePercent([moment(detailsCoupon?.start_at, moment.defaultFormat).toDate(), moment(detailsCoupon?.expire_date, moment.defaultFormat).toDate()]);
				setDateRangeFixed([null, null]);
			}
		}
	}, [editCoupon, detailsCoupon]);

	const addCoupon = () => {
		const formatDate = 'YYYY-MM-DD';
		const data = {
			code: couponCode,
			discount_type: couponTypePercent ? 'percent' : 'fixed',
			discount: couponTypePercent ? parseInt(discountPercent) : parseInt(discountFixed),
			start_at: couponTypePercent ? moment(startDatePercent).format(formatDate) : moment(startDateFixed).format(formatDate),
			expire_date: couponTypePercent ? moment(endDatePercent).format(formatDate) : moment(endDateFixed).format(formatDate),
			total_redemptions: couponTypePercent ? parseInt(numberOfUesedPercent) : parseInt(numberOfUesedFixed)
		}
		axios
			.post('https://backend.atlbha.com/api/Admin/coupons', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	}

	const updateCoupon = () => {
		const formatDate = 'YYYY-MM-DD';
		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('discount_type', couponTypePercent ? 'percent' : 'fixed');
		formData.append('discount', couponTypePercent ? parseInt(discountPercent) : parseInt(discountFixed));
		formData.append('start_at', couponTypePercent ? moment(startDatePercent).format(formatDate) : moment(startDateFixed).format(formatDate));
		formData.append('expire_date', couponTypePercent ? moment(endDatePercent).format(formatDate) : moment(endDateFixed).format(formatDate));
		formData.append('total_redemptions', couponTypePercent ? parseInt(numberOfUesedPercent) : parseInt(numberOfUesedFixed));
		axios
			.post(`https://backend.atlbha.com/api/Admin/coupons/${editCoupon?.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	}

	return (
		<div className='absolute md:pl-36 top-0 right-0  z-10 md:pt-5 md:pr-24  w-full  h-full p-4 pt-0 md:bg-[#fafafa] bg-[#FFFFFF]'>
			<div className='flex md:flex-row flex-col justify-between md:items-center items-start mb-2 gap-4'>
				<div className='flex items-center gap-2'>
					<div onClick={cancel} className={` ${styles.arrow_con}`}>
						<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
					</div>
					<h2 className='md:text-[18px] text-[16px] font-medium' style={{ color: '#011723' }}>
						جدول الكوبونات
					</h2>
					{
						editCoupon ?
							(
								<h3 className='md:text-[18px] text-[16px] font-medium' style={{ color: '#67747B' }}>
									/ تعديل كوبون
								</h3>
							)
							:
							detailsCoupon
								?
								(

									<h3 className='md:text-[18px] text-[16px] font-medium' style={{ color: '#67747B' }}>
										/  تفاصيل الكوبون
									</h3>
								)
								:
								(
									<h3 className='md:text-[18px] text-[16px] font-medium' style={{ color: '#67747B' }}>
										/ انشاء كوبون جديد
									</h3>
								)
					}

				</div>
				{
					!detailsCoupon &&
					<Button
						className="md:w-[195px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[18px]"
						type={'normal'}
						style={{ backgroundColor: editCoupon ? '#67747B' : '#B6BE34' }}
						textStyle={{ color: '#EFF9FF' }}
						onClick={() => editCoupon ? updateCoupon() : addCoupon()}
					>
						{editCoupon ? 'تعديل الكوبون' : 'اعتماد الكوبون'}
					</Button>
				}
			</div>

			<div className={'mt-8'}>
				<div className='flex flex-col gap-[10px]'>
					<h2 style={{ fontSize: '18px', color: '#67747B' }}>
						<AiFillStar
							style={{
								display: 'inline-block',
								marginLeft: '0.5rem',
								color: 'red',
							}}
						></AiFillStar>
						كود التخفيض
					</h2>
					<label className='w-full' htmlFor=''>
						<input
							value={couponCode}
							onChange={(e) => setCouponCode(e.target.value)}
							className='outline-none p-4 rounded-lg'
							style={{
								border: '1px solid #A7A7A7',
								backgroundColor: '#FFFFFF',
								width: '376px',
								color: '#0099FB',
							}}
							type='text'
							placeholder='أدخل حروف انجليزية وأرقام بدون مسافة'
							disabled={editCoupon || detailsCoupon}
						/>
					</label>
				</div>
				<h2 style={{ fontSize: '18px', color: '#67747B' }} className='my-5'>
					اختر نوع الخصم
				</h2>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<div className='md:h-[674px] h-full flex md:flex-row flex-col md:gap-5 gap-6'>
						<div style={{ boxShadow: '0px 3px 6px #00000029' }} className='bg-white flex-1 rounded-lg'>
							<div
								className='w-full cursor-pointer gap-2 flex items-center px-4 rounded-lg'
								style={{
									backgroundColor: couponTypePercent ? '#1DBBBE' : '#EFF9FF',
									height: '75px',
								}}
								onClick={() => {
									setCouponTypePercent(true);
								}}
							>
								<div>{couponTypePercent ? <BiRadioCircleMarked fill='#FFFFFF' size={'1.5rem'} /> : <BiRadioCircle fill='#BDBDBD' size={'1.5rem'} />}</div>
								<h3 className='font-medium' style={{ fontSize: '24px', color: couponTypePercent ? '#fff' : '#011723' }}>
									نسبة الخصم
								</h3>
							</div>
							<div className='py-6 px-5 flex flex-col gap-5'>
								<div className='flex flex-col gap-[10px]'>
									<label style={{ fontSize: '18px', color: couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
										النسبة المئوية %
									</label>
									<input
										value={couponTypePercent ? discountPercent : ''}
										onChange={(e) => setDiscountPercent(e.target.value)}
										className='md:w-[376px] w-full outline-none p-4 rounded-lg'
										disabled={!couponTypePercent || detailsCoupon}
										style={{
											border: couponTypePercent ? '1px solid #242424' : '1px solid #D3D3D3',
											color: '#D3D3D3',
											fontSize: '14px',
											backgroundColor: '#FFFFFF',
										}}
										type='text'
										placeholder='أدخل رقم'
									/>
								</div>
								<div className='flex flex-col gap-[10px]'>
									<label className='font-medium mb-2' style={{ color: couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
									</label>
									<div
										className={`${couponTypePercent ? styles.date_input : styles.disabled_date_input} md:w-[376px] w-full flex flex-row items-center justify-between outline-none p-4 rounded-lg`}
										style={{
											border: couponTypePercent ? '1px solid #242424' : '1px solid #D3D3D3',
											color: '#011723',
											fontSize: '14px',
											backgroundColor: '#FFFFFF',
										}}
									>
										<DatePicker
											className='w-full outline-none'
											placeholderText='تاريخ بداية ونهاية الخصم'
											selectsRange={true}
											startDate={startDatePercent}
											endDate={endDatePercent}
											onChange={(updatePercent) => {
												setDateRangePercent(updatePercent);
											}}
											disabled={!couponTypePercent || detailsCoupon}
										/>
										<DateIcon className={styles.icon} />
									</div>
								</div>
								<div className='flex flex-col gap-[10px]'>
									<label style={{ fontSize: '18px', color: couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
										عدد مرات الاستخدام للجميع
									</label>
									<input
										value={couponTypePercent ? numberOfUesedPercent : ''}
										onChange={(e) => setNumberOfUesedPercent(e.target.value)}
										className='md:w-[376px] w-full outline-none p-4 rounded-lg'
										disabled={!couponTypePercent || detailsCoupon}
										style={{
											border: couponTypePercent ? '1px solid #242424' : '1px solid #D3D3D3',
											color: '#D3D3D3',
											fontSize: '14px',
											backgroundColor: '#FFFFFF',
										}}
										type='text'
										placeholder='أدخل رقم'
									/>
								</div>
							</div>
						</div>
						<div style={{ boxShadow: '0px 3px 6px #00000029' }} className='bg-white flex-1 rounded-lg'>
							<div
								className='w-full cursor-pointer gap-2 flex items-center px-4 rounded-lg'
								style={{
									backgroundColor: !couponTypePercent ? '#1DBBBE' : '#EFF9FF',
									height: '75px',
								}}
								onClick={() => {
									setCouponTypePercent(false);
								}}
							>
								<div>{!couponTypePercent ? <BiRadioCircleMarked fill='#FFFFFF' size={'1.5rem'} /> : <BiRadioCircle fill='#BDBDBD' size={'1.5rem'} />}</div>
								<h3 className='font-medium' style={{ fontSize: '24px', color: couponTypePercent ? '#011723' : '#fff' }}>
									مبلغ ثابت
								</h3>
							</div>
							<div className='py-6 px-5 flex flex-col gap-5'>
								<div className='flex flex-col gap-[10px]'>
									<label style={{ fontSize: '18px', color: !couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: !couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
										المبلغ الثابت
									</label>
									<input
										value={couponTypePercent ? '' : discountFixed}
										onChange={(e) => setDiscountFixed(e.target.value)}
										className='md:w-[376px] w-full outline-none p-4 rounded-lg'
										disabled={couponTypePercent || detailsCoupon}
										style={{
											backgroundColor: '#FFFFFF',
											border: !couponTypePercent ? '1px solid #242424' : '1px solid #D3D3D3',
											color: '#D3D3D3',
											fontSize: '14px',
										}}
										type='text'
										placeholder='أدخل رقم'
									/>
								</div>
								<div className='flex flex-col gap-[10px]'>
									<label style={{ fontSize: '18px', color: !couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: !couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
									</label>
									<div
										className={`${couponTypePercent ? styles.disabled_date_input : styles.date_input} md:w-[376px] w-full flex flex-row items-center justify-between outline-none p-4 rounded-lg`}
										style={{
											border: couponTypePercent ? '1px solid #D3D3D3' : '1px solid #242424',
											color: '#011723',
											fontSize: '14px',
											backgroundColor: '#FFFFFF',
										}}
									>
										<DatePicker
											className='w-full outline-none'
											placeholderText='تاريخ بداية ونهاية الخصم'
											selectsRange={true}
											startDate={startDateFixed}
											endDate={endDateFixed}
											onChange={(updateFixed) => {
												setDateRangeFixed(updateFixed);
											}}
											disabled={couponTypePercent || detailsCoupon}
										/>
										<DateIcon className={styles.icon} />
									</div>
								</div>
								<div className='flex flex-col gap-[10px]'>
									<label style={{ fontSize: '18px', color: !couponTypePercent ? '#011723' : '#A7A7A7' }}>
										<AiFillStar
											style={{
												display: 'inline-block',
												marginLeft: '0.5rem',
												color: !couponTypePercent ? '#FF3838' : '#A7A7A7',
											}}
										></AiFillStar>
										عدد مرات الاستخدام للجميع
									</label>
									<input
										value={couponTypePercent ? '' : numberOfUesedFixed}
										onChange={(e) => setNumberOfUesedFixed(e.target.value)}
										className='md:w-[376px] w-full outline-none p-4 rounded-lg'
										disabled={couponTypePercent || detailsCoupon}
										style={{
											backgroundColor: '#FFFFFF',
											border: !couponTypePercent ? '1px solid #242424' : '1px solid #D3D3D3',
											color: '#D3D3D3',
											fontSize: '14px',
										}}
										type='text'
										placeholder='أدخل رقم'
									/>
								</div>
							</div>
						</div>
					</div>
				</LocalizationProvider>
			</div>
			<div className='pb-20'></div>
		</div>
	);
};

export default AddNewUser;
