import React from 'react';
import Button from '../../../UI/Button/Button';

import { ReactComponent as Filter } from '../../../assets/Icons/icon-24-filter.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';



const category = ['الكترونيات', 'ألعاب وهدايا', 'مستلزمات طبية', 'مواد غذائية'];

const StorageFilter = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleRowsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className='md:my-8 my-7'>
			<div className='flex md:flex-row flex-col gap-4 bg-white px-4 md:py-8 py-4 rounded-lg' style={{ boxShadow:' 0px 3px 6px #0000001A' }}>
					{/* <Button className={"flex gap-4"} type="outline" svg={<Filter></Filter>}>
					فلتر
					</Button> */}
				<div
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleRowsClick}
					className={'md:w-[150px] w-full rounded-lg justify-center flex gap-3 items-center cursor-pointer md:h-[56px] h-[45px]'}
					style={{ border: '1px solid #1DBBBE' }}
				>
					<Filter color='#fff' fontSize={'1.5rem'}></Filter>
					<h2 className='font-medium' style={{ color: '#1DBBBE' }}>
						فلتر
					</h2>
				</div>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					{category.map((rowsPer, rowsIdx) => {
						return (
							<MenuItem
								value={rowsPer}
								onClick={(e) => {
									handleClose();
								}}
								key={rowsIdx}
								sx={{
									width: '150px',
									backgroundColor: '#67747B33',
									'ul:has(&)': {
										p: 0,
									},
									'ul:has(&) li:hover': {
										backgroundColor: '#C6E1F0',
									},
								}}
							>
								{rowsPer}
							</MenuItem>
						);
					})}
				</Menu>
				<label className={`md:h-[56px] h-[45px] w-full flex-1 relative `}>
					<input className='w-full md:h-[56px] h-[45px] md:text-[18px] text-[16px] outline-0 pr-12 rounded-lg ' placeholder=' للبحث قم بإدخال رقم أو اسم المنتج' type='text' name='name' style={{ border: '1px solid rgba(29, 187, 190, 1)' }} />
					<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
						<AiOutlineSearch color='#1DBBBE' size={'20px'}></AiOutlineSearch>
					</div>
				</label>
				<div className='flex flex-row items-center gap-4'>
				<Button className={'w-full md:h-[56px] h-[45px] md:text-[18px] text-[16px]'} type='normal'>
					رفع ملف
				</Button>
				<Button style={{ backgroundColor: 'rgb(180,237,238)' }} textStyle={{ color: '#03787A' }} className={'w-full md:h-[56px] h-[45px] md:text-[18px] text-[16px]'} type='normal'>
					تصدير ملف
				</Button>
				</div>
			</div>
		</div>
	);
};

export default StorageFilter;
