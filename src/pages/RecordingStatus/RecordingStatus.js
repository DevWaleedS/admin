import React from "react";
import styles from "./RecordingStatus.module.css";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import UsersTable from "../../components/RecordingStatusPageComp/UsersTable/UsersTable";
import { Filter } from "../../assets/Icons/index";

const RecordingStatus = () => {
  return (
    <div className={`${styles.recording_status} p-4 pl-36`}>
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"حالة التسجيل"} />
        <div className={`${styles.filter_con}`}>
          <img src={Filter} alt="" />
          <h2>فلتر</h2>
        </div>
      </div>
      <div className="mt-8" dir="ltr">
        <UsersTable />
      </div>
    </div>
  );
};

export default RecordingStatus;
