import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import ChangeSliderSec from "../../../components/TemplatePageComps/SliderPage/ChangeSliderSec/ChangeSliderSec";

const TemplatePage = () => {
  return (
    <div className={`px-4 md:pt-8 pt-0 pb-10`} style={{ backgroundColor: "#fafafa",height:"100%"}}>
      <div
        className="md:pr-5 py-3 px-2 rounded font-normal md:text-lg text-[14px]"
        style={{ color: "#EFF9FF", backgroundColor: "#237EAE" }}
      >
        هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
      </div>
      <div className="md:mt-6 mt-4">
        <PageNavigate className='text-lg font-normal' parentPage={"القالب"} currentPage={"السلايدر"} />
      </div>
      <div>
        <ChangeSliderSec></ChangeSliderSec>
      </div>
    </div>
  );
};

export default TemplatePage;
