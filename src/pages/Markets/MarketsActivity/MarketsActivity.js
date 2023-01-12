import React, { useState } from "react";
import styles from "./MarketsActivity.module.css";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import Button from "../../../UI/Button/Button";
import { IoIosAdd } from "react-icons/io";
import MarketsActivityTable from "../../../components/MarketsPagesComp/MarketsActivity/MarketsActivityTable/MarketsActivityTable";
import AddAnActivity from "../../../components/MarketsPagesComp/MarketsActivity/AddAnActivity/AddAnActivity";

const MarketsActivity = () => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  return (
    <div className={`${styles.recording_status} p-12 pl-36 `}>
      <div className="flex items-center justify-between">
        <PageNavigate currentPage={"نشاط المتاجر"} parentPage={"المتاجر"} />
        <Button
          onClick={() => {
            setShowAddActivity(true);
          }}
          style={{ backgroundColor: "#02466A" }}
          type={"normal"}
          svg={
            <IoIosAdd style={{ color: "#fff", fontSize: "1.25rem" }}></IoIosAdd>
          }
        >
          إضافة نشاط
        </Button>
      </div>
      {showAddActivity && (
        <AddAnActivity
          cancel={() => {
            setShowAddActivity(false);
          }}
        ></AddAnActivity>
      )}
      <h2 className="mt-12 text-xl font-medium">الأنشطة المضافة</h2>
      <div dir="ltr">
        <MarketsActivityTable />
      </div>
    </div>
  );
};

export default MarketsActivity;
