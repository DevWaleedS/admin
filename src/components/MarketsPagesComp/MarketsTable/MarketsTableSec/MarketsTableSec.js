import React, { useEffect, useContext } from 'react';
import styles from './MarketsTableSec.module.css';
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
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as CheckedSquare } from '../../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as SwitchIcon } from '../../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as BsTrash } from '../../../../assets/Icons/icon-24-delete.svg';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { ReactComponent as SortIcon } from '../../../../assets/Icons/icon-24-sort.svg';
import { NotificationContext } from '../../../../store/NotificationProvider';
import Context from '../../../../store/context';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import axios from 'axios';
import { ListMoreCategory } from '../../../../assets/Icons/index';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array?.map((el, id) => [el, id]);
	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
	{
		id: 'situation',
		numeric: false,
		disablePadding: false,
		label: '??????????????',
		width: '5rem',
	},
	{
		id: 'daysLeft',
		numeric: true,
		disablePadding: false,
		label: '?????????? ????????????????',
		sort: true,
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: '????????',
		sort: true,
	},
	{
		id: 'opened',
		numeric: true,
		disablePadding: false,
		label: '????????????',
		sort: true,
	},
	{
		id: 'activity',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????',
		sort: true,
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????',
	},
	{
		id: 'number',
		numeric: true,
		disablePadding: false,
		label: '??',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ backgroundColor: '#ebebebd9' }}>
			<TableRow>
				{headCells.map((headCell, index) => (
					<TableCell
						className='font-medium text-lg'
						key={index}
						align={headCell.numeric ? 'right' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							width: headCell.width ? headCell.width : 'auto',
							color: '#02466A',
							whiteSpace: 'nowrap',
						}}
					>
						{headCell.sort && (
							<TableSortLabel
								IconComponent={() => {
									return <SortIcon />;
								}}
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{!orderBy === headCell.id ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
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
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number,
};

function EnhancedTableToolbar(props) {
	const { numSelected, rowCount, onSelectAllClick } = props;
	const NotificationStore = useContext(NotificationContext);
	const { setNotificationTitle, setActionTitle } = NotificationStore;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
				display: 'flex',
				gap: '2rem',
				justifyContent: 'flex-end',
			}}
		>
			<div className='fcc gap-2 px-4 rounded-full' style={{ backgroundColor: 'rgba(255, 159, 26, 0.04)' }}>
				{numSelected > 0 && (
					<div
						className='fcc gap-4 px-4 rounded-full'
						style={{ minWidth: '114px', backgroundColor: '#FF9F1A0A' }}
						onClick={() => {
							setNotificationTitle('???????? ?????????? ?????????? ???????? ?????????????? ???????? ?????? ????????????????');
							setActionTitle('ChangeStatus');
						}}
					>
						<h2 className={'font-medium whitespace-nowrap'} style={{ color: '#FF9F1A' }}>
							??????/ ?????? ??????
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

			<div className='flex items-center'>
				<h2 className='font-medium whitespace-nowrap'>?????????? ????????</h2>
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

export default function EnhancedTable({ fetchedData, loading, reload, setReload }) {
	const token = localStorage.getItem('token');
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [activityAnchorEl, setActivityAnchorEl] = React.useState(null);
	const activityOpen = Boolean(activityAnchorEl);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;

	const rowsPerPagesCount = [10, 20, 30, 50, 100];
	const handleRowsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const activityHandleClick = (event) => {
		setActivityAnchorEl(event.currentTarget);
	};

	const activityHandleClose = () => {
		setActivityAnchorEl(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = fetchedData?.data?.stores?.map((n) => n.id);
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

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.stores?.length) : 0;

	const allRows = () => {
		const num = Math.ceil(fetchedData?.data?.stores?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};

	const changeStoreStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/changeStoreStatus?id[]=${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};

	const deleteStore = (id) => {
		axios
			.delete(`https://backend.atlbha.com/api/Admin/store/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};

	const changeProductSpecialStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/specialStatus/${id}`, {
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

	useEffect(() => {
		if (confirm && actionTitle === 'ChangeStatus') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/changeStoreStatus?${queryParams}`, {
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

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
				<EnhancedTableToolbar numSelected={selected?.length} rowCount={fetchedData?.data?.stores?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead
							numSelected={selected?.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={fetchedData?.data?.stores?.length}
						/>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={7}>
										<CircularLoading />
									</TableCell>
								</TableRow>
							) : (
								<>
									{stableSort(fetchedData?.data?.stores, getComparator(order, orderBy))
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.id);
											const labelId = `enhanced-table-checkbox-${index}`;
											return (
												<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
													<TableCell component='th' id={labelId} scope='row'>
														<div className='flex items-center gap-2'>
															<BsTrash
																onClick={() => deleteStore(row?.id)}
																style={{
																	cursor: 'pointer',
																	color: 'red',
																	fontSize: '1rem',
																}}
															></BsTrash>
															<Switch
																onChange={() => changeStoreStatus(row?.id)}
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
																checked={row?.status === '??????' ? true : false}
															/>
														</div>
													</TableCell>
													<TableCell align='center'>
														<div>
															<h2 dir='rtl' className='font-normal text-lg '>
																<span className='ml-1'>{row?.left}</span>
																<span>??????</span>
															</h2>
														</div>
													</TableCell>
													<TableCell align='right'>
														<div className='flex flex-row items-center gap-1 py-1 px-3 md:w-18 w-24 h-6 rounded-md'>
															<h2 style={{ color: row.special === '????????' ? '#3AE374' : '#ADB5B9' }} className='md:text-[16px] text-[14px] min-w-[50px] whitespace-nowrap'>
																{row?.special}
															</h2>
															<Switch
																onChange={() => changeProductSpecialStatus(row?.id)}
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
																		backgroundColor: '#3AE374',

																		opacity: 1,
																	},
																}}
																checked={row?.special === '????????' ? true : false}
															/>
														</div>
													</TableCell>
													<TableCell align='center'>
														<div
															className='w-20 h-full py-1 rounded-xl'
															style={{
																backgroundColor: row.status === '??????' ? 'rgba(58, 227, 116, 0.4)' : '#D3D3D3',
																marginLeft: 'auto',
															}}
														>
															<h2>{row?.status}</h2>
														</div>
													</TableCell>
													<TableCell align='right' sx={{ display: 'flex', gap: '0.5rem', p: '24px 0' }}>
														<div className='flex flex-row items-center justify-end gap-3'>
															{row?.activity?.length > 1 && (
																<>
																	<img className='cursor-pointer' src={ListMoreCategory} alt='list-more-category' onClick={activityHandleClick} />
																	<Menu className={styles.activity_menu} anchorEl={activityAnchorEl} open={activityOpen} onClose={activityHandleClose}>
																		{row?.activity?.map((item, index) => (
																			<MenuItem key={index} className='flex flex-row items-center justify-center gap-2' style={{ color: '#4D4F5C' }} onClick={activityHandleClose}>
																				<div className='flex flex-row items-center justify-center md:w-[30px] w-[20px] md:h-[30px] h-[20px] p-[0.2rem]' style={{ borderRadius: '50%', backgroundColor: '#8D8AD333' }}>
																					<img src={item?.icon} alt={item?.name} />
																				</div>
																				{item?.name}
																			</MenuItem>
																		))}
																	</Menu>
																</>
															)}
															<h2 style={{ color: '#4D4F5C' }} className='md:text-[16px] text-[14px] inline whitespace-nowrap font-normal'>
																{row?.activity?.[0]?.name}
															</h2>
															<img src={row?.activity?.[0]?.icon} alt={row?.activity?.[0]?.name} className='w-[20px] h-[20px] rounded-full' />
														</div>
													</TableCell>
													<TableCell align='right'>
														<h2 className='inline font-normal text-lg'>{row?.store_name}</h2>
													</TableCell>
													<TableCell align='right' className='font-normal text-lg '>
														{(index + 1).toLocaleString('en-US', {
															minimumIntegerDigits: 2,
															useGrouping: false,
														})}
													</TableCell>
													<TableCell padding='none' align={'right'}>
														<Checkbox
															checkedIcon={<CheckedSquare />}
															sx={{
																color: '#1DBBBE',
																'& .MuiSvgIcon-root': {
																	color: '#ADB5B9',
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
								</>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className='flex md:flex-row flex-col items-center justify-between gap-[26px] md:mt-4 mt-8'>
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
						?????? ????????????
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
									key={itemIdx}
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
					></MdOutlineArrowForwardIos>
				</div>
				<div></div>
			</div>
		</Box>
	);
}
