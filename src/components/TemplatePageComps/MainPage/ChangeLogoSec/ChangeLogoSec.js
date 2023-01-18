import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import Logo from '../../../../assets/images/logo.png';

import { MdFileUpload } from 'react-icons/md';
import Button from '../../../../UI/Button/Button';

const ChangeLogoSec = () => {
	const [images, setImages] = useState([]);
	const onChangeLogoImage = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList);
		setImages(imageList);
	};
	//   useEffect(() => {
	//     onChangeLogoImage(Logo);
	//   }, []);

	return (
		<div className='mt-8 shadow-md rounded-lg ' style={{ backgroundColor: '#FFFFFF' }}>
			<div className='p-5 rounded-t-lg' style={{ backgroundColor: '#F7FCFF', border: '1px solid #EFEFEF' }}>
				<h2 className='text-xl font-medium flex items-center'>
					الشعار
					<span className='mr-3 text-base font-normal text-[#67747B]'>(تستطيع تغيير الشعار الذي يظهر في الهيدر في الصفحة الرئيسية)</span>
				</h2>
			</div>
			<div className='py-7 flex flex-col items-center'>
				<ImageUploading value={images} onChange={onChangeLogoImage} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']} disabled={true}>
					{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
						// write your building UI
						<div
							className='upload__image-wrapper relative '
							style={{
								width: '572px',

								// border: images[0] ? "none" : "1px dashed #ccc",
								// borderRadius: "10px",
							}}
						>
							<div className='image-item w-full '>
								<div style={{ border: ' 1px dashed #02466A', height: '137px' }} className='flex p-4 flex-col justify-center items-center gap-6  w-full  rounded-lg'>
									{!images[0] && <img src={Logo} alt='' />}
									{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-contain' />}
								</div>
								<div
									onClick={() => {
										onImageUpload();
									}}
									className='flex cursor-pointer justify-between items-center p-4 mt-2 h-11 rounded'
									style={{
										backgroundColor: '#FAFAFA',
										border: '1px dashed #E0E0E0',
									}}
								>
									<h2 className='text-base font-medium  '>تحديث الشعار</h2>
									<MdFileUpload color='#02466A' size={'1.25rem'}></MdFileUpload>
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

export default ChangeLogoSec;
