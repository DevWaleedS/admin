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
import { GrAddCircle } from 'react-icons/gr';
import { TiDeleteOutline } from 'react-icons/ti';
import Context from '../../../store/context';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ReactComponent as Arrow } from '../../../assets/Icons/icon-24-chevron_down.svg';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};
const category = ['الكترونيات', 'ألعاب وهدايا', 'مستلزمات طبية', 'مواد غذائية'];
const subCategories = ['جوالات', 'شاشات', 'بطاريات', 'اكسسوارات'];

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
const NewProduct = ({ cancel, editProduct }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [age, setAge] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [images, setImages] = useState([]);
	const [multiImages, setMultiImages] = useState([]);
	const [showAddProductOptions, setShowAddProductOptions] = useState(false);
	const [productName, setProductName] = useState('');
	const [productInfo, setProductInfo] = useState('');
	const [buyPrice, setBuyPrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [productCode, setProductCode] = useState('');
	const [inStore, setInStore] = useState('');
	const [subCategoriesSelected, setSubCategoriesSelected] = React.useState([]);
	const [openSubCategory, setOpenSubCategory] = useState(false);

	const handleSubCategory = (event) => {
		const {
			target: { value },
		} = event;
		setSubCategoriesSelected(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	useEffect(() => {
		if (editProduct) {
			setProductName(editProduct.name);
			setProductInfo('سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة هيدفدون أصلية');
			setBuyPrice(editProduct.price);
			setSellPrice('350');
			setProductCode(editProduct.sku);
			setInStore(editProduct.quantity);
			setAge(editProduct.activity);
			setSubCategory('جوالات');
		}
	}, [editProduct]);

	const emptyMultiImages = [];
	for (let index = 0; index < 5 - multiImages.length; index++) {
		emptyMultiImages.push(index);
	}

	const maxNumber = 2;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};
	const onChangeMultiImages = (imageList, addUpdateIndex) => {
		// data for submit
		setMultiImages(imageList);
	};
	const handleCategory = (event) => {
		setAge(event.target.value);
	};

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
			<div className={`fixed bottom-0 left-0 bg-slate-50 z-30 otlobha_new_product ${styles.add_new_product}`} style={{ width: '1104px',maxWidth:'100%', height: 'calc(100% - 4rem)' }}>
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
								value={productName}
								onChange={(e) => {
									setProductName(e.target.value);
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
								value={productInfo}
								onChange={(e) => {
									setProductInfo(e.target.value);
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
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<input
										value={buyPrice}
										onChange={(e) => {
											setBuyPrice(e.target.value);
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
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723'}}>
								سعر البيع (مقترح)
							</label>
							<div className='flex rounded-md overflow-hidden max-w-full md:h-[56px] h-[45px]' style={formInputStyle}>
								<div className='p-4 flex flex-1'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<input
										value={sellPrice}
										onChange={(e) => {
											setSellPrice(e.target.value);
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
								value={productCode}
								onChange={(e) => {
									setProductCode(e.target.value);
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
									value={age}
									onChange={handleCategory}
									displayEmpty
									IconComponent={(props) => <Arrow fill='#242424' {...props} />}
									inputProps={{ 'aria-label': 'Without label' }}
									renderValue={(selected) => {
										if (age === '') {
											return <h2 className='text-[#ADB5B9]'>اختر التصنيف</h2>;
										}
										return selected;
									}}
									sx={{
										height: '100%',
										border: '1px solid rgba(167, 167, 167, 0.5)',
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										},
									}}
								>
									{category.map((item, idx) => {
										return (
											<MenuItem
												key={idx}
												className='souq_storge_category_filter_items'
												sx={{
													backgroundColor: 'rgba(211, 211, 211, 1)',
													height: '3rem',
													'&:hover': {},
												}}
												value={`${item}`}
											>
												{item}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723'}}>
								التصنيف الفرعي
							</label>
							<FormControl className='md:w-[555px] w-full md:h-[56px] h-[45px]'>
								<Select
									className={`text-lg font-normal rounded-lg ${styles.select}`}
									IconComponent={(props) => <Arrow fill='#242424' {...props} />}
									multiple
									displayEmpty
									value={subCategoriesSelected}
									open={openSubCategory}
									onClick={() => {
										setOpenSubCategory(true);
									}}
									onChange={handleSubCategory}
									renderValue={(selected) => (subCategoriesSelected.length === 0 ? <h2 className='text-[#ADB5B9]'>الكل</h2> : selected.join(' , '))}
									sx={{
										height: '3.5rem',
										border: '1px solid #A7A7A780',
										borderRadius: '4px',
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										},
									}}
								>
									{subCategories.map((name) => (
										<MenuItem className='souq_storge_category_filter_items multiple_select' key={name} value={name}>
											<Checkbox checked={subCategoriesSelected.indexOf(name) > -1} />
											<ListItemText primary={name} />
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
								value={inStore}
								onChange={(e) => {
									setInStore(e.target.value);
								}}
								className={formInputClasses}
								style={{ width: '555px', backgroundColor: '#02466A00', border: '1px solid #A7A7A780' }}
								placeholder='320'
								type='text'
								name='name'
							/>
						</div>
						<div className='flex md:flex-row flex-col gap-y-2 mb-8'>
							<label className='font-medium md:text-[20px] text-[16px] md:w-[315px] w-full' style={{ color: '#011723',}}>
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
