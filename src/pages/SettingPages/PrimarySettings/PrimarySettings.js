import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import InputsComps from "../../../components/SettingComp/PrimarySettingComp/InputsComps/InputsComps";
const PrimarySettings = () => {
  return (
    <div className={`px-4 md:pt-6 pt-0`} style={{ backgroundColor: "#F7F7F7" }}>
        <PageNavigate
          nestedPage={true}
          parentPage={"الاعدادات"}
          currentPage={"الاعدادات الاساسية"}
        />
      <InputsComps></InputsComps>
    </div>
  );
};

export default PrimarySettings;
