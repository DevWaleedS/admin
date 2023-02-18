import React from "react";
import LatestMarkets from "./LatestMarkets/LatestMarkets";
import QuickDetails from "./QuickDetails/QuickDetails";

const QuickMarketsInfo = ({latestStores,quickInfo}) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:mt-8 mt-4">
      <LatestMarkets latestStores={latestStores}/>
      <QuickDetails quickInfo={quickInfo}/>
    </div>
  );
};

export default QuickMarketsInfo;
