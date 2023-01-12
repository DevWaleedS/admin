import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import FilteringOptions from "../../../components/VarietiesComp/MarketVarieties/FilteringOptions/FilteringOptions";
import AddVariety from "../../../components/VarietiesComp/MarketVarieties/AddVariety/AddVariety";
import AddSection from "../../../components/VarietiesComp/MarketVarieties/AddSection/AddSection";

import ShopVarietiesTable from "../../../components/VarietiesComp/MarketVarieties/ShopVarietiesTable/ShopVarietiesTable";

import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const ShopVarieties = () => {
  const [showAddVarietyPage, setShowAddVarietyPage] = useState(false);
  const [showAddSectionPage, setShowAddSectionPage] = useState(false);

  return (
    <div className={`px-4 pt-8 mt-5`} style={{ backgroundColor: "#F6F6F6" }}>
      <div className="ml-36">
        <div className="mt-6 flex items-center justify-between">
          <PageNavigate currentPage={"تصنيفات السوق"} />
          <div className="flex gap-4">
            <Button
              className={"flex justify-center items-center"}
              type={"normal"}
              svg={<AiOutlinePlus color="#fff" />}
              color={"white"}
              style={{ backgroundColor: "#B6BE34" }}
              onClick={() => {
                setShowAddVarietyPage(true);
              }}
            >
              اضف تصنيف
            </Button>
            <Button
              className={"flex justify-center items-center"}
              type={"normal"}
              svg={<AiOutlinePlus color="#fff" />}
              color={"white"}
              style={{ backgroundColor: "#B6BE34" }}
              onClick={() => {
                setShowAddSectionPage(true);
              }}
            >
              اضف قسم
            </Button>
          </div>
        </div>
        <FilteringOptions></FilteringOptions>

        {showAddVarietyPage && (
          <AddVariety
            cancel={() => {
              setShowAddVarietyPage(false);
            }}
          ></AddVariety>
        )}
        {showAddSectionPage && (
          <AddSection
            cancel={() => {
              setShowAddSectionPage(false);
            }}
          ></AddSection>
        )}
        <div dir="ltr" className={"mt-10"}>
          <ShopVarietiesTable></ShopVarietiesTable>
        </div>
      </div>
    </div>
  );
};

export default ShopVarieties;
