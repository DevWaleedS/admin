import React from "react";
import Box from "@mui/material/Box";
import PieChartSec from "./PieChartSec/PieChartSec";
import GraphSec from "./GraphSec/GraphSec";

import { ReactComponent as StoreIcon } from "../../../assets/Icons/icon-24-store.svg";

const ChartsComp = () => {
  return (
    <div className="flex gap-4" style={{ height: "190px" }}>
      <div
        className="h-full rounded-lg shadow-lg py-2 px-5 "
        style={{ width: "376px", backgroundColor: "#DDE199" }}
      >
        <div>
          <h2 className="text-3xl font-semibold" style={{ color: "#02466A" }}>
            23
          </h2>
          <h3>طلب متجر جديد</h3>
        </div>
        <GraphSec></GraphSec>
      </div>
      <div
        className="flex-1 flex items-center rounded-lg shadow-lg py-10 px-5"
        style={{ backgroundColor: "#DDE199" }}
      >
        <PieChartSec></PieChartSec>
      </div>
    </div>
  );
};

export default ChartsComp;
