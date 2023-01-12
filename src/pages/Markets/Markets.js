import React from "react";
import MarketsStatus from "../../components/MarketsPagesComp/MainPage/MarketsStatus";
import QuickMarketsInfo from "../../components/MarketsPagesComp/MainPage/QuickMarketsInfo";

const Markets = () => {
  return (
    <div className={`p-4 pl-36`} style={{ backgroundColor: "#fafafa" }}>
      <MarketsStatus />
      <QuickMarketsInfo />
    </div>
  );
};

export default Markets;
