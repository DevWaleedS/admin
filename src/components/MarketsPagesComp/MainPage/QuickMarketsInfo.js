import React from "react";
import LatestMarkets from "./LatestMarkets/LatestMarkets";
import QuickDetails from "./QuickDetails/QuickDetails";

const QuickMarketsInfo = () => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:mt-8 mt-4">
      <LatestMarkets/>
      <QuickDetails/>
    </div>
  );
};

export default QuickMarketsInfo;
