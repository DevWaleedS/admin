import React, { useState, useEffect, useContext } from 'react';
import { Currency } from '../../../assets/Icons/index';
import { ReactComponent as AddIcon } from '../../../assets/Icons/icon-34-add.svg';
import Box from '@mui/material/Box';
import AddProductOptions from './AddProductOptions/AddProductOptions';
import Button from '../../../UI/Button/Button';
import styles from './NewProduct.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageUploading from 'react-images-uploading';
import { IoMdCloudUpload } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import Context from '../../../store/context';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ReactComponent as Arrow } from '../../../assets/Icons/icon-24-chevron_down.svg';
import useFetch from '../../../hooks/useFetch';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};


//
const formInputClasses = 'md:w-[555px] w-full md:h-[56px] h-[45px] p-4 outline-0 rounded-md text-lg font-normal';
const formInputStyle = {
	width: '555px',
	border: '1px solid rgba(167, 167, 167, 0.5)',
	fontSize: '20px',
	fontWight: '400',
	color: '#ADB5B9',
	backgroundColor: '#f6f6f6',
};
const NewProduct = ({ cancel, editProduct, reload, setReload }) => {
	const { fetchedData: category } = useFetch('https://backend.atlbha.com/api/Admin/storecategory');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle, productOptions } = contextStore;
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
	const [images, setImages] = useState([]);
	const [multiImages, setMultiImages] = useState([]);
	const [showAddProductOptions, setShowAddProductOptions] = useState(false);
	const [subCategoriesSelected, setSubCategoriesSelected] = React.useState([]);
	const [openSubCategory, setOpenSubCategory] = useState(false);

	const emptyMultiImages = [];
	for (let index = 0; index < 5 - multiImages.length; index++) {
		emptyMultiImages.push(index);
	}

	const maxNumber = 2;
	const onChange = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};
	const onChangeMultiImages = (imageList, addUpdateIndex) => {
		setMultiImages(imageList);
	};

	
	const addProductData = () => {
		let formData = new FormData();
		formData.append('name', productData?.name);
		formData.append('description', productData?.description);
		formData.append('purchasing_price', productData?.purchasing_price);
		formData.append('selling_price', productData?.selling_price);
		formData.append('sku', productData?.sku);
		formData.append('stock', productData?.stock);
		formData.append('category_id', productData?.category_id);
		formData.append('quantity', productData?.quantity);
		formData.append('less_qty', productData?.less_qty);

		// create looping to get all ids for activity_ids and assign it
		for (let i = 0; i < productData?.subcategory_id?.length; i++) {
			formData.append([`subcategory_id[${i}]`], productData?.subcategory_id[i]);
		}

		formData.append('cover', images[0]?.file || null);
		for (let i = 0; i < multiImages?.length; i++) {
			formData.append([`images[${i}]`], multiImages[i]?.file);
		}

		axios
			.post('https://backend.atlbha.com/api/Admin/stock', formData, {
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

	const subcategory = category?.data?.categories?.filter(sub=>sub?.id === parseInt(productData?.category_id)) || '';
	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>

			{showAddProductOptions && (
				<AddProductOptions
					closeDetails={() => {
						setShowAddProductOptions(false);
					}}
					editProduct={editProduct}
					setQuantity={(data) => {
						setProductData({ ...productData, quantity: data });
					}}
					setLessQuantity={(data) => {
						setProductData({ ...productData, less_qty: data });
					}}
				></AddProductOptions>
			)}
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-30 otlobha_new_product ${styles.add_new_product}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 4rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:h-[135px] h-[110px] md:p-[30px] p-4 flex flex-col gap-[10px]'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 style={{ color: '#011723' }} className='font-bold md:text-[24px] text-[20px]'>
							{editProduct ? 'تعديل المنتج' : 'اضافة منتج للمخزون'}
						</h2>
						<h2 style={{ color: '#011723' }} className='font-normal md:text-[20px] text-[16px]'>
							{editProduct ? 'تعديل بيانات المنتجات في المخزون' : 'اضافة بيانات المنتج في المخزون'}
						</h2>
					</div>
					<div style={{ backgroundColor: '#F6F6F6' }} className={`flex-1 flex flex-col gap-[30px] overflow-y-scroll md:py-[38px] md:pr-[30px] px-4 py-6 ${styles.content}`}>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								اسم المنتج
							</label>
							<input
								value={productData?.name}
								onChange={(e) => {
									setProductData({ ...productData, name: e.target.value });
								}}
								className={formInputClasses}
								style={{ backgroundColor: '#02466A00', border: '1px solid #A7A7A780' }}
								placeholder='اسم المنتج'
								type='text'
							/>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ olor: '#011723' }}>
								وصف المنتج
							</label>
							<textarea
								value={productData?.description}
								onChange={(e) => {
									setProductData({ ...productData, description: e.target.value });
								}}
								className="md:w-[555px] w-full p-4 outline-0 rounded-md text-lg font-normal"
								style={{ backgroundColor: '#02466A00', border: '1px solid #A7A7A780', resize: 'none' }}
								resize={false}
								placeholder='وصف تفاصيل المنتج'
								rows='4'
							></textarea>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								سعر الشراء
							</label>
							<div className='flex rounded-md overflow-hidden max-w-full md:h-[56px] h-[45px]' style={formInputStyle}>
								<div className='p-4 flex flex-1'>
									<img className='ml-2 opacity-50' src={Currency} alt='currency-img' />
									<input
										value={productData?.purchasing_price}
										onChange={(e) => {
											setProductData({ ...productData, purchasing_price: e.target.value });
										}}
										className='flex-1 border-none outline-none bg-transparent'
										placeholder='0'
										type='text'
										name='name'
									/>
								</div>
								<div
									className='h-full w-16 flex justify-center items-center text-lg'
									style={{
										borderRight: '1px solid #ccc',
										backgroundColor: '#FAFAFA',
										fontSize: '20px',
									}}
								>
									ر.س
								</div>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								سعر البيع (مقترح)
							</label>
							<div className='flex rounded-md overflow-hidden max-w-full md:h-[56px] h-[45px]' style={formInputStyle}>
								<div className='p-4 flex flex-1'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<input
										value={productData?.selling_price}
										onChange={(e) => {
											setProductData({ ...productData, selling_price: e.target.value });
										}}
										className='flex-1 border-none outline-none bg-transparent'
										placeholder='0'
										type='text'
										name='name'
									/>
								</div>
								<div
									className='h-full w-16 flex justify-center items-center text-lg'
									style={{
										borderRight: '1px solid #ccc',
										backgroundColor: '#FAFAFA',
										fontSize: '20px',
									}}
								>
									ر.س
								</div>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								كود المنتج (SKU)
							</label>
							<input
								value={productData?.sku}
								onChange={(e) => {
									setProductData({ ...productData, sku: e.target.value });
								}}
								className={formInputClasses}
								style={{ width: '555px', backgroundColor: '#02466A00', border: '1px solid #A7A7A780' }}
								placeholder='#251'
								type='text'
								name='name'
							/>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								التصنيف
							</label>
							<FormControl className='md:w-[555px] w-full md:h-[56px] h-[45px]'>
								<Select
									className={`text-lg font-normal rounded-lg ${styles.select}`}
									value={productData?.category_id}
									onChange={(e) => {
										setProductData({ ...productData, category_id: e.target.value });
									}}
									displayEmpty
									IconComponent={(props) => <Arrow fill='#242424' {...props} />}
									inputProps={{ 'aria-label': 'Without label' }}
									renderValue={(selected) => {
										if (productData?.category_id === '') {
											return <h2 className='text-[#ADB5B9]'>اختر التصنيف</h2>;
										}
										const result = category?.data?.categories?.filter((item) => item?.id === parseInt(selected));
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
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								التصنيف الفرعي
							</label>
							<FormControl className='md:w-[555px] w-full md:h-[56px] h-[45px]'>
								<Select
									className={`text-lg font-normal rounded-lg ${styles.select}`}
									IconComponent={(props) => <Arrow fill='#242424' {...props} />}
									multiple
									displayEmpty
									value={productData?.subcategory_id}
									onChange={(e) => {
										setProductData({ ...productData, subcategory_id: e.target.value });
									}}
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
									{subcategory[0]?.subcategory?.map((sub,index) => (
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
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								صور المنتج الرئيسية
							</label>
							<ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
								{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
									// write your building UI
									<div>
										<div
											className='md:w-[555px] w-full upload__image-wrapper relative overflow-hidden'
											style={{
												border: images[0] ? 'none' : '3px dashed #ccc',
												borderRadius: '10px',
											}}
											onClick={() => {
												onImageUpload();
											}}
											{...dragProps}
										>
											<div className='image-item w-full cursor-pointer md:h-[220px] h-[100px]'>
												{!images[0] && (
													<div className='flex flex-col justify-center items-center md:gap-3 gap-1 h-full w-full'>
														<IoMdCloudUpload size={'2em'}></IoMdCloudUpload>
														<h2 className='font-semibold'>اسحب الصورة هنا</h2>
														<h2>(سيتم قبول الصور png & jpg)</h2>
													</div>
												)}
												{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-cover' />}
											</div>
										</div>
										{editProduct && (
											<div className='w-28 h-28 mt-4'>
												<img className='object-cover w-full h-full' src='https://i.pcmag.com/imagery/reviews/07t6yzTnRvFvs8uD2xeYsB0-1.fit_lim.size_320x180.v1639090940.jpg' alt='product-img' />
											</div>
										)}
									</div>
								)}
							</ImageUploading>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium' style={{ fontSize: '20px', color: '#011723', width: '315px' }}>
								الصور المتعددة او الفيديو
							</label>
							<ImageUploading value={multiImages} onChange={onChangeMultiImages} multiple maxNumber={5} dataURLKey='data_url' acceptType={['jpg']}>
								{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
									// write your building UI
									<div
										className='md:w-[555px] w-full upload__image-wrapper relative flex justify-between gap-6'
									>
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
													className='md:h-20 h-[50px] md:w-20 w-[60px] flex justify-center items-center cursor-pointer'
													style={{ backgroundColor: '#FAFAFA', border: '2px dashed #237EAE', borderRadius: '4px' }}
													onClick={() => {
														onImageUpload();
													}}
												>
													<Box sx={{ '& circle': { fill: '#ADB5B9' } }}>
														<AddIcon className='w-5 h-5' />
													</Box>
												</div>
											);
										})}
									</div>
								)}
							</ImageUploading>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723' }}>
								المخزون
							</label>
							<input
								value={productData?.stock}
								onChange={(e) => {
									setProductData({ ...productData, stock: e.target.value });
								}}
								className={formInputClasses}
								style={{ width: '555px', backgroundColor: '#02466A00', border: '1px solid #A7A7A780' }}
								placeholder='320'
								type='text'
								name='name'
							/>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2 mb-8'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723', }}>
								اضافة خيارات المنتج
							</label>
							<div
								className='md:w-[555px] w-full md:h-[56px] h-[45px] fcc p-3 gap-4 border-2 border-dashed cursor-pointer rounded-lg'
								style={formInputStyle}
								onClick={() => {
									setShowAddProductOptions(true);
								}}
							>
								<Box sx={{ '& circle': { fill: '#ADB5B9' } }}>
									<AddIcon className='md:w-[24px] w-[20px]'></AddIcon>
								</Box>
								اضافة خيارات
							</div>
						</div>
					</div>
					<div
						className='md:p-8 p-4 flex justify-center gap-4 md:h-[135px] h-[100px]'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className='md:w-[186px] w-full md:h-[56px] h-[45px] md:text-2xl text-[18px] font-medium'
							style={{ backgroundColor: `#02466A` }}
							textStyle={{ color: '#EFF9FF' }}
							type={'normal'}
							onClick={() => editProduct ? '' : addProductData()}
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
