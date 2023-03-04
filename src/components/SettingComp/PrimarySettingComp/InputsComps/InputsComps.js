import React, { useState, useContext, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { ReactComponent as UploadIcon } from '../../../../assets/Icons/icon-24-upload_outlined.svg';
import useFetch from '../../../../hooks/useFetch';
import Context from '../../../../store/context';
import axios from "axios";
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import Button from '../../../../UI/Button/Button';

const InputsComps = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/setting');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [settingData, setSettingData] = useState({
		id: '',
		name: '',
		desc: '',
		link: '',
		email: '',
		address: '',
		phone: ''
	});
	const [images, setImages] = useState([]);
	const onChangeImage = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	useEffect(() => {
		setSettingData({
			...settingData,
			id: fetchedData?.data?.settings?.id,
			name: fetchedData?.data?.settings?.name,
			desc: fetchedData?.data?.settings?.description,
			link: fetchedData?.data?.settings?.link,
			email: fetchedData?.data?.settings?.email,
			address: fetchedData?.data?.settings?.address,
			phone: fetchedData?.data?.settings?.phonenumber,
		})
	}, [fetchedData?.data?.settings]);
	const updateSetting = () => {
		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('name', settingData?.name);
		formData.append('description', settingData?.desc);
		formData.append('phonenumber', settingData?.phone);
		formData.append('link', settingData?.link);
		formData.append('email', settingData?.email);
		formData.append('address', settingData?.address);
		if (images.length !== 0) {
			formData.append('logo', images[0]?.file || null);
		}

		axios
			.post(`https://backend.atlbha.com/api/Admin/setting/${settingData?.id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
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
	}
	return (
		<div className='md:mt-10 mt-6 md:pr-24 md:pl-40 md:pb-24 p-4'>
			{
				loading
					?
					(
						<div className='flex flex-col items-center'>
							<CircularLoading />
						</div>
					)
					:
					(
						<div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									اسم المنصة
								</label>
								<input
									value={settingData?.name}
									onChange={(e) => setSettingData({ ...settingData, name: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='text'
									placeholder='ادخل اسم المنصة' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									وصف المنصة
								</label>
								<input
									value={settingData?.desc}
									onChange={(e) => setSettingData({ ...settingData, desc: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='text'
									placeholder='اكتب وصف للمنصة' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									رابط المنصة
								</label>
								<input
									value={settingData?.link}
									onChange={(e) => setSettingData({ ...settingData, link: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='text'
									placeholder='www.sample.com' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									البريد الالكتروني
								</label>
								<input
									value={settingData?.email}
									onChange={(e) => setSettingData({ ...settingData, email: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='email'
									placeholder='www.sample.com' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									العنوان
								</label>
								<input
									value={settingData?.address}
									onChange={(e) => setSettingData({ ...settingData, address: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='text'
									placeholder='ادخل العنوان والاقامة' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									رقم الهاتف
								</label>
								<input
									value={settingData?.phone}
									onChange={(e) => setSettingData({ ...settingData, phone: e.target.value })}
									className='outline-none w-full md:h-14 h-[45px] p-3 mt-3 rounded'
									style={{ border: 'none' }}
									type='tel'
									placeholder='966515131515' />
							</div>
							<div className='md:mb-5 mb-3'>
								<label className='md:text-[18px] text-[16px] font-medium'>
									الشعار
								</label>
								<div>
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
								</div>
							</div>
						</div>
					)
			}
			{!loading && <div className='flex gap-4 mt-8'>
				<Button onClick={updateSetting} className={'rounded h-14'} style={{ backgroundColor: '#1DBBBE', width: '180px' }} fontSize={'text-xl'} type={'normal'}>
					تعديل
				</Button>
			</div>
			}
		</div>
	);
};
export default InputsComps;
