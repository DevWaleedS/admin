import React, { useState } from 'react';

import useFetch from '../../../hooks/useFetch';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import TableComp from '../../../components/SettingComp/CurrencyPageComp/TableComp/TableComp';
import AddNewCurrency from '../../../components/SettingComp/CurrencyPageComp/AddNewCurrency/AddNewCurrency';

import Button from '../../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const CurrencyPage = () => {
	// get data from api
	const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/currency');
	
	const [showAddCurrency, setShowAddCurrency] = useState(false);
	return (
		<div className={`md:px-4 md:pt-6 md:pl-36 md:pb-20 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<PageNavigate nestedPage={true} parentPage={'الاعدادات'} currentPage={'العملات'} />
				<Button
					className='md:h-14 h-[45px] md:w-[213px] w-full md:text-[22px] text-[18px]'
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					type={'normal'}
					style={{ backgroundColor: '#B6BE34' }}
					fontSize={'text-2xl font-light'}
					onClick={() => {
						setShowAddCurrency(true);
					}}
				>
					اضافة عملة
				</Button>
			</div>

			{showAddCurrency && (
				<AddNewCurrency
					cancel={() => {
						setShowAddCurrency(false);
					}}
					reload={reload}
					setReload={setReload}
					loading={loading}
				/>
			)}

			<div className='md:mt-16 mt-6' dir='ltr'>
				<TableComp fetchedData={fetchedData} reload={reload} setReload={setReload} loading={loading} />
			</div>
		</div>
	);
};

export default CurrencyPage;
