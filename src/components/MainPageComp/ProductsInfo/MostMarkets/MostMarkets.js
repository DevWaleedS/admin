import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

import { Gift, Clinic, Electronics } from "../../../../assets/Icons/index";

function createData(name, category, img, rate) {
  return { name, category, img, rate };
}

const rows = [
  createData("أمازون", "هدايا وألعاب", Gift, 4.8),
  createData("صحتى", "مستلزمات طبية", Clinic, 2.5),
  createData("تسعة", "الكترونيات", Electronics, 4.8),
  createData("أمازون", "هدايا وألعاب", Gift, 4.8),
  createData("صحتى", "مستلزمات طبية", Clinic, 2.5),
];

const MostMarkets = () => {
  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <h2 className="p-4 font-medium">المتاجر الأكثر زيارة</h2>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root.MuiTableCell-head": {
                fontFamily: "'Tajawal', sans-serif",
              },
            }}
          >
            <TableCell align="right">اسم المتجر</TableCell>
            <TableCell align="right">التصنيف</TableCell>
            <TableCell align="right">تقييم العملاء</TableCell>
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
              <TableCell component="th" scope="row" align="right">
                {row.name}
              </TableCell>
              <TableCell
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                component="th"
                scope="row"
              >
                <img className="h-6" src={row.img} alt="" />
                {row.category}
              </TableCell>

              <TableCell align="right">
                <div
                  className="flex justify-between items-center py-1 px-1 w-16 h-6 rounded-md"
                  style={{ backgroundColor: "rgb(164,161,251)" }}
                >
                  <h2 className="font-medium" style={{ color: "#fff" }}>
                    {row.rate}
                  </h2>
                  {row.rate > 3 ? (
                    <BsStarFill color="#fff" />
                  ) : (
                    <BsStarHalf color="#fff" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MostMarkets;
