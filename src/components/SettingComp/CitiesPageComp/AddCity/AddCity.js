import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../../store/context';
import Button from '../../../../UI/Button/Button';
import styles from './AddCity.module.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AiFillStar } from 'react-icons/ai';
import { GoArrowRight } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import useFetch from '../../../../hooks/useFetch';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const formTitleClasses = 'md:w-[315px] w-full font-normal md:text-[18px] text-[16px] md:mb-0 mb-2';
//
const formInputClasses = 'md:w-[555px] w-full md:h-14 h-[45px] px-4 outline-0 rounded-lg';
const formInputStyle = {
	backgroundColor: '#FFFFF',
	border: '1px solid #A7A7A7',
	borderRadius: '8px',
};

const AddCountry = ({ reload, setReload, cancel, data, detailsCity }) => {
	const { fetchedData } = useFetch('https://backend.atlbha.com/api/Admin/selector/countries');
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [cityData, setCityData] = useState({
		name: data?.name || detailsCity?.name || '',
		name_en: data?.name_en || detailsCity?.name_en || '',
		code: data?.code || detailsCity?.code || '',
		country_id: data?.country?.id || detailsCity?.country?.id || ''
	});
	const add = () => {
		const data = {
			code: cityData?.code,
			name: cityData?.name,
			name_en: cityData?.name_en,
			country_id: cityData?.country_id,
		}
		axios
			.post('https://backend.atlbha.com/api/Admin/city', data, {
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

	const updateCity = () => {
		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('code', cityData?.code);
		formData.append('name', cityData?.name);
		formData.append('name_en', cityData?.name_en);
		formData.append('country_id', cityData?.country_id);
		axios
			.post(`https://backend.atlbha.com/api/Admin/city/${data?.id}`, formData, {
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
						<h2 className='font-bold md:text-2xl text-[20px] mb-3'>اضافة مدينة</h2>
						<div className='flex'>
							<div className={`flex items-center gap-2 `}>
								<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
									<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
								</div>

								<h2 className='font-normal md:text-lg text-[16px] md:ml-4 ml-2'> الإعدادات </h2>
							</div>

							<h2 className='font-normal md:text-lg text-[16px] md:ml-4 ml-2'> / جدول المدن </h2>

							<h3 className='font-normal md:text-lg text-[16px]' style={{ color: '#67747B' }}>
								/ اضافة مدن
							</h3>
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
								{!detailsCity &&
									<Select
										className='md:w-[555px] w-full md:h-[3.5rem] h-[45px] rounded-lg bg-white '
										value={cityData?.country_id}
										IconComponent={() => {
											return <IoIosArrowDown size={'1.2rem'} />;
										}}
										onChange={(e) => setCityData({ ...cityData, country_id: e.target.value })}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (cityData?.country_id === '') {
												return <h2 style={{ color: '#011723' }}>اختر الدولة</h2>;
											}
											const result = fetchedData?.data?.countries?.filter((item) => item?.id === parseInt(selected));
											return <div className='flex flex-row items-center justify-between'>
												<span>{result[0]?.code}</span>
												<span>{result[0]?.name}</span>
											</div>
										}}
										sx={{
											border: '1px solid #A7A7A7',
											pl: '1rem !important',
											'& .MuiSelect-select': {
												pr: '1rem !important',
											},
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{fetchedData?.data?.countries?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items flex justify-between items-center'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													<h2 className='md:text-[18px] text-[16px]'>{item?.code}</h2>
													<h2 className='md:text-[18px] text-[16px]'>{item?.name}</h2>
												</MenuItem>
											);
										})}
									</Select>
								}
								<input
									value={cityData?.code}
									onChange={(e) => setCityData({ ...cityData, code: e.target.value })}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='أدخل أرقام فقط'
									type='text'
									disabled={detailsCity}
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
									رقم المدينة
								</h2>
								<input
									value={cityData?.code}
									onChange={(e) => setCityData({ ...cityData, code: e.target.value })}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='أدخل أرقام فقط'
									type='text'
									disabled={detailsCity}
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
									اسم المدينة (AR)
								</h2>
								<input
									value={cityData?.name}
									onChange={(e) => setCityData({ ...cityData, name: e.target.value })}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='ادخل حروف عربي فقط'
									type='text'
									disabled={detailsCity}
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
									اسم المدينة (EN)
								</h2>
								<input
									value={cityData?.name_en}
									onChange={(e) => setCityData({ ...cityData, name_en: e.target.value })}
									className={formInputClasses}
									style={formInputStyle}
									placeholder='ادخل حروف انجليزية فقط'
									type='text'
									disabled={detailsCity}
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
							!detailsCity &&
							(
								<Button
									className={'md:h-14 h-[45px] md:w-[286px] w-full md:text-xl md:text-[18px]'}
									style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
									type={'normal'}
									onClick={() => data ? updateCity() : add()}
									disabled={detailsCity}
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
