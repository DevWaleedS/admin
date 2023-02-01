import React from "react";
import Box from "@mui/material/Box";
import PieChartSec from "./PieChartSec/PieChartSec";
import { ReactComponent as StoreIcon } from "../../../assets/Icons/icon-24-store.svg";

const ChartsComp = () => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:h-[190px] h-full">
      <div
        className="h-full rounded-lg md:py-10 px-5 py-5 flex flex-col md:items-start items-center justify-between"
        style={{ width: "376px", backgroundColor: "#FAFAFA",boxShadow:"0px 3px 6px #0000000F" }}
      >
        <div className="flex gap-4 items-center mb-3">
          <Box sx={{ "& path": { fill: "#02466A" } }}>
            <StoreIcon width={"1.75rem"} height={"1.75rem"}></StoreIcon>
          </Box>
          <h2 className="text-xl font-medium" style={{ color: "#02466A" }}>
            متاجر قدمت شكوى
          </h2>
        </div>
        <div>
          <h2 className="text-3xl font-semibold" style={{ color: "#02466A" }}>
            23
          </h2>
        </div>
      </div>
      <div
        className="flex-1 flex items-center rounded-lg md:py-10 px-5 py-5"
        style={{ backgroundColor: "#FAFAFA",boxShadow:"0px 3px 6px #0000000F" }}
      >
        <PieChartSec></PieChartSec>
      </div>
    </div>
  );
};

export default ChartsComp;
