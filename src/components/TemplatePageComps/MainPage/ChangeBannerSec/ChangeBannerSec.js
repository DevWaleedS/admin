import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import banner from "../../../../assets/images/ad_banner.png";

import { MdFileUpload } from "react-icons/md";
import Button from "../../../../UI/Button/Button";

const ChangeBannerSec = () => {
  const [images, setImages] = useState([]);
  const [activateBanner, setActivateBanner] = useState([1, 2, 3]);
  const handleActivatedBanners = (id) => {
    const exist = activateBanner.some((e) => e === id);
    if (exist) {
      const arr = activateBanner.filter((e) => e !== id);
      setActivateBanner(arr);
    } else {
      setActivateBanner([...activateBanner, id]);
    }
  };
  const onChangeLogoImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };

  return (
			<div className='mt-8 shadow-md rounded-lg ' style={{ backgroundColor: '#FFFFFF' }}>
				<div className='p-5 rounded-t-lg' style={{ backgroundColor: '#F7FCFF', border: '1px solid #EFEFEF' }}>
					<h2 className='text-xl font-medium flex items-center'>
						البنرات الإعلانية
						<span className='mr-3 text-base font-normal text-[#67747B]'>(تستطيع تغيير الصورة التي تظهر كإعلانات في وسط الموقع وبين الأقسام)</span>
					</h2>
				</div>
				<div className='py-10 flex flex-col '>
					<ImageUploading value={images} onChange={onChangeLogoImage} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
						{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
							// write your building UI
							<div
								className='upload__image-wrapper relative '
								style={
									{
										// border: images[0] ? "none" : "1px dashed #ccc",
										// borderRadius: "10px",
									}
								}
							>
								<div className='image-item w-full '>
									<div className='flex'>
										<div style={{ width: '274px' }}></div>
										<div style={{ height: '166px', width: '572px' }} className='flex  flex-col justify-center items-center gap-6  '>
											{!images[0] && <img className='w-full h-full object-cover' src={banner} alt='' />}
											{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-contain' />}
										</div>
									</div>
									<div className='flex items-center'>
										<h2 className='text-center font-normal text-lg text-[#67747B]' style={{ width: '274px',  }}>
											بانر إعلاني رقم 1
										</h2>
										<div
											onClick={() => {
												onImageUpload();
											}}
											className='flex justify-between items-center p-4 mt-2 cursor-pointer h-11 rounded'
											style={{
												backgroundColor: '#FAFAFA',
												border: '1px dashed #E0E0E0',
												width: '572px',
											}}
										>
											<h2 className='text-base font-medium' style={{ color: '#67747B' }}>
												تحديث البانر
											</h2>
											<MdFileUpload color='#02466A' size={'1.25rem'}></MdFileUpload>
										</div>
										<div
											className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
											style={{
												backgroundColor: activateBanner.some((e) => {
													return e === 1;
												})
													? '#3AE374'
													: '#A7A7A7',
											}}
											onClick={() => {
												handleActivatedBanners(1);
											}}
										>
											<div
												className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
													activateBanner.some((e) => {
														return e === 1;
													})
														? 'left-4'
														: 'left-1'
												}`}
											></div>
										</div>
									</div>
									<div className='flex items-center'>
										<h2 className='text-center font-normal text-lg text-[#67747B]' style={{ width: '274px', }}>
											بانر إعلاني رقم 2
										</h2>
										<div
											onClick={() => {
												onImageUpload();
											}}
											className='flex justify-between items-center p-4 mt-2 cursor-pointer h-11 rounded'
											style={{
												backgroundColor: '#FAFAFA',
												border: '1px dashed #E0E0E0',
												width: '572px',
											}}
										>
											<h2 className='text-base font-medium' style={{ color: '#67747B' }}>
												تحديث البانر
											</h2>
											<MdFileUpload color='#02466A' size={'1.25rem'}></MdFileUpload>
										</div>
										<div
											className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
											style={{
												backgroundColor: activateBanner.some((e) => {
													return e === 2;
												})
													? '#3AE374'
													: '#A7A7A7',
											}}
											onClick={() => {
												handleActivatedBanners(2);
											}}
										>
											<div
												className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
													activateBanner.some((e) => {
														return e === 2;
													})
														? 'left-4'
														: 'left-1'
												}`}
											></div>
										</div>
									</div>
									<div className='flex items-center'>
										<h2 className='text-center font-normal text-lg text-[#67747B] ' style={{ width: '274px', }}>
											بانر إعلاني رقم 3
										</h2>
										<div
											onClick={() => {
												onImageUpload();
											}}
											className='flex justify-between items-center p-4 mt-2 cursor-pointer h-11 rounded'
											style={{
												backgroundColor: '#FAFAFA',
												border: '1px dashed #E0E0E0',
												width: '572px',
											}}
										>
											<h2 className='text-base font-medium' style={{ color: '#67747B' }}>
												تحديث البانر
											</h2>
											<MdFileUpload color='#02466A' size={'1.25rem'}></MdFileUpload>
										</div>
										{/* Switch  */}
										<div
											className={`w-8 mr-4 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
											style={{
												backgroundColor: activateBanner.some((e) => {
													return e === 3;
												})
													? '#3AE374'
													: '#A7A7A7',
											}}
											onClick={() => {
												handleActivatedBanners(3);
											}}
										>
											<div
												className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${
													activateBanner.some((e) => {
														return e === 3;
													})
														? 'left-4'
														: 'left-1'
												}`}
											></div>
										</div>
									</div>
								</div>
								<Button className={'mx-auto mt-9 w-[109] h-14 text-2xl'} fontSize={'text-2xl font-thin'} style={{ backgroundColor: '#02466A' }} type={'normal'}>
									حفظ
								</Button>
							</div>
						)}
					</ImageUploading>
				</div>
			</div>
		);
};

export default ChangeBannerSec;
