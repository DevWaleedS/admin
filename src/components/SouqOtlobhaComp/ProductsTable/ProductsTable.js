import { useState, useEffect, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { Currency } from '../../../assets/Icons/index';
import { ReactComponent as StaticsIcon } from '../../../assets/Icons/icon-24-static.svg';
import { ReactComponent as TrashICon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
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
import { NotificationContext } from "../../../store/NotificationProvider";
import { Delete } from "../../../assets/Icons/index";
import Context from '../../../store/context';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import axios from "axios";


const ItemCategory = (props) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
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

	const onChangeHandler = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/etlobhachangeSpecial/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!props?.reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!props?.reload);
				}
			});
	};

	const deleteProduct = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/etlobhadeleteall?id[]=${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!props?.reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!props?.reload);
				}
			});
	}

	const { id, name, cover, purchasing_price, stock, special, category, subcategory, handleProductDetails, setReload,handleSelect } = props;
	const item = props.item;
	return (
		<li className='mb-6 flex md:flex-row flex-col justify-between gap-y-4 rounded-md' style={{ backgroundColor: '#fff', padding: '1rem 0.5rem', border: '1px solid #ECECEC' }}>
			<div className='flex'>
				<div className='flex md:flex-row flex-col gap-y-2'>
					<div className='flex md:flex-col flex-row gap-8 px-3 items-center'>
						<Checkbox checked={props.isItemSelected} checkedIcon={<CheckedSquare />} sx={{ display: 'inline', padding: '0' }} onClick={(event) => handleSelect(event,id)} />
						<StarIcon className={`${special === '????????' ? 'opacity-100' : 'opacity-0'}`} />
					</div>
					<div>
						<img className='h-36 w-36 object-cover' src={cover} alt='product-img' />
					</div>
				</div>
				<div className='flex flex-col justify-between mr-4 md:w-[356px] w-full'>
					<div className='h-11 flex items-center md:mb-0 mb-2' style={{ border: '1px solid #ccc', padding: '0.25rem 0.75rem' }}>
						<h2>{name}</h2>
					</div>
					<div className='flex md:flex-row flex-col md:gap-4 gap-2'>
						<div className='flex-1'>
							<h2>?????? ????????????</h2>
							<div className='h-11 flex items-center mt-2' style={{ border: '1px solid #ccc' }}>
								<div className='flex-1 flex items-center py-1 px-3'>
									<img className='ml-2 opacity-50' src={Currency} alt='' />
									<h2>{purchasing_price}</h2>
								</div>

								<div className='w-12 h-full flex items-center justify-center' style={{ backgroundColor: '#FAFAFA' }}>
									??.??
								</div>
							</div>
						</div>
						<div className='flex-1'>
							<h2>???????????? ???? ????????????</h2>
							<div className='h-11 flex items-center mt-2' style={{ border: '1px solid #ccc' }}>
								<div className='flex-1 flex items-center justify-center py-1 px-3'>
									<h2>{stock}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='md:w-80 w-full md:gap-12 gap-6 flex flex-col justify-between'>
				<div className='flex gap-4 flex-1'>
					<div className='flex font-medium flex-1 justify-center items-center rounded-sm min-h-[30px]' style={{ backgroundColor: '#FFEEEE', border: '1px solid #ECECEC' }}>
						{category?.name}
					</div>
					<div className='flex font-medium flex-1 justify-center items-center rounded-sm min-h-[30px]' style={{ backgroundColor: '#F4F5F7 ', border: '1px solid #ECECEC' }}>
						{subcategory[0]?.name}
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
							<MenuItem onClick={handleCloseMoreMun}>??????????????????</MenuItem>
							<MenuItem onClick={handleCloseMoreMun}> ????????????</MenuItem>
						</Menu>
					</div>
				</div>
				<div className='flex gap-4 flex-1'>
					<div className='flex  flex-1 justify-center items-center'>
						<Button
							onClick={() => {
								props.editProduct(item);
							}}
							className={'md:w-[132px] w-full rounded-none font-medium'}
							fontSize={'text-xs'}
							type={'outline'}
							style={{
								height: '48px',
							}}
						>
							???????????? ????????????
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
							className={'md:w-[132px] w-full rounded-none font-medium'}
							style={{
								color: '#1DBBBE',
								backgroundColor: '#FAFAFA',
								border: '1px solid #1DBBBE',
								height: '48px',
							}}
							endIcon={<KeyboardArrowDownIcon fill={'#1DBBBE'} className='mr-3' />}
						>
							????????????
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
								?????? ???????? ????????????
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<HiOutlineDocumentDuplicate></HiOutlineDocumentDuplicate>
								?????????? ????????????
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									handleProductDetails(item);
								}}
							>
								<StaticsIcon></StaticsIcon>
								???????????????? ????????????
							</MenuItem>
							<MenuItem>
								<div className=' w-11 m-[-10px]'>
									<Switch
										checked={special === '????????' ? true : false}
										onChange={() => { onChangeHandler(id) }}
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
								<div className='flex-1 mr-[-6px]'> ???????? ????????</div>
							</MenuItem>
							<MenuItem onClick={() => { deleteProduct(id) }}>
								<TrashICon></TrashICon>
								?????? ????????????
							</MenuItem>
						</Menu>
					</div>
					<div className='md:flex hidden justify-center items-center'>
						<MoreIcon className='opacity-0' />
					</div>
				</div>
			</div>
		</li>
	);
};

