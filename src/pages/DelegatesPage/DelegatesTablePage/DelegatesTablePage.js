import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import DelegatesPageTable from "../../../components/DelegatesPageComp/DelegatesTablePageComp/DelegatesPageTable/DelegatesPageTable";
import Button from "../../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

const DelegatesTablePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`mt-5 px-4 pt-4 pl-36`}
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="mt-6 flex justify-between items-center">
        <PageNavigate currentPage={"عرض المندوبين"} />
        <Button
          className={"flex justify-center items-center"}
          style={{ backgroundColor: "#02466A" }}
          type={"normal"}
          svg={<AiOutlinePlus color="#fff" />}
          color={"white"}
          onClick={() => {
            navigate("/إضافة_مندوب_جديد");
          }}
        >
          إضافة مندوب جديد
        </Button>
      </div>
      <div className="mt-5">
        <label className={` flex-1 relative `}>
          <input
            className="h-full w-full p-4  outline-0 pr-10 rounded-lg "
            placeholder=" ابحث عن مندوب"
            type="text"
            name="name"
            onChange={() => {
              console.log("zed");
            }}
            style={{
              border: "1px solid #1DBBBE",
            }}
          />
          <div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
            <AiOutlineSearch color="#1DBBBE" size={"18px"}></AiOutlineSearch>
          </div>
        </label>
      </div>

      <div className="mt-10" dir={"ltr"}>
        <DelegatesPageTable></DelegatesPageTable>
      </div>
    </div>
  );
};

export default DelegatesTablePage;
