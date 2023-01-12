import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import TabsComp from "../../../components/DelegatesPageComp/EditDelegatePageComp/TabsComp/TabsComp";

import { BsTrash } from "react-icons/bs";

import Button from "../../../UI/Button/Button";

const EditDelegatePage = () => {
  return (
    <div className={`mt-5 px-4 pt-4`} style={{ backgroundColor: "#F7F7F7" }}>
      <div className="mt-6 flex justify-between items-center">
        <PageNavigate currentPage={"تعديل مندوب"} />
        <Button
          style={{ borderColor: "#FF3838" }}
          textStyle={{ color: "#FF3838" }}
          svg={<BsTrash color={"#FF3838"} />}
          type={"outline"}
        >
          حذف مندوب
        </Button>
      </div>
      <TabsComp></TabsComp>
    </div>
  );
};

export default EditDelegatePage;