const ProductsTable = ({ data, loading, reload, setReload, editProduct }) => {
	const token = localStorage.getItem('token');
	const [categories, setCategories] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const [itemsChecked, setItemsChecked] = useState(false);
	const [showProductDetails, setShowProductDetails] = useState(false);
	const [productDetails, setProductDetails] = useState(null);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle, setNotificationTitle } = NotificationStore;
	const [selected, setSelected] = useState([]);
	const isSelected = (name) => selected.indexOf(name) !== -1;
	const handleSelect = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = data.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	useEffect(() => {
		if (confirm && actionTitle === 'ChangeStatus') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/productchangeSatusall?${queryParams}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res?.data?.success === true && res?.data?.data?.status === 200) {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(!reload);
					} else {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(!reload);
					}
				});
			setConfirm(false);
			setActionTitle(null);
		}
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/productdeleteall?${queryParams}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res?.data?.success === true && res?.data?.data?.status === 200) {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(!reload);
					} else {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(!reload);
					}
				});
			setConfirm(false);
			setActionTitle(null);
		}
	}, [confirm]);

	const handleProductDetails = (item) => {
		setShowProductDetails(true);
		setProductDetails(item);
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
			<header className='flex gap-4 items-center mb-2'>
				<Checkbox
					checkedIcon={<CheckedSquare />}
					sx={{
						pr: '0',
						color: '#011723',
						'& .MuiSvgIcon-root': {
							color: '#011723',
						},
					}}
					indeterminate={selected.length > 0 && selected.length < data?.length}
					checked={data?.length > 0 && selected.length === data?.length}
					onChange={handleSelectAllClick}
					inputProps={{
						'aria-label': 'select all desserts',
					}}
				/>
				<label style={{ color: '#011723', fontSize: '18px' }} htmlFor='all'>
					?????????? ????????
				</label>
				<div className='flex flex-row justify-center items-center gap-2'>
					{selected.length > 0 && (
						<>
							<div
								className='flex flex-row items-center justify-center gap-4 cursor-pointer'
								style={{ width: '114px', height: '40px', backgroundColor: '#FF38381A', borderRadius: '20px' }}
								onClick={() => {
									setNotificationTitle('???????? ?????? ???????? ???????????? ???????? ?????? ??????????????');
									setActionTitle('Delete');
								}}
							>
								<h6 style={{ fontSize: '18px', color: '#FF3838' }} className='font-medium'>
									??????
								</h6>
								<img src={Delete} alt='delete-icon' />
							</div>
							<div
								className='md:w-[126px] w-[100px] md:h-[40px] h-[30px] flex flex-row items-center justify-center md:gap-3 gap-1 cursor-pointer'
								style={{ backgroundColor: '#FF9F1A0A', borderRadius: '20px' }}
								onClick={() => {
									setNotificationTitle('???????? ?????????? ???????? ???????????????? ???????? ?????? ????????????????');
									setActionTitle('ChangeStatus');
								}}
							>
								<h6 style={{ color: '#FF9F1A' }} className='font-medium md:text-[18px] text-[15px]'>
									??????????
								</h6>
								<Switch
									onChange={() => { }}
									className=''
									sx={{
										width: '50px',
										'& .MuiSwitch-thumb': {
											width: '11px',
											height: '11px',
										},
										'& .MuiSwitch-switchBase': {
											padding: '6px',
											top: '9px',
											left: '9px',
										},
										'& .MuiSwitch-switchBase.Mui-checked': {
											left: '-1px',
										},
										'& .Mui-checked .MuiSwitch-thumb': {
											backgroundColor: '#FFFFFF',
										},
										'& .MuiSwitch-track': {
											height: '16px',
											borderRadius: '20px',
										},
										'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
											backgroundColor: '#FF9F1A',

											opacity: 1,
										},
									}}
									checked={true}
								/>
							</div>
						</>
					)}
				</div>
			</header>
			{
				loading ?
					(
						<CircularLoading />
					)
					:
					(
						<ul>
							{data?.map((item, key) => {
								const isItemSelected = isSelected(item.id);
								return (
									<ItemCategory
										{...item}
										item={item}
										key={key}
										reload={reload}
										setReload={setReload}
										isItemSelected={isItemSelected}
										handleSelect={handleSelect}
										//handleCheckboxClick={handleCheckboxClick}
										//checkedList={checkedList}
										handleProductDetails={handleProductDetails}
										editProduct={(item) => {
											editProduct(item);
										}}
									/>
								);
							})}
						</ul>
					)
			}
		</div>
	);
};

export default ProductsTable;
