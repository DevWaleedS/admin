import React from "react";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import ChangeLogoSec from "../../components/TemplatePageComps/MainPage/ChangeLogoSec/ChangeLogoSec";
import ChangeBannerSec from "../../components/TemplatePageComps/MainPage/ChangeBannerSec/ChangeBannerSec";
import CommentsAndClients from "../../components/TemplatePageComps/MainPage/CommentsAndClients/CommentsAndClients";

const TemplatePage = () => {
  return (
    <div className={`px-4 pt-8`} style={{ backgroundColor: "#fafafa" }}>
      <div
        className="p-4 rounded font-medium"
        style={{ color: "#EFF9FF", backgroundColor: "#237EAE" }}
      >
        هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
      </div>
      <div className="mt-6">
        <PageNavigate currentPage={"تنسيق القالب"} />
      </div>
      <div className={""}>
        <ChangeLogoSec></ChangeLogoSec>
        <ChangeBannerSec></ChangeBannerSec>
        <CommentsAndClients></CommentsAndClients>
        {/* <div dir="ltr">
          <StorageTable />
        </div> */}
      </div>
    </div>
  );
};

export default TemplatePage;
