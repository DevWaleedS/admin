import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from 'react-icons/io';
import Button from '../../../../UI/Button/Button';

const activate = [{ ar: 'نشط', en: 'active' }, { ar: 'غير نشط', en: 'not_active' }];

const PartitionsSections = ({ fetchedData, loading, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [firstSection, setFirstSection] = useState({
		name: '',
		status: '',
	});
	const [secondSection, setSecondSection] = useState({
		name: '',
		status: '',
	});
	const [thirdSection, setThirdSection] = useState({
		name: '',
		status: '',
	});
	const [value, setValue] = React.useState('1');

	const handleChange = (event, id) => {
		setValue(id);
	};

	useEffect(() => {
		setFirstSection({ ...firstSection, name: fetchedData?.data?.Sections[0]?.name || '', status: fetchedData?.data?.Sections[0]?.status || '' });
		setSecondSection({ ...secondSection, name: fetchedData?.data?.Sections[1]?.name || '',status: fetchedData?.data?.Sections[1]?.status || '' });
		setThirdSection({ ...thirdSection, name: fetchedData?.data?.Sections[2]?.name || '',status: fetchedData?.data?.Sections[2]?.status || '' });
	}, [fetchedData?.data?.Sections])

	const updatePartitions = () => {
		const data = {
			"data[0][id]": 1,
			"data[0][name]": firstSection?.name,
			"data[0][status]": firstSection?.status === 'نشط' ? 'active' : 'not_active',
			"data[1][id]": 2,
			"data[1][name]": secondSection?.name,
			"data[1][status]": secondSection?.status === 'نشط' ? 'active' : 'not_active',
			"data[2][id]": 3,
			"data[2][name]": thirdSection?.name,
			"data[2][status]": thirdSection?.status === 'نشط' ? 'active' : 'not_active',
		}
		axios
			.post(`https://backend.atlbha.com/api/Admin/sectionupdate`, data, {
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
	}
	return (
		<Box className='md:pr-20 md:pt-5 md:pl-24 p-4' style={{ backgroundColor: '#FFFFFF' }}>
			<TabContext value={value}>
				<Box>
					<TabList
						sx={{
							'& .MuiButtonBase-root': {
								width: '180px',
								height: '56px',
								backgroundColor: '#ECECEC',
								ml: '1rem',
								borderRadius: '0.25rem',
								color: '#011723',
								transition: '0.1s',
								'@media(max-width:992px) ': {
									width: '150px',
									whiteSpace: 'nowrap',
								}
							},
							'& .MuiButtonBase-root.Mui-selected': {
								backgroundColor: '#5EBFF2',
								color: '#011723',
							},
							'& .MuiTabs-indicator':
							{
								display: 'none'
							},
							'& .MuiTabs-flexContainer': {
								overflow: 'auto',
							},
						}}
						onChange={handleChange}
					>
						{
							fetchedData?.data?.Sections?.map((section, index) => (
								<Tab key={index} disableRipple={true} className='text-lg font-medium' label={section?.name} value={section?.id?.toString()} />
							))
						}
					</TabList>
				</Box>
				<Box sx={{ height: '27.5rem', mt: '2.5rem' }}>
					<TabPanel value='1' className='md:pr-0 p-0'>
						<div className='w-full mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									value={firstSection?.name}
									onChange={(e) => setFirstSection({ ...firstSection, name: e.target.value })}
									className='w-full outline-none rounded p-4'
									placeholder='المنتجات المميزة'
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة
							</h2>
							<Select
								value={firstSection?.status}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={(e) => setFirstSection({ ...firstSection, status: e.target.value })}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (firstSection?.status === '') {
										return <h2>الحالة</h2>;
									}
									const result = activate?.filter((item) => item?.ar === selected);
									return result[0]?.ar;
								}}
								className={'rounded'}
								sx={{
									height: '3.5rem',
									backgroundColor: '#fff',
									width: '100%',
									pl: '1rem',

									'& .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #ECECEC',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #03787A',
									},
								}}
							>
								{activate.map((item, index) => {
									return (
										<MenuItem
											key={index}
											sx={{
												backgroundColor: '#fff',
												height: '3rem',

												'&:hover': {},
												'ul:has(&)': {
													padding: '0',
												},
											}}
											value={`${item?.ar}`}
										>
											{item?.ar}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</TabPanel>
					<TabPanel value='2' className='md:pr-0 p-0'>
						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									value={secondSection?.name}
									onChange={(e) => setSecondSection({ ...secondSection, name: e.target.value })}
									className='w-full outline-none rounded p-4'
									placeholder='المتاجر المميزة'
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة
							</h2>
							<Select
								value={secondSection?.status}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={(e) => setSecondSection({ ...secondSection, status: e.target.value })}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (secondSection?.status === '') {
										return <h2>مفعل</h2>;
									}
									const result = activate?.filter((item) => item?.ar === selected);
									return result[0]?.ar;
								}}
								className={'rounded'}
								sx={{
									height: '3.5rem',
									backgroundColor: '#fff',
									width: '100%',
									pl: '1rem',
									'& .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #ECECEC',
										'&:hover': { border: 'none' },
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #03787A',
									},
								}}
							>
								{activate.map((item, index) => {
									return (
										<MenuItem
											key={index}
											sx={{
												backgroundColor: '#fff',
												height: '3rem',

												'&:hover': {},
												'ul:has(&)': {
													padding: '0',
												},
											}}
											value={`${item?.ar}`}
										>
											{item?.ar}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</TabPanel>
					<TabPanel value='3' className='md:pr-0 p-0'>
						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									value={thirdSection?.name}
									onChange={(e) => setThirdSection({ ...thirdSection, name: e.target.value })}
									className='w-full outline-none rounded p-4'
									placeholder=''
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة{' '}
							</h2>
							<Select
								value={thirdSection?.status}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={(e) => setThirdSection({ ...thirdSection, status: e.target.value })}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (thirdSection?.status === '') {
										return <h2>___</h2>;
									}
									const result = activate?.filter((item) => item?.ar === selected);
									return result[0]?.ar;
								}}
								className={'rounded'}
								sx={{
									height: '3.5rem',
									backgroundColor: '#fff',
									width: '100%',
									pl: '1rem',
									'& .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #ECECEC',
										'&:hover': { border: 'none' },
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #03787A',
									},
								}}
							>
								{activate.map((item, index) => {
									return (
										<MenuItem
											key={index}
											sx={{
												backgroundColor: '#fff',
												height: '3rem',

												'&:hover': {},
												'ul:has(&)': {
													padding: '0',
												},
											}}
											value={`${item?.ar}`}
										>
											{item?.ar}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</TabPanel>
				</Box>
			</TabContext>
			<div className='flex gap-4 mt-8'>
				<Button onClick={updatePartitions} className={'rounded h-14'} style={{ backgroundColor: '#3AE374', width: '180px' }} fontSize={'text-xl'} type={'normal'}>
					تعديل
				</Button>
				<Button
					className={'rounded h-14'}
					style={{
						backgroundColor: '#3AE37400',
						border: '1px solid #ADB5B9',
						width: '180px',
					}}
					textStyle={{ color: '#011723' }}
					fontSize={'text-xl'}
					type={'normal'}
				>
					إلغاء
				</Button>
			</div>
		</Box>
	);
};

export default PartitionsSections;
