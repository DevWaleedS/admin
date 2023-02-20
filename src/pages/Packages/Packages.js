import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import PackagesTypes from '../../components/PackagesPageComp/PackagesTypes/PackagesTypes';
import AddNewPackagePlan from '../../components/PackagesPageComp/AddNewPackagePlan/AddNewPackagePlan';
import PackageTemplate from '../../components/PackagesPageComp/PackageTemplate/PackageTemplate';
import useFetch from '../../hooks/useFetch';

const Packages = () => {
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/package');
  const [openNewPackage, setOpenNewPackage] = useState(false);
  const [editPackageDetails, setEditPackageDetails] = useState(null);
  const [chooseTemplate, setChooseTemplate] = useState(false);
  const [selectedTemplate , setSelectedTemplate ] = useState([]);
  const getSelectedTemplate = (t) =>{setSelectedTemplate(t)};
  return (
    <div className="md:p-4 p-4 pt-2 relative md:bg-[#fafafa] bg-[#ffffff]">
      <div className="flex justify-end ">
        <Button
          className='md:w-[265px] w-full md:h-[56px] h-[45px] text-xl'
          style={{ backgroundColor: '#B6BE34' }}
          svg={<AiOutlinePlus color="#fff" className='w-5 h-5' />}
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
          setChooseTemplate={setChooseTemplate}
          selectedTemplate={selectedTemplate}
          reload={reload}
          setReload={setReload}
        ></AddNewPackagePlan>
      )}
      <PackagesTypes
        fetchedData={fetchedData}
        loading={loading}
        reload={reload}
        setReload={setReload}
        editPackage={(row) => {
          setOpenNewPackage(true);
          setEditPackageDetails(row);
        }}
      ></PackagesTypes>
      {chooseTemplate && (
        <PackageTemplate
          getSelectedTemplate={getSelectedTemplate}
          cancel={() => {
            setChooseTemplate(false);
          }}
        />
      )}
    </div>
  );
};

export default Packages;
