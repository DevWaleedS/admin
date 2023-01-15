import React from 'react';

// import icons and images
import { ReactComponent as NewIcon } from '../../assets/Icons/new.svg';
import { ReactComponent as BestSeller } from '../../assets/Icons/best-seller.svg';
import { ReactComponent as NotActivated } from '../../assets/Icons/Not-activated.svg';
import { ReactComponent as RunOut } from '../../assets/Icons/Package.svg';

const OrdersStatsData = [
	{
		id: 1,
		title: 'الجديدة',
		icon: <NewIcon />,
		num: 10,
	},
	{
		id: 2,
		title: 'الأكثر مبيعاً',
		icon: <BestSeller />,
		num: 10,
	},
	{
		id: 3,
		title: 'الغير مفعلة',
		icon: <NotActivated />,
		num: 10,
	},
	{
		id: 4,
		title: 'على وشك النفاذ',
		icon: <RunOut />,
		num: 10,
	},
];

const OrdersStats = () => {
	return (
		<div className = 'grid gap-4 grid-cols-4 mb-6 '>
			{OrdersStatsData.map((item) => (
				<div
					key={item.id}
					className='bg-[#F3FCFD] shadow-[0px_3px_6px_#0000000F] rounded-lg 
				text-center py-5 px-7'
				>
					<div className='flex items-center justify-center gap-3 '>
						<span>{item.icon}</span>
						<h4 className='text-[#02466A] font-medium  text-lg'>{item.title}</h4>
					</div>
					<div className='text-[#02466A] font-medium  text-xl'>{item.num}</div>
				</div>
			))}
		</div>
	);
};

export default OrdersStats;
