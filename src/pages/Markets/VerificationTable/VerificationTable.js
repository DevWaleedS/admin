import React, { useState } from "react";
// import styles from "./ProductsTable.module.css";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import VerificationTableSec from "../../../components/MarketsPagesComp/VerificationTable/VerificationTableSec/VerificationTableSec";
import TraderAlert from "../../../components/MarketsPagesComp/VerificationTable/TraderAlert/TraderAlert";
import VerificationData from "../../../components/MarketsPagesComp/VerificationTable/VerificationData/VerificationData";
// import { ReactComponent as Call } from "../../../assets/Icons/icon-24- call.svg";
import VerificationModal from "../../../components/MarketsPagesComp/VerificationTable/VerificationModal/VerificationModal";

const VerificationTable = () => {
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState([]);
  const [showVerificationData, SetShowVerificationData] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [editVerificationData, setEditVerificationData] = useState(null);
  const [verification,setVerification]= useState(null)
  return (
    <div className="md:pr-4 md:pt-8 md:pl-36 p-4 pt-0 md:bg-[#fafafa] bg-[#ffffff]">
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"التوثيق"} parentPage={"المتاجر"} />
      </div>
      { verification === 'edit' ?
        <VerificationModal title={'سيتم إبلاغ المالك بتعديل توثيق متجره'} type={'edit'} cancel={()=>setVerification(null)} />
        : verification === 'accepted' ?
        <VerificationModal title={'سيتم إبلاغ المالك بقبول توثيق متجره'} type={'accepted'} cancel={()=>setVerification(null)} />
        : verification === 'rejected' ?
        <VerificationModal title={'سيتم إبلاغ المالك برفض توثيق متجره'} type={'rejected'} cancel={()=>setVerification(null)} />
        : ()=>setVerification(null)
      }
      {
        traderAlert && (
              <TraderAlert
                cancel={() => {
                setTraderAlert(false);
              }}
              traderPackageDetails={traderPackageDetails}
              />
      )}
      {
        showVerificationData 
        && (
          <VerificationData
          cancel={() => {
            SetShowVerificationData(false);
            setEditVerificationData(null);
          }}
          editVerificationData={editVerificationData}
          verificationInfo={verificationInfo}
          setVerification = {setVerification}
        ></VerificationData>
      )}
      <div className="md:mt-8 mt-4" dir="ltr">
        <VerificationTableSec 
          openTraderAlert={(row) => {
            setTraderAlert(true);
            setTraderPackageDetails(row);
          }}
          openVerificationData={
            (row)=>{
              SetShowVerificationData(true);
              setVerificationInfo(row);
              setEditVerificationData(null);
            }
          }
          openEidtVerificationData={(row)=>{
            SetShowVerificationData(true);
            setVerificationInfo(null);
            setEditVerificationData(row);
          }}
        />
      </div>
    </div>
  );
};

export default VerificationTable;