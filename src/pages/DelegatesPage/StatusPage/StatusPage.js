import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../store/context';
import axios from 'axios';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

// icons
import { IoIosArrowDown } from 'react-icons/io';
import Button from '../../../UI/Button/Button';


const activate = [
	{ id: 1, name: 'مفعل', name_en: 'active' },
	{ id: 2, name: 'غير مفعل', name_en: 'not_active' },
];

const StatusPage = () => {

	// const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/marketer');
	
	const token = localStorage.getItem('token');
	const [reload, setReload] = useState(false);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	

	// to set all value to api
	const [status, setStatus] = useState({
		registration_marketer: '',
		status_marketer: '',
	});

	// to set onchange function to all inputs
	const handleStatus = (event) => {
		const { name, value } = event.target;

		setStatus((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	// define this functions to post all add market data to server
	const changeStatus = () => {

		let formData = new FormData();
		formData.append('registration_marketer', status?.registration_marketer);
		formData.append('status_marketer', status?.status_marketer);

		axios
			.post('https://backend.atlbha.com/api/Admin/registrationMarketer', formData, {
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
		<div className={`mt-5 px-4 md:pt-4 md:pl-36 h-full`} style={{ backgroundColor: '#F7F7F7' }}>
			<div className='md:mt-6'>
				<PageNavigate nestedPage={true} parentPage={'المندوبين'} currentPage={'حالة التسجيل'} />
			</div>
			<div className='mt-16 md:px-6'>
				<div className='mb-5 '>
					<h2 className='mb-2 font-medium md:text-lg text-[16px]' style={{ color: '#011723' }}>
						التسجيل
					</h2>
					<Select
						className='md:h-14 h-[45px] font-normal md:text-lg text-[16px] rounded'
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} />;
						}}
						name='registration_marketer'
						value={status?.registration_marketer}
						onChange={handleStatus}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						renderValue={(selected) => {
							if (status?.registration_marketer === '') {
								return <h2> تفعيل</h2>;
							}
							const result = activate?.filter((item) => item?.name_en === selected);
							return result[0]?.name;
						}}
						sx={{
							height: '100%',
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
						{activate.map((item, idx) => {
							return (
								<MenuItem
									key={idx}
									className=''
									sx={{
										backgroundColor: '#fff',
										height: '3rem',

										'&:hover': {},
										'ul:has(&)': {
											padding: '0',
										},
									}}
									value={`${item?.name_en}`}
								>
									{item?.name}
								</MenuItem>
							);
						})}
					</Select>
				</div>
				<div className='mb-5 '>
					<h2 className='mb-2 font-medium md:text-lg text-[16px]' style={{ color: '#011723' }}>
						التفعيل التلقائي
					</h2>
					<Select
						className='md:h-14 h-[45px] font-normal md:text-lg text-[16px] rounded'
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} />;
						}}
						name='status_marketer'
						value={status?.status_marketer}
						onChange={handleStatus}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						renderValue={(selected) => {
							if (status?.status_marketer === '') {
								return <h2> تفعيل</h2>;
							}
							const result = activate?.filter((item) => item?.name_en === selected);
							return result[0]?.name;
						}}
						sx={{
							height: '100%',
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
						{activate.map((item, idx) => {
							return (
								<MenuItem
									key={idx}
									className=''
									sx={{
										backgroundColor: '#fff',
										height: '3rem',

										'&:hover': {},
										'ul:has(&)': {
											padding: '0',
										},
									}}
									value={`${item?.name_en}`}
								>
									{item?.name}
								</MenuItem>
							);
						})}
					</Select>
				</div>
			</div>

			<Button type={'normal'} className={'w-full h-14 text-xl font-medium mt-14 py-4'} onClick={changeStatus}>
				حفظ
			</Button>
		</div>
	);
};

export default StatusPage;
