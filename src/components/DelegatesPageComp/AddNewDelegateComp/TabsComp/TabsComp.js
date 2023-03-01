import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './TabsComp.module.css';
import ImageUploading from 'react-images-uploading';
import useFetch from '../../../../hooks/useFetch';


// icons
import { IoIosArrowDown } from 'react-icons/io';
import { BsSnapchat, BsYoutube } from 'react-icons/bs';
import { ReactComponent as CheckMarkImageIcon } from '../../../../assets/Icons/icon-24-checkmark-image.svg';
import { ReactComponent as BsWhatsapp } from '../../../../assets/Icons/icon-24-whatsapp.svg';
import { ReactComponent as BsFacebook } from '../../../../assets/Icons/icon-24-facebook.svg';
import { ReactComponent as BsTwitter } from '../../../../assets/Icons/icon-24-twitter.svg';
import { ReactComponent as BsInstagram } from '../../../../assets/Icons/icon-32-instagram.svg';

const TabsComp = ({ handleMainInfo, mainInfo, images, onChange }) => {
	
	const activate = [
		{ id: 1, name: 'نشط', name_en: 'active' },
		{ id: 2, name: ' غير نشط', name_en: 'not_active' },
	];


	// to get selectors from api
	const { fetchedData: countryList } = useFetch('https://backend.atlbha.com/api/Admin/selector/countries');
	const { fetchedData: citiesList } = useFetch('https://backend.atlbha.com/api/Admin/selector/cities');
	/** ---------------------------------------------------------------------------------------------- */

	const [value, setValue] = React.useState('1');

	// this function to change tabs
	const handlerChangeTabs = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className='md:mt-16 mt-6'>
			<TabContext value={value}>
				<Box>
					<TabList
						sx={{
							'& .MuiTabs-scroller': {
								overflow: 'auto !important',
							},
							'& .MuiTabs-flexContainer': {
								gap: '1rem',
							},
							'& .MuiButtonBase-root': {
								minWidth: '200px',
								backgroundColor: '#C0E9FF',
								py: '1.25rem',
								borderRadius: '8px',
								color: '#011723',
								transition: '0.1s',
								fontSize: '1.25rem',
								fontWeight: '500',
							},
							'& .MuiButtonBase-root.Mui-selected': {
								backgroundColor: '#02466A',
								color: '#FFFFFF',
							},
							'& .MuiTabs-indicator': { display: 'none' },
						}}
						onChange={handlerChangeTabs}
						variant='fullWidth'
					>
						<Tab disableRipple={true} style={{ fontSize: '20px' }} label='البيانات الأساسية' value='1' />
						<Tab disableRipple={true} style={{ fontSize: '20px' }} label='الدولة/المدينة' value='2' />
						<Tab disableRipple={true} style={{ fontSize: '20px' }} label='التواصل الاجتماعى' value='3' />
						<Tab disableRipple={true} style={{ fontSize: '20px' }} label='تفعيل / تعطيل' value='4' />
					</TabList>
				</Box>
				<Box className='md:h-[40.5rem] md:mt-[3.75rem] mt-6 md:pl-[7.5rem] pl-0'>
					<TabPanel value='1' className='md:pr-[18px] p-0'>
						<div className='flex flex-col gap-5'>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#67747B', fontSize: '18px' }}>اسم المندوب</label>
								<input
									className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
									style={{ border: '1px solid #E9E9E9' }}
									type='text'
									placeholder='عبد العزيز محمد'
									name='name'
									value={mainInfo?.name}
									onChange={handleMainInfo}
								/>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#67747B', fontSize: '18px' }}>اسم المستخدم</label>
								<input
									className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
									style={{ border: '1px solid #E9E9E9' }}
									type='text'
									placeholder='Abed32'
									name='user_name'
									value={mainInfo?.user_name}
									onChange={handleMainInfo}
								/>
							</div>
							<div className='flex md:flex-row flex-col gap-[18px]'>
								<div className='w-full flex flex-col gap-[10px]'>
									<label style={{ color: '#67747B', fontSize: '18px' }}>كلمة المرور</label>
									<input
										className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
										style={{ border: '1px solid #E9E9E9' }}
										type='password'
										placeholder='•••••••'
										name='password'
										value={mainInfo?.password}
										onChange={handleMainInfo}
									/>
								</div>
								<div className='w-full flex flex-col gap-[10px]'>
									<label style={{ color: '#67747B', fontSize: '18px' }}>تأكيد كلمة المرور</label>
									<input
										className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
										style={{ border: '1px solid #E9E9E9' }}
										type='password'
										placeholder='•••••••'
										name='password_confirm'
										value={mainInfo?.password_confirm}
										onChange={handleMainInfo}
									/>
								</div>
							</div>
							<div className='flex md:flex-row flex-col gap-[18px]'>
								<div className='w-full flex flex-col gap-[10px]'>
									<label style={{ color: '#67747B', fontSize: '18px' }}>البريد الالكترونى</label>
									<input
										className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
										style={{ border: '1px solid #E9E9E9' }}
										type='email'
										placeholder='Abed@gmail.com'
										name='email'
										value={mainInfo?.email}
										onChange={handleMainInfo}
									/>
								</div>
								<div className='w-full flex flex-col gap-[10px]'>
									<label style={{ color: '#67747B', fontSize: '18px' }}>رقم التواصل</label>
									<div className='flex flex-row items-center justify-between bg-white w-full px-5 py-[14px] rounded-md' style={{ border: '1px solid #E9E9E9' }}>
										<input
											className='outline-none w-full'
											style={{ backgroundColor: 'transparent' }}
											type='text'
											placeholder='21513515'
											name='phonenumber'
											value={mainInfo?.phonenumber}
											onChange={handleMainInfo}
										/>
										<span style={{ color: '#000000', fontSize: '16px' }}>966</span>
									</div>
								</div>
							</div>
							<div className={`mb-5 flex gap-3 items-end `}>
								<div
									className='flex items-center rounded-md justify-center'
									style={{
										backgroundColor: '#D3D3D3',
										height: '161px',
										minWidth: '130px',
									}}
								>
									{images[0] ? <img className='w-full h-full rounded-md' src={images[0]?.data_url} alt='img' /> : <CheckMarkImageIcon style={{ width: '32px', height: '32px' }} />}
								</div>
								<div className='w-full'>
									<ImageUploading value={images} onChange={onChange} maxNumber={1} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']} className='w-full'>
										{({ imageList, onImageUpload, dragProps }) => (
											// write your building UI
											<div>
												<div
													className='upload__image-wrapper relative overflow-hidden'
													style={{
														width: '100%',

														border: images[0] ? '1px solid #E9E9E9' : '1px solid #E9E9E9',
														borderRadius: '4px',
													}}
													onClick={() => {
														onImageUpload();
													}}
													{...dragProps}
												>
													<div className='image-item w-full flex cursor-pointer' style={{ height: '56px' }}>
														{!images[0] && (
															<div className='flex flex-1'>
																<div className='flex-1 bg-white'></div>
																<div className='flex flex-col justify-center items-center px-10 rounded-lg' style={{ width: '180px', height: '56px', backgroundColor: '#237EAE', color: '#ffffff' }}>
																	استعراض
																</div>
															</div>
														)}
														{images[0] && (
															<div className='flex flex-1'>
																<div className='flex-1 flex flex-col items-center justify-center'>
																	<h6 style={{ fontSize: '18px', color: '#000000', fontWeight: '500' }}>{images[0].file.name}</h6>
																</div>
																<div className='flex flex-col justify-center items-center px-10 rounded-lg' style={{ width: '180px', height: '56px', backgroundColor: '#237EAE', color: '#ffffff' }}>
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
							</div>
						</div>
					</TabPanel>
					<TabPanel value='2' className='md:pr-[18px] p-0'>
						<div className='flex flex-col gap-5'>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>الدولة</label>

								<Select
									displayEmpty
									style={{ fontSize: '18px', border: '1px solid #E9E9E9' }}
									name='country_id'
									value={mainInfo?.country_id}
									onChange={handleMainInfo}
									IconComponent={() => {
										return <IoIosArrowDown size={'1rem'} />;
									}}
									inputProps={{ 'aria-label': 'Without label' }}
									renderValue={(selected) => {
										if (mainInfo?.country_id === '') {
											return <h2>اختر الدولة</h2>;
										}
										const result = countryList?.data?.countries?.filter((item) => item?.id === parseInt(selected));
										return result[0]?.name;
									}}
									className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
									sx={{
										height: '3.5rem',
										pl: '1rem',
										'& .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #E9E9E9',
										},
										'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										},
									}}
								>
									{countryList?.data?.countries?.map((item) => {
										return (
											<MenuItem
												key={item.id}
												className='w-full'
												sx={{
													width: '100%',
													backgroundColor: '#fff',
													height: '3rem',
												}}
												value={`${item?.id}`}
											>
												{item?.name}
											</MenuItem>
										);
									})}
								</Select>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>المدينة:</label>
								<Select
									displayEmpty
									style={{ fontSize: '18px', border: '1px solid #E9E9E9' }}
									name='city_id'
									value={mainInfo?.city_id}
									onChange={handleMainInfo}
									IconComponent={() => {
										return <IoIosArrowDown size={'1rem'} />;
									}}
									inputProps={{ 'aria-label': 'Without label' }}
									renderValue={(selected) => {
										if (mainInfo?.city_id === '') {
											return <h2>اختر المدينة</h2>;
										}
										const result = citiesList?.data?.cities?.filter((item) => item?.id === parseInt(selected));
										return result[0]?.name;
									}}
									className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
									sx={{
										height: '3.5rem',
										pl: '1rem',
										'& .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #E9E9E9',
										},
										'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										},
									}}
								>
									{citiesList?.data?.cities?.map((item) => {
										return (
											<MenuItem
												key={item.id}
												className='w-full'
												sx={{
													width: '100%',
													backgroundColor: '#fff',
													height: '3rem',
												}}
												value={`${item?.id}`}
											>
												{item?.name}
											</MenuItem>
										);
									})}
								</Select>
							</div>
						</div>
					</TabPanel>
					<TabPanel value='3' className='md:pr-[18px] p-0'>
						<div className='flex flex-col gap-5'>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>رقم واتساب</label>
								<div className={` flex-1 relative   `}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='whatsapp'
										value={mainInfo?.whatsapp}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsWhatsapp className={styles.icons} width='20px' height='20px'></BsWhatsapp>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>سناب شات</label>
								<div className={` flex-1 relative   `}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='snapchat'
										value={mainInfo?.snapchat}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsSnapchat className={styles.icons} width='20px' height='20px'></BsSnapchat>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>فيسبوك</label>
								<div className={` flex-1 relative   `}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										placeholder=''
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='facebook'
										value={mainInfo?.facebook}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsFacebook className={styles.icons} width='20px' height='20px'></BsFacebook>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>تويتر</label>
								<div className={` flex-1 relative   `}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='twiter'
										value={mainInfo?.twiter}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsTwitter className={styles.icons} width='20px' height='20px'></BsTwitter>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>انستجرام</label>
								<div className={` flex-1 relative`}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='instegram'
										value={mainInfo?.instegram}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsInstagram className={styles.icons} width='20px' height='20px'></BsInstagram>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<label style={{ color: '#000000', fontSize: '18px' }}>يوتيوب</label>
								<div className={` flex-1 relative`}>
									<input
										className='bg-white outline-none w-full px-10 py-[14px] rounded-md'
										type='text'
										style={{
											border: '1px solid #E9E9E9',
										}}
										name='youtube'
										value={mainInfo?.youtube}
										onChange={handleMainInfo}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<BsYoutube className={styles.icons} width='20px' height='20px'></BsYoutube>
									</div>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel value='4' className='md:pr-[18px] p-0'>
						<div className='flex flex-col gap-[10px]'>
							<label style={{ color: '#000000', fontSize: '18px' }}>الحالة</label>
							<Select
								name='status'
								value={mainInfo?.status}
								onChange={handleMainInfo}
								style={{ fontSize: '18px', border: '1px solid #E9E9E9' }}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (mainInfo?.status === '') {
										return <h2> تفعيل</h2>;
									}
									const result = activate?.filter((item) => item?.name_en === selected);
									return result[0]?.name;
								}}
							
								className='bg-white outline-none w-full px-5 py-[14px] rounded-md'
								sx={{
									height: '3.5rem',
									backgroundColor: '#fff',
									width: '100%',
									'& .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #E9E9E9',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #03787A',
									},
								}}
							>
								{activate.map((item, idx) => {
									return (
										<MenuItem
											key={idx}
											className=''
											sx={{
												backgroundColor: '#fff',
												height: '3rem',

												'&:hover': {},
												'ul:has(&)': {
													padding: '0',
												},
											}}
											value={`${item?.name_en}`}
										>
											{item?.name}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</TabPanel>
				</Box>
			</TabContext>
		</Box>
	);
};

export default TabsComp;
