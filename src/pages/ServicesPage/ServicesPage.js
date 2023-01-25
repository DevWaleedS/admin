import React from 'react';
import PageNavigate from '../../components/PageNavigate/PageNavigate';
import ServicesTable from '../../components/ServicesPageComp/ServicesTable/ServicesTable';

import Button from '../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import NewService from '../../components/ServicesPageComp/NewService/NewService';
import ShowDetails from '../../components/ServicesPageComp/ShowDetails/ShowDetails';

const ServicesPage = () => {
	const [showNewProductInfo, setShowNewProductInfo] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	return (
		<div className={`p-4 pl-36`} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex items-center justify-between'>
				<PageNavigate currentPage={'الخدمات'} />
				<div className='flex gap-2'>
					<Button
						className={'flex justify-center items-center h-14 w-44 text-xl '}
						type={'normal'}
						svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
						style={{ backgroundColor: '#02466A' }}
						color={'white'}
						onClick={() => {
							setShowNewProductInfo(true);
						}}
					>
						إضافة خدمة
					</Button>
				</div>
			</div>
			{showNewProductInfo && (
				<NewService
					cancel={() => {
						setShowNewProductInfo(false);
					}}
				/>
			)}
			{showDetailsModal && (
				<ShowDetails
					cancel={() => {
						setShowDetailsModal(false);
					}}
				/>
			)}
			<div dir={'ltr'} className='mt-20'>
				<ServicesTable showdetails={setShowDetailsModal}></ServicesTable>
			</div>
		</div>
	);
};

export default ServicesPage;
