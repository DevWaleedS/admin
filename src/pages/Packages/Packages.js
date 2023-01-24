import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import PackagesTypes from '../../components/PackagesPageComp/PackagesTypes/PackagesTypes';
import AddNewPackagePlan from '../../components/PackagesPageComp/AddNewPackagePlan/AddNewPackagePlan';
import PackageTemplate from '../../components/PackagesPageComp/PackageTemplate/PackageTemplate';

const Packages = () => {
  const [openNewPackage, setOpenNewPackage] = useState(false);
  const [editPackageDetails, setEditPackageDetails] = useState(null);
  const [chooseTemplate,setChooseTemplate] = useState(false);
  return (
    <div className={`p-4 relative `} style={{ backgroundColor: "#fafafa" }}>
      <div className="flex justify-end ">
        <Button
        className='text-xl '
          style={{ width:'265px',height: '56px',backgroundColor: '#B6BE34' }}
          svg={<AiOutlinePlus color="#fff" className='w-5 h-5'/>}
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
          setChooseTemplate ={setChooseTemplate}
        ></AddNewPackagePlan>
      )}
      <PackagesTypes
        editPackage={(row) => {
          setOpenNewPackage(true);
          setEditPackageDetails(row);
        }}
      ></PackagesTypes>
       {chooseTemplate && (
        <PackageTemplate 
          cancel={() => {
          setChooseTemplate(false);
          }}
        />
      )}
    </div>
  );
};

export default Packages;
