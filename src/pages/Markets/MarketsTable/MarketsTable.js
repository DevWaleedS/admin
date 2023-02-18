import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import Button from "../../../UI/Button/Button";
import MarketsTableSec from "../../../components/MarketsPagesComp/MarketsTable/MarketsTableSec/MarketsTableSec";
import AddNewMarket from "../../../components/MarketsPagesComp/MarketsTable/AddNewMarket/AddNewMarket";
import { IoMdAdd } from "react-icons/io";
import useFetch from '../../../hooks/useFetch';

const MarketsTable = () => {
  const [showAddNewMarket, setShowAddNewMarket] = useState(false);
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/store');
  return (
    <div className="md:pr-4 md:pt-8 md:pl-36 p-4 pt-0 md:bg-[#fafafa] bg-[#ffffff]">
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-[22px]">
        <PageNavigate nestedPage={false} currentPage={"عرض المتاجر"} />

        <Button
          onClick={() => {
            setShowAddNewMarket(true);
          }}
          className="md:w-[140px] w-full md:h-[56px] h-[44px]"
          type={"normal"}
          svg={<IoMdAdd color={"#fff"} />}
          style={{ backgroundColor: "#02466A" }}
          textStyle={{ color: "#EFF9FF", fontSize: '18px' }}
        >
          انشاء متجر
        </Button>
      </div>
      {showAddNewMarket && (
        <AddNewMarket
          reload={reload}
          setReload={setReload}
          cancel={() => {
            setShowAddNewMarket(false);
          }}
        />
      )}
      <div className="md:mt-8 mt-4" dir="ltr">
        <MarketsTableSec
          fetchedData={fetchedData}
          loading={loading}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </div>
  );
};

export default MarketsTable;
