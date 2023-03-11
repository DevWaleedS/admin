import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../store/context';

import { Currency } from '../../../assets/Icons/index';
import Box from '@mui/material/Box';
import AddProductOptions from './AddProductOptions/AddProductOptions';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '../../../UI/Button/Button';
import styles from './NewProduct.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageUploading from 'react-images-uploading';
import useFetch from '../../../hooks/useFetch';
// Icons
import { ReactComponent as AddIcon } from '../../../assets/Icons/icon-34-add.svg';
import { ReactComponent as CopyIcon } from '../../../assets/Icons/copy icon.svg';
import { ReactComponent as Arrow } from '../../../assets/Icons/icon-24-chevron_down.svg';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdCloudUpload } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const formTitleClasses = 'font-medium md:text-xl text-[16px]';
const formTitleStyle = { width: '315px' };
//
const formInputClasses = 'p-4 outline-0 rounded-md text-lg font-normal';
const formInputStyle = {
	width: '555px',
	maxWidth: '100%',
	border: '1px solid rgba(167, 167, 167, 0.5)',
	backgroundColor: '#f6f6f6',
	fontWight: '400',
	color: '#ADB5B9',
};
const NewProduct = ({ cancel, editProduct }) => {
	// to get main category
	const { fetchedData: category } = useFetch('https://backend.atlbha.com/api/Admin/storecategory');

	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);

	const { setEndActionTitle, productOptions } = contextStore;

	// to store all data on state
	const [productData, setProductData] = useState({
		name: editProduct?.name || '',
		description: editProduct?.description || '',
		purchasing_price: editProduct?.purchasing_price || '',
		selling_price: editProduct?.selling_price || '',
		sku: editProduct?.sku || '',
		category_id: editProduct?.category?.id || '',
		stock: editProduct?.stock || '',
		quantity: editProduct?.quantity || '',
		less_qty: editProduct?.less_qty || '',
		subcategory_id: [],
	});

	// handle onChange function to get all values from inputs
	const handleProductData = (e) => {
		const { name, value } = e.target;

		setProductData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const [showAddProductOptions, setShowAddProductOptions] = useState(false);
	const [openSubCategory, setOpenSubCategory] = useState(false);

	// to handle copy function
	const [copy, setCopy] = useState(false);
	const handelCopy = () => {
		navigator.clipboard.writeText('https://www.google.com/search?q=%D8%B1%D8%A7%D8%A8%D8%B7+%D8%AA%D9%8');
		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 5000);
	};

	

	// to get multi images
	const [multiImages, setMultiImages] = useState([]);
	const emptyMultiImages = [];
	for (let index = 0; index < 5 - multiImages.length; index++) {
		emptyMultiImages.push(index);
	}

	const onChangeMultiImages = (imageList, addUpdateIndex) => {
		// data for submit
		setMultiImages(imageList);
	};

	// to get the cover image
	const [images, setImages] = useState([]);
	const maxNumber = 2;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};
