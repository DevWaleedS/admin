import React, { useState, useContext } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';

import ImageUploading from 'react-images-uploading';

import banner from '../../../../assets/images/ad_banner.png';
import { MdFileUpload } from 'react-icons/md';
import Button from '../../../../UI/Button/Button';

const ChangeBannerSec = ({ fetchedData, loading, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

// check active sliders 
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

	// TO UPLOAD BANNERS
	const [images, setImages] = useState([]);
	const onChangeLogoImage = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};
	

	// ADD Banners FUNCTION  (complate work Alawi please )
	const addBanners = () => {
		const formData = new FormData();
		formData.append('banar1', images[0]?.file || '');
		formData.append('banar2', images[0]?.file || '');
		formData.append('banar3', images[0]?.file || '');
		formData.append('banarstatus1', activateBanner[0]);
		formData.append('banarstatus2', activateBanner[1]);
		formData.append('banarstatus3', activateBanner[2]);
		

		axios
			.post(`https://backend.atlbha.com/api/Admin/banarUpdate`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};

	return (
		<div className='mt-8 shadow-md rounded-lg' style={{ backgroundColor: '#FFFFFF' }}>
			<div className='md:p-5 px-3 py-2 rounded-t-lg' style={{ backgroundColor: '#F7FCFF', border: '1px solid #EFEFEF' }}>
				<h2 className='md:text-xl text-[16px] font-medium flex items-center whitespace-nowrap'>
					البنرات الإعلانية
					<span className='mr-3 md:text-base text-[14px] font-normal text-[#67747B] whitespace-pre-line'>(تستطيع تغيير الصورة التي تظهر كإعلانات في وسط الموقع وبين الأقسام)</span>
				</h2>
			</div>
			<div className='max-w-full md:py-10 flex flex-col md:pr-24 py-7 px-4'>
				<ImageUploading value={images} onChange={onChangeLogoImage} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
					{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
						// write your building UI
						<div className='max-w-full upload__image-wrapper relative '>
							<div className='image-item w-full'>
								<div className='flex'>
									<div className='md:w-[274px] w-0'></div>
									<div style={{ height: '166px', width: '572px' }} className='flex  flex-col justify-center items-center gap-6  '>
										{!images[0] && <img className='w-full h-full object-cover' src={fetchedData?.data?.Homepages?.banar1} alt={fetchedData?.data?.Homepages?.banar1} />}
										{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-contain' />}
									</div>
								</div>
								<div className='flex flex-col gap-4 mt-4'>
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>بانر إعلاني رقم 1</h2>
										<div className='max-w-full flex flex-row items-center'>
											<div
												onClick={() => {
													onImageUpload();
												}}
												className='flex justify-between items-center p-4 cursor-pointer h-11 rounded'
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
													minWidth: '35px',
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
									</div>
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>بانر إعلاني رقم 2</h2>
										<div className='max-w-full flex flex-row items-center'>
											<div
												onClick={() => {
													onImageUpload();
												}}
												className='flex justify-between items-center p-4 cursor-pointer h-11 rounded'
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
													minWidth: '35px',
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
									</div>
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>بانر إعلاني رقم 3</h2>
										<div className='max-w-full flex flex-row items-center'>
											<div
												onClick={() => {
													onImageUpload();
												}}
												className='flex justify-between items-center p-4 cursor-pointer h-11 rounded'
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
													minWidth: '35px',
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
								</div>
							</div>
							<Button className={'mx-auto mt-9 w-[109] md:h-14 h-[45px] md:text-2xl text-[18px]'} fontSize={'text-2xl font-thin'} style={{ backgroundColor: '#02466A' }} type={'normal'} onClick={addBanners}>
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
