import React, { useContext, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Select from '@mui/material/Select';
import Button from '../../../UI/Button/Button';
import styles from './AddNewUser.module.css';
import MenuItem from '@mui/material/MenuItem';
import { GoArrowRight } from 'react-icons/go';
import ImageUploading from 'react-images-uploading';
import { IoIosArrowDown } from 'react-icons/io';
import { BiLinkAlt } from 'react-icons/bi';
import useFetch from '../../../hooks/useFetch';
import Context from '../../../store/context';
import axios from "axios";

const AddNewUser = ({ reload, setReload, cancel }) => {
	const { fetchedData: roleList } = useFetch('https://backend.atlbha.com/api/Admin/selector/roles');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [userData, setUserData] = useState({
		name: '',
		user_name: '',
		email: '',
		phonenumber: '',
		role: '',
		password: '',
		confirm_password: '',
	});
	const [images, setImages] = useState([]);
	const onChangeImage = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	const addUser = () => {
		let formData = new FormData();
		formData.append('name', userData?.name);
		formData.append('user_name', userData?.user_name);
		formData.append('email', userData?.email);
		formData.append('phonenumber', userData?.phonenumber);
		formData.append('role', userData?.role);
		formData.append('password', userData?.password);
		formData.append('confirm_password', userData?.confirm_password);
		formData.append('image', images[0]?.file || null);
		axios
			.post('https://backend.atlbha.com/api/Admin/user', formData, {
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
		<div className='absolute md:pl-36 top-0 right-0  z-10 md:pt-9 md:pr-2 p-4 pt-0 w-full h-full md:bg-[#fafafa] bg-[#ffffff]'>
			<div className='flex justify-between items-center mb-2'>
				<div className='flex items-center gap-2'>
					<div onClick={cancel} className={`flex cursor-pointer items-center gap-2 `}>
						<div className={`flex items-center gap-2  ${styles.arrow_con}`}>
							<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
						</div>
						<h2 className='font-medium md:text-lg text-[16px] whitespace-nowrap ml-1 text-[#011723]'> جدول المستخدمين </h2>
					</div>
					<h3 className='font-medium md:text-lg text-[16px] whitespace-nowrap' style={{ color: '#7C7C7C' }}>
						<span className='ml-1'>/</span> إضافة مستخدم جديد
					</h3>
				</div>
			</div>
			<div className={'bg-white mt-12 md:p-6 mx-1 md:shadow-[0px_3px_6px_#0000000F]'}>
				<h2 className='font-medium md:text-2xl text-[20px]' style={{ color: '#0077FF' }}>
					<AiFillStar
						style={{
							display: 'inline-block',
							marginLeft: '1rem',
							color: 'red',
						}}
					></AiFillStar>
					بيانات المستخدم
				</h2>
				<div className='flex md:flex-row flex-col'>
					<div className='flex-1 md:p-8'>
						<div className='mt-6'>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>الدور الوظيفى</h2>
							<Select
								className='rounded-lg h-14 pl-2 text-lg font-normal w-[375px]'
								value={userData?.role}
								onChange={(e) => setUserData({ ...userData, role: e.target.value })}
								IconComponent={() => {
									return <IoIosArrowDown size={'1.5rem'} />;
								}}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (userData?.role === '') {
										return <h2 className='md:text-lg text-[16px] font-normal'>اختر نوع الدور الوظيفي</h2>;
									}
									const result = roleList?.data?.roles?.filter((item) => item?.name === selected);
									return result[0]?.name;
								}}
								sx={{
									width: '100%',
									maxWidth: '100%',
									border: 'none',
									backgroundColor: '#B4EDEE',
									'& .MuiOutlinedInput-notchedOutline': {
										border: 'none',
										paddingRight: '10px',
									},
								}}
							>
								{roleList?.data?.roles?.map((item, index) => {
									return (
										<MenuItem
											key={index}
											className='souq_storge_category_filter_items'
											sx={{
												backgroundColor: 'rgba(211, 211, 211, 1)',
												height: '3rem',
												'&:hover': {},
											}}
											value={`${item?.name}`}
										>
											{item?.name}
										</MenuItem>
									);
								})}
							</Select>
						</div>
						<div className='mt-6'>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>الاسم</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.name}
									onChange={(e) => setUserData({ ...userData, name: e.target.value })}
									className='w-[375px] outline-none p-4 rounded-lg h-14'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='text'
									placeholder='ادخل حروف فقط'
								/>
							</label>
						</div>
						<div className='mt-6'>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>اسم المتسخدم</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.user_name}
									onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
									className='w-[375px] outline-none p-4 rounded-lg h-14'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='text'
									placeholder='ادخل حروف فقط'
								/>
							</label>
						</div>
						<div className='mt-6  '>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>البريد الالكترونى</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.email}
									onChange={(e) => setUserData({ ...userData, email: e.target.value })}
									className='w-[375px] outline-none p-4 rounded-lg h-14'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='email'
									placeholder='sample@sa.com'
								/>
							</label>
						</div>
						<div className='mt-6'>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>رقم الهاتف</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.phonenumber}
									onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
									className='w-[375px] outline-none p-4 rounded-lg h-14'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='text'
									placeholder='ادخل حروف فقط'
								/>
							</label>
						</div>
					</div>
					<div className='flex-1 md:p-8'>
						<div className='mt-6  '>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>كلمة المرور</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.password}
									onChange={(e) => setUserData({ ...userData, password: e.target.value })}
									className='w-[375px] outline-none p-4 h-14 rounded-lg'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='password'
									placeholder='00000000'
								/>
								<p className='text-[#ADB5B9] font-normal md:text-lg text-[16px]'>أدخل أرقام وحروف ورموز</p>
							</label>
						</div>
						<div className='mt-6  '>
							<h2 className='font-medium md:text-lg text-[16px] mb-2'>تأكيد كلمة المرور</h2>
							<label className='w-full' htmlFor=''>
								<input
									value={userData?.confirm_password}
									onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
									className='w-[375px] outline-none p-4 h-14 rounded-lg'
									style={{
										maxWidth: '100%',
										border: 'none',
										backgroundColor: '#EFF9FF',
									}}
									type='password'
									placeholder='00000000'
								/>
								<p className='text-[#ADB5B9] font-normal md:text-lg text-[16px]'>أدخل أرقام وحروف ورموز</p>
							</label>
						</div>
						<div className='mt-6  '>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>الصورة الشخصية</h2>
							<ImageUploading value={images} onChange={onChangeImage} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
								{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
									// write your building UI
									<div className='max-w-full upload__image-wrapper  w-[375px] relative h-14 flex items-center overflow-hidden rounded-lg' style={{ border: 'none', backgroundColor: '#EFF9FF' }} {...dragProps}>
										<h2
											className='w-full outline-none p-4 cursor-pointer'
											style={{
												maxWidth: '100%',
												backgroundColor: '#EFF9FF',
												color: '#aaa',
											}}
											onClick={() => {
												onImageUpload();
											}}
										>
											{images[0]?.file?.name || 'أدخل الصورة الشخصية'}
										</h2>
										<div
											className='flex h-full items-center justify-center'
											style={{
												width: '3.5rem',
												backgroundColor: '#02466A',
											}}
										>
											<BiLinkAlt color='#fff' />
										</div>
										{/* <div className="image-item h-full w-full cursor-pointer"> */}
										{/* <button
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here
                        </button> */}
									</div>
								)}
							</ImageUploading>
						</div>
					</div>
				</div>

				<div className='md:mt-28 mt-8'>
					<Button
						onClick={() => { addUser() }}
						className='h-14 w-[186px] text-xl' style={{ backgroundColor: '#02466A', margin: '0 auto' }} type={'normal'}>
						حفظ واعتماد
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddNewUser;
