import React, { useState, useContext } from 'react';
import axios from "axios";
import Button from '../../../UI/Button/Button';
import Context from '../../../store/context';
import styles from './NewService.module.css';
import ImageUploading from 'react-images-uploading';

// icons
import { ReactComponent as AddIcon } from '../../../assets/Icons/icon-34-add.svg';
import Box from '@mui/material/Box';


// back_drop
const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

// some styles
const formTitleClasses = 'md:w-[315px] w-full font-semibold md:text-lg text-[16px] md:mb-0 mb-2';
const formInputClasses = 'md:w-[555px] w-full md:h-14 h-[45px] p-4 outline-0 rounded-md';
const formInputStyle = {
	border: '1px solid #A7A7A7',
	backgroundColor: '#F6F6F6',
};


const NewService = ({ cancel, reload, setReload }) => {

	// to get token that user set it from local storage 
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// select all input in store the value in state
	const [servicesData, setServicesData] = useState({
		service_name: '',
		service_details: '',
		service_price: '',
	});

	const servicesHandler = (event) => {
		const {name, value} = event.target;

		setServicesData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	// to get image or video
	const [images, setImages] = useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};


	// handle function to set new service
	const addNewService = () => {
		const formData = new FormData();
		formData.append('image', images[0]?.file || '');
		formData.append('service_name', servicesData?.service_name);
		formData.append('service_details', servicesData?.service_details);
		formData.append('service_price', servicesData?.service_price);

		axios
			.post(`https://backend.atlbha.com/api/Admin/service`, formData, {
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
			<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-30 ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:p-8 p-4'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-semibold md:text-2xl text-[20px]  mb-3'>اضافة خدمة </h2>
						<h2 className='font-medium md:text-[18px] text-[14px]'>أضف فئة المنتج الخاص بك والمعلومات الضرورية من هنا</h2>
					</div>
					<div className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 p-4 ${styles.content}`}>
						<form action=''>
							<div className='flex md:flex-row flex-col mb-8'>
								<h2 className={formTitleClasses}>اسم الخدمة</h2>
								<label>
									<input className={formInputClasses} style={formInputStyle} placeholder='ادخل اسم الخدمة' type='text' name='service_name' value={servicesData?.service_name} onChange={servicesHandler} />
								</label>
							</div>
							<div className='flex md:flex-row flex-col mb-8 '>
								<h2 className={formTitleClasses}>تفاصيل الخدمة</h2>
								<textarea
									className={`${formInputClasses}  md:h-[120px]`}
									style={{ ...formInputStyle, resize: 'none' }}
									resize={false}
									placeholder='وصف تفاصيل المنتج'
									id=''
									cols='30'
									rows='4'
									name='service_details'
									value={servicesData?.service_details}
									onChange={servicesHandler}
								></textarea>
							</div>

							<div className='flex md:flex-row flex-col mb-8'>
								<h2 className={formTitleClasses}>اضافة صورة / فيديو</h2>

								<div className='md:w-[555px] w-full md:h-14 h-[45px] fcc p-3 gap-4 cursor-pointer rounded' style={formInputStyle}>
									<ImageUploading value={images} onChange={onChange} maxNumber={1} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg', 'svg']}>
										{({ imageList, onImageUpload, dragProps }) => (
											// write your building UI

											<div
												className=' w-full flex align-center justify-center'
												onClick={() => {
													onImageUpload();
												}}
												{...dragProps}
											>
												{!images[0] && (
													<Box sx={{ '& circle': { fill: 'rgba(36, 36, 36, 1)' } }}>
														<AddIcon width={'1.5rem'}></AddIcon>
													</Box>
												)}

												{images[0] && (
													<div className=''>
														<img width={'60px'} src={images[0]?.data_url} alt={images[0]?.data_url} />
													</div>
												)}
											</div>
										)}
									</ImageUploading>
								</div>
							</div>
							<div className='flex md:flex-row flex-col mb-8 '>
								<h2 className={formTitleClasses}>سعر الخدمة</h2>
								<label className='md:w-[555px] w-full md:h-14 h-[45px] flex rounded-md overflow-hidden' style={formInputStyle}>
									<div className='p-4 flex flex-1'>
										<input className='flex-1 border-none outline-none bg-[#F6F6F6]' placeholder='0' type='text' name='name' />
									</div>
									<div
										className='h-full w-16 flex justify-center items-center text-lg'
										style={{
											borderRight: '1px solid #A7A7A747',
											backgroundColor: '#E9E9E9',
										}}
									>
										ر.س
									</div>
								</label>
							</div>
						</form>
					</div>
					<div
						className='md:p-8 p-4 md:h-[135px] h-[100px] items-center flex justify-center gap-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className={'md:h-14 h-[45px] md:w-44 w-full text-xl'}
							style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
							type={'normal'}
							onClick={addNewService}
						>
							حفظ
						</Button>
						<Button
							style={{
								borderColor: `rgba(2, 70, 106, 1)`,
							}}
							textStyle={{ color: 'rgba(2, 70, 106, 1)' }}
							className={'md:h-14 h-[45px] md:w-44 w-full text-xl'}
							type={'outline'}
							onClick={cancel}
						>
							إلغاء
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewService;
