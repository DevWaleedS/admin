import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import CountriesInfo from '../../../components/SettingComp/CountriesPageComp/CountriesInfo/CountriesInfo';
import AddCountry from '../../../components/SettingComp/CountriesPageComp/AddCountry/AddCountry';
import { AiOutlinePlus } from 'react-icons/ai';

const CountriesPages = () => {
	const [showAddNewCountry, setShowAddNewCountry] = useState(false);
	const [editData, setEditData] = useState(null);
	return (
		<div className={`md:px-4 md:pt-8 md:mt-5 md:pl-36 md:pr-24 p-4 pt-0`} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<h2 className='md:text-2xl text-[20px] font-bold'>جدول الدول</h2>
				<Button
					className='md:h-14 h-[45px] md:w-[213px] w-full md:text-[22px] text-[18px]'
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					type={'normal'}
					style={{ backgroundColor: '#B6BE34' }}
					fontSize={'font-medium'}
					onClick={() => {
						setShowAddNewCountry(true);
						setEditData(null);
					}}
				>
					اضافة دولة
				</Button>
			</div>
			{showAddNewCountry && (
				<AddCountry
					cancel={() => {
						setShowAddNewCountry(false);
					}}
					data={editData}
				></AddCountry>
			)}

			<CountriesInfo
				setData={(data) => {
					setEditData(data);
					setShowAddNewCountry(true);
				}}
			></CountriesInfo>
		</div>
	);
};

export default CountriesPages;
