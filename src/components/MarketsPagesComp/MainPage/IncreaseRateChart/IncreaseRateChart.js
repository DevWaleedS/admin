import React, { useState } from "react";
import IncreaseRateChartPiece from "./IncreaseRateChartPiece/IncreaseRateChartPiece";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoIosArrowDown } from "react-icons/io";

const IncreaseRateChart = () => {
  const [year, setYear] = React.useState(new Date().getFullYear());

  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const array = [];
  const thisYear = new Date().getFullYear();
  
  for (let index = 0; index < 10; index++) {
    array.push(thisYear - index);
  }
  return (
    <div className="bg-slate-50 flex-1 shadow-lg">
      <div className="flex flex-row md:px-16 px-4 pt-4">
        <div>
          <h2 className="md:text-[18px] text-[14px] font-medium">احصائيات توضح معدل الزيادة</h2>
          <div className="flex flex-row gap-2 mt-4">
            <h2 className="flex-1 flex flex-row items-baseline gap-2 whitespace-nowrap">
              متاجر فعلة
              <span
                className="inline-flex h-3 w-3 rounded-full"
                style={{ border: "3px solid #B6BE34" }}
              ></span>
            </h2>
            <h2 className="flex-1 flex flex-row items-baseline gap-2 whitespace-nowrap">
              متاجر غير فعالة
              <span
                className="inline-flex h-3 w-3 rounded-full"
                style={{ border: "3px solid #b6be3480" }}
              ></span>
            </h2>
          </div>
        </div>

        <Box sx={{ minWidth: 100,marginRight:'auto' }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={handleChange}
              IconComponent={() => {
                return (
                  <IoIosArrowDown
                    className="select_arrow duration-200"
                    size={"1.5rem"}
                  />
                );
              }}
              sx={{
                height: "2.25rem",
                backgroundColor: "#fff",
                width: "100%",
                color: "#02466A",
                pl: "1rem",
                py: "0.5rem",
                "& path": {
                  fill: "#02466A",
                },
                "& .MuiSelect-select": { color: "#02466A" },
                "&.Mui-focused .select_arrow": {
                  transform: "rotate(180deg)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #02466A",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #02466A",
                },
              }}
            >
              {array.map((item) => {
              
                return <MenuItem key={item }  value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <IncreaseRateChartPiece></IncreaseRateChartPiece>
    </div>
  );
};

export default IncreaseRateChart;
