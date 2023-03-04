import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ChartsComp from '../../components/SupportPageComp/ChartsComp/ChartsComp';
import TableComp from '../../components/SupportPageComp/TableComp/TableComp';
import ComplaintDetails from '../../components/SupportPageComp/ComplaintDetails/ComplaintDetails';
import FormControl from '@mui/material/FormControl';
import { AiOutlineSearch } from 'react-icons/ai';

const SupportPage = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/technicalSupport');
	const [showComplaintDetails, setShowComplaintDetails] = useState(false);
	const [complaintDetails, setComplaintDetails] = useState(null);
	return (
		<div className='relative md:pt-10 md:pl-36 md:pr-8 p-4 md:bg-[#F7F7F7] bg-[#FFFFFF]'>
			<ChartsComp
				storeTechnicalSupports={fetchedData?.data?.data?.Store_Technicalsupports}
				percentStoreTechnicalSupports={fetchedData?.data?.percent_of_Store_Technicalsupports}
				// technicalCount={fetchedData?.data?.TechnicalsupportsCount}
				pending={fetchedData?.data?.pending_Technicalsupports}
				finished={fetchedData?.data?.finished_Technicalsupports}
			/>
			<div className={'mt-8'} style={{ backgroundColor: '#FFF' }}>
				<div className='p-4'>
					<div className='flex md:flex-row flex-col justify-between'>
						<div>
							<h2 className={'font-bold md:text-2xl text-[18px] whitespace-nowrap md:mb-5 mb-3'} style={{ color: '#011723' }}>
								جدول الشكاوى والاستفسارات
							</h2>
						</div>
						<div>
							<h3 className={'md:text-lg text-[16px] font-medium mb-2'} style={{ color: '#67747B' }}>
								البحث برقم الشكوى
							</h3>
							<div className='mb-4 w-full'>
								<FormControl className='flex flex-row gap-4  w-full' sx={{ minWidth: 120, flex: '1' }}>
									<label className={`flex-1  w-full h-14 relative `}>
										<input
											className='md:bg-[#ECFEFF] bg-[#ECFEFF00] h-14 w-[474px] outline-0 pr-12 rounded-lg '
											placeholder=' ادخل رقم الشكوى'
											type='text'
											name='name'
											onChange={() => { }}
											style={{
												border: '1px solid #7FFCFF',
												maxWidth: '100%'
											}}
										/>
										<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
											<AiOutlineSearch color='#7FFCFF' size={'20px'} />
										</div>
									</label>
								</FormControl>
							</div>
						</div>
					</div>
					{showComplaintDetails && (
						<ComplaintDetails
							complaintDetails={complaintDetails}
							cancel={() => {
								setShowComplaintDetails(false);
							}}
						></ComplaintDetails>
					)}
					<div dir={'ltr'}>
						<TableComp
							technicalsupports={fetchedData?.data?.Technicalsupports}
							loading={loading}
							reload={reload}
							setReload={setReload}
							setUser={(row) => {
								setComplaintDetails(row);
								setShowComplaintDetails(true);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupportPage;
