import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShoesImg, CarImg, CameraImg } from "../../../../assets/Icons/index";

function createData(name, category, price, totalSells, productNumber, img) {
  return { name, category, price, totalSells, productNumber, img };
}

const rows = [
  createData("حذاء نايك", "أحذية", "35", "9830", "054", ShoesImg),
  createData("كاميرا شت", "الكترونيات", "35", "9830", "158", CameraImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "98", CarImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "012", CameraImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "077", CarImg),
];

const MostProducts = () => {
  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <h2 className="p-4 font-semibold">المنتجات الأكثر زيارة</h2>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root.MuiTableCell-head": {
                fontFamily: "'Tajawal', sans-serif",
              },
            }}
          >
            <TableCell align="right">رقم المنتج</TableCell>
            <TableCell align="right">الاسم</TableCell>
            <TableCell align="right">التصنيف</TableCell>
            <TableCell align="right">السعر</TableCell>
            <TableCell align="right">اجمالى المبيعات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableRow-root .MuiTableCell-root": {
              fontFamily: "'Tajawal', sans-serif",
            },
          }}
        >
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& .MuiTableCell-root": {
                  height: "4rem",
                },
              }}
            >
              <TableCell
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                component="th"
                scope="row"
              >
                <img className="h-8" src={row.img} alt="" />
                {row.productNumber}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.totalSells}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MostProducts;
