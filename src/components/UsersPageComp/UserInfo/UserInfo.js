import React, { useState, useContext } from 'react';
import Button from '../../../UI/Button/Button';
import styles from './UserInfo.module.css';
import { HiOutlineMail } from 'react-icons/hi';
import { IoIosCall } from 'react-icons/io';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ImageUploading from 'react-images-uploading';
import { IoIosArrowDown } from 'react-icons/io';
import { UploadOutlined } from '../../../assets/Icons/index';
import Context from '../../../store/context';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const UserInfo = ({ cancel, user, edit, reload, setReload, roleList }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [userData, setUserData] = useState({
		name: user?.name || '',
		user_name: user?.user_name || '',
		email: user?.email || '',
		phonenumber: user?.phonenumber || '',
		role: user?.role?.name || '',
		password: '',
		confirm_password: '',
	});
	const [images, setImages] = useState([]);
	const onChangeImage = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	const updateUser = () => {
		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('name', userData?.name);
		formData.append('user_name', userData?.user_name);
		formData.append('email', userData?.email);
		formData.append('phonenumber', userData?.phonenumber);
		formData.append('role', userData?.role);
		formData.append('confirm_password', userData?.confirm_password);
		if (userData?.password !== '') {
			formData.append('password', userData?.password);
		}
		if (images.length !== 0) {
			formData.append('image', images[0]?.file || null);
		}
		axios
			.post(`https://backend.atlbha.com/api/Admin/user/${user?.id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
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
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-20 otlobha_new_product ${styles.container}`} style={{ width: '1104px', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='p-8'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold text-2xl  mb-3'>{edit ? 'تعديل بيانات المستخدم' : 'تفاصيل المستخدم'} </h2>
						<div className='flex'>
							<h2 className='font-medium text-lg ml-4'> جدول المستخدمين </h2>

							<h3 className='font-medium text-lg' style={{ color: '#7C7C7C' }}>
								/{edit ? 'تعديل بيانات المستخدم' : 'تفاصيل مستخدم موظف في النظام'}
							</h3>
						</div>
					</div>
					<div className={`flex-1 px-20 overflow-y-scroll py-12  ${styles.content}`}>
						<div className='flex justify-between'>
							<div className='flex gap-4 '>
								<div className='h-44 w-44'>
									<img className='h-full w-full' src={images[0]?.data_url || user?.image} alt='profile-img' />
								</div>
								<div>
									<h2 className='text-xl font-medium mb-3'>{user.name}</h2>
									<h2 className='text-lg font-normal mb-3 text-[#67747B] flex gap-2 items-center'>
										<HiOutlineMail
											style={{
												cursor: 'pointer',
												color: 'rgba(29, 187, 190, 1)',
												fontSize: '1.5rem',
											}}
										></HiOutlineMail>
										{user.email}
									</h2>
									<h2 className='text-lg font-normal mb-3 flex gap-2 items-center'>
										<IoIosCall
											style={{
												cursor: 'pointer',
												color: 'rgba(29, 187, 190, 1)',
												fontSize: '1.5rem',
											}}
										></IoIosCall>
										{user?.phonenumber}
									</h2>
								</div>
							</div>
							<div>
								<Button
									className='h-14 cursor-auto text-xl font-normal'
									style={{
										width: '278px',
										backgroundColor: 'rgba(2, 70, 106, 1)',
									}}
									type={'normal'}
								>
									{user?.role?.name}
								</Button>
							</div>
						</div>
						{edit && (
							<div className='flex mt-12 gap-48'>
								<div className='flex-1 '>
									<div className='mt-6  '>
										<h2 className='font-normal text-lg mb-2'>الدور الوظيفى</h2>
										<Select
											className='w-full h-14  outline-none  rounded-lg'
											value={userData?.role}
											onChange={(e) => setUserData({ ...userData, role: e.target.value })}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											IconComponent={() => {
												return <IoIosArrowDown size={'1rem'} />;
											}}
											renderValue={(selected) => {
												if (userData?.role === '') {
													return <h2>اختر نوع الدور الوظيفي</h2>;
												}
												const result = roleList?.filter((item) => item?.name === selected);
												return result[0]?.name;
											}}
											sx={{
												height: '3.5rem',
												width: '100%',
												border: 'none',
												pl: '1rem',
												backgroundColor: '#EBEBEB',
												'& .MuiOutlinedInput-notchedOutline': {
													border: 'none',
												},
											}}
										>
											{roleList?.map((item, index) => {
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
									<div className='mt-6  '>
										<h2 className='font-normal text-lg mb-2'>اسم المتسخدم</h2>
										<label className='w-full ' htmlFor=''>
											<input
												value={userData?.user_name}
												onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
												className='w-full outline-none p-4 rounded-lg'
												style={{
													border: 'none',
													backgroundColor: '#EBEBEB',
												}}
												type='text'
												placeholder='ادخل حروف فقط'
											/>
										</label>
									</div>
									<div className='mt-6  '>
										<h2 className='font-normal text-lg mb-2'>البريد الالكترونى</h2>
										<label className='w-full ' htmlFor=''>
											<input
												value={userData?.email}
												onChange={(e) => setUserData({ ...userData, email: e.target.value })}
												className='w-full outline-none p-4 rounded-lg'
												style={{
													border: 'none',
													backgroundColor: '#EBEBEB',
												}}
												type='email'
												placeholder='sample@sa.com'
											/>
										</label>
									</div>

									<div className='mt-6'>
										<label className='font-normal' style={{ fontSize: '18px', color: '#011723' }}>
											الصورة الشخصية
										</label>
										<ImageUploading value={images} onChange={onChangeImage} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
											{({ onImageUpload, dragProps }) => (
												// write your building UI
												<div
													className='upload__image-wrapper relative h-14 flex items-center overflow-hidden rounded-lg'
													style={{
														border: 'none',
														backgroundColor: '#EBEBEB',
														color: '#011723',
													}}
													{...dragProps}
												>
													<h2
														className='w-full outline-none p-4 cursor-pointer'
														style={{
															color: '#aaa',
														}}
														onClick={() => {
															onImageUpload();
														}}
													>
														{images[0]?.file?.name || ''}
													</h2>
													<div
														className='flex h-full items-center justify-center'
														style={{
															width: '3.5rem',
															backgroundColor: '#02466A',
														}}
													>
														<img src={UploadOutlined} alt='upload-icon' />
													</div>
												</div>
											)}
										</ImageUploading>
									</div>
								</div>
								<div className='flex-1 '>
									<div className='mt-6  '>
										<h2 className='font-normal text-lg mb-2'>كلمة المرور</h2>
										<label className='w-full font-normal text-lg' htmlFor=''>
											<input
												value={userData?.password}
												onChange={(e) => setUserData({ ...userData, password: e.target.value })}
												className='w-full outline-none p-4 rounded-lg'
												style={{
													border: 'none',
													backgroundColor: '#EBEBEB',
												}}
												type='password'
												placeholder='00000000'
											/>
											<p className='text-base font-normal text-[#ADB5B9]'>أدخل أرقام وحروف ورموز</p>
										</label>
									</div>
									<div className='mt-6  '>
										<h2 className='font-normal text-lg mb-2'>تأكيد كلمة المرور</h2>
										<label className='w-full' htmlFor=''>
											<input
												value={userData?.confirm_password}
												onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
												className='w-full outline-none p-4 rounded-lg'
												style={{
													border: 'none',
													backgroundColor: '#EBEBEB',
												}}
												type='password'
												placeholder='00000000'
											/>
											<p className='text-base font-normal text-[#ADB5B9]'>أدخل أرقام وحروف ورموز</p>
										</label>
									</div>
								</div>
							</div>
						)}
					</div>
					<div
						className='p-8 flex justify-center gap-4'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						{!edit && (
							<Button
								style={{
									borderColor: `#02466A`,
								}}
								textStyle={{ color: '#02466A' }}
								className={'h-14 w-44'}
								type={'outline'}
								onClick={cancel}
							>
								اغلاق
							</Button>
						)}
						{edit && (
							<Button
								style={{
									borderColor: `#02466A`,
								}}
								textStyle={{ color: '#02466A' }}
								className={'h-14 w-[181px] text-2xl '}
								type={'outline'}
								onClick={() => { updateUser(); }}
							>
								حفظ وإغلاق
							</Button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;
