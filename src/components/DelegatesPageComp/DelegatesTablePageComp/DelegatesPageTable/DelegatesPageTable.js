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
import Context from '../../../../store/context';
import { NotificationContext } from '../../../../store/NotificationProvider';
import { visuallyHidden } from '@mui/utils';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as EditIcon } from '../../../../assets/Icons/editt 2.svg';
import { ReactComponent as CheckedSquare } from '../../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as BsTrash } from '../../../../assets/Icons/icon-24-delete.svg';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';

import { useNavigate } from 'react-router-dom';

import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { ReactComponent as SortIcon } from '../../../../assets/Icons/icon-24-sort.svg';

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
		label: '??????????????',
		width: '5rem',
	},
	{
		id: 'active',
		numeric: true,
		disablePadding: false,
		label: '????????????',
		sort: true,
	},
	{
		id: 'daysLeft',
		numeric: true,
		disablePadding: false,
		label: '??????????????',
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????????',
	},

	{
		id: 'circle',
		numeric: true,
		disablePadding: false,
		label: '?????? ??????????????',
		sort: true,
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
				{headCells.map((headCell) => (
					<TableCell
						className='md:text-lg text-[16px] font-medium'
						key={headCell.id}
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
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<Tooltip
						onClick={() => {
							setNotificationTitle('???????? ?????? ???????? ???????????????? ???????? ?????? ????????????????');
							setActionTitle('Delete');
					
						}}
			
					>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium md:text-lg text-[16px]'} style={{ color: '#FF3838' }}>
								??????
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
				<h2 className='font-medium md:text-lg text-[16px] whitespace-nowrap'>?????????? ????????</h2>
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
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

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
			const newSelected = fetchedData?.data?.marketers?.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// delete single item
	const deleteMarketer = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/marketerdeleteall?id[]=${id}`, {
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

	// delete all function
	useEffect(() => {
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/marketerdeleteall?${queryParams}`, {
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

	const handleClick = (event, name) => {
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

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.marketers?.length) : 0;

	const allRows = () => {
		const num = Math.ceil(fetchedData?.data?.marketers?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};
	return (
		<Box sx={{ width: '100%' }}>
			<Paper
				sx={{
					width: '100%',
					mb: 8,
					backgroundColor: 'transparent',
					boxShadow: 'none',
				}}
			>
				<EnhancedTableToolbar numSelected={selected.length} rowCount={fetchedData?.data?.marketers?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750, backgroundColor: '#fff' }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={fetchedData?.data?.marketers?.length}
						/>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={6}>
										<CircularLoading />
									</TableCell>
								</TableRow>
							) : (
								<Fragment>
									{stableSort(fetchedData?.data?.marketers, getComparator(order, orderBy))
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										?.map((row, index) => {
											const isItemSelected = isSelected(row?.id);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow hover role='checkbox' tabIndex={-1} aria-checked={isItemSelected}
													key={row?.id} selected={isItemSelected}>
													<TableCell component='th' id={labelId} scope='row'>
														<div className='flex items-center gap-2'>
															<BsTrash
																onClick={() => {
																	deleteMarketer(row?.id);
																}}
																style={{
																	cursor: 'pointer',
																	color: 'red',
																	fontSize: '1rem',
																}}
															></BsTrash>
															<EditIcon
																className='cursor-pointer'
																onClick={() => {
																	navigate(`/${row?.id}/??????????_??????????`);
																}}
																width={'20px'}
															></EditIcon>
														</div>
													</TableCell>
													<TableCell align='center' className='font-normal text-base'>
														<div
															className='w-20 h-full py-1 rounded-xl'
															style={{
																backgroundColor: row?.status === '??????' ? '#3AE37466' : '#ECECEC',
																marginLeft: 'auto',
															}}
														>
															<h2
																className='md:text-lg text-[16px]'
																style={{
																	color: row?.status === '??????' ? '#011723' : '#67747B',
																}}
															>
																{row?.status === '??????' ? '??????' : '?????? ??????'}
															</h2>
														</div>
													</TableCell>

													<TableCell align='right'>
														<div>
															<h2 className='font-normal md:text-lg text-[16px] whitespace-normal'>{row?.city?.name}</h2>
														</div>
													</TableCell>

													<TableCell align='right'>
														<div>
															<h2 className='font-normal md:text-lg text-[16px] whitespace-normal'>{row?.user_name}</h2>
														</div>
													</TableCell>
													<TableCell align='right'>
														<h2 
														onClick={() => {
															navigate(`/${row?.id}/????????????_??????????????`);
														}}
														className='inline font-normal md:text-lg text-[16px] whitespace-normal'>{row?.name}</h2>
													</TableCell>
													<TableCell align='right' className='font-normal md:text-lg text-[16px] whitespace-normal'>
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
															onClick={(event) => handleClick(event, index)}
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
			<div className='flex md:flex-row flex-col items-center justify-between px-8 gap-y-4'>
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
