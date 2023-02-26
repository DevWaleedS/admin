import React, { useState, useEffect, Fragment } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Cam1 from '../../../../assets/images/cam1.png';
import Cam2 from '../../../../assets/images/cam2.png';
import Cam3 from '../../../../assets/images/cam3.png';
import useFetch from '../../../../hooks/useFetch';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const images = [
	{ id: 1, url: Cam1 },
	{ id: 2, url: Cam2 },
	{ id: 3, url: Cam3 },
];

const ProductDetails = ({ cancel, details }) => {
	const { fetchedData } = useFetch(`https://backend.atlbha.com/api/Admin/product/${details}`);
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		setImageUrl(fetchedData?.data?.products?.cover);
	}, [fetchedData?.data?.products?.cover]);

	return (
		<Fragment>
			<BackDrop />
			<div
				className='fixed trader_alert   flex flex-col top-[55%] md:max-h-[600px] max-h-[550px] translate-x-2/4 -translate-y-2/4 right-2/4 z-40 rounded-2xl overflow-hidden'
				style={{ width: '51.25rem', maxWidth: '90%' }}
			>
				<div className='h-16 w-full flex items-center justify-between py-4 px-4' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 style={{ color: '#ECFEFF' }} className='md:text-[22px] text-[18px] font-medium text-center flex-1'>
						{fetchedData?.data?.products?.name}
					</h2>

					<IoMdCloseCircleOutline width='20px' height='20px' size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel} />
				</div>
				<div className='flex-1 bg-white md:px-[98px] px-4 md:pt-[72px] pt-[30px] pb-[46px] overflow-y-auto'>
					<div className='flex md:flex-row flex-col items-center gap-[18px]'>
						<div className='flex flex-col items-center justify-center' style={{ width: '180px', height: '226px', border: '1px solid #EEEEEE' }}>
							<img className='w-full' src={imageUrl} alt='main-img' />
						</div>
						<div className='flex md:flex-col flex-row gap-4'>
							{fetchedData?.data?.products?.images?.map((item) => (
								<div key={item?.id} className='flex flex-col items-center justify-center' style={{ width: '80px', height: '65px', border: '1px solid #EEEEEE' }}>
									<img className='w-full cursor-pointer' src={item?.image} alt='small-img' onClick={() => setImageUrl(item?.image)} />
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-col gap-[10px] mt-[38px]'>
						<h5 className='md:text-[20px] text-[18px]' style={{ color: '#011723', fontWeight: '500' }}>
							وصف المنتج
						</h5>
						<div style={{ padding: '20px', border: '1px solid #EEEEEE' }}>
							<p className='md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
								{fetchedData?.data?.products?.description}
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-[17px] mt-[38px]'>
						<span
							className='md:h-[50px] h-[38px] flex flex-col items-center justify-center'
							style={{
								fontSize: '20px',
								fontWeight: '500',
								color: '#011723',
								width: '180px',
								padding: '11px 45px',
								backgroundColor: '#B6BE341A',
								borderRadius: '25px',
								whiteSpace: 'nowrap',
							}}
						>
							{fetchedData?.data?.products?.category?.name}
						</span>
						<div className='flex flex-row items-center gap-4'>
							{fetchedData?.data?.products?.subcategory?.map((item, index) => (
								<span
									key={index}
									className='md:h-[50px] h-[38px] flex flex-col items-center justify-center'
									style={{
										fontSize: '20px',
										fontWeight: '500',
										color: '#011723',
										padding: '10px 20px',
										backgroundColor: '#1DBBBE1A',
										borderRadius: '25px',
										whiteSpace: 'nowrap',
									}}
								>
									{item?.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductDetails;
