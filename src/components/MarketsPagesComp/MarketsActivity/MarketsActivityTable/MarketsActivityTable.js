import React, { useContext, useEffect } from 'react';
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
import { visuallyHidden } from '@mui/utils';
import EditActivity from '../EditActivity/EditActivity';
import { NotificationContext } from "../../../../store/NotificationProvider";
import Context from '../../../../store/context';
import { MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { ReactComponent as EditIcon } from '../../../../assets/Icons/editt 2.svg';
import { ReactComponent as TrashICon } from '../../../../assets/Icons/icon-24-delete.svg';
import axios from "axios";
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';

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
		id: 'situation',
		numeric: false,
		disablePadding: false,
		label: 'الإجراء',
		width: '5rem',
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'اسم المتجر',
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
		<TableHead sx={{ backgroundColor: '#ebebebd9' }}>
			<TableRow>
				{headCells.map((headCell,index) => (
					<TableCell
						key={index}
						align={headCell.numeric ? 'right' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							width: headCell.width ? headCell.width : 'auto',
							fontSize: '1rem',
						}}
					>
						{headCell.sort && (
							<TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
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
			<div className='flex gap-8 items-center'>
				{numSelected > 0 && (
					<Tooltip title='Delete' 
						onClick={() => {
						setNotificationTitle('سيتم حذف جميع الانشطة التي قمت بتحديدها');
						setActionTitle('Delete');
					}}>
						<div className='flex flex-row items-center gap-2 px-2 rounded-full' style={{ width: '134px' }}>
							<h2 className={'font-medium md:text-[16px] text-[14px]'} style={{ color: '#FF3838' }}>
								حذف الكل
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
					sx={{
						color: '#1DBBBE',
						paddingRight: '0',
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

export default function EnhancedTable({ fetchedData, loading, reload, setReload, editProduct }) {
	const token = localStorage.getItem('token');
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm,actionTitle,setActionTitle } = NotificationStore;
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [showAddActivity, setShowAddActivity] = React.useState(false);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const open = Boolean(anchorEl);
	const rowsPerPagesCount = [5, 10, 25, 50, 100];
	const handleRowsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};



	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = fetchedData?.data?.activities?.map((n) => n.id);
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
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.activities?.length) : 0;
	const allRows = () => {
		const num = Math.ceil(fetchedData?.data?.activities?.length / rowsPerPage);
		const arr = [];
		for (let index = 0; index < num; index++) {
			arr.push(index + 1);
		}
		return arr;
	};


	// Delete single item 
	const deleteActivity = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/activitydeleteall?id[]=${id}`, {
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
	// Delete all items
	useEffect(() => {
		if (confirm && actionTitle==='Delete') {
			const queryParams = selected.map(id => `id[]=${id}`).join('&');
			axios
				.get(`https://backend.atlbha.com/api/Admin/activitydeleteall?${queryParams}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res?.data?.success === true && res?.data?.data?.status === 200) {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(prev => !prev);
					} else {
						setEndActionTitle(res?.data?.message?.ar);
						setReload(prev => !prev);
						
					}
				});
			setActionTitle(null);
			setConfirm(false);
		}
	}, [confirm]);

	return (
		<Box sx={{ width: '100%', mt: '0rem' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected?.length} rowCount={fetchedData?.data?.activities?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table className='md:min-w-[750px] min-w-full' aria-labelledby='tableTitle' size={'medium'}>
						<TableBody>
							{loading ?
								(
									<TableRow>
										<TableCell colSpan={3}>
											<CircularLoading />
										</TableCell>
									</TableRow>
								)
								:
								(
									<>
										{stableSort(fetchedData?.data?.activities, getComparator(order, orderBy))
											?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map((row) => {
												const isItemSelected = isSelected(row.id);
												const labelId = `enhanced-table-checkbox-${row.id}`;

												return (
													<TableRow
														hover
														role='checkbox'
														aria-checked={isItemSelected}
														tabIndex={-1}
														key={row.id}
														selected={isItemSelected}
														className='flex flex-row justify-between'
														style={{ borderBottom: '1px solid #e0e0e0' }}
													>
														<TableCell id={labelId} className="flex flex-row items-center border-none">
															<div className='flex items-center gap-2'>
																<TrashICon
																	onClick={() => deleteActivity(row.id)}
																	style={{
																		cursor: 'pointer',
																		color: 'red',
																		fontSize: '1rem',
																	}}
																></TrashICon>
																<EditIcon
																	onClick={() => {
																		editProduct(row);
																	}}
																	style={{
																		cursor: 'pointer',
																		fontSize: '1rem',
																	}}
																/>
																{showAddActivity && (
																	<EditActivity
																		cancel={() => {
																			setShowAddActivity(false);
																		}}
																	></EditActivity>
																)}
															</div>
														</TableCell>
														<TableCell className="border-none">
															<div className='flex items-center'>
																<p className='text-[#ADB5B9] text-base font-normal mr-3'>({row.storeCount} متجر )</p>
																<h2 className='font-medium text-lg'>{row.name}</h2>
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
															</div>
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
												<TableCell colSpan={6}>لاتوجد بيانات</TableCell>
											</TableRow>
										)}
									</>
								)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className='flex items-center justify-between'>
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
