import React, { useContext, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Button from '../../../../UI/Button/Button';
import Context from '../../../../store/context';
import ImageUploading from 'react-images-uploading';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed opacity-25 back_drop top-0 left-0 h-full w-full bg-slate-900  z-10 `}></div>;
};

const AddAnActivity = ({ cancel, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const [showAddActivity, setShowAddActivity] = useState(false);
	const [activiyName, setActitviyName] = useState('');
	const { setEndActionTitle } = contextStore;
	const [images, setImages] = useState([]);

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

<<<<<<< HEAD
	useEffect(() => {
		if (editActivity) {
			setActitviyName(editActivity.title);
		}
	}, [editActivity]);

	// add activity form
=======
>>>>>>> 1ba0aa4bb0d9150ecb1c68154c9e21157d61e2b2
	const addActivity = () => {
		
		let formData = new FormData();
		formData.append('icon',images[0]?.file || '');
		formData.append('name', activiyName);

		axios
			.post("https://backend.atlbha.com/api/Admin/activity", formData, {
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
			<BackDrop onClick={cancel} />
			{showAddActivity && (
				<AddAnActivity
					cancel={() => {
						setShowAddActivity(false);
					}}
				></AddAnActivity>
			)}
			<div className='fixed flex flex-col top-24 translate-x-2/4 right-2/4 z-20 md:rounded-md rounded-2xl overflow-hidden md:h-[36rem] h-[25rem]' style={{ width: '51.25rem', maxWidth: '90%' }}>
				<div className='h-16 w-full flex items-center justify-between px-4' style={{ backgroundColor: '#02466A' }}>
					<h2 className='text-slate-50 md:text-[22px] text-[18px] font-medium flex-1 text-center'>اضافة نشاط جديد </h2>
					<IoMdCloseCircleOutline color={'#fff'} className={'cursor-pointer w-5 h-20 '} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 md:px-44 md:pt-10 p-4' style={{ backgroundColor: '#FFFFFF' }}>
					<h2 className='font-normal text-lg'>اسم النشاط</h2>
					<label>
						<input
							className='w-full outline-none shadow-[0px_3px_6px_#00000029] rounded-md p-4 my-4 h-[60px] text-lg'
							placeholder='ادخل اسم النشاط'
							type='text'
							
							name='name'
							value={activiyName}

							onChange={(e) => {
								setActitviyName(e.target.value);
							}}
						/>
					</label>
					<div className='flex flex-col gap-2'>
						<h2 className='font-normal text-lg'>الايقونة</h2>
						<ImageUploading value={images} onChange={onChange} maxNumber={1} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg','svg']}>
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
													<h2 style={{ color: '#7C7C7C' }}>( اختر صورة فقط png & jpg,svg )</h2>
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
					<div className='flex gap-4'>
						<Button
							type={'normal'}
							className={'text-center w-full mt-12 md:h-14 h-[44px] text-xl'}
							style={{ backgroundColor: '#02466A' }}
							onClick={addActivity}
						>
							حفظ
						</Button>
						<Button type={'outline'} className={'text-center w-full mt-12 md:h-14 h-[44px] text-xl'} style={{ border: ' 1px solid #02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
							الغاء
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddAnActivity;
