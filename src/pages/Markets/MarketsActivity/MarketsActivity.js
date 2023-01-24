import React, { useState } from 'react';
import styles from './MarketsActivity.module.css';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Button from '../../../UI/Button/Button';
import { IoIosAdd } from 'react-icons/io';
import MarketsActivityTable from '../../../components/MarketsPagesComp/MarketsActivity/MarketsActivityTable/MarketsActivityTable';
import AddAnActivity from '../../../components/MarketsPagesComp/MarketsActivity/AddAnActivity/AddAnActivity';
import EditActivity from '../../../components/MarketsPagesComp/MarketsActivity/AddAnActivity/AddAnActivity';

const MarketsActivity = () => {
	const [showAddActivity, setShowAddActivity] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	return (
		<div className={`${styles.recording_status} p-12 pl-36 `}>
			<div className='flex items-center justify-between'>
				<PageNavigate currentPage={'نشاط المتاجر'} parentPage={'المتاجر'} />
				<Button
					onClick={() => {
						setShowAddActivity(true);
					}}
					className='w-[153px] h-[56px] text-lg px-1'
					style={{ backgroundColor: '#02466A' }}
					type={'normal'}
					svg={<IoIosAdd style={{ color: '#fff', fontSize: '1.25rem' }} className='w-7 h-7'></IoIosAdd>}
				>
					إضافة نشاط
				</Button>
			</div>
			{showAddActivity && (
				<AddAnActivity
					cancel={() => {
						setShowAddActivity(false);
					}}
					editProduct={editProduct}
				></AddAnActivity>
			)}
			{showAddActivity && (
				<EditActivity
					cancel={() => {
						setShowAddActivity(false);
					}}
					editProduct={editProduct}
				></EditActivity>
			)}
			
			<h2 className='mt-12 mb-6 text-xl font-medium'>الأنشطة المضافة</h2>
			<div dir='ltr'>
				<MarketsActivityTable
					editProduct={(item) => {
						setEditProduct(item);
						setShowAddActivity(true);
					}}
				/>
			</div>
		</div>
	);
};

export default MarketsActivity;
