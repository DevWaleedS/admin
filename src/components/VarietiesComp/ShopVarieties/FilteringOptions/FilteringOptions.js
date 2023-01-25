import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../../../../UI/Button/Button";
import { IoIosArrowDown } from 'react-icons/io';


const category = ["ملابس أطفال", "ملابس شباب", "ملابس نسائية", "ملابس رجال"];
const sections = ["قميص", "جينز", "سيليكون", "تي شيرت"];

const FilteringOptions = ({ showFilteringOptions, hideFilteringOptions }) => {
  const [age, setAge] = React.useState("");
  const [personName, setPersonName] = React.useState([]);

  const [openSubCategory, setOpenSubCategory] = React.useState(false);

  console.log(personName);
  const handleSubCategory = (event) => {
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
			<div className={`flex gap-10 pb-4 pt-4 pr-2 pl-6 mt-4  rounded-lg otlobha_filtering_sec`} style={{ backgroundColor: '#FAFAFA' }}>
				<FormControl sx={{ minWidth: 120, flex: '1' }}>
					<h2 className='font-medium text-base mb-2'> التصنيف الرئيسي</h2>
					<Select
						className='font-medium text-xl rounded-lg'
						value={age}
						onChange={handleCategory}
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} className='absolute left-2' fill='rgba(29, 187, 190, 1)' />;
						}}
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
						{category.map((item) => {
							return (
								<MenuItem
									className='souq_storge_category_filter_items multiple_select'
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
					<h2 className='font-medium text-base mb-2'>التصنيف الفرعي</h2>
					<Select
						className='font-medium text-xl rounded-lg'
						labelId='demo-multiple-checkbox-label'
						id='demo-multiple-checkbox'
						multiple
						IconComponent={() => {
							return <IoIosArrowDown size={'1rem'} className='absolute left-2' fill='rgba(29, 187, 190, 1)' />;
						}}
						displayEmpty
						value={personName}
						onChange={handleSubCategory}
						open={openSubCategory}
						onClick={() => {
							setOpenSubCategory(true);
						}}
						input={<OutlinedInput label='Tag' />}
						renderValue={() => {
							return <h2>الكل</h2>;
						}}
						sx={{
							height: '3.5rem',
							border: '1px solid rgba(29, 187, 190, 1)',
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
						<button
							className='w-full flex flex-col items-center justify-center p-3.5 rounded-none'
							style={{ fontSize: '18px', backgroundColor: '#02466A', color: '#FFFFFF' }}
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								setOpenSubCategory(false);
							}}
						>
							اختر
						</button>
					</Select>
				</FormControl>
				<div className='flex items-end'>
					<Button onClick={hideFilteringOptions} type={'normal'} className={'text-lg font-normal w-44 h-14'}>
						تنفيذ الفرز
					</Button>
				</div>
			</div>
		);
};

export default FilteringOptions;
