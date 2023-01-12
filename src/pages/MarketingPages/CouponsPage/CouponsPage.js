import React, { useState } from "react";
import FilteringOptions from "../../../components/MarketingPageComp/CouponsPageComp/FilteringOptions/FilteringOptions";

import AddNewCoupon from "../../../components/MarketingPageComp/CouponsPageComp/AddNewCoupon/AddNewCoupon";
import TableComp from "../../../components/MarketingPageComp/CouponsPageComp/TableComp/TableComp";

import Button from "../../../UI/Button/Button";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

const CouponsPage = () => {
  const [showAddNewCoupon, setShowAddNewCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);
  console.log(couponDetails);

  return (
    <div className="relative pl-36 pr-8">
      <div className="flex justify-end">
        <div className="flex gap-4">
          <Button
            type={"normal"}
            style={{ backgroundColor: "#B6BE34" }}
            textStyle={{ color: "#fff" }}
            className={"px-4"}
            svg={<AiOutlinePlus fill="#fff" />}
            onClick={() => {
              setShowAddNewCoupon(true);
              setCouponDetails(null);
            }}
          >
            اضافة خصم
          </Button>
        </div>
      </div>
      <h3 className="text-2xl font-semibold">جدول الكوبونات</h3>
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
