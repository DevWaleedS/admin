import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import SocialMediaActivity from "../../../components/SettingComp/SocialMediaLinksPageComp/SocialMediaActivity/SocialMediaActivity";
import AddNewLink from "../../../components/SettingComp/SocialMediaLinksPageComp/AddNewLink/AddNewLink";

const SocialMediaLinksPage = () => {
  const [showAddNewLink, setShowAddNewLink] = useState(false);
  return (
    <div className={`px-4 pt-6`} style={{ backgroundColor: "#F7F7F7" }}>
      <h2 className="text-2xl font-semibold mb-5">صفحات التواصل الاجتماعي </h2>
      <PageNavigate
        nestedPage={true}
        parentPage={"الاعدادات"}
        currentPage={"صفحات التواصل الاجتماعي"}
      />
      {showAddNewLink && (
        <AddNewLink
          cancel={() => {
            setShowAddNewLink(false);
          }}
        ></AddNewLink>
      )}
      <SocialMediaActivity
        openAddLink={() => {
          setShowAddNewLink(true);
        }}
      ></SocialMediaActivity>
    </div>
  );
};

export default SocialMediaLinksPage;
