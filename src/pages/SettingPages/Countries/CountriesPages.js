import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import CountriesInfo from '../../../components/SettingComp/CountriesPageComp/CountriesInfo/CountriesInfo';
import AddCountry from '../../../components/SettingComp/CountriesPageComp/AddCountry/AddCountry';
import { AiOutlinePlus } from 'react-icons/ai';

const CountriesPages = () => {
	const [showAddNewCountry, setShowAddNewCountry] = useState(false);
	const [editData, setEditData] = useState(null);
	return (
		<div className={`px-4 pt-8 mt-5 pl-36 pr-24 `} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex justify-between'>
				<h2 className='text-2xl font-bold'>جدول الدول</h2>
				<Button
					className='h-14 w-[213px]'
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					type={'normal'}
					style={{ backgroundColor: '#B6BE34' }}
					fontSize={'text-2xl font-light'}
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
