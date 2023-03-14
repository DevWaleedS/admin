import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../../../UI/Button/Button';
import styles from './AddVariety.module.css';
import { AiFillStar } from 'react-icons/ai';
import ImageUploading from 'react-images-uploading';
import { IoMdCloudUpload } from 'react-icons/io';
import { ReactComponent as ActionAdd } from '../../../../assets/Icons/icon-24-action-add.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as DeleteIconCircle } from '../../../../assets/Icons/icon-24-actions-delete.svg';
import Context from '../../../../store/context';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const NewProduct = ({ cancel, data, setReload, reload, setShowAddSubVariety }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const { subCategories, setSubCategories } = contextStore;
	// upload new image
	const [images, setImages] = useState([]);
	const maxNumber = 2;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	const [mainCategory, setMainCategory] = useState({
		name: data?.name || '',
	});
	

	// to add new category
	const addNewCategory = () => {
		let formData = new FormData();
		formData.append('name', mainCategory?.name);
		formData.append('icon', images[0]?.file || null);

		// to select all subcategories names
		for (let i = 0; i < subCategories?.length; i++) {
			formData.append([`data[${i}][name]`], subCategories[i]?.name || '');
		}
		axios
			.post(`https://backend.atlbha.com/api/Admin/category`, formData, {
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
		setSubCategories([]);
	};

	// to update category
	const updateCategory = () => {
		let formData = new FormData();

		formData.append('_method', 'PUT');
		formData.append('name', mainCategory?.name);
		if (images.length !== 0) {
			formData.append('icon', images[0]?.file || null);
		}

		// to select all subcategories names
		for (let i = 0; i < subCategories?.length; i++) {
			formData.append([`data[${i}][name]`], subCategories[i]?.name);
			formData.append([`data[${i}][id]`], subCategories[i]?.id || '');
		}

		axios
			.post(`https://backend.atlbha.com/api/Admin/category/${data?.id}`, formData, {
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
		setSubCategories([]);
	};

	useEffect(() => {
		if (data) {
			for (let i = 0; i < data?.subcategory?.length; i++) {
				setSubCategories((subCategories) => [...subCategories, { id: data?.subcategory[i]?.id, name: data?.subcategory[i]?.name }]);
			}
		}
	}, []);

	const updateSubCatChanged = (e, index) => {
		const newArray = subCategories?.map((item, i) => {
			if (index === i) {
				return { ...item, name: e.target.value };
			} else {
				return item;
			}
		});
		setSubCategories(newArray);
	};

	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-30 otlobha_new_product ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					{data ? (
						<div
							className='flex flex-col md:p-[30px] px-5 py-7 gap-[10px]'
							style={{
								height: '135px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<h2 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
								تعديل التصنيف - المتاجر
							</h2>
							<p style={{ color: '#011723' }} className='md:text-[20px] text-[16px] font-normal'>
								قم بتعديل بيانات التصنيف
							</p>
						</div>
					) : (
						<div
							className='flex flex-col md:p-[30px] px-5 py-7 gap-[10px]'
							style={{
								height: '135px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<h2 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
								اضافة تصنيف - المتاجر
							</h2>
							<p style={{ color: '#011723' }} className='md:text-[20px] text-[16px] font-normal'>
								أضف تصنيف جديد للتصنيفات الرئيسية
							</p>
						</div>
					)}
					<div style={{ backgroundColor: '#F6F6F6' }} className={`flex-1 flex flex-col gap-8 overflow-y-scroll md:py-[40px] md:pr-[30px] md:pl-40 p-5 ${styles.content}`}>
						<div className='flex md:flex-row flex-col items-start gap-y-[10px]'>
							<h2 style={{ color: '#011723' }} className='md:text-[20px] text-[18px] w-96 max-w-full font-medium whitespace-nowrap'>
								رمز التصنيف
							</h2>
							<div className='md:w-auto w-full flex flex-col gap-2'>
								<ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
									{({ onImageUpload, dragProps }) => (
										// write your building UI
										<div
											className='md:w-[555px] w-full md:h-[170px] h-[100px] upload__image-wrapper relative overflow-hidden'
											style={{
												border: images[0] ? 'none' : '3px dashed #ccc',
												borderRadius: '10px',
											}}
											onClick={() => {
												onImageUpload();
											}}
											{...dragProps}
										>
											<div className='image-item h-full w-full cursor-pointer'>
												{!images[0] && (
													<div className='flex flex-col justify-center items-center gap-3 h-full w-full'>
														<IoMdCloudUpload size={'2em'}></IoMdCloudUpload>
														<h2 className='font-semibold'>اسحب الصورة هنا</h2>
														<h2>(سيتم قبول الصور png & jpg)</h2>
													</div>
												)}
												{images[0] && <img alt='' src={images[0]?.data_url} className='w-full h-full object-cover' />}
											</div>
										</div>
									)}
								</ImageUploading>

								{(images[0] || data) && (
									<div className='md:w-[85px] w-[55px] md:h-[80px] h-[50px]flex flex-col relative'>
										<img className='w-full h-full' src={data ? data?.icon : images[0]?.data_url} alt='img' />
										<DeleteIconCircle className='md:w-[24px] w-[20px] absolute top-1 left-1 cursor-pointer' />
									</div>
								)}
							</div>
						</div>
						<div className='flex md:flex-row flex-col items-center gap-y-[10px]'>
							<div className='flex flex-row items-center gap-3'>
								<AiFillStar
									style={{
										display: 'inline-block',
										marginLeft: '0.5rem',
										color: 'red',
									}}
								></AiFillStar>
								<label style={{ color: '#011723' }} className='md:text-[20px] text-[18px] w-80 max-w-full font-medium whitespace-nowrap'>
									رقم التصنيف
								</label>
							</div>
							<input
								className={`${styles.variety_number} w-full rounded-md px-5 py-4 outline-none`}
								style={{ color: '#7C7C7C', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
								placeholder='تلقائي'
								type='text'
								name='category_number'
								disabled
								value={data && data?.number}
								onChange={() => console.log('')}
							/>
						</div>
						<div className='flex md:flex-row flex-col items-center gap-y-[10px]'>
							<div className='flex flex-row items-center gap-3'>
								<AiFillStar
									style={{
										display: 'inline-block',
										marginLeft: '0.5rem',
										color: 'red',
									}}
								></AiFillStar>
								<label style={{ color: '#011723' }} className='md:text-[20px] text-[18px] w-80 max-w-full font-medium whitespace-nowrap'>
									التصنيف الرئيسي
								</label>
							</div>
							<input
								className='w-full rounded-md px-5 py-4 outline-none'
								style={{ color: '#7C7C7C', backgroundColor: '#02466A00', border: '1px solid #A7A7A7' }}
								placeholder='ادخل اسم التصنيف الرئيسي'
								type='text'
								name='mainCategory'
								value={mainCategory?.name}
								onChange={(e) => {
									setMainCategory({ ...mainCategory, name: e.target.value });
								}}
							/>
						</div>
						{subCategories &&
							subCategories.map((subCategory, index) => (
								<div className='flex md:flex-row flex-col md:items-center items-start gap-y-[10px]' key={index}>
									<div className='flex flex-row items-center md:mr-10'>
										<label style={{ color: '#1DBBBE' }} className='md:text-[20px] text-[18px] w-80 max-w-full font-medium whitespace-nowrap'>
											فرعي رقم {index + 1}
										</label>
									</div>
									<div className='w-full flex flex-row items-center gap-4'>
										<input
											type='text'
											className='w-full rounded-md px-5 py-4 outline-none'
											style={{ color: '#1DBBBE', backgroundColor: '#02466A00', border: '1px solid #1DBBBE' }}
											value={subCategory?.name}
											onChange={(e) => updateSubCatChanged(e, index)}
										/>

										<DeleteIcon
											onClick={() => {
												setSubCategories((subCategories) => [...subCategories.filter((sub) => sub?.name !== subCategory?.name)]);
											}}
											className='cursor-pointer'
											fill='#FF3838'
										/>
									</div>
								</div>
							))}
						<div className='flex flex-row items-center justify-end'>
							<div
								className='rounded-md px-5 py-4 outline-none flex flex-row items-center justify-center gap-4 cursor-pointer'
								style={{ width: '555px', backgroundColor: '#FFFFFF00', border: '1px dashed #A7A7A7' }}
								onClick={() => setShowAddSubVariety(true)}
							>
								<ActionAdd fill='#67747B' />
								<span style={{ color: '#67747B', fontSize: '16px' }}>اضافة تصنيف فرعي جديد</span>
							</div>
						</div>
					</div>
					<div className='md:p-8 p-5 md:h-[135px] md-[110px] md:bg-[#ebebeb] bg-[#F6F6F6] flex justify-center gap-4'>
						{data ? (
							<Button style={{ backgroundColor: `rgba(2, 70, 106, 1)`, width: '280px', height: '56px' }} textStyle={{ color: '#EFF9FF', fontSize: '20px' }} type={'normal'} onClick={() => updateCategory()}>
								حفظ التعديل
							</Button>
						) : (
							<Button style={{ backgroundColor: `rgba(2, 70, 106, 1)`, width: '280px', height: '56px' }} textStyle={{ color: '#EFF9FF', fontSize: '20px' }} type={'normal'} onClick={() => addNewCategory()}>
								حفظ التصنيف
							</Button>
						)}
						<Button
							onClick={() => {
								cancel();
								setSubCategories([]);
							}}
							style={{
								borderColor: `rgba(2, 70, 106, 1)`,
								width: '280px',
								height: '56px',
							}}
							textStyle={{ color: 'rgba(2, 70, 106, 1)', fontSize: '20px' }}
							type={'outline'}
						>
							إلغاء
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewProduct;
