import React, { useState, useEffect, useReducer, useContext } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { SketchPicker } from 'react-color';

import Button from '../../../../UI/Button/Button';
import { ReactComponent as WriteIcon } from '../../../../assets/Icons/icon-24-write.svg';
import { ReactComponent as ChoiceIcon } from '../../../../assets/Icons/icon-24-choice.svg';
import { ReactComponent as NotificationIcon } from '../../../../assets/Icons/icon-24-notificatioins.svg';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import { IoMdAdd } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { Currency } from '../../../../assets/Icons/index';

import Select from '@mui/material/Select';
import { ReactComponent as TrashICon } from '../../../../assets/Icons/icon-24-delete.svg';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import ActionCompleteComp from '../../../ActionCompleteComp/ActionCompleteComp';
import Context from '../../../../store/context';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-[#242424] opacity-70 z-40'></div>;
};

const productOptions = [
	{
		id: 1,
		type: 'اللون',
		title: '',
		placeHolder1: 'أزرق',
		placeHolder2: ' القيمة ( أحمر، أصفر )',
	},
	{
		id: 2,
		type: 'ماركة',
		title: '',
		placeHolder1: 'علامة تجارية',
		placeHolder2: 'القيمة (اديداس)',
	},
	{
		id: 3,
		type: 'الوزن',
		title: '',
		placeHolder1: 'وزن الوحدة',
		placeHolder2: 'القيمة (0 كم )',
	},
	{
		id: 4,
		type: 'المقاس',
		title: '',
		placeHolder1: 'مقاس الوحدة',
		placeHolder2: 'القيمة (xl, m, s)',
	},
];

const initialValue = [
	{
		type: 'ماركة',
		title: '',
		values: [{ value: '', id: 0 }],
	},
];

function reducer(state, action) {
	if (action.type === 'CHANGE_TITLE') {
		const newState = [...state];
		newState[action.idx].title = action.title;
		return newState;
	}
	if (action.type === 'CHANGE_SELECTING') {
		const newState = [...state];
		newState[action.idx].type = action.value;
		newState[action.idx].values = [{ value: action?.value, id: 0 }];
		return newState;
	}
	if (action.type === 'ADD_TO_SAME') {
		const newState = state.map((item) => {
			if (item?.type === action?.name) {
				return {
					...item,
					values: [...item?.values, { value: '', id: Math.ceil(Math.random() * 10000000) }],
				};
			}
			return item;
		});
		return newState;
	}
	if (action.type === 'DELETE_TO_SOME') {
		const newState = state.map((item) => {
			if (item?.type === action?.name) {
				const newValues = item.values.filter((i) => i.id !== action.id);
				return {
					...item,
					values: newValues,
				};
			}
			return item;
		});
		return newState;
	}
	if (action.type === 'ADD_NEW_OPTION') {
		const restOptions = [];
		productOptions.forEach((item) => {
			const existed = state?.some((i) => i.type === item.type);

			if (existed) {
				return;
			}
			restOptions.push(item);
		});
		const newState = [...state, { type: restOptions[0].type, values: [{ value: '', id: 0 }] }];
		return newState;
	}
	if (action.type === 'DELETE_OPTION') {
		const newState = state.filter((item) => item?.type !== action?.item?.type);
		return newState;
	}
	if (action.type === 'CHANGE_COLOR') {
		const newState = [];
		state.forEach((item, index) => {
			if (item?.type !== 'اللون') {
				return newState.push(item);
			}
			const newItem = { ...item };
			const newValues = newItem.values.map((v) => {
				if (v.id !== action.id) {
					return v;
				}
				return { id: action.id, value: action.color };
			});
			newItem.values = newValues;
			newState.push(newItem);
		});
		return newState;
	}
}

