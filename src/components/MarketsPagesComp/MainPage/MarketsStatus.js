import React from "react";
import TotalMarkets from "./TotalMarkets/TotalMarkets";
import IncreaseRateChart from "./IncreaseRateChart/IncreaseRateChart";

const MarketsStatus = () => {
  return (
    <div className="flex gap-4 h-80 mt-8" style={{}}>
      <TotalMarkets />
      <IncreaseRateChart></IncreaseRateChart>
    </div>
  );
};

export default MarketsStatus;
