import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import TabsComp from "../../../components/DelegatesPageComp/EditDelegatePageComp/TabsComp/TabsComp";

const EditDelegatePage = () => {
  return (
    <div className={`mt-5 px-4 pt-4`} style={{ backgroundColor: "#F7F7F7" }}>
      <div className="mt-6 flex justify-between items-center">
        <PageNavigate currentPage={"تعديل مندوب"} />
      </div>
      <TabsComp />
    </div>
  );
};

export default EditDelegatePage;
