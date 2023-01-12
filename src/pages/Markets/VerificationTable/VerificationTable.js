import React, { useState } from "react";
// import styles from "./ProductsTable.module.css";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import VerificationTableSec from "../../../components/MarketsPagesComp/VerificationTable/VerificationTableSec/VerificationTableSec";
import TraderAlert from "../../../components/MarketsPagesComp/VerificationTable/TraderAlert/TraderAlert";
// import { ReactComponent as Call } from "../../../assets/Icons/icon-24- call.svg";

const VerificationTable = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);

  return (
    <div className={`pr-4 pt-8 pl-36`} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"التوثيق"} parentPage={"المتاجر"} />
      </div>
        {traderAlert && (
              <TraderAlert
                cancel={() => {
                setTraderAlert(false);
              }}
              traderPackageDetails={traderPackageDetails}
              />
        )}
      <div className="mt-8" dir="ltr">
        <VerificationTableSec 
          openTraderAlert={(row) => {
            setTraderAlert(true);
            setTraderPackageDetails(row);
          }}
        />
      </div>
    </div>
  );
};

export default VerificationTable;
