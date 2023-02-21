import React, { useContext, useEffect, Fragment } from 'react';
import axios from 'axios';

import styles from './ServicesTable.module.css';
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

// Icons
import { visuallyHidden } from '@mui/utils';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DeleteIcon } from '../../../assets/Icons/icon-24-delete.svg';
import { ReactComponent as InfoIcon } from '../../../assets/Icons/icon-24-actions-info_outined.svg';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

// Use Context
import Context from '../../../store/context';
import { NotificationContext } from '../../../store/NotificationProvider';


// table head titles
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
		label: 'يتم تنفيذها',
	},
	{
		id: 'rate',
		numeric: true,
		disablePadding: false,
		label: 'اسم الخدمة',
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
		<TableHead sx={{ backgroundColor: '#ebebebd9' }}>
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
							color: '#011723',
							whiteSpace: 'nowrap',
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
					<div
						className='fcc gap-2 px-4 rounded-full'
						style={{
							width: '114px',
							backgroundColor: 'rgba(255, 56, 56, 0.1)',
						}}
						onClick={() => {
							setNotificationTitle('سيتم حذف جميع الخدمات التي قمت بتحديدها');
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
						<h2 className={'font-semibold md:text-[18px] text-[16px] whitespace-nowrap'} style={{ color: '#FF3838' }}>
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

export default function EnhancedTable({ fetchedData, loading, reload, setReload, showdetails }) {
	const token = localStorage.getItem('token');
	const [selected, setSelected] = React.useState([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);
	
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle } = NotificationStore;

	// select all items
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = fetchedData?.data?.Services.map((n) => n.name);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// delete single  item
	const deleteItem = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/servicedeleteall?id[]=${id}`, {
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

	// delete all items
	useEffect(() => {
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');

			axios
				.get(` https://backend.atlbha.com/api/Admin/servicedeleteall?${queryParams}`, {
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
			
		}
		
		setConfirm(false);
		setActionTitle(null);
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

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.Services.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} rowCount={fetchedData?.data?.Services?.length} onSelectAllClick={handleSelectAllClick} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={fetchedData?.data?.Services.length} />
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={9}>
										<CircularLoading />
									</TableCell>
								</TableRow>
							) : (
								<Fragment>
									{fetchedData?.data?.Services.map((row, index) => {
										const isItemSelected = isSelected(row.name);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
											
												role='checkbox'
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.name}
												selected={isItemSelected}
											>
												<TableCell component='th' id={labelId} scope='row'>
													<div className='flex items-center gap-4'>
														<InfoIcon className={styles.info_icon} onClick={() => showdetails(true)}></InfoIcon>
														<DeleteIcon
															onClick={() => deleteItem(row?.id)}
															style={{
																cursor: 'pointer',
																color: 'red',
																fontSize: '1rem',
															}}
														></DeleteIcon>
													</div>
												</TableCell>
												<TableCell align='right'>
													<div className=''>
														<h2 dir='rtl' className='font-normal md:text-[18px] text-[16px] whitespace-nowrap'>
															{row?.pendingServices}
														</h2>
													</div>
												</TableCell>

												<TableCell align='right'>
													<h2 className='inline font-normal md:text-[18px] text-[16px] whitespace-nowrap'>{row?.name}</h2>
												</TableCell>
												<TableCell className='font-normal md:text-[18px] text-[16px] whitespace-nowrap' align='right'>
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
								</Fragment>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
}
