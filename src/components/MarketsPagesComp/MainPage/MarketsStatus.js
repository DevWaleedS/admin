import React from "react";
import TotalMarkets from "./TotalMarkets/TotalMarkets";
import IncreaseRateChart from "./IncreaseRateChart/IncreaseRateChart";

const MarketsStatus = ({marketsInfo,chartInfo,getYear}) => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 h-fit md:mt-8 mt-4">
      <TotalMarkets marketsInfo={marketsInfo}/>
      <IncreaseRateChart chartInfo={chartInfo} getYear={getYear}/>
    </div>
  );
};

export default MarketsStatus;
