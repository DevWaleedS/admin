import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../../../../UI/Button/Button';
import styles from './FilteringOptions.module.css';
import { IoIosArrowDown } from 'react-icons/io';

const category = ['ملابس أطفال', 'ملابس شباب', 'ملابس نسائية', 'ملابس رجال'];
const sections = ['قميص', 'جينز', 'سيليكون', 'تي شيرت'];

const FilteringOptions = ({ showFilteringOptions, hideFilteringOptions }) => {
	const [age, setAge] = React.useState('');
	const [personName, setPersonName] = React.useState([]);
	const [openSectionCategory, setOpenSectionCategory] = React.useState(false);

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
		<div className={`flex md:flex-row flex-col md:gap-10 gap-4 md:pb-4 md:pt-4 md:pr-2 md:pl-6 px-2 py-3 mt-4 md:bg-[#FAFAFA] bg-[#F4F5F7]  rounded-lg otlobha_filtering_sec`}>
			<div className='flex-1 flex flex-row md:gap-8 gap-3'>
				<FormControl sx={{ minWidth: 120, flex: '1' }}>
					<h2 className='font-medium text-base mb-2'>التصنيف الأساسى</h2>
					<Select
						className='font-medium text-xl rounded-lg'
						value={age}
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} className='absolute left-2' fill='rgba(29, 187, 190, 1)' />;
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
							'& .MuiOutlinedInput-notchedOutline': {
								border: 'none',
							},
						}}
					>
						{category.map((item, idx) => {
							return (
								<MenuItem
									key={idx}
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
					<h2 className='font-medium text-base mb-2'>القسم</h2>
					<Select
						className={`font-medium text-xl rounded-lg ${styles.select}`}
						labelId='demo-multiple-checkbox-label'
						id='demo-multiple-checkbox'
						multiple
						displayEmpty
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} className='absolute left-2' fill='rgba(29, 187, 190, 1)' />;
						}}
						value={personName}
						onChange={handleSection}
						open={openSectionCategory}
						onClick={() => {
							setOpenSectionCategory(true);
						}}
						input={<OutlinedInput label='Tag' />}
						renderValue={() => {
							return <h2>الكل</h2>;
						}}
						sx={{
							height: '3.5rem',
							border: '1px solid rgba(29, 187, 190, 1)',
							borderRadius: '4px',
							'& .MuiOutlinedInput-notchedOutline': {
								border: 'none',
							},
						}}
					>
						{sections.map((name, idx) => (
							<MenuItem
								key={idx}
								value={name}
								className='souq_storge_category_filter_items multiple_select'
								sx={{
									'& .MuiMenu-paper': {
										height: '280px',
									},
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
						<button
							className='w-full flex flex-col items-center justify-center p-3.5 rounded-none'
							style={{ fontSize: '18px', backgroundColor: '#02466A', color: '#FFFFFF' }}
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								setOpenSectionCategory(false);
							}}
						>
							اختر
						</button>
					</Select>
				</FormControl>
			</div>
			<div className='flex items-end'>
				<Button className='text-lg font-normal md:w-44 w-full md:h-14 h-[45px]' onClick={hideFilteringOptions} type={'normal'}>
					تنفيذ الفرز
				</Button>
			</div>
		</div>
	);
};

export default FilteringOptions;
