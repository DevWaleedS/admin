import React, { useContext, Fragment, useEffect } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Context from '../../../../store/context';
import { NotificationContext } from '../../../../store/NotificationProvider';

// icons
import { ReactComponent as EditIcon } from '../../../../assets/Icons/editt 2.svg';
import { ReactComponent as InfoIcon } from '../../../../assets/Icons/icon-24-actions-info_outined.svg';
import { ReactComponent as BsTrash } from '../../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as SwitchIcon } from '../../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as SortIcon } from '../../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as CheckedSquare } from '../../../../assets/Icons/icon-24-square checkmark.svg';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

const headCells = [
	{
		id: 'situation',
		numeric: false,
		disablePadding: false,
		label: 'الإجراء',
		width: '5rem',
	},
	{
		id: 'active',
		numeric: true,
		disablePadding: false,
		label: 'الحالة',
	},
	{
		id: 'daysLeft',
		numeric: true,
		disablePadding: false,
		label: 'التصنيفات الفرعية',
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: 'اسم التصنيف',
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: 'الرمز',
	},
	{
		id: 'number',
		numeric: true,
		disablePadding: false,
		label: 'م',
	},
];

function EnhancedTableHead(props) {
	return (
		<TableHead sx={{ backgroundColor: '#fff' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='text-lg font-medium'
						key={headCell.label}
						align={headCell.numeric ? 'right' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sx={{
							width: headCell.width ? headCell.width : 'auto',
							color: '#011723',
							whiteSpace: 'nowrap',
						}}
					>
						{headCell.sort && (
							<TableSortLabel
								IconComponent={() => {
									return <SortIcon style={{ marginRight: '8px' }} />;
								}}
							>
								{headCell.label}
							</TableSortLabel>
						)}
						{!headCell.sort && headCell.label}
					</TableCell>
				))}
				<TableCell padding={'none'}></TableCell>
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	rowCount: PropTypes.number,
};

function EnhancedTableToolbar(props) {
	const { numSelected, rowCount, onSelectAllClick } = props;
	const NotificationStore = useContext(NotificationContext);
	const { setNotificationTitle, setActionTitle } = NotificationStore;
	return (
		<Toolbar
			className='md:gap-8 gap-4'
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			<div className='fcc gap-2 px-4 rounded-full' style={{ backgroundColor: 'rgba(255, 159, 26, 0.04)' }}>
				{numSelected > 0 && (
					<div
						className='fcc gap-4 px-4 rounded-full'
						style={{ minWidth: '114px', backgroundColor: '#FF9F1A0A' }}
						onClick={() => {
							setNotificationTitle('سيتم تعطيل جميع التصنيفات التي قمت بتحديدها');
							setActionTitle('changeStatus');
						}}
					>
						<h2 className={'font-medium md:text-[18px] text-[16px] whitespace-nowrap'} style={{ color: '#FF9F1A' }}>
							تعطيل
						</h2>
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
					</div>
				)}
			</div>
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<Tooltip
						onClick={() => {
							setNotificationTitle('سيتم حذف جميع التصنيفات التي قمت بتحديدها');
							setActionTitle('Delete');
						}}
					>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium md:text-[18px] text-[16px] whitespace-nowrap'} style={{ color: '#FF3838' }}>
								حذف
							</h2>
							<IconButton>
								<BsTrash
									style={{
										cursor: 'pointer',
										color: 'red',
										fontSize: '1rem',
									}}
								></BsTrash>
							</IconButton>
						</div>
					</Tooltip>
				)}
			</div>

			<div className='flex items-center'>
				<h2 className='font-medium md:text-[18px] text-[16px] whitespace-nowrap'>تحديد الكل</h2>
				<Checkbox
					checkedIcon={<CheckedSquare />}
					sx={{
						pr: '0',
						color: '#011723',
						'& .MuiSvgIcon-root': {
							color: '#011723',
						},
					}}
					indeterminate={numSelected > 0 && numSelected < rowCount}
					checked={rowCount > 0 && numSelected === rowCount}
					onChange={onSelectAllClick}
					inputProps={{
						'aria-label': 'select all desserts',
					}}
				/>
			</div>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ editSection, fetchedData, loading, reload, setReload }) {
	const token = localStorage.getItem('token');
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const rowsPerPagesCount = [10, 20, 30, 50, 100];
	const handleRowsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = fetchedData?.data?.categories.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	// Delete single item
	const deleteCategory = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/categorydeleteall?id[]=${id}`, {
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
	};

	// change category status
	const changeCategoryStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/categorychangeSatusall?id[]=${id}`, {
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
	};

	// Delete all items and Change all status
	useEffect(() => {
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/categorydeleteall?${queryParams}`, {
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
			setActionTitle(null);
			setConfirm(false);
		}
		if (confirm && actionTitle === 'changeStatus') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/categorychangeSatusall?${queryParams}`, {
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
			setActionTitle(null);
			setConfirm(false);
		}
	}, [confirm]);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.categories.length) : 0;

	const allRows = () => {
		const num = Math.ceil(fetchedData?.data?.categories.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};
	return (
		<Box sx={{ width: '100%', mb: 2, pb: 2 }}>
			<Paper
				sx={{
					width: '100%',
					backgroundColor: 'transparent',
					boxShadow: 'none',
				}}
			>
				<EnhancedTableToolbar numSelected={selected.length} rowCount={fetchedData?.data?.categories.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer sx={{ backgroundColor: '#fff', pl: 2 }}>
					<Table sx={{ minWidth: 750, backgroundColor: '#fff' }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={fetchedData?.data?.categories.length} />
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={6}>
										<CircularLoading />
									</TableCell>
								</TableRow>
							) : (
								<Fragment>
									{fetchedData?.data?.categories.map((row, index) => {
										const isItemSelected = isSelected(row?.id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row?.id} selected={isItemSelected}>
												<TableCell component='th' id={labelId} scope='row'>
													<div className='flex items-center gap-2'>
													

														<EditIcon className={'cursor-pointer'} onClick={() => editSection(row)} width={'20px'} />

														<BsTrash
															onClick={() => deleteCategory(row?.id)}
															style={{
																cursor: 'pointer',
																color: 'red',
																fontSize: '1.2rem',
															}}
														/>
													</div>
												</TableCell>
												<TableCell align='right'>
													<div>
														<Switch
															onChange={() => changeCategoryStatus(row?.id)}
															checked={row?.status === 'نشط' ? true : false}
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
																	backgroundColor: '#3AE374',

																	opacity: 1,
																},
															}}
														/>
													</div>
												</TableCell>

												{/**
												 */}
												<TableCell align='right'>
													<div dir={'rtl'} className='flex items-center gap-8'>
														{row?.subcategory.slice(0, 3).map((tag) => {
															return (
																<div
																	key={tag?.id}
																	className='rounded-full text-[14px] font-medium flex py-1 items-center justify-center px-2 whitespace-nowrap'
																	style={{
																		backgroundColor: '#EBEBEB',
																		color: '#011723',
																	}}
																>
																	{tag?.name}
																</div>
															);
														})}
														{row?.subcategory.length > 3 && (
															<div
																className='rounded-xl flex items-center font-semibold justify-center px-1 text-2xl'
																style={{
																	backgroundColor: '#EBEBEB',
																	color: '#011723',
																}}
															>
																...
															</div>
														)}
													</div>
												</TableCell>

												<TableCell align='right'>
													<h2 className='inline font-normal text-lg'>{row?.name}</h2>
												</TableCell>
												<TableCell align='right'>
													<div className='inline font-normal text-lg'>
														<img
															src={row?.icon}
															alt={row?.name}
															style={{
																marginLeft: 'auto',
																width: '2rem',
																height: '2rem',
															}}
														/>
													</div>
												</TableCell>
												<TableCell align='right'>
													<h2 className='font-normal text-lg' style={{ color: '#011723' }}>
														{(index + 1).toLocaleString('en-US', {
															minimumIntegerDigits: 2,
															useGrouping: false,
														})}
													</h2>
												</TableCell>
												<TableCell padding='none' align={'right'}>
													<Checkbox
														sx={{
															color: '#1DBBBE',
															'& .MuiSvgIcon-root': {
																color: '#011723',
															},
														}}
														checked={isItemSelected}
														onClick={(event) => handleClick(event, row?.id)}
														inputProps={{
															'aria-labelledby': labelId,
														}}
													/>
												</TableCell>
											</TableRow>
										);
									})}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height: 53 * emptyRows,
											}}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</Fragment>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className='flex md:flex-row flex-col items-center justify-between gap-4 pt-8 px-4 pb-4 ' style={{ backgroundColor: '#fff' }}>
				<div className='flex items-center gap-2 p-2 rounded-md' style={{ border: '1px solid #2D62ED' }}>
					<div
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleRowsClick}
						className={'h-9 w-9 rounded-sm flex justify-center items-center cursor-pointer'}
						style={{ backgroundColor: '#0099FB' }}
					>
						<MdOutlineKeyboardArrowDown color='#fff' fontSize={'1.5rem'}></MdOutlineKeyboardArrowDown>
					</div>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						{rowsPerPagesCount.map((rowsPer, rowsIdx) => {
							return (
								<MenuItem
									value={rowsPer}
									onClick={(e) => {
										handleChangeRowsPerPage(e);
										handleClose();
									}}
									key={rowsIdx}
									sx={{
										backgroundColor: '#FFEEEE',
										'ul:has(&)': {
											p: 0,
										},
										'ul:has(&) li:hover': {
											backgroundColor: '#C6E1F0',
										},
									}}
								>
									{rowsPer}
								</MenuItem>
							);
						})}
					</Menu>
					<h2 className='font-medium' style={{ color: '#0077FF' }}>
						عدد الصفوف
					</h2>
				</div>
				<div className='flex gap-6 items-center'>
					<MdOutlineArrowBackIosNew
						className='cursor-pointer'
						style={{ visibility: page === 0 && 'hidden' }}
						onClick={() => {
							setPage(page - 1);
						}}
					></MdOutlineArrowBackIosNew>

					<div className='flex gap-4'>
						{allRows().map((item, itemIdx) => {
							return (
								<div
									className='cursor-pointer font-medium rounded-lg flex justify-center items-center w-6 h-6'
									style={{
										backgroundColor: item === page + 1 && '#508FF4',
										color: item === page + 1 && '#fff',
									}}
									onClick={() => {
										setPage(itemIdx);
									}}
								>
									{item}
								</div>
							);
						})}
					</div>
					<MdOutlineArrowForwardIos
						className='cursor-pointer'
						style={{ visibility: page + 1 === allRows().length && 'hidden' }}
						onClick={() => {
							setPage(page + 1);
						}}
					/>
				</div>
				<div></div>
			</div>
		</Box>
	);
}
