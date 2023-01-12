import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import CurrentSubscribersTable from "../../../components/PackagesPageComp/CurrentSubscribersTable/CurrentSubscribersTable";
import TraderAlert from "../../../components/PackagesPageComp/TraderAlert/TraderAlert";

const CurrentSubscriptions = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);
  return (
    <div className={`p-4 pl-36`} style={{ backgroundColor: "#fafafa" }}>
      <PageNavigate
        currentPage={"الإشتراكات الحالية"}
        nestedPage={true}
        parentPage={"الباقات"}
      />
      {traderAlert && (
        <TraderAlert
          cancel={() => {
            setTraderAlert(false);
          }}
          traderPackageDetails={traderPackageDetails}
        />
      )}
      <div dir="ltr" className="mt-28">
        <CurrentSubscribersTable
          openTraderAlert={(row) => {
            setTraderAlert(true);
            setTraderPackageDetails(row);
          }}
        ></CurrentSubscribersTable>
      </div>
    </div>
  );
};

export default CurrentSubscriptions;
