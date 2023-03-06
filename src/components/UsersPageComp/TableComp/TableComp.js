import React, { useEffect,useContext } from 'react';
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
import Switch from '@mui/material/Switch';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NotificationContext } from "../../../store/NotificationProvider";
import { visuallyHidden } from '@mui/utils';
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as DocumentIcon } from '../../../assets/Icons/document_text_outlined.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/editt 2.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as SwitchIcon } from '../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/Icons/icon-24-delete.svg';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import Context from '../../../store/context';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import axios from "axios";
import styles from './TableComp.module.css';

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

function stableSort(array, comparator) {
	const stabilizedThis = array?.map((el, index) => [el, index]);
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
		label: 'الإجراء',
		width: '5rem',
	},
	{
		id: 'daysLeft',
		numeric: true,
		disablePadding: false,
		label: 'الحالة',
		sort: true,
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: 'مستوى الصلاحيات',
		sort: true,
	},
	{
		id: 'opened',
		numeric: true,
		disablePadding: false,
		label: 'البريد الاكترونى',
	},
	{
		id: 'activity',
		numeric: true,
		disablePadding: false,
		label: 'اسم المستخدم',
		sort: true,
	},

	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'م',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ backgroundColor: 'rgba(29, 187, 190, 0.2)' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='font-medium text-lg'
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							width: headCell.width ? headCell.width : 'auto',
							whiteSpace: 'nowrap'
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
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const { numSelected, rowCount, onSelectAllClick } = props;
	const NotificationStore = useContext(NotificationContext);
	const { setNotificationTitle, setActionTitle } = NotificationStore;
	return (
		<Toolbar
			className="md:gap-8 gap-4"
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
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<div
						className='fcc gap-4 px-4 rounded-full'
						style={{
							width: '114px',
							backgroundColor: 'rgba(255, 159, 26, 0.04)',
						}}
						onClick={() => {
							setNotificationTitle('سيتم تعطيل جميع المستخدمين التي قمت بتحديدهم');
							setActionTitle('ChangeUsersStatus');
						}}
					>
						<h2 className={'font-semibold md:text-[18px] text-[16px]'} style={{ color: '#FF9F1A' }}>
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
				{numSelected > 0 && (
					<div
						className='fcc gap-2 px-4 rounded-full'
						style={{
							width: '114px',
							backgroundColor: 'rgba(255, 56, 56, 0.1)',
						}}
						onClick={() => {
							setNotificationTitle('سيتم حذف جميع المستخدمين التي قمت بتحديدهم');
							setActionTitle('DeleteUsers');
						}}
					>
						<IconButton>
							<DeleteIcon
								style={{
									cursor: 'pointer',
									color: 'red',
									fontSize: '1rem',
								}}
							></DeleteIcon>
						</IconButton>
						<h2 className={'font-semibold md:text-[18px] text-[16px]'} style={{ color: '#FF3838' }}>
							حذف
						</h2>
					</div>
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

export default function EnhancedTable({ users, loading, reload, setReload, setUser }) {
	const token = localStorage.getItem('token');
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [userMenuOpenedId, setUserMenuOpenedId] = React.useState(null);
	const [rowAnchorEl, setRowAnchorEl] = React.useState(null);
	const rowsPerPagesCount = [10, 20, 30, 50, 100];
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;

	const handlePagRowsClick = (event) => {
		setRowAnchorEl(event.currentTarget);
	};
	const handleRowMenuClose = () => {
		setRowAnchorEl(null);
	};
	const rowMenuOpen = Boolean(rowAnchorEl);
	const handleOptionsClick = (event) => {
		setAnchorEl(event.currentTarget);
		setUserMenuOpenedId(event.currentTarget.id);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setRowAnchorEl(null);
		setUserMenuOpenedId(null);
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

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = users?.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};


	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.

	const allRows = () => {
		const num = Math.ceil(users?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};
	const deleteItems = () => {

	};

	const deleteUser = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/userdeleteall?id[]=${id}`, {
				headers: {
					"Content-Type": "application/json",
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
	}

	const changeUserStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/userchangeSatusall?id[]=${id}`, {
				headers: {
					"Content-Type": "application/json",
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
	}

	useEffect(() => {
		if (confirm && actionTitle === 'ChangeUsersStatus') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/userchangeSatusall?${queryParams}`, {
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
		if (confirm && actionTitle === 'DeleteUsers') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/userdeleteall?${queryParams}`, {
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
			<EnhancedTableToolbar onClick={deleteItems} numSelected={selected.length} rowCount={users?.length} onSelectAllClick={handleSelectAllClick} />
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={users?.length} />
						<TableBody>
							{loading ?
								(
									<TableRow>
										<TableCell colSpan={6}>
											<CircularLoading />
										</TableCell>
									</TableRow>
								)
								:
								(
									<>
										{stableSort(users, getComparator(order, orderBy))
											?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											?.map((row, index) => {
												const isItemSelected = isSelected(row.id);
												const labelId = `enhanced-table-checkbox-${index}`;
												return (
													<TableRow
														hover
														role='checkbox'
														aria-checked={isItemSelected}
														tabIndex={-1}
														key={row.id}
														selected={isItemSelected}
													>
														<TableCell component='th' id={labelId} scope='row'>
															<Button id={index} aria-controls={userMenuOpenedId ? 'basic-menu' : undefined} aria-haspopup='true' aria-expanded={userMenuOpenedId ? 'true' : undefined} onClick={handleOptionsClick}>
																<BsThreeDotsVertical
																	onClick={() => { }}
																	style={{
																		cursor: 'pointer',
																		color: '#000000',
																		fontSize: '1.3rem',
																	}}
																></BsThreeDotsVertical>
															</Button>
															<Menu
																id='basic-menu'
																anchorEl={anchorEl}
																open={userMenuOpenedId == index}
																onClose={handleClose}
																MenuListProps={{
																	'aria-labelledby': 'basic-button',
																}}
															>
																<MenuItem
																	className='text-lg font-normal '
																	onClick={() => {
																		setUser(row, false);
																		handleClose();
																	}}
																>
																	<Box
																		sx={{
																			cursor: 'pointer',
																			'& svg': {
																				fill: '#67747B',
																			},
																		}}
																	>
																		<DocumentIcon className={` w-5 h-5 ml-2 ${styles.detailIcon}`} />
																	</Box>
																	التفاصيل
																</MenuItem>

																<MenuItem
																	className='text-lg font-normal '
																	onClick={() => {
																		setUser(row, true);
																		handleClose();
																	}}
																>
																	<EditIcon
																		className={` w-5 h-5 ml-2 ${styles.editIcon}`}

																	/>
																	تعديل
																</MenuItem>
																<MenuItem onClick={() => deleteUser(row?.id)} className='text-lg font-normal '>
																	<DeleteIcon className={` w-5 h-5 ml-2 ${styles.deleteIcon}`} />
																	حذف
																</MenuItem>
															</Menu>
														</TableCell>
														<TableCell align='right'>
															<div className=''>
																<Switch
																	onChange={() => changeUserStatus(row?.id)}
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
																	checked={row?.status === 'نشط' ? true : false}
																/>
															</div>
														</TableCell>
														<TableCell align='right'>
															<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.role?.name}</h2>
														</TableCell>

														<TableCell align='right'>
															<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.email}</h2>
														</TableCell>
														<TableCell align='right'>
															<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.user_name}</h2>
														</TableCell>


														<TableCell align='right' className='font-normal text-lg'>
															{(index + 1).toLocaleString('en-US', {
																minimumIntegerDigits: 2,
																useGrouping: false,
															})}
														</TableCell>
														<TableCell padding='none' align={'right'}>
															<Checkbox
																checkedIcon={<CheckedSquare />}
																sx={{
																	color: '#011723',
																	'& .MuiSvgIcon-root': {
																		color: '#011723',
																	},
																}}
																checked={isItemSelected}
																onClick={(event) => handleClick(event, row.id)}
																inputProps={{
																	'aria-labelledby': labelId,
																}}
															/>
														</TableCell>
													</TableRow>
												);
											})}
									</>
								)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className='flex md:flex-row flex-col gap-y-4 items-center justify-between'>
				<div className='flex items-center gap-2 p-2 rounded-md' style={{ border: '1px solid #2D62ED' }}>
					<div
						id='basic-button'
						aria-controls={rowMenuOpen ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={rowMenuOpen ? 'true' : undefined}
						onClick={handlePagRowsClick}
						className={'h-9 w-9 rounded-sm flex justify-center items-center cursor-pointer'}
						style={{ backgroundColor: '#0099FB' }}
					>
						<MdOutlineKeyboardArrowDown color='#fff' fontSize={'1.5rem'}></MdOutlineKeyboardArrowDown>
					</div>
					<Menu
						id='basic-menu'
						anchorEl={rowAnchorEl}
						open={rowMenuOpen}
						onClose={handleRowMenuClose}
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
