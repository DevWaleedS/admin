import React, { useContext, Fragment } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

// icons
import { MdOutlineAddCircle } from 'react-icons/md';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import Button from '../../../../UI/Button/Button';

const SocialMediaActivity = ({ openAddLink, fetchedData, reload, setReload, loading }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	const changeStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/changewebsite_socialmediaStatus/{id}`, {
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
		<div className='md:mt-8 mt-4 shadow-md rounded-lg' style={{ backgroundColor: '#FFFFFF' }}>
			<div className='md:px-3 md:py-5 p-4 rounded-t-lg flex md:flex-row flex-col justify-between items-center' style={{ backgroundColor: '#F7FCFF', border: '1px solid #EFEFEF' }}>
				<h2 className='md:text-[22px] text-[18px] font-semibold flex items-center whitespace-nowrap'>
					التواصل الاجتماعي
					<span className='mr-3 md:text-[16px] text-[14px] font-normal whitespace-pre-line'>(تستطيع تفعيل وتعطيل وإضافة صفحات منصات التواصل الاجتماعي)</span>
				</h2>
			</div>
			<div className='md:py-7 py-0 flex flex-col items-center '>
				<div style={{ width: '572px', maxWidth: '100%' }}>
					{loading ? (
						<CircularLoading />
					) : (
						<Fragment>
							{fetchedData?.data?.website_socialmedia.map((socialmedia) => (
								<div className='w-full p-8 flex justify-between items-center rounded' style={{ border: '1px solid #E3E3E3' }} key={socialmedia?.id}>
									<div className='flex gap-6'>
										<Box sx={{}}>
											<img className='w-[32px] h-[32px]' src={socialmedia?.logo} alt={socialmedia?.name} />
										</Box>

										<h2 className='font-medium md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
											{socialmedia?.name}
										</h2>
									</div>
									<Switch
										onChange={() => changeStatus(socialmedia?.id)}
										sx={{
											width: '32px',
											padding: 0,
											height: '20px',
											borderRadius: '0.75rem',
											'& .MuiSwitch-thumb': {
												width: '12px',
												height: '12px',
											},
											'& .MuiSwitch-switchBase': {
												padding: '0',
												top: '4px',
												left: '4px',
											},
											'& .MuiSwitch-switchBase.Mui-checked': {
												left: '-4px',
											},
											'& .Mui-checked .MuiSwitch-thumb': {
												backgroundColor: '#FFFFFF',
											},
											'& .MuiSwitch-track': {
												height: '100%',
											},
											'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
												backgroundColor: '#3AE374',
												opacity: 1,
											},
										}}
										checked={socialmedia?.status === 'نشط' ? true : false}
									/>
								</div>
							))}
						</Fragment>
					)}

					{/** add new social link */}
					<div className='w-full mt-5 p-8 flex justify-between items-center rounded cursor-pointer' style={{ border: '1px solid #E3E3E3' }} onClick={openAddLink}>
						<div className='flex gap-6 items-center'>
							<Box sx={{}}>
								<MdOutlineAddCircle color={'#67747B'} size={'25px'}></MdOutlineAddCircle>
							</Box>

							<h2 className='font-medium md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
								إضافة رابط جديد
							</h2>
						</div>
					</div>
				</div>
				<Button className={'mx-auto my-8'} fontSize={'text-2xl font-thin'} style={{ backgroundColor: '#02466A' }} type={'normal'}>
					حفظ
				</Button>
			</div>
		</div>
	);
};

export default SocialMediaActivity;
