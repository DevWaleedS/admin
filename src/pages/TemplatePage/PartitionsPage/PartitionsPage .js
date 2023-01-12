import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import PartitionsSections from "../../../components/TemplatePageComps/PartitionsPage/PartitionsSections/PartitionsSections";

const PartitionsPage = () => {
  return (
    <div className={`px-4 pt-8`} style={{ backgroundColor: "#fafafa" }}>
      <div
        className="p-4 rounded font-light"
        style={{ color: "#EFF9FF", backgroundColor: "#237EAE" }}
      >
        هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
      </div>
      <div className="mt-6">
        <PageNavigate parentPage={"القالب"} currentPage={"التقسيم"} />
      </div>
      <div className="pl-36 mt-10">
        <PartitionsSections></PartitionsSections>
      </div>
    </div>
  );
};

export default PartitionsPage;
