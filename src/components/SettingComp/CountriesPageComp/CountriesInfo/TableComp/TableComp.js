import React, { useEffect, useContext } from 'react';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NotificationContext } from "../../../../../store/NotificationProvider";
import { visuallyHidden } from '@mui/utils';
import { ReactComponent as SortIcon } from '../../../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as BsTrash } from '../../../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/Icons/editt 2.svg';
import { ReactComponent as CheckedSquare } from '../../../../../assets/Icons/icon-24-square checkmark.svg';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import Context from '../../../../../store/context';
import CircularLoading from '../../../../../UI/CircularLoading/CircularLoading';
import axios from "axios";

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
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????',
	},
	{
		id: 'opened',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????',
	},

	{
		id: 'name',
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
		<TableHead sx={{ backgroundColor: '#eaecd0' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='font-medium md:text-[18px] text-[16px]'
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
				<TableCell></TableCell>
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
	const { numSelected, onClick, rowCount, onSelectAllClick } = props;
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
			<div className='fcc gap-2 px-4 rounded-full' style={{ backgroundColor: 'rgba(255, 159, 26, 0.04)' }}></div>
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<Tooltip
						onClick={() => {
							setNotificationTitle('???????? ?????? ???????? ?????????? ???????? ?????? ????????????????');
							setActionTitle('Delete');
						}}
						title='Delete'>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium md:text-[18px] text-[16px]'} style={{ color: '#FF3838' }}>
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
				<h2 className='font-medium md:text-[18px] text-[16px]'>?????????? ????????</h2>
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

export default function EnhancedTable({ data, loading, reload, setReload, setDataRow, setShowCountry }) {
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

	const handleClose = () => {
		setAnchorEl(null);
		setRowAnchorEl(null);
		setUserMenuOpenedId(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = data?.map((n) => n.id);
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
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;
	const allRows = () => {
		const num = Math.ceil(data?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};

	const deleteCountry = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/countryedeleteall?id[]=${id}`, {
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
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map(id => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/countryedeleteall?${queryParams}`, {
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
			setConfirm(false);
			setActionTitle(null);
		}
	}, [confirm]);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 40 }}>
				<EnhancedTableToolbar numSelected={selected.length} rowCount={data?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data?.length} />
						<TableBody>
							{loading ?
								(
									<TableRow>
										<TableCell colSpan={5}>
											<CircularLoading />
										</TableCell>
									</TableRow>
								)
								:
								(
									<>
										{stableSort(data, getComparator(order, orderBy))
											?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											?.map((row, index) => {
												const isItemSelected = isSelected(row.id);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
														<TableCell component='th' id={labelId} scope='row'>
															<div className='flex items-center gap-2'>
																<BsTrash
																	onClick={() => deleteCountry(row?.id)}
																	style={{
																		cursor: 'pointer',
																		color: 'red',
																		fontSize: '1.2rem',
																	}}
																></BsTrash>
																<EditIcon
																	onClick={() => {
																		setDataRow(row);
																	}}
																	style={{
																		cursor: 'pointer',
																		fontSize: '1.2rem',
																	}}
																/>
															</div>
														</TableCell>

														<TableCell align='right'>
															<h2
																onClick={() => {
																	setShowCountry(row);
																}}
																className='font-normal md:text-[18px] text-[16px] whitespace-nowrap cursor-pointer'>{row?.name}</h2>
														</TableCell>

														<TableCell align='right'>
															<h2 className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.code}</h2>
														</TableCell>

														<TableCell align='right' className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>
															{(index + 1).toLocaleString('en-US', {
																minimumIntegerDigits: 2,
																useGrouping: false,
															})}
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
																onClick={(event) => handleClick(event, row.id)}
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
				<div className='flex items-center gap-2 p-2 rounded-md' style={{ border: '1px solid rgba(182, 190, 52, 1)' }}>
					<div
						id='basic-button'
						aria-controls={rowMenuOpen ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={rowMenuOpen ? 'true' : undefined}
						onClick={handlePagRowsClick}
						className={'h-9 w-9 rounded-sm flex justify-center items-center cursor-pointer'}
						style={{ backgroundColor: 'rgba(234, 236, 208, 1)' }}
					>
						<MdOutlineKeyboardArrowDown color='rgba(182, 190, 52, 1)' fontSize={'1.5rem'}></MdOutlineKeyboardArrowDown>
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
					<h2 className='font-medium' style={{ color: 'rgba(182, 190, 52, 1)' }}>
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
										backgroundColor: item === page + 1 && '#B6BE34',
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
