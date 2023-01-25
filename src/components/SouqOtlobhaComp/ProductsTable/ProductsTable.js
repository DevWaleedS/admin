import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';

import { Currency } from '../../../assets/Icons/index';
import { ReactComponent as StaticsIcon } from '../../../assets/Icons/icon-24-static.svg';
import { ReactComponent as TrashICon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as SwitchIcon } from '../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as MoreIcon } from '../../../assets/Icons/icon-24- more_vertical.svg';
import { ReactComponent as StarIcon } from '../../../assets/Icons/stare.svg';

import Button from '../../../UI/Button/Button';
import ProductDetails from './ProductDetails/ProductDetails';
import { Button as MenuButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { BiLinkAlt } from 'react-icons/bi';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';

const ItemCategory = (props) => {
	const [menuButton, setMenuButton] = useState(null);
	const open = Boolean(menuButton);

	//
	const [moreMenu, setMoreMenu] = useState(null);
	const openMoreMenu = Boolean(moreMenu);

	// functions for menu
	const handleClick = (event) => {
		setMenuButton(event.currentTarget);
	};

	const handleClose = () => {
		setMenuButton(null);
	};

	//
	const handleOpenMoreMun = (event) => {
		setMoreMenu(event.currentTarget);
	};
	const handleCloseMoreMun = () => {
		setMoreMenu(null);
	};



	//
	const [showSpecial, setShowSpecial] = useState(props.isSpecial);

	const onChangeHandler = (event) => {
		setShowSpecial(!showSpecial);
	};

	const { title, id, img, price, inStore, checkedList, handleCheckboxClick, category, section, handleProductDetails } = props;
	const item = props.item;

	return (
		<li className='mb-6  flex justify-between' style={{ backgroundColor: '#fff', padding: '1rem 0.5rem' }}>
			<div className='flex'>
				<div className='flex flex-col gap-8 px-3 items-center'>
					<Checkbox checkedIcon={<CheckedSquare />} sx={{ display: 'inline', padding: '0' }} className='' item={id} value={id} checked={checkedList.includes(id)} onChange={handleCheckboxClick} />
					<StarIcon className={`${showSpecial ? 'opacity-100' : 'opacity-0'}`} />
				</div>

				<div className=' '>
					<img className='h-36 w-36 object-cover' src={img} alt='' />
				</div>
				<div className='flex flex-col justify-between mr-4' style={{ width: '356px' }}>
					<div className='h-11 flex items-center' style={{ border: '1px solid #ccc', padding: '0.25rem 0.75rem' }}>
						<h2>{title}</h2>
					</div>
					<div className='flex gap-4'>
						<div className='flex-1'>
							<h2>سعر الشراء</h2>
							<div className='h-11 flex items-center mt-2' style={{ border: '1px solid #ccc' }}>
								<div className='flex-1 flex items-center py-1 px-3'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<h2>{price}</h2>
								</div>

								<div className='w-12 h-full flex items-center justify-center' style={{ backgroundColor: '#FAFAFA' }}>
									ر.س
								</div>
							</div>
						</div>
						<div className='flex-1'>
							<h2>الكمية في المخزن</h2>
							<div className='h-11 flex items-center mt-2' style={{ border: '1px solid #ccc' }}>
								<div className='flex-1 flex items-center justify-center py-1 px-3'>
									<h2>{inStore}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-80 gap-12 flex flex-col justify-between'>
				<div className='flex gap-4 flex-1'>
					<div className='flex font-medium flex-1 justify-center items-center' style={{ backgroundColor: '#FFEEEE' }}>
						{category}
					</div>
					<div className='flex font-medium flex-1 justify-center items-center' style={{ backgroundColor: '#F4F5F7 ' }}>
						{section}
					</div>
					<div className='flex justify-center items-center'>
						<MoreIcon onClick={handleOpenMoreMun} className='cursor-pointer' />
						<Menu
							id='basic-menu'
							anchorEl={moreMenu}
							open={openMoreMenu}
							onClose={handleCloseMoreMun}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							sx={{
								'& ul.MuiList-root': {
									backgroundColor: '#FAFAFA',
									width: '135px',
								},
							}}
						>
							<MenuItem onClick={handleCloseMoreMun}>اكسسوارات</MenuItem>
							<MenuItem onClick={handleCloseMoreMun}> هيدفون</MenuItem>
						</Menu>
					</div>
				</div>
				<div className='flex gap-4  flex-1'>
					<div className='flex  flex-1 justify-center items-center'>
						<Button
							onClick={() => {
								props.editProduct(item);
							}}
							className={'rounded-none font-medium'}
							fontSize={'text-xs'}
							type={'outline'}
							style={{
								height: '48px',
								width: '132px',
							}}
						>
							تفاصيل المنتج
						</Button>
					</div>

					<div className='flex  flex-1 justify-center items-center'>
						<MenuButton
							id='demo-customized-button'
							aria-controls={open ? 'demo-customized-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
							variant='contained'
							disableElevation
							onClick={handleClick}
							className={'rounded-none font-medium'}
							style={{
								color: '#1DBBBE',
								backgroundColor: '#FAFAFA',
								border: '1px solid #1DBBBE',
								height: '48px',
								width: '132px',
							}}
							endIcon={<KeyboardArrowDownIcon fill={'#1DBBBE'} className='mr-3' />}
						>
							المزيد
						</MenuButton>
						<Menu
							id='basic-menu'
							anchorEl={menuButton}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							sx={{
								'& ul.MuiList-root': {
									backgroundColor: '#FAFAFA',
									width: '240px',
								},
								'& ul.MuiList-root li': {
									display: 'flex',
									gap: '0.75rem',
								},
								'& ul.MuiList-root li svg': {
									height: '1rem',
									width: '1rem',
								},
							}}
						>
							<MenuItem onClick={handleClose}>
								<BiLinkAlt></BiLinkAlt>
								نسخ رابط المنتج
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<HiOutlineDocumentDuplicate></HiOutlineDocumentDuplicate>
								تكرار المنتج
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									handleProductDetails(item);
								}}
							>
								<StaticsIcon></StaticsIcon>
								احصائيات المنتج
							</MenuItem>
							<MenuItem>
								<div className=' w-11 m-[-10px]'>
									<Switch
										checked={showSpecial}
										onChange={onChangeHandler}
										sx={{
											width: '100%',
											'& .MuiSwitch-track': {
												width: 22,
												height: 12,
												opacity: 1,
												backgroundColor: 'rgba(0,0,0,.25)',
												boxSizing: 'border-box',
											},
											'& .MuiSwitch-thumb': {
												boxShadow: 'none',
												width: 8,
												height: 8,
												borderRadius: 4,
												transform: 'translate(5px,6px)',
											},
											'&:hover': {
												'& .MuiSwitch-thumb': {
													boxShadow: 'none',
												},
											},

											'& .MuiSwitch-switchBase': {
												padding: 1,
												'&.Mui-checked': {
													transform: 'translateX(9px)',
													color: '#fff',
													'& + .MuiSwitch-track': {
														opacity: 1,
														backgroundColor: '#3AE374',
													},
												},
											},
										}}
									/>
								</div>

								<div className='flex-1 mr-[-6px]'> منتج مميز</div>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<TrashICon></TrashICon>
								حذف المنتج
							</MenuItem>
						</Menu>
					</div>

					<div className='flex justify-center items-center'>
						<MoreIcon className='opacity-0' />
					</div>
				</div>
			</div>
		</li>
	);
};

