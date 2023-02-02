import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../../../../UI/Button/Button";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10"
    ></div>
  );
};

const ProductDetails = ({ items: { title, img, sellPrice }, closeDetails }) => {
  return (
			<>
				<BackDrop onClick={closeDetails} />
				<div className='fixed flex flex-col top-24 translate-x-2/4 right-2/4 z-20 rounded-md overflow-hidden md:h-[38rem] h-[33rem]' style={{ width: '51.25rem',maxWidth:'90%' }}>
					<div className='w-full flex items-center justify-between px-4' style={{ backgroundColor: '#1DBBBE',minHeight:'65px' }}>
						<h3 className='text-slate-50 md:text-xl text-[16px] font-medium '>احصائيات المنتج - {title}</h3>
						<IoMdCloseCircleOutline color={'#fff'} className={'cursor-pointer w-5 h-5'} onClick={closeDetails}></IoMdCloseCircleOutline>
					</div>
					<div className='flex-1 md:px-44 md:pt-10 px-5 py-6' style={{ backgroundColor: 'rgb(246,246,246)',overflow:'auto' }}>
						<div className='flex md:flex-row flex-col items-center md:gap-12 gap-4'>
							<div className=''>
								<img className='h-28 rounded-sm w-28 object-cover' src={img} alt='' />
							</div>
							<div>
								<h2 className='md:mb-8 mb-2 font-medium md:text-2xl text-[18px]'>{title}</h2>
								<h2 className='md:text-xl text-[18px] font-normal md:text-right text-center'>
									<span className='font-bold md:text-2xl text-[20px] ml-4'>{sellPrice}</span> سعر البيع
								</h2>
							</div>
						</div>
						<div className='mt-8'>
							<div className='flex md:gap-24 gap-8 items-center  mb-4'>
								<div className='md:w-[82px] w-[68px] md:h-14 h-[45px] flex items-center justify-center bg-white rounded font-medium text-[22px]' style={{ border: '1px solid #ADB5B9' }}>
									125
								</div>
								<div className='flex-1 '>
									<h2 className='font-medium md:text-[22px] text-[18px]'>مرات تنزيل المنتج</h2>
								</div>
							</div>
							<div className='flex md:gap-24 gap-8 items-center  mb-4'>
								<div className='md:w-[82px] w-[68px] md:h-14 h-[45px] flex items-center justify-center bg-white rounded font-medium text-[22px]' style={{ border: '1px solid #ADB5B9' }}>
									125
								</div>
								<div className='flex-1 '>
									<h2 className='font-medium md:text-[22px] text-[18px]'>مرات بيع المنتج</h2>
								</div>
							</div>
							<div className='flex md:gap-24 gap-8 items-center  mb-4'>
								<div className='md:w-[82px] w-[68px] md:h-14 h-[45px] flex items-center justify-center bg-white rounded font-medium text-[22px]' style={{ border: '1px solid #ADB5B9' }}>
									125
								</div>
								<div className='flex-1 '>
									<h2 className='font-medium md:text-[22px] text-[18px]'>اجمالي مبيعات المنتج</h2>
								</div>
							</div>
						</div>
						<Button onClick={closeDetails} type={'normal'} className={'text-center text-xl md:h-14 h-[45px] md:w-[474px] w-full rounded md:mt-14 mt-8'}>
							اغلاق
						</Button>
					</div>
				</div>
			</>
		);
};

export default ProductDetails;
