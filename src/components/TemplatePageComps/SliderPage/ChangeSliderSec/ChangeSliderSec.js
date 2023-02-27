import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';
import ImageUploading from "react-images-uploading";
import { MdFileUpload } from "react-icons/md";
import Button from "../../../../UI/Button/Button";
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

const ChangeSliderSec = ({fetchedData, loading, reload, setReload}) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	const [sliderstatus1, setSliderStatus1] = useState(true);
	const [sliderstatus2, setSliderStatus2] = useState(true);
	const [sliderstatus3, setSliderStatus3] = useState(true);

	useEffect(() => {
		setSliderStatus1(fetchedData?.data?.Homepages?.sliderstatus1 === 'active' ? true : false);
		setSliderStatus2(fetchedData?.data?.Homepages?.sliderstatus2 === 'active' ? true : false);
		setSliderStatus3(fetchedData?.data?.Homepages?.sliderstatus3 === 'active' ? true : false);
	},
		[fetchedData?.data?.Homepages?.sliderstatus1, fetchedData?.data?.Homepages?.sliderstatus2, fetchedData?.data?.Homepages?.sliderstatus3]
	)

	// TO UPLOAD BANNERS
	const [firstimage, setFirstImage] = useState([]);
	const [secondimage, setSecondImage] = useState([]);
	const [thirdimage, setThirdImage] = useState([]);
	const [previewImage, setPreviewImage] = useState("");

	const updateSliders = () => {
		const formData = new FormData();
		if(firstimage.length !==0){
			formData.append('slider1', firstimage[0]?.file || null);
		}
		if(secondimage.length !==0){
			formData.append('slider2', secondimage[0]?.file || null);
		}
		if(thirdimage.length !==0){
			formData.append('slider3', thirdimage[0]?.file || null);
		}
		formData.append('sliderstatus1', sliderstatus1 ? 'active' : 'not_active');
		formData.append('sliderstatus2', sliderstatus2 ? 'active' : 'not_active');
		formData.append('sliderstatus3', sliderstatus3 ? 'active' : 'not_active');
		axios
			.post(`https://backend.atlbha.com/api/Admin/sliderUpdate`, formData, {
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
		<div className='mt-8 shadow-md rounded-lg ' style={{ backgroundColor: '#FFFFFF' }}>
			<div className='md:p-5 px-3 py-2 rounded-t-lg' style={{ backgroundColor: '#F7FCFF', border: '1px solid #EFEFEF' }}>
				<h2 className='md:text-xl text-[16px] font-medium flex items-center whitespace-nowrap'>
					السلايدر المتحرك
					<span className='mr-3 md:text-base text-[14px] font-normal text-[#67747B] whitespace-pre-line'>(تستطيع تغيير الصورة التي تظهر في السلايدر المتحرك أعلى الموقع)</span>
				</h2>
			</div>
			<div className='max-w-full md:pt-10 md:pb-28 flex flex-col md:pr-24 py-7 px-4'>
				<ImageUploading value={firstimage} onChange={(imageList) => { setFirstImage(imageList); setPreviewImage(imageList) }} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
					{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
						// write your building UI
						<div className='upload__image-wrapper relative ' style={{}}>
							<div className='image-item w-full '>
								<div className='flex'>
									<div className="md:w-[274px] w-0"></div>
									<div style={{ height: '166px', width: '572px' }} className='flex  flex-col justify-center items-center gap-6  '>
										{loading ?
											<CircularProgress />
											:
											<>
												{!firstimage[0] && <img className='w-full h-full object-cover' src={fetchedData?.data?.Homepages?.slider1} alt={fetchedData?.data?.Homepages?.slider1} />}
												{firstimage[0] && <img src={previewImage[0]?.data_url} alt='preview-img' className='w-full h-full object-contain' />}
											</>
										}
									</div>
								</div>
								<div className="flex flex-col gap-4 mt-4">
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>
											بانر متحرك رقم 1
										</h2>
										<div className="max-w-full flex flex-row items-center">
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
											<div className="mr-4">
												<Switch
													onChange={() => setSliderStatus1(!sliderstatus1)}
													sx={{
														width: '35px',
														padding: 0,
														height: '20px',
														borderRadius: '0.75rem',
														'& .MuiSwitch-thumb': {
															width: '12px',
															height: '12px',
														},
														'& .MuiSwitch-switchBase': {
															padding: '0',
															top: '4px',
															left: '4px',
														},
														'& .MuiSwitch-switchBase.Mui-checked': {
															left: '-4px',
														},
														'& .Mui-checked .MuiSwitch-thumb': {
															backgroundColor: '#FFFFFF',
														},
														'& .MuiSwitch-track': {
															height: '100%',
														},
														'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
															backgroundColor: '#3AE374',
															opacity: 1,
														},
													}}
													checked={sliderstatus1}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</ImageUploading>
				<ImageUploading value={secondimage} onChange={(imageList) => { setSecondImage(imageList); setPreviewImage(imageList) }} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
					{({ onImageUpload }) => (
						// write your building UI
						<div className='max-w-full upload__image-wrapper relative '>
							<div className='image-item w-full'>
								<div className='flex flex-col gap-4 mt-4'>
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>بانر متحرك رقم 2</h2>
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
											<div className="mr-4">
												<Switch
													onChange={() => setSliderStatus2(!sliderstatus2)}
													sx={{
														width: '35px',
														padding: 0,
														height: '20px',
														borderRadius: '0.75rem',
														'& .MuiSwitch-thumb': {
															width: '12px',
															height: '12px',
														},
														'& .MuiSwitch-switchBase': {
															padding: '0',
															top: '4px',
															left: '4px',
														},
														'& .MuiSwitch-switchBase.Mui-checked': {
															left: '-4px',
														},
														'& .Mui-checked .MuiSwitch-thumb': {
															backgroundColor: '#FFFFFF',
														},
														'& .MuiSwitch-track': {
															height: '100%',
														},
														'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
															backgroundColor: '#3AE374',
															opacity: 1,
														},
													}}
													checked={sliderstatus2}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</ImageUploading>
				<ImageUploading value={thirdimage} onChange={(imageList) => { setThirdImage(imageList); setPreviewImage(imageList) }} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
					{({ onImageUpload }) => (
						// write your building UI
						<div className='max-w-full upload__image-wrapper relative '>
							<div className='image-item w-full'>
								<div className='flex flex-col gap-4 mt-4'>
									<div className='flex md:flex-row flex-col md:items-center items-start gap-y-2'>
										<h2 className='md:text-center font-normal text-lg text-[#67747B] md:w-[274px] w-full'>بانر متحرك رقم 3</h2>
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
											<div className="mr-4">
												<Switch
													onChange={() => setSliderStatus3(!sliderstatus3)}
													sx={{
														width: '35px',
														padding: 0,
														height: '20px',
														borderRadius: '0.75rem',
														'& .MuiSwitch-thumb': {
															width: '12px',
															height: '12px',
														},
														'& .MuiSwitch-switchBase': {
															padding: '0',
															top: '4px',
															left: '4px',
														},
														'& .MuiSwitch-switchBase.Mui-checked': {
															left: '-4px',
														},
														'& .Mui-checked .MuiSwitch-thumb': {
															backgroundColor: '#FFFFFF',
														},
														'& .MuiSwitch-track': {
															height: '100%',
														},
														'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
															backgroundColor: '#3AE374',
															opacity: 1,
														},
													}}
													checked={sliderstatus3}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</ImageUploading>
				<Button onClick={updateSliders} className={'mx-auto mt-9 md:h-14 h-[45px] md:text-2xl text-[18px]'} fontSize={'text-2xl font-thin'} style={{ backgroundColor: '#02466A' }} type={'normal'}>
					حفظ
				</Button>
			</div>
		</div>
	);
};

export default ChangeSliderSec;
