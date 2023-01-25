import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../UI/Button/Button';
import Context from '../../../../store/context';
import { GoArrowRight } from 'react-icons/go';
import styles from './AddNewMarket.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageUploading from 'react-images-uploading';
import { AiFillStar } from 'react-icons/ai';
import { ReactComponent as PhoneIcon } from '../../../../assets/Icons/mobile-icon-24.svg';
import { ReactComponent as UserIcon } from '../../../../assets/Icons/icon-24-user.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/Icons/icon-24- email.svg';
import { ReactComponent as Password } from '../../../../assets/Icons/show password.svg';
import { ReactComponent as Arrow } from '../../../../assets/Icons/icon-24-chevron_down.svg';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};
const cities = ['الرياض', 'جدة', 'الدمام'];
const plans = ['التاجر (مجانية)', 'التاجر المحترف (مدفوع)', 'العلامة التجارية (مدفوع)'];
const planeTime = ['سنوي', 'شهري (6 شهور)'];
const activityType = ['ملابس', 'حلويات', 'الكترونيات', 'موبيليا'];
const conditions = ['مفعل', 'غير مفعل'];

const AddNewMarket = ({ cancel }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [storeCity, setStoreCity] = useState('');
	const [ownerCity, setOwerCity] = useState('');
	const [planSelected, setPlanSelected] = useState('');
	const [planTimeSelected, setPlanTimeSelected] = useState('');
	const [conditionsSelected, setConditionsSelected] = useState('');
	const [images, setImages] = useState([]);
	const [multiImages, setMultiImages] = useState([]);
	const [openActivity, setOpenActivity] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	console.log(multiImages);

	const emptyMultiImages = [];
	for (let index = 0; index < 5 - multiImages.length; index++) {
		emptyMultiImages.push(index);
	}
	console.log(images);
	const maxNumber = 2;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	const [activity, setActivity] = React.useState([]);

	const handleActivity = (event) => {
		const {
			target: { value },
		} = event;
		setActivity(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-20 ${styles.container}`} style={{ width: '1104px', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='pt-12 pr-16 p-8'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-semibold text-2xl text-right mb-3'>انشاء متجر جديد</h2>
						<div className='flex flex-row '>
							<div onClick={() => cancel()} className={'flex items-center gap-2 cursor-pointer'}>
								<div className='flex flex-col items-center justify-center' style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#02466A1A' }}>
									<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
								</div>
								<h2 className='font-semibold ml-4'> عرض المتاجر </h2>
							</div>
							<h3 className='font-medium' style={{ color: '#67747B' }}>
								/ انشاء متجر جديد
							</h3>
						</div>
					</div>
					<div style={{ backgroundColor: '#F6F6F6' }} className={`flex-1 overflow-y-scroll pl-12 text-right py-5 pr-16 ${styles.content}`}>
						<div className='flex flex-col gap-4'>
							<h3 style={{ color: '#011723', fontSize: '22px' }} className='font-bold '>
								بيانات المتجر
							</h3>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم المتجر
								</label>
								<input className='w-[555px] py-4 px-5 rounded-md outline-none' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }} placeholder='حروف عربية او انجليزية' type='text' />
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									الدومين
								</label>
								<input className='w-[555px] py-4 px-5 rounded-md outline-none' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }} placeholder='ادخل حروف انجليزية فقط' type='text' />
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									البريد الإلكتروني
								</label>
								<input className='w-[555px] py-4 px-5 rounded-md outline-none' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }} placeholder='sample@gmail.com' type='email' />
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>الدولة</label>
								<div className='w-[555px] py-4 px-5 rounded-md outline-none' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<p style={{ color: '#011723', fontSize: '18px' }}>المملكة العربية السعودية</p>
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>المدينة</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										value={storeCity}
										onChange={(e) => setStoreCity(e.target.value)}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (storeCity === '') {
												return <h2>اختر المدينة</h2>;
											}
											return selected;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{cities.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item}`}
												>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>رقم الجوال</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<div className='flex flex-row items-center'>
										<PhoneIcon className={styles.icon} />
										<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} placeholder='5419515123' type='text' />
									</div>
									<p style={{ fontSize: '18px', color: '#011723' }}>966</p>
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									نوع الخطة
								</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										value={planSelected}
										onChange={(e) => setPlanSelected(e.target.value)}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (planSelected === '') {
												return <h2>اختر نوع الخطة</h2>;
											}
											return selected;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{plans.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item}`}
												>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									مدة الاشتراك
								</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										value={planTimeSelected}
										onChange={(e) => setPlanTimeSelected(e.target.value)}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (planTimeSelected === '') {
												return <h2>اختيار مدة الاشتراك</h2>;
											}
											return selected;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{planeTime.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item}`}
												>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									نوع النشاط
								</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										multiple
										displayEmpty
										open={openActivity}
										onClick={(e) => {
											setOpenActivity(true);
										}}
										value={activity}
										onChange={handleActivity}
										renderValue={(selected) => (activity.length === 0 ? 'نشاط المتجر' : selected.join(' , '))}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{activityType.map((name) => (
											<MenuItem className='souq_storge_category_filter_items multiple_select' key={name} value={name}>
												<Checkbox checked={activity.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
										<button
											className='w-full flex flex-col items-center justify-center p-3.5 rounded-none'
											style={{ fontSize: '18px', backgroundColor: '#02466A', color: '#FFFFFF' }}
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												setOpenActivity(false);
											}}
										>
											اختر
										</button>
									</Select>
								</FormControl>
							</div>
						</div>
						<div className='flex flex-col gap-4 mt-4'>
							<h3 style={{ color: '#011723', fontSize: '22px' }} className='font-bold'>
								بيانات المالك
							</h3>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>الإسم الكامل</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<UserIcon className={styles.icon} />
									<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} placeholder='خالد محمد' type='text' />
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>اسم المستخدم</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<UserIcon className={styles.icon} />
									<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} placeholder='K22' type='text' />
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>البريد الإلكتروني</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<EmailIcon className={styles.icon} />
									<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} placeholder='khaled@gmail.com' type='email' />
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>كلمة المرور</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} value='12345678' type={showPassword ? 'text' : 'password'} />
									<Password className={styles.password} onClick={() => setShowPassword(!showPassword)} />
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>الدولة</label>
								<div className='w-[555px] py-4 px-5 rounded-md outline-none' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<p style={{ color: '#011723', fontSize: '18px' }}>المملكة العربية السعودية</p>
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>المدينة</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										value={ownerCity}
										onChange={(e) => setOwerCity(e.target.value)}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (ownerCity === '') {
												return <h2>اختر المدينة</h2>;
											}
											return selected;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{cities.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item}`}
												>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>رقم الجوال</label>
								<div className='w-[555px] py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<div className='flex flex-row items-center'>
										<PhoneIcon className={styles.icon} />
										<input className='w-full outline-none' style={{ backgroundColor: 'transparent' }} placeholder='5419515123' type='text' />
									</div>
									<p style={{ fontSize: '18px', color: '#011723' }}>966</p>
								</div>
							</div>
							<div className='flex flex-row items-center'>
								<h2 className='text-lg w-[315px]'>الصورة الشخصية</h2>
								<ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
									{({ imageList, onImageUpload, dragProps }) => (
										// write your building UI
										<div>
											<div
												className='upload__image-wrapper relative overflow-hidden'
												style={{
													width: '555px',

													border: images[0] ? 'none' : '3px solid #F0F0F0',
													borderRadius: '10px',
												}}
												onClick={() => {
													onImageUpload();
												}}
												{...dragProps}
											>
												<div className='image-item w-full flex cursor-pointer' style={{ height: '56px', backgroundColor: '#EFF0F0' }}>
													{/* <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </button> */}
													{!images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>( اختر صورة فقط png & jpg )</h2>
															<div className='flex flex-col justify-center items-center px-10 rounded-lg' style={{ height: '56px', backgroundColor: '#7C7C7C', color: '#ffffff' }}>
																استعراض
															</div>
														</div>
													)}
													{images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>{images[0].file.name}</h2>
															<div className='flex flex-col justify-center items-center px-10 rounded-lg' style={{ height: '56px', backgroundColor: '#7C7C7C', color: '#ffffff' }}>
																استعراض
															</div>
														</div>
													)}
												</div>
											</div>
										</div>
									)}
								</ImageUploading>
							</div>
							<div className='flex flex-row items-center'>
								<label className='text-lg w-[315px]'>الحالة</label>
								<FormControl sx={{ width: 555 }}>
									<Select
										className={styles.select}
										value={conditionsSelected}
										onChange={(e) => setConditionsSelected(e.target.value)}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (conditionsSelected === '') {
												return <h2>اختر الحالة</h2>;
											}
											return selected;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#EFF0F0',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{conditions.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item}`}
												>
													{item}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
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
							className={'h-[14] w-[268px]'}
							style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
							textStyle={{ color: '#EFF9FF', fontSize: '22px' }}
							type={'normal'}
							onClick={() => {
								setEndActionTitle('تم انشاء متجر جديد بنجاح');
								cancel();
							}}
						>
							حفظ واعتماد
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewMarket;
