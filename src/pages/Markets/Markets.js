import React,{ useState } from "react";
import MarketsStatus from "../../components/MarketsPagesComp/MainPage/MarketsStatus";
import QuickMarketsInfo from "../../components/MarketsPagesComp/MainPage/QuickMarketsInfo";
import useFetch from '../../hooks/useFetch';

const Markets = () => {
  const [year , setYear ] = useState(new Date().getFullYear());
  const getYear = (y) =>{setYear(y)};
  const { fetchedData } = useFetch(`https://backend.atlbha.com/api/Admin/storeReport?year=${year}`);
  const marketsInfo = {
    countStore:fetchedData?.data?.count_of_stores,
    averageStore:fetchedData?.data?.average_of_stores,
    activeStore:fetchedData?.data?.active_of_stores,
    notActiveStore:fetchedData?.data?.not_active_of_stores,
  }
  const quickInfo = {
    last24HoursOfStores:fetchedData?.data?.last_24_hours_of_stores,
    last24HoursOfPendingOrders:fetchedData?.data?.last_24_hours_of_pending_orders,
    last24HoursOfCompleteOrders:fetchedData?.data?.last_24_hours_of_complete_orders,
    lastMonthOfStores:fetchedData?.data?.last_month_of_stores,
    lastMonthOfCompleteOrders:fetchedData?.data?.last_month_of_complete_orders,
  }
  return (
    <div className="p-4 md:pl-36 md:bg-[#fafafa] bg-white flex flex-col">
      <MarketsStatus marketsInfo={marketsInfo} chartInfo ={fetchedData?.data?.array_store} getYear={getYear}/>
      <QuickMarketsInfo latestStores={fetchedData?.data?.latest_stores} quickInfo={quickInfo}/>
    </div>
  );
};

export default Markets;
