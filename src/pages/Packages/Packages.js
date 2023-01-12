import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";
import PackagesTypes from "../../components/PackagesPageComp/PackagesTypes/PackagesTypes";
import AddNewPackagePlan from "../../components/PackagesPageComp/AddNewPackagePlan/AddNewPackagePlan";

const Packages = () => {
  const [openNewPackage, setOpenNewPackage] = useState(false);
  const [editPackageDetails, setEditPackageDetails] = useState(null);
  return (
    <div className={`p-4 relative`} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex justify-end ">
        <Button
          style={{ backgroundColor: "#B6BE34" }}
          svg={<AiOutlinePlus color="#fff" />}
          type={"normal"}
          onClick={() => {
            setOpenNewPackage(true);
            setEditPackageDetails(null);
          }}
        >
          إضافة باقة جديدة
        </Button>
      </div>
      {openNewPackage && (
        <AddNewPackagePlan
          cancel={() => {
            setOpenNewPackage(false);
          }}
          editPackageDetails={editPackageDetails}
        ></AddNewPackagePlan>
      )}
      <PackagesTypes
        editPackage={(row) => {
          setOpenNewPackage(true);
          setEditPackageDetails(row);
        }}
      ></PackagesTypes>
    </div>
  );
};

export default Packages;
