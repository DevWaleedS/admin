import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from 'react-icons/io';
import Button from '../../../../UI/Button/Button';

const categoryList = ['الكترونيات', 'ألعاب وهدايا', 'مستلزمات طبية', 'مواد غذائية'];
const activate = [{ar:'نشط',en:'active'}, {ar:'غير نشط',en:'not_active'}];

const PartitionsSections = ({ fetchedData, loading, reload, setReload }) => {
	const [section ,setSection] = useState({
		id:'',
		name:'',
		status:''
	});
	const [value, setValue] = React.useState(1);
	const [category, setCategory] = useState('');
	const [specialProduct, setSpecialProduct] = useState('');
	const [condition, setCondition] = useState('');

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
	};
	const handleSpecialProductChange = (event) => {
		setSpecialProduct(event.target.value);
	};
	const handleConditionChange = (event) => {
		setCondition(event.target.value);
	};

	const handleChange = (event, id) => {
		setValue(id);
	};
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
								<Tab key={index} disableRipple={true} className='text-lg font-medium' label={section?.name} value={section?.id} />
							))
						}
					</TabList>
				</Box>
				<Box sx={{ height: '27.5rem', mt: '2.5rem' }}>
					{
						fetchedData?.data?.Sections?.map((s, index) => (
							<TabPanel key={index} value={s?.id} className='md:pr-0 p-0'>
								<div className='w-full mb-5'>
									<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
										اسم القسم
									</h2>
									<label>
										<input
											value={section?.name || s?.name}
											onChange={(e)=>handleChange(e,s?.id)}
											className='w-full outline-none rounded p-4'
											placeholder='المنتجات المميزة'
											style={{
												backgroundColor: '#FFFFFF',
												border: '1px solid #ECECEC',
											}}
											type='text'
											name='name'
										/>
									</label>
								</div>

								<div className='mb-5'>
									<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
										الحالة
									</h2>
									<Select
										value={condition}
										IconComponent={() => {
											return <IoIosArrowDown size={'1rem'} />;
										}}
										onChange={handleConditionChange}
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (condition === '') {
												return <h2>الحالة</h2>;
											}
											const result = activate?.filter((item) => item?.en === selected);
											return result[0]?.ar || s?.status;
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
										{activate?.map((item,index) => {
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
													value={`${item?.en}`}
												>
													{item?.ar}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</TabPanel>
						))
					}
					{/*<TabPanel value='1' className='md:pr-0 p-0'>
						<div className='w-full mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									value={}
									onChange={}
									className='w-full outline-none rounded p-4'
									placeholder='المنتجات المميزة'
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
									name='name'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة
							</h2>
							<Select
								value={condition}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={handleConditionChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (condition === '') {
										return <h2>الحالة</h2>;
									}
									return selected;
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
					</TabPanel>
					<TabPanel value='2' className='md:pr-0 p-0'>
						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									className='w-full outline-none rounded p-4'
									placeholder='المتاجر المميزة'
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
									name='name'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة
							</h2>
							<Select
								value={specialProduct}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={handleSpecialProductChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (specialProduct === '') {
										return <h2>مفعل</h2>;
									}
									return selected;
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
					</TabPanel>
					<TabPanel value='3' className='md:pr-0 p-0'>
						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								اسم القسم
							</h2>
							<label>
								<input
									className='w-full outline-none rounded p-4'
									placeholder=''
									style={{
										backgroundColor: '#FFFFFF',
										border: '1px solid #ECECEC',
									}}
									type='text'
									name='name'
								/>
							</label>
						</div>

						<div className='mb-5'>
							<h2 className='mb-2 text-lg font-normal' style={{ color: '#011723' }}>
								الحالة{' '}
							</h2>
							<Select
								value={specialProduct}
								IconComponent={() => {
									return <IoIosArrowDown size={'1rem'} />;
								}}
								onChange={handleSpecialProductChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (specialProduct === '') {
										return <h2>___</h2>;
									}
									return selected;
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
							</TabPanel>*/}
				</Box>
			</TabContext>
			<div className='flex gap-4 mt-8'>
				<Button className={'rounded h-14'} style={{ backgroundColor: '#3AE374', width: '180px' }} fontSize={'text-xl'} type={'normal'}>
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
