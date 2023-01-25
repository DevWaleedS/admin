import React, { useState } from 'react';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

import { IoIosArrowDown } from 'react-icons/io';
import Button from '../../../UI/Button/Button';

const activate = ['مفعل', 'غير مفعل'];

const StatusPage = () => {
	const [specialProduct, setSpecialProduct] = useState('');

	const [isActive, setIsActive] = useState('');

	const handleSpecialProductChange = (event) => {
		setSpecialProduct(event.target.value);
	};

	const handleIsActive = (event) => {
		setIsActive(event.target.value);
	};
	return (
		<div className={`mt-5 px-4 pt-4 pl-36 h-full`} style={{ backgroundColor: '#F7F7F7' }}>
			<div className='mt-6 '>
				<PageNavigate nestedPage={true} parentPage={'المندوبين'} currentPage={'حالة التسجيل'} />
			</div>
			<div className='mt-16 px-6'>
				<div className='mb-5 '>
					<h2 className='mb-2 font-medium text-lg' style={{ color: '#011723' }}>
						التسجيل{' '}
					</h2>
					<Select
						className='font-normal text-lg rounded h-14'
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} />;
						}}
						value={isActive}
						onChange={handleIsActive}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						renderValue={(selected) => {
							if (isActive === '') {
								return <h2>تفعيل</h2>;
							}
							return selected;
						}}
						sx={{
							height: '3.5rem',
							backgroundColor: '#fff',
							width: '100%',
							pl: '1rem',
							'& .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #E9E9E9',
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #E9E9E9',
							},
						}}
					>
						{activate.map((item) => {
							return (
								<MenuItem
									className=''
									sx={{
										backgroundColor: '#fff',
										height: '3rem',

										'&:hover': {},
										'ul:has(&)': {
											padding: '0',
										},
									}}
									value={`${item}`}
								>
									{item}
								</MenuItem>
							);
						})}
					</Select>
				</div>
				<div className='mb-5 '>
					<h2 className='mb-2 font-medium text-lg' style={{ color: '#011723' }}>
						التفعيل التلقائي
					</h2>
					<Select
						className='font-normal text-lg rounded h-14'
						value={specialProduct}
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} />;
						}}
						onChange={handleSpecialProductChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						renderValue={(selected) => {
							if (specialProduct === '') {
								return <h2>تفعيل</h2>;
							}
							return selected;
						}}
						sx={{
							height: '3.5rem',
							backgroundColor: '#fff',
							width: '100%',
							pl: '1rem',
							'& .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #E9E9E9',
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #E9E9E9',
							},
						}}
					>
						{activate.map((item) => {
							return (
								<MenuItem
									className=''
									sx={{
										backgroundColor: '#fff',
										height: '3rem',

										'&:hover': {},
										'ul:has(&)': {
											padding: '0',
										},
									}}
									value={`${item}`}
								>
									{item}
								</MenuItem>
							);
						})}
					</Select>
				</div>
			</div>

			<Button type={'normal'} className={'w-full h-14 text-xl font-medium mt-14 py-4'} style={{}}>
				حفظ
			</Button>
		</div>
	);
};

export default StatusPage;
