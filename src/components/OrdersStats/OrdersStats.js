import React from 'react';

// import icons and images
import { ReactComponent as NewIcon } from '../../assets/Icons/new.svg';
import { ReactComponent as BestSeller } from '../../assets/Icons/best-seller.svg';
import { ReactComponent as NotActivated } from '../../assets/Icons/Not-activated.svg';
import { ReactComponent as RunOut } from '../../assets/Icons/Package.svg';

const OrdersStats = ({fetchedData}) => {
	const OrdersStatsData = [
		{
			id: 1,
			title: 'الجديدة',
			icon: <NewIcon />,
			num: fetchedData?.newProducts,
		},
		{
			id: 2,
			title: 'الأكثر مبيعاً',
			icon: <BestSeller />,
			num: 100,
		},
		{
			id: 3,
			title: 'الغير مفعلة',
			icon: <NotActivated />,
			num: fetchedData?.not_active_products,
		},
		{
			id: 4,
			title: 'على وشك النفاذ',
			icon: <RunOut />,
			num: fetchedData?.about_to_finish_products,
		},
	];
	return (
		<div className = 'grid gap-4 lg:grid-cols-4 grid-cols-2 mb-6 '>
			{OrdersStatsData.map((item) => (
				<div
					key={item.id}
					className='bg-[#F3FCFD] shadow-[0px_3px_6px_#0000000F] rounded-lg 
				text-center md:py-5 md:px-7 p-3'
				>
					<div className='flex items-center justify-center gap-3'>
						<span>{item.icon}</span>
						<h4 className='text-[#02466A] font-normal md:text-lg text-[16px] whitespace-nowrap'>{item.title}</h4>
					</div>
					<div className='text-[#02466A] font-medium md:text-[20px] text-[18px] whitespace-nowrap'>{item.num}</div>
				</div>
			))}
		</div>
	);
};

export default OrdersStats;
