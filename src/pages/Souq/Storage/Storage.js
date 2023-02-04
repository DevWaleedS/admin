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
			<div className={`px-4 md:pt-8`} style={{ backgroundColor: '#fafafa' }}>
				<div className='md:p-4 p-2 md:text-[18px] text-[14px] font-medium text-right' style={{ color: '#237EAE', backgroundColor: '#C0E9FF' }}>
					هذه الواجهة خاصة بإدارة المخزون الخاص بسوق اطلبها
				</div>
				<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4 mt-4 md:mb-[18px] md:pl-[124px]'>
					<PageNavigate currentPage={'المخزون'} parentPage={'السوق'} />
					<Button
						className={'md:w-[180px] w-full md:h-12 h-[45px] md:text-[18px] text-[16px] flex justify-center items-center'}
						style={{ backgroundColor: '#B6BE34' }}
						textStyle={{ color: '#FFFFFF' }}
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
				<div className={'md:pl-[124px] p-0 mt-4'}>
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
