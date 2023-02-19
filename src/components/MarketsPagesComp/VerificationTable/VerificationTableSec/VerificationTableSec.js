import React, { useContext } from "react";
import styles from "./VerificationTableSec.module.css";
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
  EditButton,
  Gift,
  Clinic,
  ListMoreCategory,
  Stationery
} from "../../../../assets/Icons/index";
import { NotificationContext } from "../../../../store/NotificationProvider";
import Context from '../../../../store/context';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import getDate from "../../../../helpers/getDate";
import axios from "axios";

const newRequest = { title: "طلب جديد", class: "#1DBBBE66" };
const inProgress = { title: "جاري التوثيق", class: "#FFDD0066" };
const finished = { title: "تم التوثيق", class: "#3AE374" };


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
    label: "التاريخ",
    sort: true,
  },
  {
    id: "opened",
    numeric: true,
    disablePadding: false,
    label: "الحالة",
    sort: true,
  },
  {
    id: "activity",
    numeric: true,
    disablePadding: false,
    label: "اسم النشاط",
    sort: true,
  },
  {
    id: "store",
    numeric: true,
    disablePadding: false,
    label: "اسم المتجر",
    sort: true,
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
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width ? headCell.width : "auto",
              fontSize: "1rem",
              color: "#02466A",
              whiteSpace: 'nowrap'
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
  const { setNotificationTitle, setActionTitle } = NotificationStore;
  return (
    <Toolbar
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
        gap: "2rem",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="flex flex-row justify-center items-center gap-2"
      >
        {numSelected > 0 && (
          <div
            className="flex flex-row items-center justify-center gap-4 cursor-pointer"
            style={{ width: '114px', height: '40px', backgroundColor: '#FF38381A', borderRadius: '20px' }}
            onClick={() => {
              setNotificationTitle('سيتم حذف جميع طلبات التوثيق التي قمت بتحديدها');
              setActionTitle('تم حذف طلبات التوثيق بنجاح');
            }}
          >
            <h6 style={{ color: '#FF3838' }} className="md:text-[18px] text-[16px] font-medium">حذف</h6>
            <img
              src={Delete}
              alt='delete-icon'
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <h2 className="md:text-[18px] text-[16px] font-medium">تحديد الكل</h2>
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

export default function EnhancedTable({ fetchedData, loading, reload, setReload, openTraderAlert, openVerificationData, openEidtVerificationData }) {
  const token = localStorage.getItem('token');
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(fetchedData?.data?.stores || []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activityAnchorEl, setActivityAnchorEl] = React.useState(null);
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
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
      const newSelected = fetchedData?.data?.stores?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const deleteItem = (id) => {
      axios
        .get(`https://backend.atlbha.com/api/Admin/verificationdeleteall?id[]=${id}`, {
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchedData?.data?.stores?.length) : 0;

  const allRows = () => {
    const num = Math.ceil(fetchedData?.data?.stores?.length / rowsPerPage);
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
          numSelected={selected.length}
          rowCount={fetchedData?.data?.stores?.length}
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
              rowCount={fetchedData?.data?.stores?.length}
            />
            <TableBody>
              {loading ?
                (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <CircularLoading />
                    </TableCell>
                  </TableRow>
                )
                :
                (
                  <>
                    {stableSort(fetchedData?.data?.stores, getComparator(order, orderBy))
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            //   onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell id={labelId} className="min-w-[7rem]">
                              <div className="flex items-center gap-2">
                                <img src={Delete} alt="delete-icon"
                                  onClick={() => {deleteItem(row?.id)}}
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "1rem",
                                  }}
                                />
                                <img className="cursor-pointer" src={SendNote} alt="send-note-icon" onClick={() => { openTraderAlert({id:row?.id,name:row?.store_name}); }} />
                                <img className="cursor-pointer" src={EditButton} alt="edit-icon" onClick={() => { openEidtVerificationData(row); }} />
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <h2 className="md:text-[18px] text-[16px]" style={{ color: '#4D4F5C' }}>
                                {getDate(row?.verification_date)}
                              </h2>
                            </TableCell>
                            <TableCell align="center">
                              <div
                                className="w-28 h-full py-1 rounded-xl"
                                style={{
                                  backgroundColor: row?.verification_status==='تم التوثيق' ? '#3AE374' :row?.verification_status==='جاري التوثيق' ? '#FFDD0066' :row?.verification_status==='طلب جديد' ? '#1DBBBE66' :'#ff00008a',
                                  marginLeft: "auto",
                                }}
                              >
                                <h2 style={{ color: '#4D4F5C', fontSize: '16px',whiteSpace:'nowrap' }}>{row?.verification_status}</h2>
                              </div>
                            </TableCell>
                            <TableCell align="right" className="min-w-[14rem]">
                              <div className='flex flex-row items-center justify-end gap-3'>
                                {
                                  row?.activity?.length > 1 &&
                                  (
                                    <>
                                      <img className='cursor-pointer' src={ListMoreCategory} alt='list-more-category' onClick={activityHandleClick} />
                                      <Menu className={styles.activity_menu} anchorEl={activityAnchorEl} open={activityOpen} onClose={activityHandleClose}>
                                        {row?.activity?.map((item, index) => (
                                          <MenuItem key={index} className='flex flex-row items-center justify-center gap-2' style={{ color: '#4D4F5C' }} onClick={activityHandleClose}>
                                            <div className='flex flex-row items-center justify-center md:w-[30px] w-[20px] md:h-[30px] h-[20px] p-[0.2rem]' style={{ borderRadius: '50%', backgroundColor: '#8D8AD333' }}>
                                              <img src={item?.icon} alt={item?.name} />
                                            </div>
                                            {item?.name}
                                          </MenuItem>
                                        ))}
                                      </Menu>
                                    </>
                                  )
                                }
                                
                                <h2 style={{ color: '#4D4F5C' }} className='md:text-[16px] text-[14px] inline whitespace-nowrap font-normal'>
                                  {row?.activity?.[0]?.name}
                                </h2>
                                <img src={row?.activity?.[0]?.icon} alt={row?.activity?.[0]?.name} className="w-[20px] h-[20px] rounded-full" />
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <h2 style={{ color: '#4D4F5C', fontSize: '18px', cursor: 'pointer' }} onClick={() => { openVerificationData(row); }}>{row.store_name}</h2>
                            </TableCell>
                            <TableCell align="right" style={{ color: '#4D4F5C', fontSize: '18px' }}>
                              {(index + 1).toLocaleString("en-US", {
                                minimumIntegerDigits: 2,
                                useGrouping: false,
                              })}
                            </TableCell>
                            <TableCell padding="none" align={"right"}>
                              <Checkbox
                                checkedIcon={<CheckedSquare />}
                                sx={{
                                  color: "#1DBBBE",
                                  "& .MuiSvgIcon-root": {
                                    color: "#ADB5B9",
                                  },
                                }}
                                checked={isItemSelected}
                                onClick={(event) => handleClick(event, row.id)}
                                inputProps={{
                                  "aria-labelledby": labelId,
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
      <div className="flex items-center justify-between">
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