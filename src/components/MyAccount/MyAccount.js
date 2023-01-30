import React, { useState, useContext } from 'react';
import Button from '../../UI/Button/Button';
import styles from './MyAccount.module.css';
import { HiOutlineMail } from 'react-icons/hi';
import { IoIosCall } from 'react-icons/io';
import Select from '@mui/material/Select';
import Person from '../../assets/Icons/Image Person.png';
import MenuItem from '@mui/material/MenuItem';
import ImageUploading from 'react-images-uploading';
import { ReactComponent as Arrow } from '../../assets/Icons/icon-24-chevron_down.svg';
import { UploadOutlined } from '../../assets/Icons/index';
import Context from '../../store/context';

const packagesOptions = ['إدارة المنصة', 'المشرف العام', 'مسئول المتاجر والباقات', 'مسئول السوق والصفحات'];

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

//

const MyAccount = ({ cancel, user, setUser, edit, setEditUser }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [profileImage, setProfileImage] = useState(Person);
	const [images, setImages] = useState([]);
	const [packageOption, setPackageOption] = useState('');
	const handleCategory = (event) => {
		setPackageOption(event.target.value);
	};
	const onChangeImage = (imageList, addUpdateIndex) => {
		console.log(imageList[0].data_url);
		setProfileImage(imageList[0].data_url);
		// data for submit
		setImages(imageList);
	};
	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-20 otlobha_new_product ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:py-[48px] py-[30px] md:pr-[70px] pr-[20px]'
						style={{
							height: '135px',
							backgroundColor: '#EBEBEB',
						}}
					>
						{edit ? (
							<>
								<h2 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
									تعديل بيانات حسابي
								</h2>
								<div className='flex flex-row mt-[10px]'>
									<h2 style={{ color: '#011723' }} className='md:text-[18px] text-[12px] md:font-semibold font-normal ml-4'>
										حسابي الادمن
									</h2>

									<h3 className='md:text-[18px] text-[12px] md:font-medium font-normal' style={{ color: '#7C7C7C' }}>
										/ تعديل بيانات الحساب
									</h3>
								</div>
							</>
						) : (
							<h2 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
								حسابي الادمن
							</h2>
						)}
					</div>
					<div className={`flex-1 md:px-[90px] px-[18px] bg-[#F6F6F6] overflow-y-scroll py-[48px]  ${styles.content}`}>
						<div className='flex md:flex-row flex-col items-center md:items-start justify-between flex-wrap gap-6'>
							<div className='flex md:flex-row flex-col gap-5'>
								<div className='md:h-44 md:w-44 h-[92px] w-[92px] self-center'>
									<img className='h-full w-full md:rounded-none rounded-lg' src={profileImage} alt='profile-img' />
								</div>
								<div className='flex flex-col md:gap-[8px] gap-4'>
									<h2 style={{ fontSize: '20px', color: '#011723' }} className='font-medium'>
										{user.name}
									</h2>
									<div className='flex flex-col gap-[8px]'>
										<h2 className='flex flex-row gap-[18px] items-center' style={{ fontSize: '18px', color: '#67747B' }}>
											<HiOutlineMail
												style={{
													cursor: 'pointer',
													color: 'rgba(29, 187, 190, 1)',
													fontSize: '1.5rem',
												}}
											></HiOutlineMail>
											{user.email}
										</h2>
										<h2 className='flex flex-row gap-[18px] items-center' style={{ fontSize: '18px', color: '#67747B' }}>
											<IoIosCall
												style={{
													cursor: 'pointer',
													color: 'rgba(29, 187, 190, 1)',
													fontSize: '1.5rem',
												}}
											></IoIosCall>
											{user.phone}
										</h2>
									</div>
								</div>
							</div>
							<Button
								style={{
									fontSize: '20px',
									color: '#EFF9FF',
									backgroundColor: edit ? '#02466A' : '#5EBFF2',
								}}
								type={'normal'}
								className='cursor-auto font-bold order-first md:order-last md:w-[278px] w-[162px] md:h-[60px] h-[48px]'
							>
								{user.role}
							</Button>
						</div>
						{edit && (
							<div className='flex md:flex-row flex-col mt-[52px] md:gap-48 gap-5'>
								<div className='flex-1 flex flex-col gap-5'>
									<div className='flex flex-col gap-2'>

										<Select
											className={styles.select}
											value={packageOption}
											onChange={handleCategory}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											IconComponent={(props) => <Arrow fill='#242424' {...props} />}
											renderValue={(selected) => {
												if (packageOption === '') {
													return <h2>اختر نوع الدور الوظيفي</h2>;
												}
												return selected;
											}}
											sx={{
												height: '3.5rem',
												width: '100%',
												border: 'none',
												pl: '1rem',
												backgroundColor: '#EBEBEB',
												borderRadius: '8px',
												'& .MuiOutlinedInput-notchedOutline': {
													border: 'none',
												},
											}}
										>
											{packagesOptions.map((item) => {
												return (
													<MenuItem
														className='souq_storge_category_filter_items'
														sx={{
															backgroundColor: '#EBEBEB',
															height: '3rem',
															'&:hover': {
																backgroundColor: '#1dbbbe80',
															},
														}}
														value={`${item}`}
													>
														{item}
													</MenuItem>
												);
											})}
										</Select>
									</div>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>اسم المتسخدم</label>
										<input
											className='w-full outline-none p-4 rounded-lg'
											style={{
												border: 'none',
												backgroundColor: '#EBEBEB',
												color: '#011723',
											}}
											type='text'
											placeholder='ادخل حروف فقط'
											value={user.name}
											onChange={(e) => setUser({ ...user, name: e.target.value })}
										/>
									</div>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>البريد الالكتروني</label>
										<input
											className='w-full outline-none p-4 rounded-lg'
											style={{
												border: 'none',
												backgroundColor: '#EBEBEB',
												color: '#011723',
											}}
											type='email'
											placeholder='sample@sa.com'
											value={user.email}
											onChange={(e) => setUser({ ...user, email: e.target.value })}
										/>
									</div>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>الصورة الشخصية</label>
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
													// onClick={() => {
													//   onImageUpload();
													// }}
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
								<div className='flex-1 flex flex-col gap-5'>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>رقم الجوال</label>
										<input
											className='w-full outline-none p-4 rounded-lg'
											style={{
												border: 'none',
												backgroundColor: '#EBEBEB',
												color: '#011723',
											}}
											type='text'
											placeholder='96651548315'
											value={user.phone}
											onChange={(e) => setUser({ ...user, phone: e.target.value })}
										/>
									</div>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>كلمة المرور</label>
										<input
											className='w-full outline-none p-4 rounded-lg'
											style={{
												border: 'none',
												backgroundColor: '#EBEBEB',
												color: '#011723',
											}}
											type='password'
											placeholder='.........'
											value={user.password}
											onChange={(e) => setUser({ ...user, password: e.target.value })}
										/>
										<p className='text-base font-normal text-[#ADB5B9]'>أدخل أرقام وحروف ورموز</p>
									</div>
									<div className='flex flex-col gap-2'>
										<label style={{ fontSize: '18px', color: '#011723' }}>تأكيد كلمة المرور</label>
										<input
											className='w-full outline-none p-4 rounded-lg'
											style={{
												border: 'none',
												backgroundColor: '#EBEBEB',
												color: '#011723',
											}}
											type='password'
											placeholder='..........'
											value={user.confirmPassword}
											onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
										/>
										<p className='text-base font-normal text-[#ADB5B9]'>أدخل أرقام وحروف ورموز</p>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className='py-8 md:px-8 px-[18px] flex justify-center gap-4 md:h-[135px] h-[115px] md:bg-[#EBEBEB] bg-[#F6F6F6]'>
						{!edit && (
							<div className='w-full flex flex-row justify-center gap-5'>
								<Button
									style={{
										backgroundColor: '#02466A',
										borderColor: `#02466A`,
									}}
									textStyle={{ color: '#EFF9FF'}}
									className='md:w-[128px] w-full md:h-[56px] h-[50px] md:text-[24px] text-[19px] font-medium'
									type={'normal'}
									onClick={setEditUser}
								>
									تعديل
								</Button>
								<Button
									style={{
										width: '128px',
										height: '56px',
										borderColor: `#02466A`,
									}}
									textStyle={{ color: '#02466A' }}
									className='md:w-[128px] w-full md:h-[56px] h-[50px] md:text-[24px] text-[19px] font-medium'
									type={'outline'}
									onClick={cancel}
								>
									اغلاق
								</Button>
							</div>
						)}
						{edit && (
							<Button
								style={{
									border: '1px solid #02466A',
									borderRadius: '8px',
								}}
								className="md:w-[182px] w-full md:h-[56px] h-[50px] md:text-[24px] text-[19px] font-medium bg-transparent"
								textStyle={{ color: '#02466A' }}
								type={'outline'}
								onClick={() => {
									cancel();
									setEndActionTitle('تم تعديل بيانات الآدمن بنجاح');
									setEditUser(false);
								}}
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

export default MyAccount;
