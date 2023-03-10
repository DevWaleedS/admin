import React from "react";
import MapChartDraw from "./MapChartDraw/MapChartDraw";

const COUNTRIES = [
  "الرياض",
  "جدة",
  "الدمام",
  "الأحساء",
  "نجران",
  "المدينة المنورة",
];
const COLORS = [
  "#1DBBBE",
  "#B6BE34",
  "#0077FF",
  "#3AE374",
  "#FF9F1A",
  "#FF3838",
];

const PRICES = ["29.193", "18.832", "19.758", "23.078", "29.193", "37.760"];

const MapChartSec = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse md:p-4 h-full">
      <div className="flex-1 flex flex-col justify-between">
        {COUNTRIES.map((item, idx) => {
          return (
											<div className='flex justify-between'>
												<div className='flex items-center gap-2'>
													<div className='h-3 w-3 rounded-full' style={{ border: `2px solid ${COLORS[idx]}` }}></div>
													<h2 className='font-normal text-[15px] text-[#4D4F5C]'>{item}</h2>
												</div>
												<h2 className='font-normal text-[13px] text-[#4D4F5C]'>${PRICES[idx]}</h2>
											</div>
										);
        })}
      </div>
      <div className="w-full flex-1 flex justify-center items-center mr-3">
        <MapChartDraw colors={COLORS} />
      </div>
    </div>
  );
};

export default MapChartSec;
