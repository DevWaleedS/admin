import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import CurrentSubscribersTable from "../../../components/PackagesPageComp/CurrentSubscribersTable/CurrentSubscribersTable";
import TraderAlert from "../../../components/PackagesPageComp/TraderAlert/TraderAlert";

const CurrentSubscriptions = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);
  return (
    <div className="p-4 md:pl-36 text-lg font-medium" style={{ backgroundColor: "#fafafa" }}>
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
      <div dir="ltr" className="md:mt-28 mt-8">
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
