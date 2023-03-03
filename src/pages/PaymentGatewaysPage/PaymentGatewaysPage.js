import React, { useState, useContext } from 'react';

import axios from 'axios';
import Context from '../../store/context';
import Switch from '@mui/material/Switch';
import useFetch from '../../hooks/useFetch';

// icons
import mada from '../../assets/images/mada.png';
import stc from '../../assets/images/stc.png';
import paypal from '../../assets/images/paypal.png';

const payments = [
	{
		id: 1,
		name: 'mada',
		img: mada,
		active: true,
	},
	{
		id: 2,
		name: 'stc',
		img: stc,
		active: true,
	},
	{
		id: 3,
		name: 'paypal',
		img: paypal,
		active: true,
	},
];

const PaymentGatewaysPage = () => {
	const { fetchedData, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/paymenttype');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// change status for single item
	const changePageStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/changePaymenttypeStatus/${id}`, {
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
		<div className='relative h-full md:py-12 md:pl-36 md:pr-24 p-4 pt-0' style={{ backgroundColor: '#F7F7F7' }}>
			<h3 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
				بوابات الدفع
			</h3>

			<div className='flex flex-row items-center gap-x-4 gap-y-10 flex-wrap mt-20'>
				{fetchedData?.data?.paymenttypes.map((payment) => (
					<div style={{ height: '120px' }} key={payment?.id} className='md:w-[280px] w-full flex flex-col items-center gap-5'>
						<div style={{ boxShadow: '3px 3px 6px #0000000A' }} className='w-full flex flex-row items-center justify-center bg-white p-8 rounded-sm'>
							<img src={payment?.image} alt={payment?.name} style={{ width: '85px', height: '35px' }} />
						</div>
						<Switch
							onChange={() => changePageStatus(payment?.id)}
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
							checked={payment?.status === 'نشط' ? true : false}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default PaymentGatewaysPage;
