import React from 'react';
import { Store, CountDown } from '../../../../assets/Icons/index';

const INITIAL_DETAILS = [
	{
		id: 1,
		icon: Store,
		bgColor: '#d2f7e3',
		iconColor: 'invert(40%) sepia(12%) saturate(2446%) hue-rotate(85deg) brightness(98%) contrast(90%)',
		title: ' تاجر جديد ',
		num: ' 23',
	},
	{
		id: 2,
		icon: CountDown,
		bgColor: '#eaf0d6',
		iconColor: '',
		title: ' طلب في الانتظار ',
		num: ' 490',
	},
	{
		id: 3,
		icon: CountDown,
		bgColor: '#f0f0f7',
		iconColor: 'invert(40%) sepia(12%) saturate(2446%) hue-rotate(85deg) brightness(98%) contrast(0%)',
		title: ' طلب مكتمل ',
		num: ' 120',
	},
	{
		id: 4,
		icon: Store,
		bgColor: '#d2f7e3',
		iconColor: 'invert(40%) sepia(12%) saturate(2446%) hue-rotate(85deg) brightness(98%) contrast(90%)',
		title: ' تاجر جديد ',
		num: ' 23',
	},
	{
		id: 5,
		icon: CountDown,
		bgColor: '#eaf0d6',
		iconColor: '',
		title: ' طلب في الانتظار ',
		num: ' 490',
	},
];

const QuickDetails = () => {
	return (
		<div className='flex-1 shadow-lg rounded-lg'>
			<div className='h-12 flex items-center pr-4' style={{ backgroundColor: '#02466A33' }}>
				<h2 className='font-medium text-[#02466A] md:text-[18px] text-[16px]'>تفاصيل سريعة</h2>
			</div>
			<div className='bg-white'>
				{INITIAL_DETAILS.map((item) => {
					return (
						<div key={item.id} className={' flex justify-between md:h-24 h-16 items-center p-4 shadow-[0px_3px_6px_#02466A0F] bg-[#F7FCFF] mb-2 '}>
							<div className='flex'>
								<div className='rounded-full p-1 w-10 h-10 ml-3 flex justify-center items-center' style={{ backgroundColor: `${item.bgColor}` }}>
									<img className='h-6 w-6 object-cover ' style={{ filter: `${item.iconColor}` }} src={item.icon} alt='' />
								</div>
								<div className='flex justify-center items-center'>
									<h2 className='font-medium md:text-[18px] text-[16px]'>
										{item.num} {item.title}
									</h2>
								</div>
							</div>
							<div className='my-auto'>
								<h2 className='md:text-[16px] text-[14px] text-[#4D4F5C]'>Last 24 Hours</h2>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuickDetails;