const ProductsTable = ({ editProduct }) => {
	const [categories, setCategories] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const [itemsChecked, setItemsChecked] = useState(false);
	const [showProductDetails, setShowProductDetails] = useState(false);
	const [productDetails, setProductDetails] = useState(null);

	useEffect(() => {
		const initialCategories = [
			{
				id: 251,
				isSpecial: true,
				title: 'سماعة هيدفون أصلية',
				sellPrice: 30,
				price: 40,
				inStore: 500,
				category: 'الكترونيات',
				section: 'سماعات',
				info: 'سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة',
				img: 'https://i.pcmag.com/imagery/reviews/07t6yzTnRvFvs8uD2xeYsB0-1.fit_lim.size_320x180.v1639090940.jpg',
			},
			{
				id: 40,
				isSpecial: false,
				title: 'عطر خليجى فخم',
				sellPrice: 30,
				price: 40,
				inStore: 400,
				category: 'تجميل',
				section: 'عطور',
				info: 'سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة',
				img: 'https://cdn.shopify.com/s/files/1/0024/0196/0036/products/c78ef2ef-2808-4506-8a2e-513758223f2d_600x.jpg?v=1617071592',
			},
			{
				id: 60,
				isSpecial: false,
				title: 'عطر ماكس',
				sellPrice: 55,
				price: 62,
				inStore: 150,
				category: 'تجميل',
				section: 'عطور',
				info: 'سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة',
				img: 'https://img.freepik.com/free-photo/front-view-fragrance-bottle-transparent-white-floor_140725-11635.jpg?w=360&t=st=1667826920~exp=1667827520~hmac=6c7de9e656a11083057ebf29cf242e9db41e0952ab03d89090ea8a0cb24975b5',
			},
			{
				id: 456,
				isSpecial: false,
				title: 'عطر ماكس',
				sellPrice: 95,
				price: 120,
				inStore: 232,
				category: 'تجميل',
				section: 'عطور',
				info: 'سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة سماعة هيدفدون أصلية سماعة هيدفدون أصلية سماعة',
				img: 'https://img.freepik.com/free-photo/front-view-fragrance-bottle-transparent-white-floor_140725-11635.jpg?w=360&t=st=1667826920~exp=1667827520~hmac=6c7de9e656a11083057ebf29cf242e9db41e0952ab03d89090ea8a0cb24975b5',
			},
		];

		setCategories(initialCategories);
	}, []);

	const handleCheckboxClick = (e) => {
		const { value, checked } = e.target;
		let arr = [...checkedList];
		if (checked) {
			setCheckedList([...checkedList, value * 1]);
			arr.push(value);
		} else {
			setCheckedList(checkedList.filter((item) => item !== value));
			arr.pop();
		}
		if (arr.length === categories.length) {
			setItemsChecked(true);
		} else {
			setItemsChecked(false);
		}
	};

	const handleProductDetails = (item) => {
		setShowProductDetails(true);
		setProductDetails(item);
	};

	const selectItem = (e) => {
		const { checked } = e.target;

		const collection = [];

		if (checked) {
			for (const category of categories) {
				collection.push(category.id);
			}
		}

		setCheckedList(collection);
		setItemsChecked(checked);
	};

	return (
		<div dir='rtl'>
			{showProductDetails && (
				<ProductDetails
					items={productDetails}
					closeDetails={() => {
						setShowProductDetails(false);
					}}
				/>
			)}
			<header className='flex gap-4 items-center'>
				<label>
					<Checkbox checkedIcon={<CheckedSquare />} checked={itemsChecked} onClick={selectItem.bind(this)} />
					تحديد الكل
				</label>
				{itemsChecked && (
					<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
						<IconButton>
							<TrashICon
								style={{
									cursor: 'pointer',
									color: 'red',
									fontSize: '1rem',
								}}
							/>
						</IconButton>
						<h2 className={'font-semibold'} style={{ color: '#FF3838' }}>
							حذف
						</h2>
					</div>
				)}
				{itemsChecked && (
					<div className='fcc gap-4 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF9F1A0A' }}>
						<Box
							sx={{
								'& #Path_820': {
									fill: '#FF9F1A',
								},
							}}
						>
							<SwitchIcon
								style={{
									cursor: 'pointer',
									color: 'red',
									fontSize: '0.5rem',
								}}
								className={'w-5'}
							></SwitchIcon>
						</Box>
						<h2 className={'font-semibold'} style={{ color: '#FF9F1A' }}>
							تعطيل
						</h2>
					</div>
				)}
			</header>
			<ul className=''>
				{categories.map((category, menuItem) => {
					return (
						<ItemCategory
							{...category}
							item={category}
							key={category.id}
							isSpecial={category.isSpecial}
							handleCheckboxClick={handleCheckboxClick}
							checkedList={checkedList}
							handleProductDetails={handleProductDetails}
							editProduct={(item) => {
								editProduct(item);
							}}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default ProductsTable;
