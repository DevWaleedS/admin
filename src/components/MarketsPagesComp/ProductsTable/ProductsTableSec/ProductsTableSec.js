import React, { useState, useContext } from "react";
import styles from "./ProductsTableSec.module.css";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as CheckedSquare } from "../../../../assets/Icons/icon-24-square checkmark.svg";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { ReactComponent as SortIcon } from "../../../../assets/Icons/icon-24-sort.svg";
import {
  Delete,
  SendNote,
  ListMoreCategory,
  Stationery
} from "../../../../assets/Icons/index";
import { NotificationContext } from "../../../../store/NotificationProvider";

function createData(id, number, product, store, opened, activity, special, date) {
  return {
    id,
    number,
    product,
    store,
    opened,
    activity,
    special,
    date,
  };
}

const rows = [
  createData(1, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", true, "21/12/2022"),
  createData(2, "564", "خاتم", "نون", false, "اكسسوارات", false, "13/9/2022", true),
  createData(3, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", false, "21/12/2022"),
  createData(4, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", true, "21/12/2022"),
  createData(5, "564", "خاتم", "نون", true, "اكسسوارات", false, "13/9/2022"),
  createData(6, "564", "خاتم", "نون", false, "اكسسوارات", false, "13/9/2022"),
  createData(7, "564", "خاتم", "نون", false, "اكسسوارات", false, "13/9/2022"),
  createData(8, "564", "خاتم", "نون", false, "اكسسوارات", true, "13/9/2022"),
  createData(9, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", false, "21/12/2022"),
  createData(10, "564", "خاتم", "نون", true, "اكسسوارات", true, "13/9/2022"),
  createData(11, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", true, "21/12/2022"),
  createData(12, "564", "خاتم", "نون", false, "اكسسوارات", false, "13/9/2022"),
  createData(13, "0851", "كاميرا سوني", "أمازون", false, "مستلزمات طبية", true, "21/12/2022"),
  createData(14, "0851", "كاميرا سوني", "أمازون", true, "مستلزمات طبية", true, "21/12/2022"),
  createData(15, "564", "خاتم", "نون", true, "اكسسوارات", false, "13/9/2022"),
  createData(16, "564", "خاتم", "نون", false, "اكسسوارات", false, "13/9/2022"),
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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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
    id: "situation",
    numeric: false,
    disablePadding: false,
    label: "الإجراء",
    width: "5rem",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: <div className="flex flex-col items-center">
      <h2 style={{ color: '#02466A', fontSize: '14px', fontWeight: '500' }}>التاريخ</h2>
      <span style={{ color: '#67747B', fontSize: '14px', fontWeight: '500' }}>الإضافة/ التعديل</span>
    </div>,
    sort: true,
  },
  {
    id: "special",
    numeric: true,
    disablePadding: false,
    label: "مميز",
    sort: true,
  },
  {
    id: "activity",
    numeric: true,
    disablePadding: false,
    label: "النشاط",
    sort: true,
    width:'5rem'
  },
  {
    id: "opened",
    numeric: true,
    disablePadding: false,
    label: "الحالة",
    sort: true,
  },
  {
    id: "store",
    numeric: true,
    disablePadding: false,
    label: "المتجر",
    sort: true,
  },
  {
    id: "product",
    numeric: true,
    disablePadding: false,
    label: "اسم المنتج",
  },
  {
    id: "number",
    numeric: true,
    disablePadding: false,
    label: "الرقم",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "م",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#ebebebd9" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
<<<<<<< HEAD
            className='md:text-[18px] text-[14px] font-medium'
=======
            className='text-lg font-medium'
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width ? headCell.width : "auto",
<<<<<<< HEAD
=======
             
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
              color: "#02466A",
              whiteSpace:'nowrap'
            }}
          >
            {headCell.sort && (
              <TableSortLabel
                IconComponent={() => {
                  return <SortIcon />;
                }}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {!orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
            {!headCell.sort && headCell.label}
          </TableCell>
        ))}
        <TableCell padding={"none"}></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onClick, rowCount, onSelectAllClick } = props;
  const NotificationStore = useContext(NotificationContext);
  const { setNotificationTitle,setActionTitle } = NotificationStore;
  const [all, setAll] = useState(true);
  return (
    <Toolbar
      className="md:gap-8 gap-4 p-0"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.contrastText,
              theme.palette.action.activatedOpacity
            ),
        }),
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="flex flex-row justify-center items-center gap-2"
      >
        {numSelected > 0 && (
          <>
            <div
              className="md:w-[126px] w-[100px] md:h-[40px] h-[30px] flex flex-row items-center justify-center md:gap-3 gap-1 cursor-pointer"
              style={{ backgroundColor: '#FF9F1A0A', borderRadius: '20px' }}
              onClick={() => {
                setNotificationTitle('سيتم تعطيل جميع المنتجات التي قمت بتحديدها');
                setActionTitle('تم تعطيل المنتجات بنجاح');
              }}
            >
              <h6 style={{ color: '#FF9F1A' }} className="font-medium md:text-[18px] text-[15px]">تعطيل</h6>
              <Switch
                onChange={() => {
                }}
                className=''
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
                    backgroundColor: '#FF9F1A',

                    opacity: 1,
                  },
                }}
                checked={all}
              />
            </div>
            <div
              className="md:w-[114px] w-[90px] md:h-[40px] h-[30px] flex flex-row items-center justify-center md:gap-4 gap-2 cursor-pointer"
              style={{ backgroundColor: '#FF38381A', borderRadius: '20px' }}
              onClick={() => {
                setNotificationTitle('سيتم حذف جميع المنتجات التي قمت بتحديدها');
                setActionTitle('تم حذف المنتجات بنجاح');
              }}
            >
              <h6 style={{ color: '#FF3838' }} className="md:text-[18px] text-[15px] font-medium">حذف</h6>
              <img
                src={Delete}
                alt='delete-icon'
              />
            </div>
          </>
        )}
      </div>
      <div className="flex items-center">
        <h2 className="font-medium md:text-[18px] text-[16px] whitespace-nowrap">تحديد الكل</h2>
        <Checkbox
          checkedIcon={<CheckedSquare />}
          sx={{
            pr: "0",
            color: "#011723",
            "& .MuiSvgIcon-root": {
              color: "#011723",
            },
          }}
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ openProductDetails, openTraderAlert }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activityAnchorEl, setActivityAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const activityOpen = Boolean(activityAnchorEl);

  const rowsPerPagesCount = [10, 20, 30, 50, 100];
  const handleRowsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const activityHandleClick = (event) => {
    setActivityAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activityHandleClose = () => {
    setActivityAnchorEl(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const allRows = () => {
    const num = Math.ceil(data.length / rowsPerPage);
    const arr = [];
    for (let index = 0; index < num; index++) {
      arr.push(index + 1);
    }
    return arr;
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ backgroundColor: 'transparent', width: "100%", mb: 2, boxShadow: '0 0' }}>
        <EnhancedTableToolbar
          onClick={deleteItems}
          numSelected={selected.length}
          rowCount={data.length}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, backgroundColor: '#ffffff', marginBottom: '3rem' }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
																			<TableRow hover role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
																				<TableCell component='th' id={labelId} scope='row'>
																					<div className='flex items-center gap-2'>
																						<img
																							src={Delete}
																							alt='delete-icon'
																							onClick={() => {
																								const findIndex = data.findIndex((item) => item.id === row.id);
																								const arr = [...data];
																								arr.splice(findIndex, 1);
																								setData(arr);
																							}}
																							style={{
																								cursor: 'pointer',
																								color: 'red',
																								fontSize: '1rem',
																							}}
																						/>
																						<Switch
																							onChange={() => {
																								const findIndex = data.findIndex((item) => item.id === row.id);
																								const arr = [...data];
																								arr[findIndex].opened = !arr[findIndex].opened;
																								setData(arr);
																							}}
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
																							checked={row.opened}
																						/>
																						<img
																							className='cursor-pointer'
																							src={SendNote}
																							alt='send-note-icon'
																							onClick={() => {
																								openTraderAlert(row);
																							}}
																						/>
																					</div>
																				</TableCell>
																				<TableCell align='right'>
<<<<<<< HEAD
																					<h2 className='md:text-[18px] text-[16px] font-normal' style={{ color: '#4D4F5C'}}>
=======
																					<h2 className='font-normal' style={{ color: '#4D4F5C', fontSize: '18px' }}>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																						{row.date}
																					</h2>
																				</TableCell>
																				<TableCell align='right'>
<<<<<<< HEAD
																					<div className='flex flex-row items-center gap-1 py-1 px-3 md:w-16 w-24 h-6 rounded-md'>
																						<h2 style={{ color: row.special ? '#3AE374' : '#ADB5B9' }} className='md:text-[16px] text-[14px] min-w-[50px] whitespace-nowrap'>
=======
																					<div className='flex flex-row items-center gap-1 py-1 px-3 w-16 h-6 rounded-md'>
																						<h2 style={{ fontSize: '16px', color: row.special ? '#3AE374' : '#ADB5B9' }} className='min-w-[50px] whitespace-nowrap'>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																							{row.special ? 'مميز' : 'غير مميز'}
																						</h2>
																						<Switch
																							onChange={() => {
																								const findIndex = data.findIndex((item) => item.id === row.id);
																								const arr = [...data];
																								arr[findIndex].special = !arr[findIndex].special;
																								setData(arr);
																							}}
																							className=''
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
																							checked={row.special}
																						/>
																					</div>
																				</TableCell>
<<<<<<< HEAD
																				<TableCell className="min-w-[200px]" align='right'>
=======
																				<TableCell align='right'>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																					<div className='flex flex-row items-center justify-end gap-3'>
																						<img className='cursor-pointer' src={ListMoreCategory} alt='list-more-category' onClick={activityHandleClick} />
																						<Menu className={styles.activity_menu} anchorEl={activityAnchorEl} open={activityOpen} onClose={activityHandleClose}>
																							{[1, 2, 3].map((_item, index) => (
																								<MenuItem key={index} className='flex flex-row items-center justify-center gap-2' style={{ color: '#4D4F5C' }} onClick={activityHandleClose}>
<<<<<<< HEAD
																									<div className='flex flex-row items-center justify-center md:w-[30px] w-[20px] md:h-[30px] h-[20px] p-[0.2rem]' style={{ borderRadius: '50%', backgroundColor: '#8D8AD333' }}>
=======
																									<div className='flex flex-row items-center justify-center' style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#8D8AD333' }}>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																										<img src={Stationery} alt='stationery-icon' />
																									</div>
																									قرطاسية
																								</MenuItem>
																							))}
																						</Menu>
<<<<<<< HEAD
																						<h2 style={{ color: '#4D4F5C'}} className='md:text-[16px] text-[14px] inline whitespace-nowrap font-normal'>
=======
																						<h2 style={{ color: '#4D4F5C', fontSize: '16px' }} className='inline whitespace-nowrap font-normal'>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																							{row.activity}
																						</h2>
																					</div>
																				</TableCell>
																				<TableCell align='center'>
																					<div
																						className='w-20 h-full py-1 rounded-xl'
																						style={{
																							backgroundColor: row.opened ? 'rgba(58, 227, 116, 0.4)' : '#D3D3D3',
																							marginLeft: 'auto',
																						}}
																					>
<<<<<<< HEAD
																						<h2 className="md:text-[16px] text-[14px]" style={{ color: row.opened ? '#011723' : '#67747B' }}>{row.opened ? 'نشط' : 'غير نشط'}</h2>
																					</div>
																				</TableCell>
																				<TableCell align='right'>
																					<h2 className="md:text-[16px] text-[14px]" style={{ color: '#4D4F5C' }}>{row.store}</h2>
																				</TableCell>
																				<TableCell align='right'>
																					<h2
                                          className="md:text-[16px] text-[14px] font-normal"
																						style={{ color: '#4D4F5C', cursor: 'pointer' }}
=======
																						<h2 style={{ color: row.opened ? '#011723' : '#67747B', fontSize: '16px' }}>{row.opened ? 'نشط' : 'غير نشط'}</h2>
																					</div>
																				</TableCell>
																				<TableCell align='right'>
																					<h2 style={{ color: '#4D4F5C', fontSize: '16px' }}>{row.store}</h2>
																				</TableCell>
																				<TableCell align='right'>
																					<h2
                                          className='font-normal'
																						style={{ color: '#4D4F5C', fontSize: '16px', cursor: 'pointer' }}
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																						onClick={() => {
																							openProductDetails(row);
																						}}
																					>
																						{row.product}
																					</h2>
																				</TableCell>
																				<TableCell align='right'>
<<<<<<< HEAD
																					<h2 className="md:text-[18px] text-[16px]" style={{ color: '#4D4F5C'}}>{row.number}</h2>
																				</TableCell>
																				<TableCell className="md:text-[18px] text-[16px]" align='right' style={{ color: '#4D4F5C' }}>
=======
																					<h2 style={{ color: '#4D4F5C', fontSize: '18px' }}>{row.number}</h2>
																				</TableCell>
																				<TableCell align='right' style={{ color: '#4D4F5C', fontSize: '18px' }}>
>>>>>>> 0f4d0ee6e5e22c5c9ad9e2d58bedfca31309307e
																					{(index + 1).toLocaleString('en-US', {
																						minimumIntegerDigits: 2,
																						useGrouping: false,
																					})}
																				</TableCell>
																				<TableCell padding='none' align={'right'}>
																					<Checkbox
																						checkedIcon={<CheckedSquare />}
																						sx={{
																							color: '#1DBBBE',
																							'& .MuiSvgIcon-root': {
																								color: '#ADB5B9',
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
      <div className="flex md:flex-row flex-col items-center justify-between gap-[26px] mt-4">
        <div
          className="flex items-center gap-2 p-2 rounded-md"
          style={{ border: "1px solid #2D62ED" }}
        >
          <div
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleRowsClick}
            className={
              "h-9 w-9 rounded-sm flex justify-center items-center cursor-pointer"
            }
            style={{ backgroundColor: "#0099FB" }}
          >
            <MdOutlineKeyboardArrowDown
              color="#fff"
              fontSize={"1.5rem"}
            ></MdOutlineKeyboardArrowDown>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
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
                    backgroundColor: "#FFEEEE",
                    "ul:has(&)": {
                      p: 0,
                    },
                    "ul:has(&) li:hover": {
                      backgroundColor: "#C6E1F0",
                    },
                  }}
                >
                  {rowsPer}
                </MenuItem>
              );
            })}
          </Menu>
          <h2 className="font-medium" style={{ color: "#0077FF" }}>
            عدد الصفوف
          </h2>
        </div>
        <div className="flex gap-6 items-center">
          <MdOutlineArrowBackIosNew
            className="cursor-pointer"
            style={{ visibility: page === 0 && "hidden" }}
            onClick={() => {
              setPage(page - 1);
            }}
          ></MdOutlineArrowBackIosNew>

          <div className="flex gap-4">
            {allRows().map((item, itemIdx) => {
              return (
                <div
                  className="cursor-pointer font-medium rounded-lg flex justify-center items-center w-6 h-6"
                  style={{
                    backgroundColor: item === page + 1 && "#508FF4",
                    color: item === page + 1 && "#fff",
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
            className="cursor-pointer"
            style={{ visibility: page + 1 === allRows().length && "hidden" }}
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
