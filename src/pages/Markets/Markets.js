import React from "react";
import MarketsStatus from "../../components/MarketsPagesComp/MainPage/MarketsStatus";
import QuickMarketsInfo from "../../components/MarketsPagesComp/MainPage/QuickMarketsInfo";

const Markets = () => {
  return (
    <div className="p-4 md:pl-36 md:bg-[#fafafa] bg-white flex flex-col">
      <MarketsStatus />
      <QuickMarketsInfo />
    </div>
  );
};

export default Markets;
