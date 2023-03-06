import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ChartsComp from '../../components/OrderPageComp/ChartsComp/ChartsComp';
import TableComp from '../../components/OrderPageComp/TableComp/TableComp';
import NewMarket from '../../components/OrderPageComp/NewMarket/NewMarket';
import ServiceOrder from '../../components/OrderPageComp/ServiceOrder/ServiceOrder';

// icons
import FormControl from '@mui/material/FormControl';
import { AiOutlineSearch } from 'react-icons/ai';

const OrdersPage = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/websiteorder');

	const [showNewMarketDetails, setShowNewMarketDetails] = useState(false);
	const [showServiceOrderDetails, setShowServiceOrderDetails] = useState(false);
	const [complaintDetails, setComplaintDetails] = useState(null);

	return (
		<div className='relative md:pt-10 md:pl-36 h-fit md:pr-8 p-4 pt-0' style={{ backgroundColor: '#F7F7F7' }}>
			{/**  order charts  **/}
			<ChartsComp />

			<div className={'mt-8'} style={{ backgroundColor: '#FFF' }}>
				<div className='md:p-4 p-0'>
					<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4 md:p-0 p-3 mb-4'>
						<h2 className={'font-bold md:text-2xl text-[18px] whitespace-nowrap'} style={{ color: '#011723' }}>
							جدول الطلبات
						</h2>

						{/** search order input */}
						<div style={{ maxWidth: '100%' }}>
							<FormControl className='w-full flex flex-row gap-4' sx={{ minWidth: 120, maxWidth: '100%', flex: '1' }}>
								<label className={`w-full flex-1 md:h-14 h-[45px] relative `}>
									<input
										className='h-full outline-0 pr-12 rounded-lg bg-[#FFFFFF00]'
										placeholder=' ادخل رقم الطلب'
										type='text'
										name='name'
										onChange={() => {}}
										style={{
											width: '376px',
											maxWidth: '100%',
											border: '1px solid #A7A7A7',
										}}
									/>
									<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
										<AiOutlineSearch color='#B6BE34' size={'18px'}></AiOutlineSearch>
									</div>
								</label>
							</FormControl>
						</div>
					</div>
					{/** Market Details  page*/}
					{showNewMarketDetails && (
						<NewMarket
							complaintDetails={complaintDetails}
							cancel={() => {
								setShowNewMarketDetails(false);
							}}
						/>
					)}
					{/** Service Details  page*/}
					{showServiceOrderDetails && (
						<ServiceOrder
							complaintDetails={complaintDetails}
							cancel={() => {
								setShowServiceOrderDetails(false);
							}}
						/>
					)}

					{/** Orders Table  */}
					<div dir={'ltr'}>
						<TableComp
							fetchedData={fetchedData}
							loading={loading}
							reload={reload}
							setReload={setReload}
							// to define order details
							setUser={(row, newMarket) => {
								setComplaintDetails(row);
								if (newMarket) {
									setShowNewMarketDetails(true);
									return;
								}
								setShowServiceOrderDetails(true);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
