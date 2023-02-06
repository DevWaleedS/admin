import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
// import { UploadIcon } from 'react-icons/gr';

import { ReactComponent as UploadIcon } from '../../../../assets/Icons/icon-24-upload_outlined.svg';

const InputsComps = () => {
	const [images, setImages] = useState([]);
	const onChangeImage = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};
	return (
		<div className='md:mt-10 mt-6 md:pr-24 md:pl-40 md:pb-24 p-4'>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					اسم المنصة
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='text' placeholder='ادخل اسم المنصة' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					وصف المنصة
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='text' placeholder='اكتب وصف للمنصة' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					رابط المنصة
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='text' placeholder='www.sample.com' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					البريد الالكتروني
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='email' placeholder='www.sample.com' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					العنوان
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='text' placeholder='ادخل العنوان والاقامة' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					رقم الهاتف
				</h2>
				<label htmlFor=''>
					<input className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded' style={{ border: 'none' }} type='tel' placeholder='966515131515' />
				</label>
			</div>
			<div className='md:mb-5 mb-3'>
				<h2 className='md:text-[18px] text-[16px] font-medium'>
					الشعار
				</h2>
				<label htmlFor=''>
					<ImageUploading value={images} onChange={onChangeImage} maxNumber={1} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
						{({ onImageUpload, dragProps }) => (
							// write your building UI
							<div
								className='upload__image-wrapper relative  flex items-center overflow-hidden  outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded bg-white'
								style={{
									border: 'none',
								}}
								{...dragProps}
							>
								<h2
									className='w-full outline-none p-4 cursor-pointer'
									style={{
										color: '#aaa',
									}}
									onClick={() => {
										onImageUpload();
									}}
								>
									{images[0]?.file?.name || 'قم برفع شعار للمنصة'}
								</h2>
								<div
									className='flex h-full items-center justify-center'
									style={{
										width: '1.3rem',
									}}
								>
									<UploadIcon className='w-full' fill='#1dbbbe' />
								</div>
							</div>
						)}
					</ImageUploading>
				</label>
			</div>
		</div>
	);
};

export default InputsComps;
