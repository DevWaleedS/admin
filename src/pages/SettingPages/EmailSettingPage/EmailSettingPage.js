import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import TableComp from "../../../components/SettingComp/EmailPageComp/TableComp/TableComp";
import TraderAlert from "../../../components/SettingComp/EmailPageComp/TraderAlert/TraderAlert";

const EmailSettingPage = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);

  return (
    <div className={`px-4 pt-6 pl-36`} style={{ backgroundColor: "#F7F7F7" }}>
      <PageNavigate
        nestedPage={true}
        parentPage={"الاعدادات"}
        currentPage={"البريد"}
      />
      {traderAlert && (
        <TraderAlert
          cancel={() => {
            setTraderAlert(false);
          }}
          traderPackageDetails={traderPackageDetails}
        />
      )}
      <div dir="ltr" className="mt-28 ">
        <TableComp
          openTraderAlert={(row) => {
            setTraderAlert(true);
            setTraderPackageDetails(row);
          }}
        ></TableComp>
      </div>
    </div>
  );
};

export default EmailSettingPage;
