import React from 'react';
import styles from './StorageStatus.module.css';
import { ReactComponent as Product } from '../../../assets/Icons/product 24.svg';
const StorageStatus = ({fetchedData}) => {
	const INITIAL_DATA = [
		{
			id: 5,
			title: 'اجمالي منتجات المخزون',
			amount: fetchedData?.total_stock,
			icon: (
				<Product
					fill='red'
					style={{
						filter: 'invert(56%) sepia(81%) saturate(437%) hue-rotate(132deg) brightness(93%) contrast(88%)',
					}}
				/>
			),
		},
		{
			id: 1,
			title: 'منتجات منتهية',
			amount: fetchedData?.finished_products,
		},
		{
			id: 2,
			title: 'منتجات تنتهي قريباً',
			amount: fetchedData?.finished_soon,
		},
		{
			id: 3,
			title: 'أحدث المنتجات',
			amount: fetchedData?.last_week_product_added,
		},
		{
			id: 4,
			title: 'أكثر المنتجات طلباً',
			amount: fetchedData?.most_order,
		},
	];
	
	return (
		<div className='flex flex-row items-center flex-wrap gap-4'>
			{INITIAL_DATA.map((item) => {
				return (
					<div className='flex-1 flex bg-white flex-col justify-between md:h-[120px] h-[70px] md:w-48 min-w-[162px] w-full text-center md:py-4 py-2 px-2 shadow-[0px_3px_6px_#0000000F]' key={item.id}>
						<h2 className='font-normal md:text-lg text-[15px]'>{item.title}</h2>
						{item.icon && (
							<div className='flex justify-center items-center gap-4 '>
								<span className={`md:w-10 w-[30px] md:h-10 h-[30px] flex  justify-center items-center rounded-lg bg-[#D1F4DD66] ${styles.productIcon}`}>{item.icon}</span>
								<h2 className='font-bold md:text-2xl text-[20px]'>{item.amount}</h2>
							</div>
						)}
						{!item.icon && <h2 className='font-bold md:text-2xl text-[20px]'>{item.amount}</h2>}
					</div>
				);
			})}
		</div>
	);
};

export default StorageStatus;
