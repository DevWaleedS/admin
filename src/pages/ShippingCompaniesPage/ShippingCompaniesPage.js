import React, { useContext } from 'react';
import axios from 'axios';
import Context from '../../store/context';
import Switch from '@mui/material/Switch';
import useFetch from '../../hooks/useFetch';

const ShippingCompaniesPage = () => {
	const { fetchedData, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/shippingtype');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// change status for single item
	const changePageStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/changeShippingtypeStatus/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};

	return (
		<div className='relative h-full md:py-[52px] md:pl-[238px] md:pr-[98px] p-4 pt-0' style={{ backgroundColor: '#F7F7F7' }}>
			<h3 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
				شركات الشحن
			</h3>
			<div className='flex flex-col md:gap-8 gap-4 md:mt-20 mt-6'>
				{fetchedData?.data?.shippingtypes.map((company) => (
					<div key={company?.id} className='flex flex-col gap-5'>
						<div className='flex flex-row items-center gap-3'>
							<Switch
								onChange={() => changePageStatus(company?.id)}
								sx={{
									width: '32px',
									height: '20px',
									padding: 0,
									borderRadius: '12px',
									'& .MuiSwitch-thumb': {
										width: '12px',
										height: '12px',
									},
									'& .MuiSwitch-switchBase': {
										padding: '5px',
										top: '-1px',
										left: '0',
									},
									'& .MuiSwitch-switchBase.Mui-checked': {
										left: '-10px',
									},
									'& .Mui-checked .MuiSwitch-thumb': {
										backgroundColor: '#FFFFFF',
									},
									'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
										backgroundColor: '#3AE374',
										opacity: 1,
									},
								}}
								checked={company?.status === 'نشط' ? true : false}
							/>
							<h6 style={{ color: '#011723' }} className='md:text-[22px] text-[18px] font-medium'>
								{company?.name}
							</h6>
						</div>
						<div className='flex md:flex-row flex-col md:items-center items-start md:gap-5 gap-3'>
							<label style={{ color: '#011723' }} className='md:text-[22px] text-[18px] font-medium' htmlFor='api'>
								API
							</label>
							<input
								style={{ color: '#ADB5B9' }}
								className='md:text-[18px] text-[16px] w-full md:h-14 h-[45px] bg-white py-4 px-5 outline-none rounded-md'
								placeholder='api link'
								value={company?.name}
								disabled
								onChange={(e) => {
									console.log(e.target.value);
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ShippingCompaniesPage;
