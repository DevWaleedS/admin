import React, { useState, useContext, Fragment } from 'react';
import axios from 'axios';
import Button from '../../../../UI/Button/Button';
import Context from '../../../../store/context';
import styles from './AddNewCurrency.module.css';
import ImageUploading from 'react-images-uploading';
import { GrUploadOption } from 'react-icons/gr';
import { AiFillStar } from 'react-icons/ai';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const formTitleClasses = 'md:w-[315px] w-full font-normal md:text-[18px] text-[16px] md:mb-0 mb-2';
//
const formInputClasses = 'md:w-[555px] w-full md:h-14 h-[45px] p-4 outline-0 rounded-md';
const formInputStyle = {
	border: '1px solid #A7A7A7',
	backgroundColor: '#fffff',
};

const AddNewCurrency = ({ cancel, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// to upload new icon
	const [images, setImages] = useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	// store values
	const [newCurrency, setNewCurrency] = useState({
		name: '',
		name_en: '',

	});

	const handleAddNewCurrency = (e) => {
		const { name, value } = e.target;
		setNewCurrency((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	// add new social link page function
	const addNewCurrency = () => {
		let formData = new FormData();
		formData.append('name', newCurrency?.name);
		formData.append('name_en', newCurrency?.name_en);
		formData.append('image', images[0]?.file || null);

		axios
			.post(`https://backend.atlbha.com/api/Admin/currency`, formData, {
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
		<Fragment>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-30 ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 5rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:h-[135px] h-[100px] md:p-8 p-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold md:text-2xl text-[20px] mb-3'>اضافة عملة جديدة</h2>
					</div>
					<div className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 p-4 ${styles.content}`}>
						<form action=''>
							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									رمز العملة
								</h2>
								<ImageUploading value={images} onChange={onChange} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg', 'svg']}>
									{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
										// write your building UI
										<div
											className='md:w-[555px] w-full md:h-[56px] h-[45px] upload__image-wrapper relative overflow-hidden'
											style={{
												border: '1px solid #A7A7A7',
												borderRadius: '8px',
												backgroundColor: '#fff',
											}}
											onClick={() => {
												onImageUpload();
											}}
											{...dragProps}
										>
											<div className='image-item h-full w-full cursor-pointer'>
												{!images[0] && (
													<div className='flex flex-col justify-center items-center gap-6 h-full w-full'>
														<GrUploadOption size={'1.25rem'}></GrUploadOption>
													</div>
												)}
												{images[0] && (
													<div className='flex flex-col justify-center items-center gap-6 h-full w-full'>
														<img src={images[0]?.data_url} alt='' className='w-8 h-8 object-cover' />
													</div>
												)}
											</div>
										</div>
									)}
								</ImageUploading>
							</div>
							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم العملة (AR)
								</h2>
								<input name='name' value={newCurrency?.name} onChange={handleAddNewCurrency} className={formInputClasses} style={formInputStyle} placeholder='ادخل حروف عربي فقط' type='text' />
							</div>
							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم العملة (EN)
								</h2>
								<input name='name_en' value={newCurrency?.name_en} onChange={handleAddNewCurrency} className={formInputClasses} style={formInputStyle} placeholder='ادخل حروف انجليزية فقط' type='text' />
							</div>
						</form>
					</div>
					<div
						className='md:h-[135px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button className={'md:h-14 h-[45px] md:w-44 w-full md:text-xl md:text-[18px]'} style={{ backgroundColor: `rgba(2, 70, 106, 1)` }} type={'normal'} onClick={addNewCurrency}>
							حفظ
						</Button>
						<Button className={'md:h-14 h-[45px] md:w-44 w-full md:text-xl md:text-[18px]'} style={{ backgroundColor: `rgba(2, 70, 106, 1)` }} type={'normal'} onClick={cancel}>
							الغاء
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AddNewCurrency;
