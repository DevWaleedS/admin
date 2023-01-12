import React from "react";
import { Store } from "../../../../assets/Icons/index";

const TotalMarkets = () => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex-1 w-64 rounded-lg flex items-center  pt-4 pb-4 pr-4"
        style={{ backgroundColor: "#B6BE34" }}
      >
        <div className="w-16 ml-2">
          <div
            className="h-12 w-12 flex justify-center items-center rounded-lg"
            style={{ backgroundColor: "rgba(193,200,86,0.5)" }}
          >
            <img className={`brightness-[200]`} src={Store} alt="" />
          </div>
        </div>

        <div className="flex flex-1 h-full flex-col justify-between pt-4">
          <h2 className="text-slate-50 font-medium text-lg">اجمالي المتاجر</h2>
          <div>
            <h2 className="text-slate-50 font-semibold text-lg">8.3K</h2>
            <h6 className="text-slate-50  text-xs mt-3">
              20% + خلال هذا الشهر
            </h6>
          </div>
        </div>
      </div>

      <div
        className="flex-1 w-64 rounded-lg flex items-center  py-4 pr-4"
        style={{ backgroundColor: "rgba(236,238,210,1)" }}
      >
        <div className="w-16 ml-2 h-full">
          <div className=" flex flex-col justify-around h-full  rounded-lg">
            <div className="h-4 w-4 rounded-full bg-green-400"></div>
            <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          </div>
        </div>

        <div
          className="flex flex-1 h-full flex-col justify-between "
          style={{ color: "#02466A" }}
        >
          <div className="">
            <h3 className=" font-semibold text-xl">6.8K</h3>
            <h6 className="  text-sm font-medium mt-1">متاجر فعالة</h6>
          </div>
          <div>
            <h3 className=" font-semibold text-xl">1.5K</h3>
            <h6 className="  text-sm font-medium mt-1">متاجر غير فعالة</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalMarkets;
