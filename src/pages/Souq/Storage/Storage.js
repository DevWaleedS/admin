import React from 'react';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import StorageStatus from '../../../components/SoquStorageComp/StorageStatus/StorageStatus';
import StorageFilter from '../../../components/SoquStorageComp/StorageFilter/StorageFilter';
import StorageTable from '../../../components/SoquStorageComp/StorageTable/StorageTable';

const Storage = () => {
	return (
		<div className={`px-4 pt-8`} style={{ backgroundColor: '#fafafa' }}>
			<div className='p-4 font-medium' style={{ color: '#237EAE', backgroundColor: '#C0E9FF' }}>
				هذه الواجهة خاصة بإدارة المخزون الخاص بسوق اطلبها
			</div>
			<div className='my-6'>
				<PageNavigate currentPage={'المخزون'} parentPage={'السوق'} />
			</div>
			<div className={'pl-20'}>
				<StorageStatus />
				<StorageFilter />
				<div dir='ltr'>
					<StorageTable />
				</div>
			</div>
		</div>
	);
};

export default Storage;
