import React, { Fragment } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ListMoreCategory, Stationery } from '../../../assets/Icons/index';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './ShowDetails.module.css';
import useFetch from '../../../hooks/useFetch';

const BackDrop = () => {
	return <div className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const ShowDetails = ({ cancel, productInfo }) => {
	const { fetchedData } = useFetch(`https://backend.atlbha.com/api/Admin/service/showDetail/${productInfo}`);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Fragment>
			<BackDrop />
			{fetchedData?.data?.stores.map((store) => (
				<div
					key={store?.id}
					className='fixed trader_alert flex flex-col top-1/2 translate-x-2/4 -translate-y-2/4 right-2/4 z-20 rounded-2xl overflow-hidden'
					style={{ width: '51.25rem', maxWidth: '90%', maxHeight: '662px' }}
				>
					<div className='h-16 w-full flex items-center justify-between py-4 px-4 trader_alert' style={{ backgroundColor: '#02466A' }}>
						<h2 style={{ color: '#ECFEFF' }} className='font-medium md:text-[22px] text-[18px] text-center flex-1'>
							التفاصيل
						</h2>
						<IoMdCloseCircleOutline width='20px' height='20px' size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel}></IoMdCloseCircleOutline>
					</div>
					<div className='flex-1 md:px-[98px] md:py-[60px] p-0' style={{ backgroundColor: '#FFFFFF' }}>
						<div className='flex flex-row shadow-lg'>
							<div className='flex-1 flex flex-col py-2'>
								<div className='md:h-[60px] h-[45px] flex flex-col items-center justify-center' style={{ width: '100%', backgroundColor: '#F2FBFF' }}>
									<p className='md:text-[18px] text-[16px]' style={{ color: '#4D4F5C' }}>
										اسم المتجر
									</p>
								</div>
								<div className='flex flex-col'>
									{[1, 2, 3, 4].map((_item, index) => (
										<div key={index} className='flex flex-col items-center justify-center' style={{ width: '100%', height: '52px' }}>
											<p className='md:text-[18px] text-[16px]' style={{ color: '#4D4F5C' }}>
												{store?.store_name}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className='flex-1 flex flex-col py-2'>
								<div className='md:h-[60px] h-[45px] md:text-[18px] text-[16px] flex flex-col items-center justify-center' style={{ width: '100%', backgroundColor: '#F2FBFF' }}>
									<p className='md:text-[18px] text-[16px]' style={{ color: '#4D4F5C' }}>
										نوع النشاط
									</p>
								</div>
								<div className='flex flex-col'>
									{[1, 2, 3, 4].map((_item, index) => (
										<div key={index} className='flex flex-col items-center justify-center' style={{ width: '100%', height: '52px' }}>
											<div className='flex flex-row items-center md:gap-3 gap-2'>
												<img src={store?.activity.map((activity) => activity?.icon)} alt='gift-icon' />

												<p className='md:text-[18px] text-[16px]' style={{ color: '#4D4F5C' }}>
													{store?.activity.map((activity) => activity?.name)}
												</p>
												<img className='cursor-pointer' src={ListMoreCategory} alt='list-more-category' onClick={handleClick} />
												<Menu className={styles.activity_menu} anchorEl={anchorEl} open={open} onClose={handleClose}>
													{[1, 2, 3].map((_item, index) => (
														<MenuItem key={index} className='flex flex-row items-center justify-center gap-2' style={{ color: '#4D4F5C' }} onClick={handleClose}>
															<div
																className='md:w-[25px] w-[20px] md:h-[25px] h-[20px] md:text-[18px] text-[16px] flex flex-row items-center justify-center'
																style={{ borderRadius: '50%', backgroundColor: '#8D8AD333' }}
															>
																<img style={{ width: '15px' }} src={Stationery} alt='stationery-icon' />
															</div>
															قرطاسية
														</MenuItem>
													))}
												</Menu>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</Fragment>
	);
};

export default ShowDetails;
