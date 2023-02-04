import React, { useState, useContext } from 'react';
import { CommunicationSendOutlined, Delete, ShowStoreRequest } from '../../../assets/Icons/index';
import Checkbox from '@mui/material/Checkbox';
import { NotificationContext } from '../../../store/NotificationProvider';
import { ReactComponent as CheckedSquare } from '../../../assets/Icons/icon-24-square checkmark.svg';
import TraderAlert from '../../../components/SettingComp/NotificationsPageComp/TraderAlert/TraderAlert';

const cases = [
	{ id: 1, name: 'استفسار حول دعم السيرفر', store_name: 'متجر أمازون', time: 'اليوم 08:20 ص', type: 'enquiry' },
	{ id: 2, name: 'قبول متجر نون', store_name: 'جديد', time: '', type: 'acceptance' },
	{ id: 3, name: 'استفسار حول دعم السيرفر', store_name: 'متجر أمازون', time: 'اليوم 08:20 ص', type: 'enquiry' },
	{ id: 4, name: 'قبول متجر نون', store_name: 'جديد', time: '', type: 'acceptance' },
	{ id: 5, name: 'قبول متجر نون', store_name: 'جديد', time: '', type: 'acceptance' },
	{ id: 6, name: 'استفسار حول دعم السيرفر', store_name: 'متجر أمازون', time: 'اليوم 08:20 ص', type: 'enquiry' },
	{ id: 7, name: 'استفسار حول دعم السيرفر', store_name: 'متجر أمازون', time: 'اليوم 08:20 ص', type: 'enquiry' },
	{ id: 8, name: 'قبول متجر نون', store_name: 'جديد', time: '', type: 'acceptance' },
];

const NotificationsPage = () => {
	const [traderAlert, setTraderAlert] = useState(false);
	const [traderPackageDetails, setTraderPackageDetails] = useState([]);
	const NotificationStore = useContext(NotificationContext);
	const { setNotificationTitle, setActionTitle } = NotificationStore;
	const [selected, setSelected] = React.useState([]);
	const isSelected = (name) => selected.indexOf(name) !== -1;

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = cases.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	return (
		<>
			{traderAlert && (
				<TraderAlert
					cancel={() => {
						setTraderAlert(false);
					}}
					traderPackageDetails={traderPackageDetails}
				/>
			)}
			<div className={`relative md:py-10 md:pl-36 md:pr-24 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
				<h3 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold'>
					الاشعارات
				</h3>
				<div className='mt-8'>
					<div className='flex flex-row items-center gap-[53px]'>
						<div className='flex flex-row items-center gap-3'>
							<Checkbox
								checkedIcon={<CheckedSquare />}
								sx={{
									pr: '0',
									color: '#011723',
									'& .MuiSvgIcon-root': {
										color: '#011723',
									},
								}}
								indeterminate={selected.length > 0 && selected.length < cases.length}
								checked={cases.length > 0 && selected.length === cases.length}
								onChange={handleSelectAllClick}
								inputProps={{
									'aria-label': 'select all desserts',
								}}
							/>
							<label className='md:text-[18px] text-[16px]' style={{ color: '#011723' }} htmlFor='all'>
								تحديد الكل
							</label>
						</div>

						<div className='flex flex-row justify-center items-center gap-2'>
							{selected.length > 0 && (
								<div
									className='flex flex-row items-center justify-center gap-4 cursor-pointer'
									style={{ width: '114px', height: '40px', backgroundColor: '#FF38381A', borderRadius: '20px' }}
									onClick={() => {
										setNotificationTitle('سيتم حذف جميع الاشعارات التي قمت بتحديدها');
										setActionTitle('تم حذف الاشعارات بنجاح');
									}}
								>
									<h6 className='md:text-[18px] text-[16px] font-medium' style={{ fontSize: '18px', color: '#FF3838' }}>
										حذف
									</h6>
									<img src={Delete} alt='delete-icon' />
								</div>
							)}
						</div>
					</div>
					<div className='flex flex-col gap-4 flex-wrap mt-4'>
						{cases.map((box, index) => {
							const isItemSelected = isSelected(box.id);
							return (
								<div key={index} style={{ boxShadow: '3px 3px 6px #00000005' }} className='bg-white w-full flex md:flex-row flex-col md:items-center items-start justify-between gap-2 px-4 py-2'>
									<div className='w-full flex flex-row items-center md:gap-8 gap-4'>
										<Checkbox
											checkedIcon={<CheckedSquare />}
											sx={{
												color: '#1DBBBE',
												'& .MuiSvgIcon-root': {
													color: '#ADB5B9',
												},
											}}
											checked={isItemSelected}
											onClick={(event) => handleClick(event, box.id)}
										/>
										<div className='w-full flex flex-row items-center justify-between md:pl-20'>
											<div className='flex flex-col gap-1'>
												<h2 style={{ color: '#011723' }} className='md:text-[20px] text-[18px] font-medium whitespace-nowrap'>
													{box.name}
												</h2>
												{box.type === 'enquiry' ? <p className='md:text-[18px] text-[16px]' style={{ color: '#011723' }}>{box.store_name}</p> : <p className='md:text-[18px] text-[16px]' style={{ color: '#1DBBBE' }}>{box.store_name}</p>}
											</div>
											<div className='md:flex hidden'>
												<p style={{ color: '#A7A7A7' }} className='md:text-[16px] text-[14px] font-light'>
													{box.type === 'enquiry' ? box.time : ''}
												</p>
											</div>
										</div>
									</div>
									<div className='md:w-auto w-full flex flex-row items-center justify-between'>
										<div className='flex flex-row items-center gap-[26px] md:mr-0 mr-[3.5rem]'>
											{box.type === 'enquiry' ? (
												<img className='cursor-pointer' src={CommunicationSendOutlined} alt='communication-send-outlined-icon' />
											) : (
												<img className='cursor-pointer'
													title='عرض الطلب'
													src={ShowStoreRequest}
													alt='show-store-request-icon'
													onClick={() => {
														setTraderAlert(true);
														setTraderPackageDetails(box);
													}}
												/>
											)}
											<img className='cursor-pointer' src={Delete} alt='delete-icon' />
										</div>
										<div className='md:hidden flex'>
												<p style={{ color: '#A7A7A7' }} className='md:text-[16px] text-[14px] font-light'>
													{box.type === 'enquiry' ? box.time : ''}
												</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default NotificationsPage;
