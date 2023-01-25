import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import ChangeSliderSec from "../../../components/TemplatePageComps/SliderPage/ChangeSliderSec/ChangeSliderSec";

const TemplatePage = () => {
  return (
    <div className={`px-4 pt-8`} style={{ backgroundColor: "#fafafa" }}>
      <div
        className="p-4 rounded font-light"
        style={{ color: "#EFF9FF", backgroundColor: "#237EAE" }}
      >
        هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
      </div>
      <div className="mt-6">
        <PageNavigate className='text-lg font-normal' parentPage={"القالب"} currentPage={"السلايدر"} />
      </div>
      <div className={""}>
        <ChangeSliderSec></ChangeSliderSec>
      </div>
    </div>
  );
};

export default TemplatePage;
