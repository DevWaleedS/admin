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
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// Import icons and images 
import { ReactComponent as SortIcon } from '../../../assets/Icons/icon-24-sort.svg';
import { ReactComponent as TrashICon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/editt 2.svg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Gift, CarImg, CameraImg, ShoesImg,Delete } from '../../../assets/Icons/index';
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

function createData(name, activity, quantity, price, sku, icon) {
	return {
		name,
		activity,
		quantity,
		price,
		sku,
		icon,
	};
}

const rows = [
	createData('سماعة هيدفون أصلي', 'الكترونيات', 200, 28, 151, CarImg),
	createData('عطر خليجي فخم', 'عطور', 340, 45, 48, CameraImg),
	createData('سيارة تحكم ريموت', 'هدايا وألعاب', 180, 55, 47, ShoesImg),
	createData('منتج1', 'الكترونيات', 454, 28, 151, CarImg),
	createData('منتج2', 'عطور', 54, 45, 48, CameraImg),
	createData('منتج3', 'هدايا وألعاب', 452, 55, 47, ShoesImg),
	createData('منتج47', 'الكترونيات', 462, 28, 151, CarImg),
	createData('منتج5', 'عطور', 264, 45, 48, CameraImg),
	createData('منتج6', 'هدايا وألعاب', 426, 55, 47, ShoesImg),
	createData('منتج17', 'الكترونيات', 426, 28, 151, CarImg),
	createData('منتج16', 'عطور', 426, 45, 48, CameraImg),
	createData('منتج159', 'هدايا وألعاب', 246, 55, 47, ShoesImg),
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: 'الإجراء',
		width: '5rem',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'سعر الوحدة',
		sort: false,
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'الكمية',
		sort: true,
	},
	{
		id: 'activity',
		numeric: true,
		disablePadding: false,
		label: 'التصنيف',
		sort: true,
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'اسم المنتج',
	},
	{
		id: 'productNumber',
		numeric: true,
		disablePadding: false,
		label: '  (SKU) رقم ',
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
							whiteSpace:'nowrap'
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
			<div className='flex gap-2 items-center'>
				{numSelected > 0 && (
					<Tooltip 
						onClick={()=>{
							setNotificationTitle('سيتم حذف جميع المنتجات التي قمت بتحديدها');
							setActionTitle('تم حذف المنتجات بنجاح');
							onClick();
						}} 
						title='Delete'>
						<div className='fcc gap-2 px-4 rounded-full' style={{ width: '114px', backgroundColor: '#FF38381A' }}>
							<h2 className={'font-medium md:text-[18px] text-[16px]'} style={{ color: '#FF3838' }}>
								حذف
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
				<h2 className='font-medium md:text-[18px] text-[16px]'>تحديد الكل</h2>
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

export default function EnhancedTable({ editProduct }) {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [data, setData] = React.useState(rows);
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
			const newSelected = data.map((n) => n.name);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	const deleteItems = () => {
		const array = [...data];
		selected.forEach((item, idx) => {
			const findIndex = array.findIndex((i) => item === i.name);
			array.splice(findIndex, 1);
		});
		setData(array);
		setSelected([]);
	};
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
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar onClick={deleteItems} numSelected={selected.length} rowCount={data.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data.length} />
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
							{stableSort(data, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
											<TableCell component='th' id={labelId} scope='row'>
												<div className='flex items-center gap-2'>
													<TrashICon
														onClick={() => {
															const findIndex = data.findIndex((item) => item.name === row.name);
															const arr = [...data];
															arr.splice(findIndex, 1);
															setData(arr);
														}}
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
														title='اضف للسوق'
														placement='top-start'
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
														<span className='ml-1'>{row.price}</span>
														<span>ر.س</span>
													</h2>
												</div>
											</TableCell>
											<TableCell align='right'>
												<div>
													<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row.quantity}</h2>
												</div>
											</TableCell>

											<TableCell align='right' sx={{ display: 'flex', gap: '0.5rem', p: '24px 0' }}>
												<img src={Gift} alt='' />
												<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row.activity}</h2>
											</TableCell>
											<TableCell align='right' className='min-w-[240px]'>
												<div className='flex items-center justify-end gap-3'>
													<h2 className='md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row.name}</h2>
													<img src={row.icon} alt='' />
												</div>
											</TableCell>
											<TableCell align='right' className='text-lg font-normal'>
												<h2 className='inline md:text-[18px] text-[16px] font-normal whitespace-nowrap'>{row.sku}</h2>
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
													onClick={(event) => handleClick(event, row.name)}
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
						عدد الصفوف
					</h2>
				</div>
			</div>
		</Box>
	);
}
