import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './TableComp.module.css';
import { NotificationContext } from "../../../store/NotificationProvider";
import { visuallyHidden } from '@mui/utils';
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as NewIcon } from '../../../assets/Icons/new-svgrepo-com.svg';
import { ReactComponent as BsTrash } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as InfoIcon } from '../../../assets/Icons/icon-24-actions-info_outined.svg';
import { ReactComponent as SwitchIcon } from '../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { FaCheck } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';

import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos, MdOutlineKeyboardArrowDown } from 'react-icons/md';

function createData(
	id,
	state,
	orderNumber,
	orderType,
	variety,
	marketLinkAddress,
	packageType,
	email,
	marketType,
	marketName,
	phoneNumber,
	deliveryAddress,
	neighborHood,
	mailAddress,
	deliveryCompany,
	serviceDate
) {
	return {
		id,
		state,
		orderNumber,
		orderType,
		variety,
		marketLinkAddress,
		packageType,
		email,
		marketType,
		marketName,
		phoneNumber,
		deliveryAddress,
		neighborHood,
		mailAddress,
		deliveryCompany,
		serviceDate,
	};
}

const rows = [
	createData(
		1,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		2,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		3,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		4,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		5,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		6,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		7,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		8,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		9,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		10,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		11,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		12,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		13,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		14,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		15,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		16,
		'منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		17,
		'قيد المعالجة',
		'0035',
		'طلب خدمة',
		'ادوات صحية',
		'www.tarshoby.sa',
		'الشاملة',
		'info.tarshoby@gmail.com',
		'متجر',
		'طرشوبى',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
	createData(
		18,
		'غير منتهية',
		'0021',
		'متجر جديد',
		'الكترونيات',
		'www.amazon.utlopha.sa',
		'الشاملة',
		'info.amazon@gmail.com',
		'شركة',
		'أمازون',
		'9663222335',
		'جدة',
		'حى الياسمين',
		'9865',
		'DHL',
		'20/08/2022'
	),
];
const stateChanges = [
	{ value: 'منتهية', color: '#3AE374', icon: <FaCheck fill='#fff' /> },
	{
		value: 'غير منتهية',
		color: '#D3D3D3',
		icon: <BsClockHistory fill='#fff' />,
	},
	{
		value: 'قيد المعالجة',
		color: '#FF9F1A',
		icon: <CgSandClock fill='#fff' />,
	},
];

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
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
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
		label: 'نوع الطلب',
		sort: true,
	},
	{
		id: 'opened',
		numeric: true,
		disablePadding: false,
		label: 'رقم الطلب',
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
		<TableHead sx={{ backgroundColor: '#B6BE34', borderRadius: '4px' }}>
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

							color: '#EFF9FF',
						}}
					>
						{headCell.sort && (
							<TableSortLabel
								sx={{ '& path': { fill: '#EFF9FF' } }}
								IconComponent={() => {
									return <SortIcon fill='#EFF9FF' />;
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
	const { numSelected, onClick, rowCount, onSelectAllClick } = props;
	const NotificationStore = useContext(NotificationContext);
	const { setNotificationTitle,setActionTitle } = NotificationStore;
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
							setNotificationTitle('سيتم تعطيل جميع الطلبات التي قمت بتحديدها');
							setActionTitle('تم تعطيل الطلبات بنجاح');
						}}
					>
						<h2 className={'font-medium'} style={{ color: '#FF9F1A' }}>
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
							setNotificationTitle('سيتم حذف جميع الطلبات التي قمت بتحديدها');
							setActionTitle('تم حذف الطلبات بنجاح');
							onClick();
						}}
						title='Delete'>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium'} style={{ color: '#FF3838' }}>
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
				<h2 className='font-medium'>تحديد الكل</h2>
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

export default function EnhancedTable({ setUser }) {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [data, setData] = React.useState(rows);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [userMenuOpenedId, setUserMenuOpenedId] = React.useState(null);
	const [rowAnchorEl, setRowAnchorEl] = React.useState(null);
	const rowsPerPagesCount = [10, 20, 30, 50, 100];

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
			const newSelected = data.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	const deleteItems = () => {
		const array = [...data];
		selected.forEach((item, idx) => {
			const findIndex = array.findIndex((i) => item === i.id);
			array.splice(findIndex, 1);
		});
		setData(array);
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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const allRows = () => {
		const num = Math.ceil(data.length / rowsPerPage);
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
					mb: '1rem',

					backgroundColor: 'transparent',
					boxShadow: 'none',
				}}
			>
				<EnhancedTableToolbar onClick={deleteItems} numSelected={selected.length} rowCount={data.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer sx={{ backgroundColor: '#fff' }}>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data.length} />
						<TableBody>
							{stableSort(data, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;
									const findStateChanges = stateChanges.find((i) => row.state == i.value);
									const newMarket = row.orderType === 'متجر جديد';
									return (
										<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
											<TableCell component='th' id={labelId} scope='row'>
												<div className='flex items-center gap-2'>
													<BsTrash
														onClick={() => {
															const findIndex = data.findIndex((item) => item.name === row.id);
															const arr = [...data];
															arr.splice(findIndex, 1);
															setData(arr);
														}}
														style={{
															cursor: 'pointer',
															color: 'red',
															fontSize: '1.2rem',
														}}
													></BsTrash>
													<InfoIcon
														onClick={() => {
															setUser(row, newMarket);


														}}
														style={{
															cursor: 'pointer',

															fontSize: '1.2rem',
														}}
													/>
												</div>
											</TableCell>
											<TableCell className='pr-0' align='right' sx={{ '& path': { fill: '#fff' } }}>
												<div
													className={'flex ml-auto gap-2 items-center justify-center rounded-full p-2'}
													style={{
														backgroundColor: findStateChanges?.color,
														width: '131px',
													}}
												>
													<h2 className='font-normal text-base text-slate-50'>{row.state}</h2>
													<div className={`w-4 h-4 flex items-center justify-center ${styles.icons}`}>{findStateChanges?.icon}</div>
												</div>
											</TableCell>

											<TableCell align='right' className='items-center' sx={{ display: 'flex', gap: '0.5rem', p: '24px 0' }}>
												{newMarket && <NewIcon width='1.25rem'></NewIcon>}
												<h2 className='font-normal text-lg'>{row.orderType}</h2>
											</TableCell>
											<TableCell align='right'>
												<h2 className='font-normal text-lg'>{row.orderNumber}</h2>
											</TableCell>

											<TableCell align='right' className='font-normal text-lg'>
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
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className='flex items-center justify-between '>
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
						<MdOutlineKeyboardArrowDown color='#fff' fontSize={'1.5rem'} />
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
					/>

					<div className='flex gap-4'>
						{allRows().map((item, itemIdx) => {
							return (
								<div
									key={itemIdx}
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
