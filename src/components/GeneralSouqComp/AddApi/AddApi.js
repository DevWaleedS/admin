import React, { useState, useEffect, useContext } from 'react';
import Button from '../../../UI/Button/Button';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import ImageUploading from 'react-images-uploading';
import { IoMdCloudUpload } from 'react-icons/io';
import styles from './AddApi.module.css';
import Context from '../../../store/context';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const AddApi = ({ cancel, editDetails }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [images, setImages] = useState([]);
	const [marketTitle, setMarketTitle] = useState('');
	const [marketUrl, setMarketUrl] = useState('');

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};
	useEffect(() => {
		if (editDetails) {
			setMarketTitle(editDetails.marketTitle);
			setMarketUrl(editDetails.url);
		}
	}, [editDetails]);

	
	return (
		<>
			
			<BackDrop onClick={cancel} />
			<div className='absolute flex flex-col top-5 translate-x-2/4  right-2/4 z-20 rounded-lg overflow-hidden' style={{ width: '60.25rem',maxWidth:'90%' }}>
				<div className='h-16 w-full flex items-center justify-between py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50 md:text-xl text-[16px] text-center'>إضافة API </h2>
					<IoMdCloseCircleOutline size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 p-4 md:pt-16 py-8 md:pb-12' style={{ backgroundColor: '#F6F6F6' }}>
					<div className='flex mb-8'>
						<ImageUploading value={images} onChange={onChange} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
							{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
								// write your building UI
								<div
									className='md:h-[170px] h-[118px] upload__image-wrapper mx-auto relative overflow-hidden'
									style={{
										width: '376px',
										border: images[0] || editDetails ? 'none' : '1px dashed #02466A',
										borderRadius: '10px',
										strokeDasharray: "'6%2c5'",
									}}
									onClick={() => {
										onImageUpload();
									}}
									{...dragProps}
								>
									<div className='image-item h-full w-full cursor-pointer'>
										{!images[0] && !editDetails && (
											<div className='flex flex-col justify-center items-center md:gap-6 gap-2 h-full w-full'>
												<IoMdCloudUpload size={'2em'}></IoMdCloudUpload>
												<h2 className='font-semibold'>أضف الشعار المطلوب</h2>
												<h2>(سيتم قبول الصور png & jpg)</h2>
											</div>
										)}
										{editDetails && <img src={editDetails.logo} alt='' className='w-full h-full object-contain' />}
										{images[0] && <img src={images[0]?.data_url} alt='' className='w-full h-full object-cover' />}
									</div>
								</div>
							)}
						</ImageUploading>
					</div>
					<div className={`md:w-[768px] w-full mx-auto gap-4 justify-center ${styles.inputs}`}>
						<label>
							<input
								className='md:w-[768px] w-full md:h-14 h-[45px] p-4 mb-5 text-center outline-none'
								style={{ backgroundColor: '#EBEBEB' }}
								placeholder={'اسم المنصة'}
								type='text'
								name='name'
								value={marketTitle}
								onChange={(e) => {
									setMarketTitle(e.target.value);
								}}
							/>
						</label>
						<label>
							<input
								className='md:w-[768px] w-full md:h-14 h-[45px] p-4 text-center outline-none'
								style={{ backgroundColor: '#EBEBEB' }}
								placeholder={'لصق رابط Api'}
								type='text'
								name='name'
								value={marketUrl}
								onChange={(e) => {
									setMarketUrl(e.target.value);
								}}
							/>
						</label>
						<Button
							onClick={() => {
								setEndActionTitle('تم اضافة API جديد بنجاح');
								cancel();
							}}
							type={'normal'}
							className={'text-center w-full mt-10 md:h-14 h-[45px]'}
						>
							حفظ
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddApi;
