import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import InputsComps from "../../../components/SettingComp/PrimarySettingComp/InputsComps/InputsComps";
const PrimarySettings = () => {
  return (
    <div className={`px-4 pt-6`} style={{ backgroundColor: "#F7F7F7" }}>
      <div className="">
        <PageNavigate
          nestedPage={true}
          parentPage={"الاعدادات"}
          currentPage={"الاعدادات الاساسية"}
        />
      </div>
      <InputsComps></InputsComps>
    </div>
  );
};

export default PrimarySettings;
