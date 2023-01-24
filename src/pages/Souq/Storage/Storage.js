import React, { useState } from 'react';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import StorageStatus from '../../../components/SoquStorageComp/StorageStatus/StorageStatus';
import StorageFilter from '../../../components/SoquStorageComp/StorageFilter/StorageFilter';
import StorageTable from '../../../components/SoquStorageComp/StorageTable/StorageTable';
import NewProduct from '../../../components/SoquStorageComp/NewProduct/NewProduct';
import Button from '../../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const Storage = () => {
	const [showNewProductInfo, setShowNewProductInfo] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
  return (
			<div className={`px-4 pt-8`} style={{ backgroundColor: '#fafafa' }}>
				<div className='p-4 font-medium text-right' style={{ color: '#237EAE', backgroundColor: '#C0E9FF' }}>
					هذه الواجهة خاصة بإدارة المخزون الخاص بسوق اطلبها
				</div>
				<div className='flex items-center justify-between mt-6 mb-[18px] pl-[124px]'>
					<PageNavigate currentPage={'المخزون'} parentPage={'السوق'} />
					<Button
						className={'flex justify-center items-center'}
						style={{ backgroundColor: '#B6BE34', width: '180px', height: '48px' }}
						textStyle={{ color: '#FFFFFF', fontSize: '18px' }}
						type={'normal'}
						svg={<AiOutlinePlus color='#FFFFFF' className='w-4 h-4' />}
						color={'white'}
						onClick={() => {
							setShowNewProductInfo(true);
							setEditProduct(false);
						}}
					>
						إضافة منتج
					</Button>
				</div>
				{showNewProductInfo && (
					<NewProduct
						cancel={() => {
							setShowNewProductInfo(false);
						}}
						editProduct={editProduct}
					/>
				)}
				<div className={'pl-[124px]'}>
					<StorageStatus />
					<StorageFilter />
					<div dir='ltr'>
						<StorageTable
							editProduct={(item) => {
								setEditProduct(item);
								setShowNewProductInfo(true);
							}}
						/>
					</div>
				</div>
			</div>
		);
};

export default Storage;
