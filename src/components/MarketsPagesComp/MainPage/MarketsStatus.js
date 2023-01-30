import React from "react";
import TotalMarkets from "./TotalMarkets/TotalMarkets";
import IncreaseRateChart from "./IncreaseRateChart/IncreaseRateChart";

const MarketsStatus = () => {
  return (
    <div className="flex md:flex-row flex-col gap-4 h-fit md:mt-8 mt-4">
      <TotalMarkets />
      <IncreaseRateChart></IncreaseRateChart>
    </div>
  );
};

export default MarketsStatus;
