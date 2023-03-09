import React, { useState, useContext } from 'react';
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
import useFetch from '../../../../hooks/useFetch';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};
const planeTime = [{id:1,name:'سنوي',name_en:'year'},{id:2,name:'شهري (6 شهور)',name_en:'6months'}];
const conditions = [
	{ id: 1, name: 'مفعل', name_en: 'active' },
	{ id: 2, name: 'غير مفعل', name_en: 'not_active' }
];

const AddNewMarket = ({ cancel, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [images, setImages] = useState([]);

	// Define storeInfo object
	const [storeInfo, setStoreInfo] = useState({
		store_name: '',
		domain: '',
		store_email: '',
		phonenumber: '',
		package_id: '',
		activity_ids: [],
		country_id: '',
		city_id: '',
		periodtype: '',
	});

	// Define personInfo object
	const [personInfo, setPersonInfo] = useState({
		name: '',
		user_name: '',
		email: '',
		password: '',
		userphonenumber: '',
		user_country_id: '',
		user_city_id: '',
		status: '',

	});


	

	/** --------------------------------------------- */

	// to get selectors from api
	const { fetchedData: countryList } = useFetch('https://backend.atlbha.com/api/Admin/selector/countries');
	const { fetchedData: citiesList } = useFetch('https://backend.atlbha.com/api/Admin/selector/cities');
	const { fetchedData: packagesList } = useFetch('https://backend.atlbha.com/api/Admin/selector/packages');
	const { fetchedData: activitiesList } = useFetch('https://backend.atlbha.com/api/Admin/selector/activities');
	/** -------------------------------------------------------- */


	// set these state open and close activity and show password
	const [openActivity, setOpenActivity] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	
	// to hold images
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};


	// define this functions to post all add market data to server
	const addMarket = () => {
		let formData = new FormData();
		formData.append('store_name', storeInfo?.store_name);
		formData.append('domain', storeInfo?.domain);
		formData.append('store_email', storeInfo?.store_email);
		formData.append('phonenumber', storeInfo?.phonenumber);
		formData.append('package_id', storeInfo?.package_id);
		formData.append('country_id', storeInfo?.country_id);
		formData.append('city_id', storeInfo?.city_id);
		formData.append('periodtype', storeInfo?.periodtype);

		// create looping to get all ids for activity_ids and assign it
		for (let i = 0; i < storeInfo?.activity_ids?.length; i++) {
			formData.append([`activity_id[${i}]`], storeInfo?.activity_ids[i]);
		}
		/** ------------------------------------------- */

		formData.append('name', personInfo?.name);
		formData.append('user_name', personInfo?.user_name);
		formData.append('email', personInfo?.email);
		formData.append('password', personInfo?.password);
		formData.append('userphonenumber', personInfo?.userphonenumber);
		formData.append('user_country_id', personInfo?.user_country_id);
		formData.append('user_city_id', personInfo?.user_city_id);

		// here we tell formData if images[0].file its has been file got it if not just put empty stings
		formData.append('image', images[0]?.file || null);
		formData.append('status', personInfo?.status);

		axios
			.post('https://backend.atlbha.com/api/Admin/store', formData, {
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
	};

	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-30 ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:pt-12 md:pr-16 md:p-8 px-5 py-[30px]'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold md:text-[22px] text-[20px] text-right mb-3'>انشاء متجر جديد</h2>
						<div className='flex flex-row items-center'>
							<div onClick={() => cancel()} className={'flex items-center gap-2 cursor-pointer'}>
								<div className='flex flex-col items-center justify-center' style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#02466A1A' }}>
									<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
								</div>
								<h2 className='ml-4 md:text-[18px] text-[16px]'> عرض المتاجر </h2>
							</div>
							<h3 className='md:text-[18px] text-[16px]' style={{ color: '#67747B' }}>
								/ انشاء متجر جديد
							</h3>
						</div>
					</div>
					<div style={{ backgroundColor: '#F6F6F6' }} className={`flex-1 overflow-y-scroll md:pl-12 text-right md:py-5 md:pr-16 p-4 ${styles.content}`}>
						<div className='flex flex-col gap-4'>
							<h3 style={{ color: '#011723' }} className='md:text-[22px] text-[20px] font-bold'>
								بيانات المتجر
							</h3>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم المتجر
								</label>
								<input
									value={storeInfo?.store_name}
									onChange={(e) => {
										setStoreInfo({ ...storeInfo, store_name: e.target.value });
									}}
									className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md outline-none'
									style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}
									placeholder='حروف عربية او انجليزية'
									type='text'
								/>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									الدومين
								</label>
								<input
									value={storeInfo?.domain}
									onChange={(e) => {
										setStoreInfo({ ...storeInfo, domain: e.target.value });
									}}
									className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md outline-none'
									style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}
									placeholder='ادخل حروف انجليزية فقط'
									type='text'
								/>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									البريد الإلكتروني
								</label>
								<input
									value={storeInfo?.store_email}
									onChange={(e) => {
										setStoreInfo({ ...storeInfo, store_email: e.target.value });
									}}
									className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md outline-none'
									style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}
									placeholder='sample@gmail.com'
									type='email'
								/>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>الدولة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={storeInfo?.country_id}
										onChange={(e) => {
											setStoreInfo({ ...storeInfo, country_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (storeInfo?.country_id === '') {
												return <h2>اختر الدولة</h2>;
											}
											const result = countryList?.data?.countries?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
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
										{countryList?.data?.countries?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>المدينة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={storeInfo?.city_id}
										onChange={(e) => {
											setStoreInfo({ ...storeInfo, city_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (storeInfo?.city_id === '') {
												return <h2>اختر المدينة</h2>;
											}
											const result = citiesList?.data?.cities?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
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
										{citiesList?.data?.cities?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>رقم الجوال</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<div className='flex flex-row items-center'>
										<PhoneIcon className={styles.icon} />
										<input
											value={storeInfo?.phonenumber}
											onChange={(e) => {
												setStoreInfo({ ...storeInfo, phonenumber: e.target.value });
											}}
											className='w-full outline-none'
											style={{ backgroundColor: 'transparent' }}
											placeholder='5419515123'
											type='text'
										/>
									</div>
									<p style={{ fontSize: '18px', color: '#011723' }}>966</p>
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									نوع الخطة
								</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={storeInfo?.package_id}
										onChange={(e) => {
											setStoreInfo({ ...storeInfo, package_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (storeInfo?.package_id === '') {
												return <h2>اختر نوع الخطة</h2>;
											}
											const result = packagesList?.data?.packages?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
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
										{packagesList?.data?.packages?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									مدة الاشتراك
								</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={storeInfo?.periodtype}
										onChange={(e) => {
											setStoreInfo({ ...storeInfo, periodtype: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (storeInfo?.periodtype === '') {
												return <h2>اختيار مدة الاشتراك</h2>;
											}
											const result = planeTime?.filter((item) => item?.name_en === selected);
											return result[0]?.name;
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
													value={`${item?.name_en}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									نوع النشاط
								</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										multiple
										displayEmpty
										open={openActivity}
										onClick={(e) => {
											setOpenActivity(true);
										}}
										value={storeInfo?.activity_ids}
										onChange={(e) => {
											setStoreInfo({ ...storeInfo, activity_ids: e.target.value });
										}}
										renderValue={(selected) => {
											if (storeInfo?.activity_ids.length === 0) {
												return 'نشاط المتجر';
											}
											return selected.map((item) => {
												const result = activitiesList?.data?.activities?.filter((a) => a?.id === parseInt(item));
												return `${result[0]?.name} , `;
											});
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
										{activitiesList?.data?.activities?.map((item, index) => (
											<MenuItem className='souq_storge_category_filter_items multiple_select' key={index} value={item?.id}>
												<Checkbox checked={storeInfo?.activity_ids.indexOf(item?.id) > -1} />
												<ListItemText primary={item?.name} />
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
						<div className='flex flex-col gap-4 md:mt-4 mt-8'>
							<h3 style={{ color: '#011723' }} className='md:text-[22px] text-[20px] font-bold'>
								بيانات المالك
							</h3>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>الإسم الكامل</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<UserIcon className={styles.icon} />
									<input
										value={personInfo?.name}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, name: e.target.value });
										}}
										className='w-full outline-none'
										style={{ backgroundColor: 'transparent' }}
										placeholder='خالد محمد'
										type='text'
									/>
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>اسم المستخدم</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<UserIcon className={styles.icon} />
									<input
										value={personInfo?.user_name}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, user_name: e.target.value });
										}}
										className='w-full outline-none'
										style={{ backgroundColor: 'transparent' }}
										placeholder='K22'
										type='text'
									/>
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>البريد الإلكتروني</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<EmailIcon className={styles.icon} />
									<input
										value={personInfo?.email}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, email: e.target.value });
										}}
										className='w-full outline-none'
										style={{ backgroundColor: 'transparent' }}
										placeholder='khaled@gmail.com'
										type='email'
									/>
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>كلمة المرور</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<input
										value={personInfo?.password}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, password: e.target.value });
										}}
										className='w-full outline-none'
										style={{ backgroundColor: 'transparent' }}
										type={showPassword ? 'text' : 'password'}
									/>
									<Password className={styles.password} onClick={() => setShowPassword(!showPassword)} />
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>الدولة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={personInfo?.user_country_id}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, user_country_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (personInfo?.user_country_id === '') {
												return <h2>اختر الدولة</h2>;
											}
											const result = countryList?.data?.countries?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
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
										{countryList?.data?.countries?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>المدينة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={personInfo?.user_city_id}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, user_city_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (personInfo?.user_city_id === '') {
												return <h2>اختر المدينة</h2>;
											}
											const result = citiesList?.data?.cities?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
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
										{citiesList?.data?.cities?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>رقم الجوال</label>
								<div className='w-[555px] md:h-[56px] h-[44px] max-w-full py-4 px-5 rounded-md flex flex-row items-center justify-between' style={{ backgroundColor: '#EFF0F0', border: '1px solid #F0F0F0' }}>
									<div className='flex flex-row items-center'>
										<PhoneIcon className={styles.icon} />
										<input
											value={personInfo?.userphonenumber}
											onChange={(e) => {
												setPersonInfo({ ...personInfo, userphonenumber: e.target.value });
											}}
											className='w-full outline-none'
											style={{ backgroundColor: 'transparent' }}
											placeholder='5419515123'
											type='text'
										/>
									</div>
									<p style={{ fontSize: '18px', color: '#011723' }}>966</p>
								</div>
							</div>
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<h2 className='md:text-[18px] text-[16px] w-[315px]'>الصورة الشخصية</h2>
								<ImageUploading value={images} onChange={onChange} maxNumber={1} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
									{({ imageList, onImageUpload, dragProps }) => (
										// write your building UI
										<div className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
											<div
												className='upload__image-wrapper relative overflow-hidden'
												style={{
													border: images[0] ? 'none' : '3px solid #F0F0F0',
													borderRadius: '10px',
												}}
												onClick={() => {
													onImageUpload();
												}}
												{...dragProps}
											>
												<div className='image-item w-full flex cursor-pointer md:h-[56px] h-[44px]' style={{ backgroundColor: '#EFF0F0' }}>
													{!images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>( اختر صورة فقط png & jpg )</h2>
															<div className='flex flex-col justify-center items-center md:px-10 px-5 rounded-lg' style={{ height: '56px', backgroundColor: '#A7A7A7', color: '#ffffff' }}>
																استعراض
															</div>
														</div>
													)}
													{images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>{images[0].file.name}</h2>
															<div className='flex flex-col justify-center items-center md:px-10 px-5 rounded-lg' style={{ height: '56px', backgroundColor: '#A7A7A7', color: '#ffffff' }}>
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
							<div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
								<label className='md:text-[18px] text-[16px] w-[315px]'>الحالة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={personInfo?.status}
										onChange={(e) => {
											setPersonInfo({ ...personInfo, status: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (personInfo?.status === '') {
												return <h2>اختر الحالة</h2>;
											}
											const result = conditions?.filter((item) => item?.name_en === selected);
											return result[0]?.name;
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
													value={`${item?.name_en}`}
												>
													{item?.name}
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
						<Button className={'h-[14] w-[268px]'} style={{ backgroundColor: `rgba(2, 70, 106, 1)` }} textStyle={{ color: '#EFF9FF', fontSize: '22px' }} type={'normal'} onClick={addMarket}>
							حفظ واعتماد
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewMarket;
