import React from "react";
import LatestMarkets from "./LatestMarkets/LatestMarkets";
import QuickDetails from "./QuickDetails/QuickDetails";

const QuickMarketsInfo = () => {
  return (
    <div className="flex gap-4 mt-8">
      <LatestMarkets></LatestMarkets>
      <QuickDetails></QuickDetails>
    </div>
  );
};

export default QuickMarketsInfo;
