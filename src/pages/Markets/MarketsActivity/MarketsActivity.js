import React, { useState } from 'react';
import styles from './MarketsActivity.module.css';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Button from '../../../UI/Button/Button';

// Icons
import { IoIosAdd } from 'react-icons/io';
import MarketsActivityTable from '../../../components/MarketsPagesComp/MarketsActivity/MarketsActivityTable/MarketsActivityTable';
import AddAnActivity from '../../../components/MarketsPagesComp/MarketsActivity/AddAnActivity/AddAnActivity';
import EditActivity from '../../../components/MarketsPagesComp/MarketsActivity/EditActivity/EditActivity';
import useFetch from '../../../hooks/useFetch';



const MarketsActivity = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/activity');
	const [showAddActivity, setShowAddActivity] = useState(false);
	const [editProduct, setEditProduct] = useState(null);

	
	return (
		<div className={`${styles.recording_status} md:p-12 md:pl-36 p-4 pt-0`}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
				<PageNavigate currentPage={'نشاط المتاجر'} parentPage={'المتاجر'} />
				<Button
					onClick={() => {
						setShowAddActivity(true);
					}}
					className='px-1 md:w-[153px] w-full md:h-[56px] h-[44px] text-lg'
					style={{ backgroundColor: '#02466A' }}
					type={'normal'}
					svg={<IoIosAdd style={{ color: '#fff', fontSize: '1.25rem' }} className='w-7 h-7'></IoIosAdd>}
				>
					إضافة نشاط
				</Button>
			</div>
			{showAddActivity && (
				<AddAnActivity
					reload={reload}
					setReload={setReload}
					cancel={() => {
						setShowAddActivity(false);
					}}
				>
				</AddAnActivity>
			)}
			{editProduct && (
				<EditActivity
					reload={reload}
					setReload={setReload}
					cancel={() => {
						setEditProduct(null);
					}}
					Product={editProduct}
				></EditActivity>
			)}
			<h2 className='md:mt-12 mt-5 mb-6 text-xl font-medium'>الأنشطة المضافة</h2>
			<div dir='ltr'>
				<MarketsActivityTable
					fetchedData={fetchedData}
					loading={loading}
					reload={reload}
					setReload={setReload}
					editProduct={(item) => {
						setEditProduct(item);
					}}
				/>
			</div>
		</div>
	);
};

export default MarketsActivity;
