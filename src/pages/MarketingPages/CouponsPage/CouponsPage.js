import React, { useState } from "react";
import FilteringOptions from "../../../components/MarketingPageComp/CouponsPageComp/FilteringOptions/FilteringOptions";
import AddNewCoupon from "../../../components/MarketingPageComp/CouponsPageComp/AddNewCoupon/AddNewCoupon";
import TableComp from "../../../components/MarketingPageComp/CouponsPageComp/TableComp/TableComp";
import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const CouponsPage = () => {
  const [showAddNewCoupon, setShowAddNewCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);
  console.log(couponDetails);

  return (
    <div style={{ backgroundColor:'#FAFAFA' }} className="relative pt-[50px] pl-[134px] pr-[56px]">
      <div className="flex flex-row items-center justify-between gap-4">
        <h3 style={{ fontSize:'22px',color:'#011723' }} className="font-bold">جدول الكوبونات</h3>
          <Button
            type={"normal"}
            style={{ width:'216px',height:'56px', backgroundColor: "#B6BE34" }}
            textStyle={{ color: "#EFF9FF",fontSize:'20px' }}
            className={"font-medium px-4"}
            svg={<AiOutlinePlus fill="#fff" />}
            onClick={() => {
              setShowAddNewCoupon(true);
              setCouponDetails(null);
            }}
          >
            اضافة خصم
          </Button>
      </div>
      <FilteringOptions></FilteringOptions>
      {showAddNewCoupon && (
        <AddNewCoupon
          cancel={() => {
            setShowAddNewCoupon(false);
          }}
          couponDetails={couponDetails}
        ></AddNewCoupon>
      )}
      <div dir="ltr">
        <TableComp
          setUser={(row) => {
            setCouponDetails(row);
            setShowAddNewCoupon(true);
          }}
        ></TableComp>
      </div>
    </div>
  );
};

export default CouponsPage;
