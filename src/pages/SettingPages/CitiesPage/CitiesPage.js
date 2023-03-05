import React, { useState } from "react";
import Button from "../../../UI/Button/Button";
import CitiesComp from "../../../components/SettingComp/CitiesPageComp/CitiesComp/CitiesComp";
import AddCity from "../../../components/SettingComp/CitiesPageComp/AddCity/AddCity";
import { AiOutlinePlus } from "react-icons/ai";
import useFetch from '../../../hooks/useFetch';

const CitiesPage = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/city');
	const [showAddNewCity, setShowAddNewCity] = useState(false);
	const [editData, setEditData] = useState(null);
	const [detailsCity, setDetailsCity] = useState(null);

	return (
		<div className={`md:px-4 md:pt-8 md:mt-5 md:pl-36 md:pr-24 p-4 pt-0`} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<h2 className='md:text-2xl text-[20px] font-bold'>جدول المدن</h2>
				<Button
					className='md:h-14 h-[45px] md:w-[213px] w-full md:text-[22px] text-[18px]'
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					type={'normal'}
					style={{ backgroundColor: '#1DBBBE' }}
					fontSize={'text-2xl font-light'}
					onClick={() => {
						setShowAddNewCity(true);
						setEditData(null);
						setDetailsCity(null);
					}}
				>
					اضافة مدينة
				</Button>
			</div>
			{showAddNewCity && (
				<AddCity
					cancel={() => {
						setShowAddNewCity(false);
					}}
					detailsCity={detailsCity}
					data={editData}
					reload={reload}
					setReload={setReload}
				></AddCity>
			)}

			<CitiesComp
				fetchedData={fetchedData?.data?.cities}
				loading={loading}
				reload={reload}
				setReload={setReload}
				setData={(data) => {
					setEditData(data);
					setShowAddNewCity(true);
					setDetailsCity(null);
				}}
				showCity={(data) => {
					setShowAddNewCity(true);
					setDetailsCity(data);
					setEditData(null);
				}}
			></CitiesComp>
		</div>
	);
};

export default CitiesPage;
