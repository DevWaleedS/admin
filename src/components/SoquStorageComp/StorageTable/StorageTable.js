import React, { useEffect, useContext, Fragment } from 'react';
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
import Zoom from '@mui/material/Zoom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Context from '../../../store/context';
import axios from "axios";
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

// Import icons and images 
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as TrashICon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/editt 2.svg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';
import { NotificationContext } from "../../../store/NotificationProvider";


const BootstrapTooltip = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: '#3AE374',
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#3AE374',
	},
}));

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
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: '??????????????',
		width: '5rem',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: '?????? ????????????',
		sort: false,
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: '????????????',
		sort: true,
	},
	{
		id: 'activity',
		numeric: true,
		disablePadding: false,
		label: '??????????????',
		sort: true,
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: '?????? ????????????',
	},
	{
		id: 'productNumber',
		numeric: true,
		disablePadding: false,
		label: '  (SKU) ?????? ',
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
		<TableHead sx={{ backgroundColor: 'rgba(209,243,221)' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='md:text-[18px] text-[16px] font-medium'
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
								{!orderBy === headCell.id ? <Box component='span'>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box> : null}
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
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<Tooltip
						onClick={() => {
							setNotificationTitle('???????? ?????? ???????? ???????????????? ???????? ?????? ????????????????');
							setActionTitle('Delete');
							onClick();
						}}
						title='Delete'>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium md:text-[18px] text-[16px]'} style={{ color: '#FF3838' }}>
								??????
							</h2>
							<IconButton>
								<TrashICon
									style={{
										cursor: 'pointer',
										color: 'red',
										fontSize: '1rem',
									}}
								></TrashICon>
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

export default function EnhancedTable({ data, loading, reload, setReload, editProduct }) {

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

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

	const deleteProduct = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/stockdeleteall?id[]=${id}`, {
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

	const addToStore = (id) => {
		axios
			.post(`https://backend.atlbha.com/api/Admin/addToStore/${id}`, {
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
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/stockdeleteall?${queryParams}`, {
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
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} rowCount={data?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data?.length} />
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={9}>
										<CircularLoading />
									</TableCell>
								</TableRow>
							) : (
								<Fragment>
									{stableSort(data, getComparator(order, orderBy))
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										?.map((row, index) => {
											const isItemSelected = isSelected(row?.id);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
													<TableCell component='th' id={labelId} scope='row'>
														<div className='flex items-center gap-2'>
															<TrashICon
																onClick={() => { deleteProduct(row?.id) }}
																style={{
																	cursor: 'pointer',
																	color: 'red',
																	fontSize: '1.2rem',
																}}
															></TrashICon>
															<EditIcon
																className='cursor-pointer'
																onClick={() => {
																	editProduct(row);
																}}
																width={'20px'}
															></EditIcon>

															<BootstrapTooltip
																// style={{ backgroundColor: "#3AE374" }}
																className={'p-0'}
																TransitionProps={{ timeout: 300 }}
																TransitionComponent={Zoom}
																title='?????? ??????????'
																placement='top-start'
																onClick={() => { addToStore(row?.id) }}
															>
																<IconButton>
																	<MdOutlineAddBox color='#1DBBBE' size={'20px'}></MdOutlineAddBox>
																</IconButton>
															</BootstrapTooltip>
														</div>
													</TableCell>
													<TableCell align='center'>
														<div className=''>
															<h2 dir='rtl' className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>
																<span className='ml-1'>{row?.selling_price}</span>
																<span>??.??</span>
															</h2>
														</div>
													</TableCell>
													<TableCell align='right'>
														<div>
															<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row?.quantity}</h2>
														</div>
													</TableCell>
													<TableCell align='right' sx={{ display: 'flex', gap: '0.5rem', p: '24px 0' }}>
														<img className='w-[25px] h-[25px]' src={row.category?.icon} alt={row?.name} />
														<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row.category?.name}</h2>
													</TableCell>
													<TableCell align='right' className='min-w-[240px]'>
														<div className='flex items-center justify-end gap-3'>
															<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row?.name}</h2>
															<img className='w-[40px] h-[40px] rounded-full' src={row?.cover} alt={row?.name} />
														</div>
													</TableCell>
													<TableCell align='right' className='text-lg font-normal'>
														<h2 className='inline md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row?.sku}</h2>
													</TableCell>
													<TableCell align='right' className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>
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
			<div className='flex md:flex-row flex-col items-center justify-between gap-y-4'>
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
			</div>
		</Box>
	);
}
