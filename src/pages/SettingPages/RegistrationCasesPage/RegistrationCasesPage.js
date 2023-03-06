import React, { useContext, useState } from 'react';
import axios from 'axios';
import Context from '../../../store/context';
import useFetch from '../../../hooks/useFetch';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';

// icons
import Switch from '@mui/material/Switch';
import CircularLoading from '../../../UI/CircularLoading/CircularLoading';

// cases array
const cases = [
	{ id: 1, name: 'التسجيل مع موافقة الادارة', active: true },
	{ id: 2, name: 'ايقاف التسجيل', active: false },
	{ id: 3, name: 'التسجيل تلقائي', active: false },
];

const RegistrationCasesPage = () => {
	// get data from api
	const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/registration_status_show');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [status, setStatus] = useState({ registration_status: '' });

	// change status for single item
	const changeRegistrationStatus = () => {
		let formData = new FormData();
		formData.append('registration_status', fetchedData?.data?.registration_status);

		axios
			.post(`https://backend.atlbha.com/api/Admin/registration_status_update`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setStatus(res?.data?.registration_status);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};

	return (
		<div className={`relative h-full md:py-10 md:pl-36 md:pr-5 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
			<div className='flex flex-row md:items-center items-start gap-3'>
				<h3 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold whitespace-nowrap'>
					حالات التسجيل
				</h3>
				<p style={{ color: '#67747B' }} className='md:text-[18px] text-[14px] font-medium'>
					(تتيح هذه الواجهة التحكم بحالة التسجيل في الصفحة الرئيسية)
				</p>
			</div>
			<div className='mt-4'>
				<PageNavigate nestedPage={true} parentPage={'الاعدادات'} currentPage={'حالات التسجيل'} />
				<div className='flex flex-row items-center justify-center gap-4 flex-wrap mt-16'>
					{loading ? (
						<CircularLoading />
					) : (
						cases.map((box, index) => (
							<div
								key={index}
								style={{
									width: '280px',
									height: '120px',
									boxShadow: '3px 3px 6px #0000000A',
									backgroundColor: box?.active === true ? '#DDF9E7' : '#E6E6E6',
								}}
								className='flex flex-col items-center justify-center gap-[18px] p-8 rounded-lg'
							>
								<h2 style={{ fontSize: '20px', color: '#011723' }} className='font-medium whitespace-nowrap'>
									{box.name}
								</h2>
								<Switch
									onChange={() => changeRegistrationStatus()}
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
									disabled
									checked={status?.registration_status === 'registration_without_admin' ? !box?.active : box?.active}
								/>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default RegistrationCasesPage;
