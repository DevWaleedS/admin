import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../../store/context';
import Button from '../../../../UI/Button/Button';
import styles from './AddCountry.module.css';
import { AiFillStar } from 'react-icons/ai';
import { GoArrowRight } from 'react-icons/go';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900 opacity-50  z-10 ${styles.back_drop}`} style={{ height: 'calc(100% - 4rem)' }}></div>;
};

const formTitleClasses = 'font-normal text-lg';
const formTitleStyle = { width: '315px' };
//
const formInputClasses = 'p-4 outline-0 rounded-md';
const formInputStyle = {
	width: '555px',
	border: '1px solid #A7A7A7',
};

const AddCountry = ({ cancel, data }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [countryNumber, setCountryNumber] = useState('');
	const [arabicCountryName, setArabicCountryName] = useState('');
	const [englishCountryName, setEnglishCountryName] = useState('');

	useEffect(() => {
		if (data) {
			setCountryNumber(data.number);
			setArabicCountryName(data.name);
			setEnglishCountryName(data.nameEn);
		}
	}, [data]);

	return (
		<>
			<BackDrop onClick={cancel}></BackDrop>
			<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-20 ${styles.container}`} style={{ width: '1104px', height: 'calc(100% - 5rem)' }}>
				<div className='flex h-full flex-col justify-between'>
					<div
						className='p-8'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<h2 className='font-bold text-2xl  mb-3'>اضافة دولة</h2>
						<div className='flex'>
							<div className={`flex items-center gap-2 `}>
								<div onClick={cancel} className={`flex items-center gap-2 cursor-pointer ${styles.arrow_con}`}>
									<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
								</div>

								<h2 className='font-normal text-lg ml-4'> الإعدادات </h2>
							</div>

							<h2 className='font-normal text-lg ml-4'> / جدول الدول </h2>

							<h3 className='font-normal text-lg' style={{ color: '#67747B' }}>
								/ اضافة دولة
							</h3>
						</div>
					</div>
					<div className={`flex-1 overflow-y-scroll py-12 pr-8 ${styles.content}`}>
						<form action=''>
							<div className='flex mb-8 items-center'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									رقم الدولة
								</h2>
								<label>
									<input
										value={countryNumber}
										onChange={(e) => {
											setCountryNumber(e.target.value);
										}}
										className={formInputClasses}
										style={formInputStyle}
										placeholder='أدخل أرقام فقط'
										type='text'
										name='name'
									/>
								</label>
							</div>
							<div className='flex mb-8 items-center'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم الدولة (AR)
								</h2>
								<label>
									<input
										value={arabicCountryName}
										onChange={(e) => {
											setArabicCountryName(e.target.value);
										}}
										className={formInputClasses}
										style={formInputStyle}
										placeholder='ادخل حروف عربي فقط'
										type='text'
										name='name'
									/>
								</label>
							</div>

							<div className='flex mb-8 items-center'>
								<h2 className={formTitleClasses} style={formTitleStyle}>
									<AiFillStar
										style={{
											display: 'inline-block',
											marginLeft: '0.5rem',
											color: 'red',
										}}
									></AiFillStar>
									اسم الدولة (EN)
								</h2>
								<label>
									<input
										value={englishCountryName}
										onChange={(e) => {
											setEnglishCountryName(e.target.value);
										}}
										className={formInputClasses}
										style={formInputStyle}
										placeholder='ادخل حروف انجليزية فقط'
										type='text'
										name='name'
									/>
								</label>
							</div>
						</form>
					</div>
					<div
						className='p-8 flex justify-center gap-4'
						style={{
							height: '135px',
							backgroundColor: 'rgba(235, 235, 235, 1)',
						}}
					>
						<Button
							className={'h-14 w-[286px] text-xl '}
							style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
							type={'normal'}
							onClick={() => {
								setEndActionTitle(data ? 'تم تعديل بيانات الدولة بنجاح' : 'تم اضافة دولة بنجاح');
								cancel();
							}}
						>
							حفظ واعتماد
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCountry;
