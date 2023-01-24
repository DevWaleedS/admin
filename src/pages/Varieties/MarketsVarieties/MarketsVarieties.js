import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import FilteringOptions from "../../../components/VarietiesComp/MarketVarieties/FilteringOptions/FilteringOptions";
import AddVariety from "../../../components/VarietiesComp/MarketVarieties/AddVariety/AddVariety";
import AddSubVariety from "../../../components/VarietiesComp/MarketVarieties/AddSubVariety/AddSubVariety";

import ShopVarietiesTable from "../../../components/VarietiesComp/MarketVarieties/ShopVarietiesTable/ShopVarietiesTable";

import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const ShopVarieties = () => {
  const [showAddVarietyPage, setShowAddVarietyPage] = useState(false);
  const [editVariety, setEditVariety] = useState(null);
  const [showAddSubVariety,setShowAddSubVariety] =useState(false);

  return (
    <div className={`px-4 pt-8 mt-5`} style={{ backgroundColor: "#F6F6F6" }}>
      <div className="ml-36">
        <div className="mt-6 flex items-center justify-between">
          <PageNavigate currentPage={"تصنيفات السوق"} className='text-lg font-medium'/>
          <div className="flex gap-4">
            <Button
              className={"flex justify-center items-center"}
              type={"normal"}
              svg={<AiOutlinePlus color="#fff" className='w-5 h-5'/>}
              color={"white"}
              style={{ backgroundColor: "#B6BE34",width:'200px',height:'57px' }}
              textStyle={{ color: "#EFF9FF",fontSize:'20px' }}
              onClick={() => {
                setShowAddVarietyPage(true);
                setEditVariety(null);
              }}
            >
              اضف تصنيف
            </Button>
          </div>
        </div>
        <FilteringOptions></FilteringOptions>

        {showAddVarietyPage && (
          <AddVariety
            cancel={() => {
              setShowAddVarietyPage(false);
            }}
            data={editVariety}
            setShowAddSubVariety={setShowAddSubVariety}
          ></AddVariety>
        )}
        {
          showAddSubVariety &&
          <AddSubVariety 
              cancel={() => {
                setShowAddSubVariety(false);
              }}
          />
        }
        <div dir="ltr" className={"mt-10"}>
          <ShopVarietiesTable
              editSection={(item) => {
                setEditVariety(item);
                setShowAddVarietyPage(true);
              }}
          >
          </ShopVarietiesTable>
        </div>
      </div>
    </div>
  );
};

export default ShopVarieties;
