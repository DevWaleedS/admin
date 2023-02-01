import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Select from '@mui/material/Select';
import Button from '../../../UI/Button/Button';
import styles from './AddNewUser.module.css';
import MenuItem from '@mui/material/MenuItem';
import { GoArrowRight } from 'react-icons/go';
import ImageUploading from 'react-images-uploading';
import { IoIosArrowDown } from 'react-icons/io';
import { BiLinkAlt } from 'react-icons/bi';

const packagesOptions = ['إدارة المنصة', 'المشرف العام', 'مسئول المتاجر والباقات والطلبات والخدمات والدعم الفني', 'مسئول السوق والصفحات'];

const AddNewUser = ({ cancel }) => {
	const [images, setImages] = useState([]);
	const [packageOption, setPackageOption] = useState('');
	const handleCategory = (event) => {
		setPackageOption(event.target.value);
	};
	const onChangeImage = (imageList, addUpdateIndex) => {
		console.log(imageList[0].file.name);
		// data for submit
		setImages(imageList);
	};
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
								value={packageOption}
								onChange={handleCategory}
								IconComponent={() => {
									return <IoIosArrowDown size={'1.5rem'} />;
								}}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (packageOption === '') {
										return <h2 className='md:text-lg text-[16px] font-normal'>اختر نوع الدور الوظيفي</h2>;
									}
									return selected;
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
								{packagesOptions.map((item) => {
									return (
										<MenuItem
											className='souq_storge_category_filter_items whitespace-normal w-[375px]'
											sx={{
												backgroundColor: 'rgba(211, 211, 211, 1)',
												height: '3rem',
												'&:hover': { backgroundColor: '#1DBBBE' },
											}}
											value={`${item}`}
										>
											{item}
										</MenuItem>
									);
								})}
							</Select>
						</div>
						<div className='mt-6  '>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>اسم المتسخدم</h2>
							<label className='w-full' htmlFor=''>
								<input
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
					<div className='flex-1 md:p-8'>
						<div className='mt-6  '>
							<h2 className='font-medium mb-2 md:text-lg text-[16px] text-[#011723]'>كلمة المرور</h2>
							<label className='w-full' htmlFor=''>
								<input
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
					</div>
				</div>

				<div className='md:mt-28 mt-8'>
					<Button className='h-14 w-[186px] text-xl' style={{ backgroundColor: '#02466A', margin: '0 auto' }} type={'normal'}>
						حفظ واعتماد
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddNewUser;
