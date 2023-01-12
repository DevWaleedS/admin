import React from 'react';
import { LinkArrow } from '../../../../assets/Icons/index';

const INITIAL_DETAILS = [
	{
		id: 1,
		title: 'ماكدونالدز',
		logo: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png',
		url: 'https://www.mcdonalds.eg/',
	},
	{
		id: 2,
		title: 'ماكدونالدز',
		logo: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png',
		url: 'https://www.mcdonalds.eg/',
	},
	{
		id: 3,
		title: 'ماكدونالدز',
		logo: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png',
		url: 'https://www.mcdonalds.eg/',
	},
	{
		id: 4,
		title: 'ماكدونالدز',
		logo: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png',
		url: 'https://www.mcdonalds.eg/',
	},
	{
		id: 5,
		title: 'ماكدونالدز',
		logo: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png',
		url: 'https://www.mcdonalds.eg/',
	},
];

const LatestMarkets = () => {
	return (
		<div className='flex-1 shadow-lg rounded-lg overflow-hidden'>
			<div className='h-12 flex items-center pr-4' style={{ backgroundColor: 'rgb(210,241,242)' }}>
				<h2 className='font-medium text-[#02466A]'>أحدث المتاجر</h2>
			</div>
			<div className='bg-white'>
				{INITIAL_DETAILS.map((item) => {
					return (
						<a key={item.id} href={item.url} target='_blank' rel='noreferrer' className='flex justify-between p-4 h-24 shadow-[0px_3px_6px_#02466A0F] bg-[#F7FCFF] mb-2'>
							<div className='flex'>
								<div className='w-28'>
									<img className='h-14 w-14 object-cover  rounded-full' src={item.logo} alt='' />
								</div>
								<div className='flex flex-col justify-between'>
									<h2 className='font-medium'>{item.title}</h2>
									<h2 className='font-medium'>{item.url}</h2>
								</div>
							</div>
							<div className='mt-auto'>
								<img className='scale-x-[-1]' src={LinkArrow} alt='' />
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default LatestMarkets;
