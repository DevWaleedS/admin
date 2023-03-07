import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';
import Checkbox from '@mui/material/Checkbox';

// ICONS
import { CommunicationSendOutlined, Delete, ShowStoreRequest } from '../../../../assets/Icons/index';
import { NotificationContext } from '../../../../store/NotificationProvider';
import { ReactComponent as CheckedSquare } from '../../../../assets/Icons/icon-24-square checkmark.svg';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';

const EmailSettingPage = ({ openTraderAlert, fetchedData, reload, setReload, loading }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const NotificationStore = useContext(NotificationContext);
	const { confirm, setConfirm, actionTitle, setActionTitle, setNotificationTitle } = NotificationStore;
	const [selected, setSelected] = React.useState([]);
	const isSelected = (id) => selected.indexOf(id) !== -1;

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
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
			const newSelected = fetchedData?.data?.emails.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// delete single item
	const deleteNotification = (id) => {
		axios

			.get(`https://backend.atlbha.com/api/Admin/EmailDeleteAll?id[]=${id}`, {
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

	// delete all message function
	useEffect(() => {
		
		if (confirm && actionTitle === 'Delete') {
			const queryParams = selected.map((id) => `id[]=${id}`).join('&');

			axios
				.get(`https://backend.atlbha.com/api/Admin/EmailDeleteAll?${queryParams}`, {
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
			setConfirm(false);
			setActionTitle(null);
		}
	}, [confirm]);
	return (
		<div className={`relative md:py-10 md:pl-36 md:pr-24 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
			<h3 style={{ color: '#011723' }} className='md:text-[24px] text-[20px] font-bold font-bold'>
				البريد والرسائل
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
							indeterminate={selected.length > 0 && selected.length < fetchedData?.data?.emails.length}
							checked={fetchedData?.data?.emails.length > 0 && selected.length === fetchedData?.data?.emails.length}
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
									setNotificationTitle('سيتم حذف جميع البريد التي قمت بتحديدها');
									setActionTitle('Delete');
								}}
							>
								<h6 className='md:text-[18px] text-[16px] font-medium' style={{ color: '#FF3838' }}>
									حذف
								</h6>
								<img src={Delete} alt='delete-icon' />
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-4 flex-wrap mt-4'>
					{loading ? (
						<CircularLoading />
					) : (
						fetchedData?.data?.emails.map((box, index) => {
							const isItemSelected = isSelected(box?.id);

							const timestamp = box?.created_at;
							const date = new Date(timestamp);
							const formattedTime = date.toLocaleString('ar', { hour: 'numeric', minute: 'numeric', hour12: true });

							const today = date.toLocaleDateString('en-US');
							const day = date.toISOString().slice(0, 10);
							return (
								<div key={box?.id} style={{ boxShadow: '3px 3px 6px #00000005' }} className='bg-white w-full flex md:flex-row flex-col md:items-center items-start justify-between gap-2 px-4 py-2'>
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
											onClick={(event) => handleClick(event, box?.id)}
										/>
										<div className='w-full flex flex-row items-center justify-between md:pl-20'>
											<div className='flex flex-col gap-1'>
												<h2 style={{ color: '#011723' }} className='md:text-[20px] text-[18px] font-medium whitespace-nowrap'>
													{box?.subject}
												</h2>
												<p className='md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
													{box?.store?.store_name}
												</p>
											</div>
											<div className='md:flex hidden'>
												<p style={{ color: '#A7A7A7' }} className='md:text-[16px] text-[14px] font-light'>
													{day === today ? 'اليوم' : day} {formattedTime}
												</p>
											</div>
										</div>
									</div>
									<div className='md:w-auto w-full flex flex-row items-center justify-between'>
										<div className='flex flex-row items-center gap-[10px] md:mr-0 mr-[1rem]'>
											<img
												className='cursor-pointer'
												src={CommunicationSendOutlined}
												alt='communication-send-outlined-icon'
												onClick={() => {
													openTraderAlert(box);
												}}
											/>

											<img className='cursor-pointer' title='عرض الطلب' src={ShowStoreRequest} alt='show-store-request-icon' />

											<img className='cursor-pointer' src={Delete} alt='delete-icon'
												onClick={() => deleteNotification(box?.id)} />
										</div>
										<div className='md:hidden flex'>
											<p style={{ color: '#A7A7A7' }} className='md:text-[16px] text-[14px] font-light'>
												{day === today ? 'اليوم' : day} {formattedTime}
											</p>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default EmailSettingPage;
