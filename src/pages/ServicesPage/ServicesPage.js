import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

// Components
import PageNavigate from '../../components/PageNavigate/PageNavigate';
import ServicesTable from '../../components/ServicesPageComp/ServicesTable/ServicesTable';
import NewService from '../../components/ServicesPageComp/NewService/NewService';
import ShowDetails from '../../components/ServicesPageComp/ShowDetails/ShowDetails'

// Icons
import Button from '../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const ServicesPage = () => {
	const [showNewProductInfo, setShowNewProductInfo] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);

	// Fetch data from API
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/service');
	

	return (
		<div className={`p-4 md:pl-36 pt-0`} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<PageNavigate currentPage={'الخدمات'} />
				<Button
					className={'md:h-14 h-[45px] md:w-44 w-full flex justify-center items-center text-xl'}
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
			{showNewProductInfo && (
				<NewService
					reload={reload}
					setReload={setReload}
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
			<div dir={'ltr'} className='md:mt-20 mt-5'>
				<ServicesTable
					showdetails={setShowDetailsModal}
					fetchedData={fetchedData}
					loading={loading}
					reload={reload}
					setReload={setReload}
				/>
			</div>
		</div>
	);
};

export default ServicesPage;
