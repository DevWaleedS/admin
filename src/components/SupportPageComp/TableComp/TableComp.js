import React,{useContext} from 'react';
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
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Gift } from '../../../assets/Icons/index';
import { visuallyHidden } from '@mui/utils';
import styles from './TableComp.module.css';
import { NotificationContext } from "../../../store/NotificationProvider";
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as BsTrash } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as SwitchIcon } from '../../../assets/Icons/icon-38-switch.svg';
import { ReactComponent as DocumentIcon } from '../../../assets/Icons/document_text_outlined.svg';

import { FaCheck } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';
import { IoDocumentTextOutline } from 'react-icons/io5';

import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

function createData(id, state, stateNumber, connectionType, variety, marketName, complaintDate, phoneNumber, complaintAddress, complaintContent) {
	return {
		id,
		state,
		stateNumber,
		connectionType,
		variety,
		marketName,
		complaintDate,
		phoneNumber,
		complaintAddress,
		complaintContent,
	};
}

const rows = [
	createData(1, 'منتهية', '23', 'شكوى', 'هدايا وألعاب', 'أمازون', '20/08/2022', '9663222335', 'خدمات السيرفر', 'رجاء المساعدة'),
	createData(2, 'غير منتهية', '35', 'اقتراح', 'مستلزمات طبية', 'صحتى', '21/08/2022', '9669222335', 'خدمات السيرفر', 'تقديم خدمة أفضل'),
	createData(3, 'قيد المعالجة', '40', 'استفسار', 'الكتروتيات', 'تسعة', '26/08/2022', '9669228335', 'السحب', 'كيفية سحب الأموال'),
	createData(4, 'منتهية', '23', 'شكوى', 'هدايا وألعاب', 'أمازون', '20/08/2022', '9663222335', 'خدمات السيرفر', 'رجاء المساعدة'),
	createData(5, 'غير منتهية', '35', 'اقتراح', 'مستلزمات طبية', 'صحتى', '21/08/2022', '9669222335', 'خدمات السيرفر', 'تقديم خدمة أفضل'),
	createData(6, 'قيد المعالجة', '40', 'استفسار', 'الكتروتيات', 'تسعة', '26/08/2022', '9669228335', 'السحب', 'كيفية سحب الأموال'),
	createData(7, 'منتهية', '23', 'شكوى', 'هدايا وألعاب', 'أمازون', '20/08/2022', '9663222335', 'خدمات السيرفر', 'رجاء المساعدة'),
	createData(8, 'غير منتهية', '35', 'اقتراح', 'مستلزمات طبية', 'صحتى', '21/08/2022', '9669222335', 'خدمات السيرفر', 'تقديم خدمة أفضل'),
	createData(9, 'قيد المعالجة', '40', 'استفسار', 'الكتروتيات', 'تسعة', '26/08/2022', '9669228335', 'السحب', 'كيفية سحب الأموال'),
	createData(10, 'منتهية', '23', 'شكوى', 'هدايا وألعاب', 'أمازون', '20/08/2022', '9663222335', 'خدمات السيرفر', 'رجاء المساعدة'),
	createData(11, 'غير منتهية', '35', 'اقتراح', 'مستلزمات طبية', 'صحتى', '21/08/2022', '9669222335', 'خدمات السيرفر', 'تقديم خدمة أفضل'),
	createData(12, 'قيد المعالجة', '40', 'استفسار', 'الكتروتيات', 'تسعة', '26/08/2022', '9669228335', 'السحب', 'كيفية سحب الأموال'),
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
		label: 'نوع الاتصال',
		sort: true,
	},
	{
		id: 'opened',
		numeric: true,
		disablePadding: false,
		label: 'التصنيف',
		sort: true,
	},
	{
		id: 'activity',
		numeric: true,
		disablePadding: false,
		label: 'اسم المتجر',
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
		<TableHead sx={{ backgroundColor: '#5EBFF2', borderRadius: '4px' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className='text-lg font-medium '
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
						onClick={()=>{
							setNotificationTitle('سيتم تعطيل جميع الشكاوى والاستفسارات التي قمت بتحديدهم');
							setActionTitle('تم تعطيل الشكاوى والاستفسارات بنجاح');
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
		
	

			<div className='flex items-center'>
				<h2 className='font-medium'>تحديد الكل</h2>
				<Checkbox
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
	const [rowsPerPage, setRowsPerPage] = React.useState(9);
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
	const handleOptionsClick = (event) => {
		setAnchorEl(event.currentTarget);
		setUserMenuOpenedId(event.currentTarget.id);
	};
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

	const isSelected = (name) => selected.indexOf(name) !== -1;

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
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar onClick={deleteItems} numSelected={selected.length} rowCount={data.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data.length} />
						<TableBody>
							{stableSort(data, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;
									const findStateChanges = stateChanges.find((i) => row.state == i.value);
									return (
										<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
											<TableCell component='th' id={labelId} scope='row'>
												<Button id={index} aria-controls={userMenuOpenedId ? 'basic-menu' : undefined} aria-haspopup='true' aria-expanded={userMenuOpenedId ? 'true' : undefined} onClick={handleOptionsClick}>
													<BsThreeDotsVertical
														onClick={() => {}}
														style={{
															cursor: 'pointer',
															color: '#000000',
															fontSize: '1.2rem',
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
														className='text-lg font-normal'
														onClick={() => {
															setUser(row);
															handleClose();
														}}
													>
														<DocumentIcon
															className={`w-5 h-5 ml-2 ${styles.deleteIcon} `}
															style={{
																cursor: 'pointer',
																color: '#67747B',
															}}
														></DocumentIcon>
														التفاصيل
													</MenuItem>
													<MenuItem onClick={handleClose} className='text-lg font-normal'>
														<BsTrash
															className={`w-5 h-5 ml-2 ${styles.deleteIcon}`}
															style={{
																cursor: 'pointer',
																color: '#67747B',
															}}
														></BsTrash>
														حذف
													</MenuItem>
												</Menu>
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
													<div className={`w-4 h-4 flex items-center justify-center ${styles.icons}`}>{findStateChanges?.icon} </div>
												</div>
											</TableCell>
											<TableCell align='right'>
												<h2 className='font-normal text-lg'>{row.connectionType}</h2>
											</TableCell>

											<TableCell align='right' sx={{ display: 'flex', gap: '0.5rem', p: '24px 0' }}>
												<img src={Gift} alt='' />
												<h2 className='font-normal text-lg'>{row.variety}</h2>
											</TableCell>
											<TableCell align='right'>
												<h2 className='font-normal text-lg'>{row.marketName}</h2>
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
			<div className='flex items-center justify-between'>
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
