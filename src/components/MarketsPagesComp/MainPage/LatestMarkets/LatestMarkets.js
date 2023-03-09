import React from 'react';
import { LinkArrow } from '../../../../assets/Icons/index';

const LatestMarkets = ({ latestStores }) => {
	return (
		<div className='flex-1 shadow-lg rounded-lg overflow-hidden'>
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
									? 'flex justify-between md:p-4 p-2 md:h-24 h-16  bg-[#F7FCFF] '
									: 'flex justify-between md:p-4 p-2 md:h-24 h-16 shadow-[0px_3px_6px_#02466A0F] bg-[#F7FCFF] mb-2 '
							}`}
						>
							<div className='flex flex-row gap-3'>
								<div className='flex flex-col'>
									<img className=' md:h-16 h-[30px] md:w-16 w-[30px] object-contain  rounded-full' src={store?.icon} alt={store?.store_name} />
								</div>
								<div className='flex flex-col md:gap-4 gap-1'>
									<h2 className='font-medium md:text-[18px] text-[16px]'>{store?.store_name}</h2>
									<h2 className='font-medium  md:text-[18px] text-[16px]'>{store?.domain}</h2>
								</div>
							</div>
							<div className='md:mt-auto mt-0 mr-0 md:mr-3'>
								<img className='scale-x-[-1]' src={LinkArrow} alt='arrow-icon' />
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default LatestMarkets;
