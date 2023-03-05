import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import FilteringOptions from '../../../components/VarietiesComp/MarketVarieties/FilteringOptions/FilteringOptions';
import AddVariety from '../../../components/VarietiesComp/MarketVarieties/AddVariety/AddVariety';
import AddSubVariety from '../../../components/VarietiesComp/MarketVarieties/AddSubVariety/AddSubVariety';
import ShopVarietiesTable from '../../../components/VarietiesComp/MarketVarieties/ShopVarietiesTable/ShopVarietiesTable';
import Button from '../../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const ShopVarieties = () => {
	// to get all  data from server
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/category');

	const [showAddVarietyPage, setShowAddVarietyPage] = useState(false);
	const [showAddSubVariety, setShowAddSubVariety] = useState(false);
	const [editVariety, setEditVariety] = useState(null);

	
	return (
		<div className={`md:px-4 md:pt-8 md:pl-36 p-4 pt-0 md:mt-5 mt-0 md:bg-[#F6F6F6] bg-[#FFFFFF]`}>
			<div className='md:mt-6 mt-0 flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
				<PageNavigate currentPage={'تصنيفات السوق'} className='md:text-lg text-[16px] font-medium' />
				<Button
					className={'md:w-[200px] w-full md:h-[56px] h-[45px] md:text-[20px] text-[18px] flex justify-center items-center'}
					type={'normal'}
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					color={'white'}
					style={{ backgroundColor: '#B6BE34' }}
					textStyle={{ color: '#EFF9FF' }}
					onClick={() => {
						setShowAddVarietyPage(true);
						setEditVariety(null);
					}}
				>
					اضف تصنيف
				</Button>
			</div>
			<FilteringOptions />

			{/** ----------------- ---------------------------------------------- */}

			{/** add new  category */}
			{showAddVarietyPage && (
				<AddVariety
					data={editVariety}
					reload={reload}
					setReload={setReload}
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

			{/** Stores Table */}
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