const subcategory = category?.data?.categories?.filter((sub) => sub?.id === parseInt(productData?.category_id)) || '';
	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>

			{showAddProductOptions && (
				<AddProductOptions
					closeDetails={() => {
						setShowAddProductOptions(false);
					}}
					editProduct={editProduct}
				></AddProductOptions>
			)}
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-30  otlobha_new_product ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:p-8 p-4'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold md:text-2xl text-[20px] mb-3'>{editProduct ? 'تفاصيل المنتج' : 'اضافة منتج جديد للسوق'}</h2>
						<h2 className='md:text-xl text-[14px] font-normal'>{editProduct ? 'تعديل بيانات المنتجات في سق اطلبها' : 'أدخل بيانات المنتج ليتم اضافته في منتجات سوق اطلبها'}</h2>
					</div>
					<div className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 px-4 py-6 bg-[#f6f6f6] ${styles.content}`}>
						<form action=''>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									اسم المنتج
								</h2>
								<input name='name' value={productData?.name} onChange={handleProductData} className={`${formInputClasses} md:h-14 h-[45px]`} style={formInputStyle} placeholder='اسم المنتج' type='text' />
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									وصف المنتج
								</h2>
								<textarea
									name='description'
									value={productData?.description}
									onChange={handleProductData}
									className={formInputClasses}
									style={{ ...formInputStyle, resize: 'false' }}
									placeholder='وصف تفاصيل المنتج'
									id=''
									cols='30'
									rows='4'
								></textarea>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									سعر الشراء
								</h2>
								<label className='md:h-14 h-[45px] flex rounded-md overflow-hidden' style={formInputStyle}>
									<div className='p-4 flex flex-1'>
										<img className='ml-2 opacity-50' src={Currency} alt='' />
										<input name='purchasing_price' value={productData?.purchasing_price} onChange={handleProductData} className='flex-1 border-none outline-none bg-[#f6f6f6]' placeholder='0' type='text' />
									</div>
									<div
										className='h-full w-16 flex justify-center items-center text-lg'
										style={{
											borderRight: '1px solid #ccc',
											backgroundColor: '#fafafa',
										}}
									>
										ر.س
									</div>
								</label>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									سعر البيع (مقترح)
								</h2>
								<label className='md:h-14 h-[45px] flex rounded-md overflow-hidden' style={formInputStyle}>
									<div className='p-4 flex flex-1'>
										<img className='ml-2 opacity-50' src={Currency} alt='' />
										<input value={productData?.selling_price} onChange={handleProductData} className='flex-1 border-none outline-none bg-[#f6f6f6]' placeholder='0' type='text' name='selling_price' />
									</div>
									<div
										className='h-full w-16 flex justify-center items-center text-lg'
										style={{
											borderRight: '1px solid #ccc',
											backgroundColor: '#fafafa',
										}}
									>
										ر.س
									</div>
								</label>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									كود المنتج (SKU)
								</h2>
								<label>
									<input value={productData?.sku} onChange={handleProductData} className={`${formInputClasses} md:h-14 h-[45px]`} style={formInputStyle} placeholder='#251' type='text' name='sku' />
								</label>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									التصنيف الأساسي
								</h2>
								<FormControl className='md:h-14 h-[45px] md:w-[555px] w-full'>
									<Select
										className={`text-lg font-normal rounded-lg ${styles.select}`}
										value={productData?.category_id}
										name='category_id'
										onChange={handleProductData}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (productData?.category_id === '') {
												return <h2 className='text-[#ADB5B9]'>اختر التصنيف</h2>;
											}
											const result = category?.data?.categories?.filter((item) => item?.id === parseInt(selected)) || '';
											return result[0]?.name;
										}}
										sx={{
											height: '100%',
											border: '1px solid rgba(167, 167, 167, 0.5)',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{category?.data?.categories?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: 'rgba(211, 211, 211, 1)',
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

							{editProduct && (
								<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
									<h2 className={formTitleClasses} style={formTitleStyle}>
										رابط المنتج
									</h2>
									<div className={`md:h-14 h-[45px] flex flex-row items-center justify-between ${formInputClasses}`} style={formInputStyle}>
										<h6 style={{ color: '#02466A', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://www.cat.com/en_US/products/new/technology/equipm</h6>

										{copy ? <h6 style={{ color: '#02466A', fontSize: '16px' }}>Copied</h6> : <CopyIcon className='cursor-pointer mr-2' fill='#02466A' onClick={() => handelCopy()} />}
									</div>
								</div>
							)}

							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									التصنيف الفرعي
								</h2>
								<FormControl className='md:h-14 h-[45px] md:w-[555px] w-full'>
									<Select
										className={`text-lg font-normal rounded-lg ${styles.select}`}
										IconComponent={() => {
											return <IoIosArrowDown size={'1rem'} className='absolute left-2' />;
										}}
										multiple
										displayEmpty
										name='subcategory_id'
										value={productData?.subcategory_id}
										onChange={handleProductData}
										open={openSubCategory}
										onClick={() => {
											setOpenSubCategory(true);
										}}
										renderValue={(selected) => {
											if (productData?.subcategory_id.length === 0) {
												return 'التصنيف الفرعي';
											}
											return selected.map((item) => {
												const result = subcategory[0]?.subcategory?.filter((sub) => sub?.id === parseInt(item));
												return `${result[0]?.name} , `;
											});
										}}
										sx={{
											height: '3.5rem',
											border: '1px solid #A7A7A780',
											borderRadius: '4px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{subcategory[0]?.subcategory?.map((sub, index) => (
											<MenuItem className='souq_storge_category_filter_items multiple_select' key={index} value={sub?.id}>
												<Checkbox checked={productData?.subcategory_id?.indexOf(sub?.id) > -1} />
												<ListItemText primary={sub?.name} />
											</MenuItem>
										))}
										<button
											className='w-full flex flex-col items-center justify-center p-3.5 rounded-none'
											style={{ fontSize: '18px', backgroundColor: '#02466A', color: '#FFFFFF' }}
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												setOpenSubCategory(false);
											}}
										>
											اختر
										</button>
									</Select>
								</FormControl>
							</div>

							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									صور المنتج الرئيسية
								</h2>
								<ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
									{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
										// write your building UI
										<div>
											<div
												className='md:h-[220px] h-[100px] md:w-[555px] w-full upload__image-wrapper relative overflow-hidden'
												style={{
													border: images[0] ? 'none' : '3px dashed #ccc',
													borderRadius: '10px',
												}}
												onClick={() => {
													onImageUpload();
												}}
												{...dragProps}
											>
												<div className='image-item w-full cursor-pointer md:h-[220px] h-full'>
													{!images[0] && (
														<div className='flex flex-col justify-center items-center md:gap-6 h-full w-full'>
															<IoMdCloudUpload size={'2em'}></IoMdCloudUpload>
															<h2 className='font-semibold'>اسحب الصورة هنا</h2>
															<h2>(سيتم قبول الصور png & jpg)</h2>
														</div>
													)}
													{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-cover' />}
												</div>
											</div>
											{editProduct && (
												<div className='md:w-28 w-[60px] md:h-28 h-[58px] mt-4'>
													<img className='object-cover w-full h-full' src={editProduct?.cover} alt='preview-img' />
												</div>
											)}
										</div>
									)}
								</ImageUploading>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									الصور المتعددة او الفيديو
								</h2>
								<ImageUploading value={multiImages} onChange={onChangeMultiImages} multiple maxNumber={5} dataURLKey='data_url' acceptType={['jpg']}>
									{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
										// write your building UI
										<div className='md:w-[555px] w-full upload__image-wrapper relative flex justify-between gap-6'>
											{imageList.map((image, index) => {
												return (
													<div key={index} className='relative md:h-24 h-[50px] md:w-24 w-[60px] flex justify-center items-center cursor-pointer'>
														<img className='object-cover md:h-24 h-[50px] md:w-24 w-[60px]' src={image.data_url} alt='' />
														<div onClick={() => onImageRemove(index)} className='absolute h-full w-full top-0 left-0 hover:bg-slate-900 hover:opacity-70 opacity-0 duration-200 flex justify-center items-center'>
															<TiDeleteOutline style={{ fontSize: '1.5rem', color: 'red' }}></TiDeleteOutline>
														</div>
													</div>
												);
											})}
											{emptyMultiImages.map((image, idx) => {
												return (
													<div
														key={idx}
														className=' md:h-20 h-[50px] md:w-20 w-[60px] flex justify-center items-center cursor-pointer'
														style={{ backgroundColor: '#FAFAFA', border: '2px dashed #237EAE', borderRadius: '4px' }}
														onClick={() => {
															onImageUpload();
														}}
													>
														<Box sx={{ '& circle': { fill: '#ADB5B9' } }}>
															<AddIcon className='md:w-5 md:h-5 w-4 h-4' />
														</Box>
													</div>
												);
											})}
										</div>
									)}
								</ImageUploading>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									المخزون
								</h2>
								<label>
									<input value={productData?.stock} onChange={handleProductData} className={`${formInputClasses} md:h-14 h-[45px]`} style={formInputStyle} placeholder='0' type='text' name='stock' />
								</label>
							</div>
							<div className='flex md:flex-row flex-col gap-y-2 md:mb-8 mb-4'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									اضافة خيارات المنتج
								</h2>
								<div
									className='md:h-14 h-[45px] fcc p-3 gap-4 border-2 border-dashed cursor-pointer rounded-lg'
									style={formInputStyle}
									onClick={() => {
										setShowAddProductOptions(true);
									}}
								>
									<Box sx={{ '& circle': { fill: '#ADB5B9' } }}>
										<AddIcon className='md:w-7 md:h-7 w-5 h-5'></AddIcon>
									</Box>
									اضافة خيارات
								</div>
							</div>
						</form>
					</div>
					<div
						className='md:h-[135px] h-[100px] md:p-8 p-4 flex justify-center items-center gap-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className='md:w-[186px] w-full md:h-[56px] h-[45px] md:text-2xl text-[18px] font-medium'
							style={{
								backgroundColor: '#02466A',
							}}
							type={'normal'}
							onClick={() => {
								cancel();
								setEndActionTitle('تم اضافة منتج جديد بنجاح');
							}}
						>
							حفظ
						</Button>
						<Button
							className='md:w-[186px] w-full md:h-[56px] h-[45px] md:text-2xl text-[18px] font-medium'
							style={{
								borderColor: `rgba(2, 70, 106, 1)`,
							}}
							textStyle={{ color: 'rgba(2, 70, 106, 1)' }}
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

export default NewProduct;
