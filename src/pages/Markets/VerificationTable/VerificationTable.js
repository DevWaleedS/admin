import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import VerificationTableSec from "../../../components/MarketsPagesComp/VerificationTable/VerificationTableSec/VerificationTableSec";
import TraderAlert from "../../../components/MarketsPagesComp/VerificationTable/TraderAlert/TraderAlert";
import VerificationData from "../../../components/MarketsPagesComp/VerificationTable/VerificationData/VerificationData";
import VerificationModal from "../../../components/MarketsPagesComp/VerificationTable/VerificationModal/VerificationModal";
import useFetch from '../../../hooks/useFetch';

const VerificationTable = () => {
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/verification');
  const [traderAlert, setTraderAlert] = useState(false);
  const [traderPackageDetails, setTraderPackageDetails] = useState({});
  const [showVerificationData, SetShowVerificationData] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [editVerificationData, setEditVerificationData] = useState(null);
  const [verification, setVerification] = useState(null);
  return (
    <div className="md:pr-4 md:pt-8 md:pl-36 p-4 pt-0 md:bg-[#fafafa] bg-[#ffffff]">
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"التوثيق"} parentPage={"المتاجر"} />
      </div>
      {verification === 'edit' ?
        <VerificationModal title={'سيتم إبلاغ المالك بتعديل توثيق متجره'} type={'edit'} cancel={() => setVerification(null)} />
        : verification === 'accepted' ?
          <VerificationModal title={'سيتم إبلاغ المالك بقبول توثيق متجره'} type={'accepted'} cancel={() => setVerification(null)} />
          : verification === 'rejected' ?
            <VerificationModal title={'سيتم إبلاغ المالك برفض توثيق متجره'} type={'rejected'} cancel={() => setVerification(null)} />
            : () => setVerification(null)
      }
      {
        traderAlert && (
          <TraderAlert
            reload={reload}
            setReload={setReload}
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
            reload={reload}
            setReload={setReload}
            cancel={() => {
              SetShowVerificationData(false);
              setEditVerificationData(null);
            }}
            editVerificationData={editVerificationData}
            verificationInfo={verificationInfo}
            setVerification={setVerification}
          ></VerificationData>
        )}
      <div className="md:mt-8 mt-4" dir="ltr">
        <VerificationTableSec
          fetchedData={fetchedData}
          loading={loading}
          reload={reload}
          setReload={setReload}
          openTraderAlert={({id,name}) => {
            setTraderAlert(true);
            setTraderPackageDetails({id,name});
          }}
          openVerificationData={
            (row) => {
              SetShowVerificationData(true);
              setVerificationInfo(row);
              setEditVerificationData(null);
            }
          }
          openEidtVerificationData={(row) => {
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