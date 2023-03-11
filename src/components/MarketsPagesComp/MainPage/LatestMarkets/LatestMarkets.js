import React from 'react';
import { LinkArrow } from '../../../../assets/Icons/index';

const LatestMarkets = ({ latestStores }) => {
	return (
		<div className='flex-1 shadow-lg rounded-lg'>
			<div className='h-12 flex items-center pr-4' style={{ backgroundColor: 'rgb(210,241,242)' }}>
				<h2 className='font-medium text-[#02466A] md:text-[18px] text-[16px]'>أحدث المتاجر</h2>
			</div>
			<div className='bg-white'>
				{latestStores?.map((store, index) => {
					return (
						<a
							key={index}
							href={store?.domain}
							target='_blank'
							rel='noreferrer'
							className={`${
								index === latestStores.length - 1
									? 'w-full flex flex-row items-end space-between md:p-4 p-2 md:h-24 h-16  bg-[#F7FCFF] '
									: 'w-full flex flex-row items-end space-between md:p-4 p-2 md:h-24 h-16 shadow-[0px_3px_6px_#02466A0F] bg-[#F7FCFF] mb-2 '
							}`}
						>
							<div className='flex-1 flex flex-row items-center gap-3'>
								<div className='flex flex-col md:h-[64px] h-[30px] md:w-[64px] w-[30px]'>
									<img className='object-contain rounded-full' src={store?.icon} alt={store?.store_name} />
								</div>
								<div className='flex-1 flex flex-col md:gap-4 gap-1'>
									<h2 className='font-medium md:text-[18px] text-[16px]'>{store?.store_name}</h2>
									<h2 className='md:w-96 w-52 font-medium  md:text-[18px] text-[16px] overflow-hidden whitespace-nowrap text-ellipsis'>{store?.domain}</h2>
								</div>
							</div>
							<div className='md:w-[24px] w-[18px]'>
								<img className='w-full' src={LinkArrow} alt='arrow-icon' />
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default LatestMarkets;
