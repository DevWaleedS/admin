import React, { useState, useContext } from 'react';
import Context from '../../../../store/context';
import Button from '../../../../UI/Button/Button';
import styles from './AddCountry.module.css';
import { AiFillStar } from 'react-icons/ai';
import { GoArrowRight } from 'react-icons/go';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const formTitleClasses = 'md:w-[315px] w-full font-normal md:text-[18px] text-[16px] md:mb-0 mb-2';

const formInputClasses = 'md:w-[555px] w-full md:h-14 h-[45px] px-4 outline-0 rounded-lg';
const formInputStyle = {
	border: '1px solid #A7A7A7',
};

const AddCountry = ({ reload, setReload, cancel, data, detailsCountry }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [countryData, setCountryData] = useState({
		name: data?.name || detailsCountry?.name || '',
		name_en: data?.name_en || detailsCountry?.name_en || '',
		code: data?.code || detailsCountry?.code || '',
	});

	const add = () => {
		const data = {
			code: countryData?.code,
			name: countryData?.name,
			name_en: countryData?.name_en,
		}
		axios
			.post('https://backend.atlbha.com/api/Admin/country', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	};

	const updateCountry = () => {
		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('code', countryData?.code);
		formData.append('name', countryData?.name);
		formData.append('name_en', countryData?.name_en);
		axios
			.post(`https://backend.atlbha.com/api/Admin/country/${data?.id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	}


	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-30 ${styles.container}`} style={{ width: '1104px', maxWidth: '100%', height: 'calc(100% - 5rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='md:p-8 p-4'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold md:text-2xl text-[20px] mb-3'>اضافة دولة</h2>
						<div className='flex'>
							<div className={`flex items-center gap-2 `}>
								<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
									<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
								</div>

								<h2 className='font-normal md:text-lg text-[16px] md:ml-4 ml-2'> الإعدادات </h2>
							</div>

							<h2 className='font-normal md:text-lg text-[16px] md:ml-4 ml-2'> / جدول الدول </h2>
							{
								data ?
									(
										<h3 className='font-normal md:text-lg text-[16px]' style={{ color: '#67747B' }}>
											/ تعديل دولة
										</h3>
									)
									:
									detailsCountry
										?
										(
											<h3 className='font-normal md:text-lg text-[16px]' style={{ color: '#67747B' }}>
												/ تفاصيل دولة
											</h3>
										)
										:
										(
											<h3 className='font-normal md:text-lg text-[16px]' style={{ color: '#67747B' }}>
												/ اضافة دولة
											</h3>
										)

							}
						</div>
					</div>
					<div className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 p-4 ${styles.content}`}>
						<form action=''>
							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									رقم الدولة
								</h2>
								<input
									value={countryData?.code}
									onChange={(e) => {
										setCountryData({ ...countryData, code: e.target.value });
									}}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='أدخل أرقام فقط'
									type='text'
									disabled={detailsCountry}
								/>
							</div>
							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم الدولة (AR)
								</h2>
								<input
									value={countryData?.name}
									onChange={(e) => {
										setCountryData({ ...countryData, name: e.target.value });
									}}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='ادخل حروف عربي فقط'
									type='text'
									disabled={detailsCountry}
								/>
							</div>

							<div className='flex md:flex-row flex-col md:mb-8 mb-4 md:items-center items-start'>
								<h2 className={formTitleClasses}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم الدولة (EN)
								</h2>
								<input
									value={countryData?.name_en}
									onChange={(e) => {
										setCountryData({ ...countryData, name_en: e.target.value });
									}}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='ادخل حروف انجليزية فقط'
									type='text'
									disabled={detailsCountry}
								/>
							</div>
						</form>
					</div>
					<div
						className='md:h-[135px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4'
						style={{
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						{
							!detailsCountry &&
								(
									<Button
										className={'md:h-14 h-[45px] md:w-[286px] w-full md:text-xl md:text-[18px]'}
										style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
										type={'normal'}
										onClick={() => data ? updateCountry() : add()}
										disabled={detailsCountry}
									>
										حفظ واعتماد
									</Button>
								)
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCountry;
