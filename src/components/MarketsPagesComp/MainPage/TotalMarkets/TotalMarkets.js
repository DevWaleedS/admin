
import React from 'react';
import { Store } from '../../../../assets/Icons/index';

const TotalMarkets = ({marketsInfo}) => {
  return (
			<div className='flex md:flex-col flex-row gap-4'>
				<div className='flex-1 w-64 rounded-lg flex md:flex-row flex-col items-center p-4' style={{ backgroundColor: '#B6BE34' }}>
					<div className='w-16 ml-2'>
						<div className='h-12 w-12 flex justify-center items-center rounded-lg md:mx-0 mx-auto' style={{ backgroundColor: 'rgba(193,200,86,0.5)' }}>
							<img className={`brightness-[200]`} src={Store} alt='' />
						</div>
					</div>

					<div className='flex flex-1 h-full flex-col justify-between pt-4'>
						<h2 className='text-slate-50 font-medium text-lg'>اجمالي المتاجر</h2>
						<div className='flex flex-col md:items-start items-center'>
            <h2 className='text-slate-50 font-semibold md:text-[18px] text-[20px]'>
              {marketsInfo?.countStore}</h2>
            <h6 className='text-slate-50  text-xs mt-3 text-center'>
              % {marketsInfo?.averageStore}   + خلال هذا الشهر</h6>
						</div>
					</div>
				</div>

				<div className='flex-1 w-64 rounded-lg flex flex-row items-center md:gap-14 gap-4 p-4' style={{ backgroundColor: 'rgba(236,238,210,1)' }}>
					<div className='flex flex-1 h-full flex-col justify-between'>
						<div className='flex-1 flex flex-row md:items-center items-baseline md:gap-14 gap-4 text-[#02466A]'>
							<div className='h-4 w-4 rounded-full bg-green-400'></div>
							<div className='flex flex-col'>
								<h3 className=' font-semibold md:text-[18px] text-[20px]'>{marketsInfo?.activeStore}</h3>
								<h6 className='  text-sm font-medium mt-1'>متاجر فعالة</h6>
							</div>
						</div>
						<div className='flex-1 flex flex-row md:items-center items-baseline md:gap-14 gap-4 text-[#02466A]'>
							<div className='h-4 w-4 rounded-full bg-slate-400'></div>
							<div className='flex flex-col'>
								<h3 className=' font-semibold md:text-[18px] text-[20px]'>{marketsInfo?.notActiveStore}</h3>
								<h6 className='  text-sm font-medium mt-1'>متاجر غير فعالة</h6>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		);
};

export default TotalMarkets;
