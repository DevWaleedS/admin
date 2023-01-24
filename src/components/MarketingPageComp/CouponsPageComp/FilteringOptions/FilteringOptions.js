import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../../../../UI/Button/Button';
import { IoIosArrowDown } from 'react-icons/io';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
const category = [' المفعلة', 'المعطلة'];
const sections = ['حسب الاضافة', 'ابجديا'];

const FilteringOptions = ({ showFilteringOptions, hideFilteringOptions }) => {
	const [age, setAge] = React.useState('');
	const [personName, setPersonName] = React.useState([]);
	console.log(personName);
	const handleSection = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleCategory = (event) => {
		setAge(event.target.value);
	};
	return (
		<div className={`flex gap-10  pt-4 pb-10   mt-4  rounded-lg otlobha_filtering_sec`} style={{ backgroundColor: '#FAFAFA' }}>
			<FormControl sx={{ minWidth: 120, flex: '1' }}>
				<h2 className='font-medium text-lg mb-2'> عرض الكوبونات حسب</h2>
				<Select
					className='text-lg font-normal'
					IconComponent={() => {
						return <IoIosArrowDown className='select_arrow duration-200' size={'1.2rem'} />;
					}}
					value={age}
					onChange={handleCategory}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
					renderValue={(selected) => {
						if (age === '') {
							return <h2>الكل</h2>;
						}
						return selected;
					}}
					sx={{
						height: '3.5rem',
						pl: '0.5rem',
						borderRadius: '8px',
						border: '1px solid #B6BE34',
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
							paddingRight: '10px',
						},
					}}
				>
					{category.map((item, idx) => {
						return (
							<MenuItem
								key={idx}
								className='souq_storge_category_filter_items'
								sx={{
									backgroundColor: 'rgba(255, 255, 255, 0)',
									height: '3rem',
									'&:hover': {
										backgroundColor: 'rgba(242, 245, 207, 1)',
									},
								}}
								value={`${item}`}
							>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<FormControl sx={{ minWidth: 120, flex: '1' }}>
				<h2 className='font-medium text-lg mb-2'> ترتيب الكوبونات حسب</h2>
				<Select
					className='text-lg font-normal'
					IconComponent={() => {
						return <IoIosArrowDown className='select_arrow duration-200' size={'1.2rem'} />;
					}}
					value={age}
					onChange={handleCategory}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
					renderValue={(selected) => {
						if (age === '') {
							return <h2>تلقائى</h2>;
						}
						return selected;
					}}
					sx={{
						height: '3.5rem',
						pl: '0.5rem',
						borderRadius: '8px',
						border: '1px solid #B6BE34',
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
							paddingRight: '10px',
						},
					}}
				>
					{sections.map((item, idx) => {
						return (
							<MenuItem
								key={idx}
								className='souq_storge_category_filter_items'
								sx={{
									backgroundColor: 'rgba(255, 255, 255, 0)',
									height: '3rem',
									'&:hover': {
										backgroundColor: 'rgba(242, 245, 207, 1)',
									},
								}}
								value={`${item}`}
							>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<div className='flex items-end'>
				<Button onClick={hideFilteringOptions} type={'normal'} className={'w-[187px] h-14 text-xl'}>
					تنفيذ الفرز
				</Button>
			</div>
		</div>
	);
};

export default FilteringOptions;
