import React, { useState } from "react";

import useFetch from '../../../hooks/useFetch';
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import FilteringOptions from "../../../components/VarietiesComp/ShopVarieties/FilteringOptions/FilteringOptions";
import AddVariety from "../../../components/VarietiesComp/ShopVarieties/AddVariety/AddVariety";
import AddSubVariety from "../../../components/VarietiesComp/ShopVarieties/AddSubVariety/AddSubVariety";

import ShopVarietiesTable from "../../../components/VarietiesComp/ShopVarieties/ShopVarietiesTable/ShopVarietiesTable";

// icons
import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const ShopVarieties = () => {

  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/storecategory');
  
  const [showAddVarietyPage, setShowAddVarietyPage] = useState(false);
  const [editVariety, setEditVariety] = useState(null);
  const [showAddSubVariety, setShowAddSubVariety] = useState(false);

  return (
			<div className='md:px-4 md:pt-8 md:pl-36 p-4 pt-0 md:mt-5 mt-0 md:bg-[#F6F6F6] bg-[#FFFFFF]'>
				<div className='p-3 rounded font-medium' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
					هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
				</div>
				<div className='md:mt-6 mt-4 flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
					<PageNavigate currentPage={'تصنيفات السوق'} />
					<Button
						className='md:w-[200px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[18px] flex justify-center items-center'
						type={'normal'}
						svg={<AiOutlinePlus color='#fff' />}
						color={'white'}
						style={{ backgroundColor: '#B6BE34', width: '200px', height: '57px' }}
						textStyle={{ color: '#EFF9FF', fontSize: '21px' }}
						onClick={() => {
							setShowAddVarietyPage(true);
							setEditVariety(null);
						}}
					>
						اضف تصنيف
					</Button>
				</div>
				<FilteringOptions />

				{/** --------------------------------------------------------------- */}

				{/** add new  category */}
				{showAddVarietyPage && (
					<AddVariety
						reload={reload}
						setReload={setReload}
						data={editVariety}
						setShowAddSubVariety={setShowAddSubVariety}
						cancel={() => {
							setShowAddVarietyPage(false);
						}}
					/>
				)}

				{/** --------------------------------------------------------------- */}

				{/** add new sub category */}
				{showAddSubVariety && (
					<AddSubVariety
						cancel={() => {
							setShowAddSubVariety(false);
						}}
					/>
				)}

				{/** Markets Table  */}
				<div dir='ltr' className='md:mt-10 mt-6'>
					<ShopVarietiesTable
						editSection={(item) => {
							setEditVariety(item);
							setShowAddVarietyPage(true);
						}}
						fetchedData={fetchedData}
						loading={loading}
						reload={reload}
						setReload={setReload}
					/>
				</div>
			</div>
		);
};

export default ShopVarieties;
