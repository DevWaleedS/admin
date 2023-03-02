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
import { visuallyHidden } from '@mui/utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NotificationContext } from "../../../store/NotificationProvider";
import Context from '../../../store/context';

// Import icons and images
import { ReactComponent as EditIcon } from '../../../assets/Icons/editt 2.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as SwitchIcon } from '../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import axios from "axios";
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import getDate from '../../../helpers/getDate';

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
		id: 'active',
		numeric: true,
		disablePadding: false,
		label: 'الحالة',
		sort: true,
	},
	{
		id: 'createdDate',
		numeric: true,
		disablePadding: false,
		label: 'تاريخ الانشاء',
		sort: true,
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'الناشر',
	},

	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'العنوان',
	},

	{
		id: 'number',
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
		<TableHead sx={{ backgroundColor: 'hsla(242, 92%, 81%, 0.4)' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='text-lg font-medium'
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							width: headCell.width ? headCell.width : 'auto',
							color: '#02466A',
							whiteSpace: 'nowrap'
						}}
					>
						{headCell.sort && (
							<TableSortLabel
								IconComponent={() => {
									return <SortIcon style={{ marginRight: '8px' }} />;
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
};

function EnhancedTableToolbar(props) {
	const { numSelected,  rowCount, onSelectAllClick } = props;
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
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<div
						className='fcc gap-4 px-4 rounded-full'
						style={{
							width: '114px',
							backgroundColor: 'rgba(255, 159, 26, 0.04)',
						}}
						onClick={() => {
							setNotificationTitle('سيتم تعطيل جميع الصفحات التي قمت بتحديدها');
							setActionTitle('ChangeStatus');
						}}
					>
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
						<h2 className={'font-semibold md:text-[18px] text-[16px]'} style={{ color: '#FF9F1A' }}>
							تعطيل
						</h2>
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
							setNotificationTitle('سيتم حذف جميع الصفحات التي قمت بتحديدها');
							setActionTitle('Delete');
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

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ fetchedData, loading, reload, setReload,onEditPage }) {
	const token = localStorage.getItem('token');
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(15);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm,actionTitle,setActionTitle } = NotificationStore;

	const rowsPerPagesCount = [10, 20, 30, 50, 100];
	const handleRowsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = fetchedData?.data?.pages?.map((n) => n.id);
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

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.pages?.length) : 0;

	const allRows = () => {
		const num = Math.ceil(fetchedData?.data?.pages?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};

	// change status for single item
	const changePageStatus = (id) => {
		axios
		.get(`https://backend.atlbha.com/api/Admin/pagechangeSatusall?id[]=${id}`, {
		  headers: {
			"Content-Type": "application/json",
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
	}

	// delete single item
	const deletePage = (id) =>{
		axios
      .get(`https://backend.atlbha.com/api/Admin/pagedeleteall?id[]=${id}`, {
        headers: {
          "Content-Type": "application/json",
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
	}

	// delete all and change all status function 
	useEffect(() => {
		if (confirm && actionTitle === 'ChangeStatus') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/pagechangeSatusall?${queryParams}`, {
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
				.get(`https://backend.atlbha.com/api/Admin/pagedeleteall?${queryParams}`, {
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
			<EnhancedTableToolbar numSelected={selected.length} rowCount={fetchedData?.data?.pages?.length} onSelectAllClick={handleSelectAllClick} />
			<Paper
				sx={{
					width: '100%',
					mb: 5,
					backgroundColor: 'transparent',
					boxShadow: 'none',
				}}
			>
				<TableContainer>
					<Table sx={{ minWidth: 750, backgroundColor: '#fff' }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={fetchedData?.data?.pages?.length} />
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
										{stableSort(fetchedData?.data?.pages, getComparator(order, orderBy))
											?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											?.map((row, index) => {
												const isItemSelected = isSelected(row?.id);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow
														hover
												
														role='checkbox'
														aria-checked={isItemSelected}
														tabIndex={-1}
														key={index}
														selected={isItemSelected}
														sx={{
															'& .MuiTableCell-root': {
															
															},
														}}
													>
														<TableCell sx={{ p: '16px 8px' }} component='th' id={labelId} scope='row'>
															<div className='flex items-center gap-2'>
																<Switch
																	onChange={() => changePageStatus(row?.id)}
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
																	checked={row?.status === 'تم النشر' ? true : false}
																/>
																<DeleteIcon
																	onClick={() => deletePage(row?.id)}
																	style={{
																		cursor: 'pointer',
																		color: 'red',
																		fontSize: '1.2rem',
																	}}
																></DeleteIcon>
																<EditIcon
																	onClick={()=>onEditPage(row)}
																	style={{
																		cursor: 'pointer',
																		fontSize: '1.2rem',
																	}}
																></EditIcon>
															</div>
														</TableCell>
														<TableCell align='center'>
															<div
																className='w-21 h-full py-1 rounded-2xl text-lg font-normal'
																style={{
																	backgroundColor: row?.status === 'تم النشر' ? '#3AE37466' : '#D3D3D3',
																	marginLeft: 'auto',
																}}
															>
																<h2 className='md:text-[18px] text-[16px] whitespace-nowrap'>{row?.status}</h2>
															</div>
														</TableCell>
														<TableCell align='right'>
															<div className=''>
																<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{getDate(row?.created_at)}</h2>
															</div>
														</TableCell>
														<TableCell align='right'>
															<div>
																<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.user?.name}</h2>
															</div>
														</TableCell>

														<TableCell align='right'>
															<div>
																<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.title}</h2>
															</div>
														</TableCell>

														<TableCell align='right' className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>
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
			<div className='flex md:flex-row flex-col items-center justify-between gap-y-4'>
				<div className='md:h-14 h-[45px] flex items-center gap-2 p-2 rounded-md' style={{ border: '1px solid #8D8AD3' }}>
					<div
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleRowsClick}
						className={'h-9 w-9 rounded-sm flex justify-center items-center cursor-pointer'}
						style={{ backgroundColor: open ? '#0099FB' : '#AAA8DD66' }}
					>
						<MdOutlineKeyboardArrowDown color={open ? '#FAFAFA' : '#8D8AD3'} fontSize={'1.5rem'}></MdOutlineKeyboardArrowDown>
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
					<h2 className='font-medium' style={{ color: '#8D8AD3' }}>
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
										backgroundColor: item === page + 1 && '#8D8AD3',
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