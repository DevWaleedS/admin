import React, { useState } from "react";
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import PagesPageTable from "../../components/PagesPageComp/PagesPageTable/PagesPageTable";
import Filtering from "../../components/PagesPageComp/Filtering/Filtering";
import AddNewPage from "../../components/PagesPageComp/AddNewPage/AddNewPage";

import Button from "../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const PagesPage = () => {
  const [showAddNewPage, setShowAddNewPage] = useState(false);
  return (
    <div className={`px-4 pt-8 mt-5`} style={{ backgroundColor: "#fafafa" }}>
      <div
        className="p-3 rounded font-normal text-base"
        style={{ color: "#EFF9FF", backgroundColor: "#237EAE" }}
      >
        هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
      </div>
      <div className="ml-36">
        <div className="mt-6 flex items-center justify-between">
          <PageNavigate currentPage={"الصفحات"} />
          <Button
            className={"flex justify-center items-center h-14 w-[183px] text-lg"}
            type={"normal"}
            svg={<AiOutlinePlus color="#fff" className='w-5 h-5'/>}
            color={"white"}
            onClick={() => {
              setShowAddNewPage(true);
            }}
          >
            انشاء صفحة
          </Button>
        </div>
        {showAddNewPage && (
          <AddNewPage
            cancel={() => {
              setShowAddNewPage(false);
            }}
          ></AddNewPage>
        )}
        <Filtering></Filtering>
        <div dir="ltr" className={"mt-10"}>
          <PagesPageTable></PagesPageTable>
        </div>
      </div>
    </div>
  );
};

export default PagesPage;
