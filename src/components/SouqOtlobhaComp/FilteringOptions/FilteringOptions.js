import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../../../UI/Button/Button';
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
const category = ['الكترونيات', 'ألعاب وهدايا', 'مستلزمات طبية', 'مواد غذائية'];
const sections = ['أجهزة حاسوب', 'تابلت', 'جوالات', 'اكسسوارات'];

const FilteringOptions = ({ showFilteringOptions, hideFilteringOptions }) => {
	const [age, setAge] = React.useState('');
	const [personName, setPersonName] = React.useState([]);

	// use this function with multi selection inputs
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
		<div className={` absolute top-0 w-full gap-10 pb-2 pt-4 pr-2  rounded-lg otlobha_filtering_sec duration-300 ${showFilteringOptions ? 'flex' : 'hidden'}`} style={{ backgroundColor: '#EDEDEF' }}>
			<FormControl sx={{ minWidth: 120, flex: '1' }}>
				<h2 className='font-semibold mb-2'>التصنيف الأساسى</h2>

				<Select
					value={age}
					IconComponent={() => {
						return <IoIosArrowDown size={'1rem'} />;
					}}
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
						border: '1px solid rgba(29, 187, 190, 1)',
						pl: '1rem',
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					}}
				>
					{category.map((item) => {
						return (
							<MenuItem
								key={item}
								className='souq_storge_category_filter_items'
								sx={{
									backgroundColor: 'rgba(211, 211, 211, 1)',
									height: '3rem',
									'&:hover': {},
								}}
								value={`${item}`}
							>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<FormControl sx={{ width: 300, flex: '1' }}>
				<h2 className='font-semibold mb-2'>القسم</h2>
				<Select
					labelId='demo-multiple-checkbox-label'
					id='demo-multiple-checkbox'
					multiple
					IconComponent={() => {
						return <IoIosArrowDown size={'1rem'} />;
					}}
					displayEmpty
					value={personName}
					onChange={handleSection}
					input={<OutlinedInput label='Tag' />}
					renderValue={() => {
						return <h2>الكل</h2>;
					}}
					MenuProps={MenuProps}
					sx={{
						height: '3.5rem',
						border: '1px solid rgba(29, 187, 190, 1)',
						pl: '1rem',
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					}}
				>
					{sections.map((name) => (
						<MenuItem
							key={name}
							value={name}
							className='souq_storge_section_filter_items'
							sx={{
								'&.Mui-selected': {
									backgroundColor: 'rgba(29, 187, 190, 1)',
								},
								'&.Mui-selected:hover': {
									backgroundColor: 'rgba(29, 187, 190, 1)',
								},
								'& .MuiButtonBase-root': {
									color: 'rgba(0, 0, 0, 1)',
								},
								'& .MuiListItemText-root span': {
									fontWeight: '500',
								},
							}}
						>
							<Checkbox checked={personName.indexOf(name) > -1} />
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<div className='flex items-end'>
				<Button onClick={hideFilteringOptions} type={'normal'} className={'w-44 h-14'} style={{ backgroundColor: '#02466A' }}>
					تنفيذ الفرز
				</Button>
			</div>
		</div>
	);
};

export default FilteringOptions;
