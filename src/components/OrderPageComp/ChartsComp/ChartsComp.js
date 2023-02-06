import React from "react";
import PieChartSec from "./PieChartSec/PieChartSec";
import GraphSec from "./GraphSec/GraphSec";



const ChartsComp = () => {
  return (
    <div className="md:h-[190px] h-fit flex md:flex-row flex-col gap-4">
      <div
        className="md:w-[376px] w-full h-full rounded-lg shadow-lg py-2 px-5 "
        style={{ backgroundColor: "#DDE199" }}
      >
        <div>
          <h2 className="md:text-[28px] text-[24px] font-bold" style={{ color: "#02466A" }}>
            76
          </h2>
          <h3 className='text-base font-normal'>طلب متجر جديد</h3>
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
