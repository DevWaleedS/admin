import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import getDate from '../../helpers/getDate';

import { Email } from '../../assets/Icons/index';
import styles from './EmailMenu.module.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BackDrop = ({ closeMenu }) => {
	return <div onClick={closeMenu} className='fixed back_drop bottom-0 left-0 h-full w-full z-10'></div>;
};

const EmailMenu = () => {
	// get data from api
	const { fetchedData } = useFetch('https://backend.atlbha.com/api/Admin/EmailIndex');
	const [open, setOpen] = React.useState(false);

	// This Function to get current day
	const [isToday, setIsToday] = React.useState(false);

	const [morningOrNight, setMorningOrNight] = React.useState('');

	useEffect(() => {
		// Create a Date object for the current date and time
		let today = new Date();

		// Parse the string into a Date object
		let dateStr = fetchedData?.data?.emails.map((item) => item?.created_at);
		let date = new Date(Date.parse(dateStr));

		// to get AM , PM in arabic
		const formattedTime = date.toLocaleString('ar', { hour: 'numeric', minute: 'numeric', hour12: true });
		setMorningOrNight(formattedTime);

		// Compare the year, month, and day of the two Date objects
		if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {
			setIsToday(true);
		} else {
			setIsToday(false);
		}
	}, [fetchedData?.data?.emails]);

	return (
		<div className='relative'>
			<img onClick={() => setOpen(!open)} className='h-6 cursor-pointer' src={Email} alt='email-icon' />
			<div className={`${open ? 'flex' : 'hidden'}`}>
				<BackDrop
					closeMenu={() => {
						setOpen(false);
					}}
				></BackDrop>
				<div className={`${styles.EmailMenu} z-20`}>
					{fetchedData?.data?.emails.length === 0 ? (
						<div className='flex items-center h-full justify-center text-gray-600 text-xl'>لا يوجد رسائل حتي هذة اللحظة!</div>
					) : (
						fetchedData?.data?.emails.map((item) => (
							<div key={item?.id} className={`${styles.email_box} w-full flex flex-row items-center justify-between gap-4`}>
								<div className='flex flex-row items-center justify-between gap-4'>
									<div
										style={{
											borderRadius: '50%',
										}}
										className='md:w-[35px] w-[30px] md:h-[35px] h-[30px] flex flex-col items-center justify-center bg-purple-500 text-white font-medium'
									>
										<img src={item?.store?.user?.image} alt={item?.store?.user?.name} className='md:w-[35px] w-[30px] md:h-[35px] h-[30px]' style={{ borderRadius: '50%' }} />
									</div>
									<Link to='/البريد' onClick={() => setOpen(!open)}>
										<div className='flex flex-col'>
											<h6 className='md:text-[18px] text-[14px] font-medium text-black'>{item?.store?.user?.name}</h6>
											<p className='md:text-[16px] text-[12px] font-normal text-black'>{item?.subject}</p>
										</div>
									</Link>
								</div>
								<div className='flex flex-row items-center justify-between gap-4'>
									<div className='flex-1 flex flex-col'>
										<h6 className='md:text-[16px] text-[12px] font-light text-gray-400'>{isToday ? 'اليوم' : getDate(item?.created_at)}</h6>
										<span className='md:text-[16px] text-[12px] font-light text-gray-400'>{morningOrNight}</span>
									</div>
									<StarBorderIcon className='cursor-pointer text-gray-500 md:text-[24px] text-[18px]' />
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};
export default EmailMenu;
