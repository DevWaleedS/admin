import React, { useContext } from "react";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { NotificationContext } from "../../../../store/NotificationProvider";
import { visuallyHidden } from "@mui/utils";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as EditIcon } from "../../../../assets/Icons/editt 2.svg";
import { ReactComponent as CheckedSquare } from "../../../../assets/Icons/icon-24-square checkmark.svg";
import { ReactComponent as BsTrash } from '../../../../assets/Icons/icon-24-delete.svg';

import { useNavigate } from "react-router-dom";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { ReactComponent as SortIcon } from "../../../../assets/Icons/icon-24-sort.svg";
function createData(name, userName, city, active) {
  return {
    name,
    userName,
    city,
    active,
  };
}

const rows = [
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
  createData("عبد العزيز محمد", "Abed32", "الرياض", true),
  createData("خالد عبد الله حسين", "Kha99", "الدمام", false),
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
    id: "situation",
    numeric: false,
    disablePadding: false,
    label: "الإجراء",
    width: "5rem",
  },
  {
    id: "active",
    numeric: true,
    disablePadding: false,
    label: "الحالة",
    sort: true,
  },
  {
    id: "daysLeft",
    numeric: true,
    disablePadding: false,
    label: "المدينة",
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "اسم المستخدم",
  },

  {
    id: "circle",
    numeric: true,
    disablePadding: false,
    label: "اسم المندوب",
    sort: true,
  },

  {
    id: "number",
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
            className='md:text-lg text-[16px] font-medium'
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width ? headCell.width : "auto",
              color: "#02466A",
              whiteSpace:'nowrap'
            }}
          >
            {headCell.sort && (
              <TableSortLabel
                IconComponent={() => {
                  return <SortIcon style={{ marginRight: "8px" }} />;
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
  const { setNotificationTitle, setActionTitle } = NotificationStore;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        display: "flex",
        gap: "2rem",
        justifyContent: "flex-end",
      }}
    >
      <div className="flex gap-2 items-center">
        {numSelected > 0 && (
          <Tooltip
            onClick={() => {
              setNotificationTitle('سيتم حذف جميع المناديب التي قمت بتحديدهم');
              setActionTitle('تم حذف المناديب بنجاح');
              onClick();
            }}
            title="Delete">
            <div
              className="fcc gap-2 px-4 rounded-full"
              style={{ width: "114px", backgroundColor: "#FF38381A" }}
            >
              <h2 className={"font-medium md:text-lg text-[16px]"} style={{ color: "#FF3838" }}>
                حذف
              </h2>
              <IconButton>
                <BsTrash
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1rem",
                  }}
                ></BsTrash>
              </IconButton>
            </div>
          </Tooltip>
        )}
      </div>

      <div className="flex items-center">
        <h2 className="font-medium md:text-lg text-[16px] whitespace-nowrap">تحديد الكل</h2>
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
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
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
      <Paper
        sx={{
          width: "100%",
          mb: 8,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <EnhancedTableToolbar
          onClick={deleteItems}
          numSelected={selected.length}
          rowCount={data.length}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, backgroundColor: "#fff" }}
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
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //   onClick={(event) => handleClick(event, row.name)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell component='th' id={labelId} scope='row'>
                        <div className='flex items-center gap-2'>
                          <BsTrash
                            onClick={() => {
                              const findIndex = data.findIndex((item) => item.name === row.name);
                              const arr = [...data];
                              arr.splice(findIndex, 1);
                              setData(arr);
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
                              navigate('/تعديل_مندوب');
                            }}
                            width={'20px'}
                          ></EditIcon>
                        </div>
                      </TableCell>
                      <TableCell align='center' className='font-normal text-base'>
                        <div
                          className='w-20 h-full py-1 rounded-xl'
                          style={{
                            backgroundColor: row.active ? '#3AE37466' : '#ECECEC',
                            marginLeft: 'auto',
                          }}
                        >
                          <h2
                            className="md:text-lg text-[16px]"
                            style={{
                              color: row.active ? '#011723' : '#67747B',
                            }}
                          >
                            {row.active ? 'مفعل' : 'غير مفعل'}
                          </h2>
                        </div>
                      </TableCell>

                      <TableCell align='right'>
                        <div>
                          <h2 className='font-normal md:text-lg text-[16px] whitespace-normal'>{row.city}</h2>
                        </div>
                      </TableCell>

                      <TableCell align='right'>
                        <div>
                          <h2 className='font-normal md:text-lg text-[16px] whitespace-normal'>{row.userName}</h2>
                        </div>
                      </TableCell>
                      <TableCell align='right'>
                        <h2 className='inline font-normal md:text-lg text-[16px] whitespace-normal'>{row.name}</h2>
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
      <div className="flex md:flex-row flex-col items-center justify-between px-8 gap-y-4">
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