const AddProductOptions = ({ closeDetails, editProduct, setQuantity, setLessQuantity, setProductsOptionsDetails, productsOptionsDetails, quantity, less_qty }) => {
	const contextStore = useContext(Context);
	const [activeProductOption, setActiveProductOption] = useState(false);
	const { setEndActionTitle, setProductOptions } = contextStore;
	const [state, dispatch] = useReducer(reducer, initialValue);
	const [showColorPicker, setShowColorPicker] = useState(null);
	const [actionClicked, setActionClicked] = useState(false);
	const [productStored, setProductStored] = useState(quantity);

	// to set the title and type
	const handOption = (e, item, idx) => {
		const { name, value } = e.target;
		setProductsOptionsDetails((prevState) => {
			return { ...prevState, [name]: value };
		});

		dispatch({ type: 'CHANGE_TITLE', title: e.target.value, item, idx });
	};

	// to set the values
	const handleSelectOption = (e, item, idx) => {
		setProductsOptionsDetails((prevState) => {
			return { ...prevState, value: e.target.value };
		});

		dispatch({ type: 'CHANGE_SELECTING', value: e.target.value, item, idx });
	};

	useEffect(() => {
		if (actionClicked) {
			setTimeout(() => {
				closeDetails();
			}, 3000);
		}
	}, [actionClicked]);
	
const addOptions = () => {
	setProductOptions(state, quantity, less_qty);

	closeDetails();
	setEndActionTitle('تم اضافة خيارات المنتج بنجاح');
};

	return (
		<>
			<BackDrop onClick={closeDetails} />
			{actionClicked && (
				<ActionCompleteComp
					title={'تم اضافة خيارات المنتج بنجاح'}
					cancelEarly={() => {
						closeDetails();
					}}
				></ActionCompleteComp>
			)}
			<div className='fixed flex flex-col top-24 translate-x-2/4 right-2/4 z-40 rounded-md overflow-hidden' style={{ height: '36rem', width: '60.25rem', maxHeight: '80%', maxWidth: '90%' }}>
				<div className='h-16 w-full flex items-center justify-between px-4' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50'>اضافة خيارات للمنتج - {editProduct?.name}</h2>
					<IoMdCloseCircleOutline color={'#fff'} className={'cursor-pointer'} onClick={closeDetails}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 overflow-scroll hide_scrollbar px-4 pt-6 pb-2' style={{ backgroundColor: '#F6F6F6' }}>
					<div className='flex gap-4'>
						<div
							className={`w-8 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
							style={{
								backgroundColor: activeProductOption ? '#3AE374' : '#A7A7A7',
							}}
							onClick={() => {
								setActiveProductOption(!activeProductOption);
							}}
						>
							<div className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${activeProductOption ? 'left-4' : 'left-1'}`}></div>
						</div>
						<h2 className='font-semibold'>تفعيل خيارات المنتج </h2>
					</div>
					{state.map((item, idx) => {
						const findOptionLabels = productOptions.find((option) => option?.type === item?.type);
						return (
							<div
								key={idx}
								className='py-7 px-5 mt-6'
								style={{
									backgroundColor: '#EDEDEF',
									border: '1px solid #E4E4E4',
								}}
							>
								<div className='flex md:flex-row flex-col gap-5 mb-7' style={{}}>
									<div className='flex-1 h-12 flex md:flex-row flex-col gap-5' style={{}}>
										<div
											className='flex flex-1 gap-4 px-2 items-center'
											style={{
												backgroundColor: '#FAFAFA',
												border: '1px solid #D3D3D3',
											}}
										>
											<WriteIcon fill='#ADB5B9'></WriteIcon>
											<input
												name='title'
												value={productsOptionsDetails?.title}
												onChange={(e) => {
													handOption(e, item, idx);
												}}
												style={{ backgroundColor: 'transparent' }}
												className=' flex-1 outline-none md:h-14 h-[45px]'
												placeholder={findOptionLabels?.placeHolder1}
												type='text'
											/>
										</div>
										<div
											className='flex flex-1 gap-4 px-2  items-center'
											style={{
												backgroundColor: '#FAFAFA',
												border: '1px solid #D3D3D3',
											}}
										>
											<ChoiceIcon fill='#ADB5B9'></ChoiceIcon>
											<Select
												name='value'
												value={productsOptionsDetails?.value}
												onChange={(e) => {
													handleSelectOption(e, item, idx);
												}}
												IconComponent={() => {
													return <IoIosArrowDown size={'1rem'} />;
												}}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												renderValue={(selected) => {
													if (productsOptionsDetails?.value.length === 0) {
														return <h2>ماركة</h2>;
													}
													return selected;
												}}
												className={'font-medium'}
												sx={{
													height: '3.5rem',
													pl: '1rem',
													width: '100%',

													'& .MuiSelect-select.MuiSelect-outlined': {
														p: 0,
														display: 'flex',
														alignItems: 'center',
													},
													'& .MuiOutlinedInput-notchedOutline': {
														border: 'none',
													},
													'&  svg': {
														display: state?.length === productOptions?.length ? 'none' : 'block',
													},
												}}
											>
												{productOptions.map(({ type }) => {
													const exist = state.some((i) => i.type === type);
													if (exist) {
														return;
													}
													return (
														<MenuItem
															key={type}
															className='souq_storge_category_filter_items '
															sx={{
																backgroundColor: '#FAFAFA',
																color: '#011723',
																'ul:has(&) li:hover': {
																	backgroundColor: '#B4EDEE',
																},
																height: '3rem',
																'&:hover': {},
															}}
															value={`${type}`}
														>
															{type}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</div>
									<div
										onClick={() => {
											dispatch({ type: 'DELETE_OPTION', item });
										}}
										className='h-12 w-12 fcc rounded-sm cursor-pointer'
										style={{ backgroundColor: '#FF3838' }}
									>
										<Box sx={{ '& path': { fill: '#fff' } }}>
											<TrashICon></TrashICon>
										</Box>
									</div>
								</div>

								{item.values.map(({ value, id }) => {
									const color = item?.type === 'اللون';
									return (
										<div className='flex gap-5 mb-5' key={id}>
											<div className='flex-1 relative h-12 flex gap-5' style={{}}>
												<div
													className='flex relative flex-1 gap-4 px-2 items-center'
													style={{
														backgroundColor: '#FAFAFA',
														border: '1px solid #D3D3D3',
													}}
												>
													<WriteIcon fill='#ADB5B9'></WriteIcon>
													<input
														name='type'
														value={productsOptionsDetails?.type}
														onChange={(e) => {
															handOption(e, item, idx);
														}}
														style={{ backgroundColor: 'transparent' }}
														className=' flex-1   outline-none'
														placeholder={findOptionLabels?.placeHolder2}
														type={item?.type === 'الوزن' || item?.type === 'المقاس' ? 'number' : 'text'}
													/>
													{color && (
														<div
															onClick={() => {
																setShowColorPicker(id);
															}}
															className='h-8 w-8 cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 rounded-full'
															style={{
																backgroundColor: value === '' ? '#7C34CD' : value,
															}}
														></div>
													)}
													{showColorPicker === id && color && (
														<div className='absolute left-0 bottom-0 translate-y-full z-50'>
															<SketchPicker
																color={value === '' ? '#7C34CD' : value}
																onChange={(e) => {
																	dispatch({
																		type: 'CHANGE_COLOR',
																		color: e.hex,
																		id,
																	});
																}}
															></SketchPicker>
															<div className='absolute cursor-pointer top-0 right-0 -translate-y-full z-60'>
																<TiDeleteOutline
																	onClick={() => {
																		setShowColorPicker(null);
																	}}
																	size={'1.5rem'}
																></TiDeleteOutline>
															</div>
														</div>
													)}
												</div>
											</div>
											<div
												className='h-12 w-12 cursor-pointer fcc rounded-sm'
												style={{}}
												onClick={() => {
													dispatch({
														type: 'DELETE_TO_SOME',
														id,
														name: item?.type,
													});
												}}
											>
												<Box sx={{}}>
													<TrashICon></TrashICon>
												</Box>
											</div>
										</div>
									);
								})}

								<div
									className='fcc py-3 gap-3 mx-auto cursor-pointer'
									style={{ width: '376px', maxWidth: '100%', border: '1px dashed #1DBBBE' }}
									onClick={() => {
										dispatch({ type: 'ADD_TO_SAME', name: item?.type });
									}}
								>
									<IoMdAdd fill='#1DBBBE'></IoMdAdd>
									<h2 style={{ color: '#1DBBBE' }}>اضافة قيمة</h2>
								</div>
							</div>
						);
					})}
					{state?.length === productOptions?.length || (
						<div
							className='fcc py-3 gap-3 mt-16 cursor-pointer'
							style={{ width: '100%', border: '1px dashed #1DBBBE' }}
							onClick={() => {
								dispatch({ type: 'ADD_NEW_OPTION' });
							}}
						>
							<IoMdAdd fill='#1DBBBE'></IoMdAdd>
							<h2 style={{ color: '#1DBBBE' }}>اضافة خيار جديد</h2>
						</div>
					)}
					<div className='flex items-center  gap-2 mt-10 '>
						<Checkbox sx={{ p: 0, '& svg': { fill: '#1DBBBE' } }}></Checkbox>
						<h2 className='font-semibold' style={{ color: '#011723' }}>
							كميات غير محدودة
						</h2>
					</div>
					<div
						className='py-7 px-5 mt-6'
						style={{
							backgroundColor: '#EDEDEF',
							border: '1px solid #E4E4E4',
						}}
					>
						<div className='flex mb-5 '>
							<label
								className='flex rounded-md w-full overflow-hidden'
								style={{
									backgroundColor: '#FAFAFA',
									border: '1px solid #ADB5B9B3',
								}}
							>
								<div className='p-4 flex flex-1'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<input className='flex-1 border-none outline-none bg-transparent' placeholder='السعر المقترح' type=' number' name='name' />
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
						<div className='flex mb-5 '>
							<label
								className='flex rounded-md w-full overflow-hidden'
								style={{
									backgroundColor: '#FAFAFA',
									border: '1px solid #ADB5B9B3',
								}}
							>
								<div className='p-4 flex flex-1'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<input className='flex-1 border-none outline-none bg-transparent' placeholder='سعر التكلفة' type='number' name='name' />
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
						<div className='flex md:flex-row flex-col mb-5 gap-4'>
							<div className='flex-1'>
								<label
									className='flex rounded-md w-full overflow-hidden'
									style={{
										backgroundColor: '#FAFAFA',
										border: '1px solid #ADB5B9B3',
									}}
								>
									<div className='p-4 flex flex-1'>
										<WriteIcon fill='#ADB5B9'></WriteIcon>

										<input className='flex-1 border-none outline-none bg-transparent' placeholder='الوزن' type='number' name='name' />
									</div>
									<div
										className=' w-16 flex justify-center items-center text-lg'
										style={{
											borderRight: '1px solid #ccc',
											backgroundColor: '#fafafa',
										}}
									>
										كجم
									</div>
								</label>
							</div>
							<div className='flex-1'>
								<div
									className='flex h-full flex-1 gap-4 px-2 items-center'
									style={{
										backgroundColor: '#FAFAFA',
										border: '1px solid #D3D3D3',
									}}
								>
									<WriteIcon fill='#ADB5B9'></WriteIcon>
									<input style={{ backgroundColor: 'transparent' }} className=' flex-1 md:h-14 h-[45px] outline-none' placeholder={'كود المنتج (SKU)'} type='text' name='name' />
								</div>
							</div>
						</div>
						<div className='flex md:flex-row flex-col mb-5 gap-4'>
							<div className='flex-1 h-14'>
								<div
									className='flex h-full flex-1 gap-4 px-2 items-center'
									style={{
										backgroundColor: '#FAFAFA',
										border: '1px solid #D3D3D3',
									}}
								>
									<Box sx={{ '& path': { fill: '#ADB5B9' } }}>
										<NotificationIcon></NotificationIcon>
									</Box>

									<input
										name='less_qty'
										value={less_qty}
										onChange={(e) => {
											setLessQuantity(e.target.value);
										}}
										style={{ backgroundColor: 'transparent' }}
										className=' flex-1 md:h-14 h-[45px] outline-none'
										placeholder={'أقل كمية للتنبيه'}
										type='number'
									/>
								</div>
							</div>
							<div className='flex-1 relative'>
								<div
									className='flex h-full flex-1 gap-4 pr-2 items-center'
									style={{
										backgroundColor: '#FAFAFA',
										border: '1px solid #D3D3D3',
									}}
								>
									<input
										value={productStored === 0 ? '' : productStored}
										name='quantity'
										onChange={(e) => {
											setProductStored(() => {
												if (e.target.value <= 0) {
													return 0;
												}
												return e.target.value;
											});
											setQuantity(e.target.value || 0);
										}}
										style={{ backgroundColor: 'transparent' }}
										className=' flex-1 md:h-14 h-[45px] outline-none'
										placeholder={'الكمية المتوفرة'}
										type='number'
									/>
									<Box
										className='flex h-full sm:relative sm:left-0 sm:top-0  absolute right-0 top-12'
										sx={{
											'& div': {
												width: '56px',
												height: '100%',
												border: '1px solid #ADB5B966',
												'@media(max-width:992px)': {
													height: '45px',
												},
											},
										}}
									>
										<div
											onClick={() => {
												setProductStored((prev) => {
													return prev + 1;
												});
											}}
											className='fcc cursor-pointer'
										>
											<AiOutlinePlus></AiOutlinePlus>
										</div>
										<div className='fcc'>{productStored}</div>
										<div
											onClick={() => {
												setProductStored((prev) => {
													if (prev <= 0) {
														return 0;
													}
													return prev - 1;
												});
											}}
											className='fcc cursor-pointer'
										>
											<AiOutlineMinus></AiOutlineMinus>
										</div>
									</Box>
								</div>
							</div>
						</div>
					</div>
					<Button
						onClick={() => {
							addOptions();
						}}
						type={'normal'}
						className={'w-full mt-5'}
					>
						حفظ
					</Button>
				</div>
			</div>
		</>
	);
};

export default AddProductOptions;
