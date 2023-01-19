import React, { useState } from "react";

import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import Button from "../../../UI/Button/Button";
import MarketsTableSec from "../../../components/MarketsPagesComp/MarketsTable/MarketsTableSec/MarketsTableSec";
import AddNewMarket from "../../../components/MarketsPagesComp/MarketsTable/AddNewMarket/AddNewMarket";

import { IoMdAdd } from "react-icons/io";


const MarketsTable = () => {
  const [showAddNewMarket, setShowAddNewMarket] = useState(false);
  return (
    <div className={`pr-4 pt-8 pl-36`} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex items-center justify-between">
        <PageNavigate nestedPage={false} currentPage={"عرض المتاجر"} />

        <Button
          onClick={() => {
            setShowAddNewMarket(true);
          }}
          type={"normal"}
          svg={<IoMdAdd color={"#fff"} />}
          style={{ width:'140px',height:'56px',backgroundColor: "#02466A" }}
          textStyle={{ color: "#EFF9FF", fontSize: '18px' }}
        >
          انشاء متجر
        </Button>
      </div>
      {showAddNewMarket && (
        <AddNewMarket
          cancel={() => {
            setShowAddNewMarket(false);
          }}
        />
      )}
      <div className="mt-8" dir="ltr">
        <MarketsTableSec />
      </div>
    </div>
  );
};

export default MarketsTable;
