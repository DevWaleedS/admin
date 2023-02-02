import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataIcon } from '../../../assets/Icons/index';
import { FiSend } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { DatePicker as DateRange } from 'antd';

const packagesOptions = ['تجديد الاشتراك', 'الغاء الاشتراك'];

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const TraderAlert = ({ cancel, traderPackageDetails }) => {
	const [packageOption, setPackageOption] = useState('');
	const [description, setDescription] = useState({
		htmlValue: '<h1></h1>\n',
		editorState: EditorState.createEmpty(),
	});

	const onEditorStateChange = (editorValue) => {
		const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
		console.log(editorStateInHtml);

		setDescription({
			htmlValue: editorStateInHtml,
			editorState: editorValue,
		});
	};
	const handleCategory = (event) => {
		setPackageOption(event.target.value);
	};
	console.log(traderPackageDetails);
	return (
		<>
			<BackDrop onClick={cancel} />
			<div className='fixed trader_alert   flex flex-col md:top-1/2 top-[55%] translate-x-2/4 -translate-y-2/4 right-2/4 z-20 rounded-lg md:overflow-hidden overflow-auto' style={{ width: '51.25rem',maxWidth:'90%', maxHeight: '77.5%' }}>
				<div className='h-16 w-full flex items-center justify-center py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 className='flex-1 text-slate-50 text-center md:text-[22px] text-[18px] font-medium'>ارسال تنبيه للتاجر </h2>
					<IoMdCloseCircleOutline size={'1.25rem'} color={'#fff'} className={'md:hidden flex cursor-pointer mr-auto'} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 p-4 md:pt-10 pb-8' style={{ backgroundColor: 'rgb(246,246,246)' }}>
					<div className='flex md:flex-row flex-col md:gap-24 gap-[18px]'>
						<div>
							<h2 className='font-normal md:text-[18px] text-[16px] h-8'>نوع التنبيه</h2>
							<Select
								className='text-[#1DBBBE] md:w-[11rem] w-full'
								IconComponent={IoIosArrowDown}
								value={packageOption}
								onChange={handleCategory}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								renderValue={(selected) => {
									if (packageOption === '') {
										return <h2 className='text-[#1DBBBE]'>تجديد اشتراك</h2>;
									}
									return selected;
								}}
								sx={{
									height: '3rem',
									backgroundColor: '#fff',
									border: '1px solid rgba(29, 187, 190, 1)',
									'& .MuiOutlinedInput-notchedOutline': {
										border: 'none',
									},
									'& .MuiSelect-icon': {
										right: '150px',
										color: '#1DBBBE',
									},
								}}
							>
								{packagesOptions.map((item) => {
									return (
										<MenuItem
											className='souq_storge_category_filter_items'
											sx={{
												backgroundColor: 'rgba(211, 211, 211, 1)',
												height: '3rem',
												'&:hover': {
													backgroundColor: '#1DBBBE',
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
						<div className='flex flex-col'>
							<FormControl>
								<RadioGroup
									row
									aria-labelledby='demo-row-radio-buttons-group-label'
									defaultValue='schedule'
									name='row-radio-buttons-group'
									sx={{
										gap: '3rem',
										height: '2rem',
										'&  .MuiTypography-root': {
											color: '#ADB5B9',
											fontWeight: '500',
											transition: '0.2s',
										},
										'& .MuiFormControlLabel-root:has(.Mui-checked) .MuiTypography-root': {
											color: '#011723',
										},
										'& .MuiRadio-root ': {
											color: '#ADB5B9',
										},
										'& .Mui-checked ': {
											color: '#011723 !important',
										},
									}}
								>
									<FormControlLabel
										value='schedule'
										control={<Radio />}
										label='جدولة التنبيه'
										sx={{
											margin: '0',
											gap: '1rem',
											alignItems: 'flex-start',
											'& .MuiButtonBase-root': { padding: '0' },
										}}
									/>
									<FormControlLabel
										value='immediately'
										control={<Radio />}
										label='ارسال فورى'
										sx={{
											margin: '0',
											gap: '1rem',
											alignItems: 'flex-start',
											'& .MuiButtonBase-root': { padding: '0' },
										}}
									/>
								</RadioGroup>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Stack spacing={3} sx={{ flexDirection: 'row',maxWidth:'100%' }}>
										<div className='w-20 p-2 flex justify-center items-center rounded-r-md' style={{ backgroundColor: '#1DBBBE' }}>
											<img src={DataIcon} alt='' />
										</div>
										<DateRange.RangePicker
											className='main_page_date_picker rounded-none rounded-l-lg mt-0 md:w-80 w-full'
											style={{
												backgroundColor: '#fff',
												border: '1px solid #1DBBBE',
											}}
											placeholder={['اختر الفترة من إلى', '']}
											allowEmpty={[true, true]}
											onChange={(e) => {
												console.log(e);
												const date = new Date(e[0]);
												const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
												console.log(year, month, day);
											}}
											suffixIcon={''}
										/>
									</Stack>
								</LocalizationProvider>
							</FormControl>
						</div>
					</div>
					<div className='md:mt-20 mt-4 rounded-lg'>
						<Editor
							toolbarHidden={false}
							editorState={description.editorState}
							onEditorStateChange={onEditorStateChange}
							inDropdown={true}
							placeholder='نص الرسالة'
							wrapperClassName='demo-wrapper'
							editorClassName='demo-editor'
							toolbar={{
								options: ['inline', 'textAlign'],
								inline: {
									options: ['bold', 'italic'],
								},
							}}
						/>
						<h2>
							صديقنا التاجر،
							<span style={{ color: '#FF9F1A' }}>باقي {traderPackageDetails.daysLeft} يوم على انتهاء اشتراكك</span>
						</h2>
						<h2>تواصل مع الدعم الفني للحصول على كود خصم لتجديد اشتراكك</h2>
					</div>
					<div className='flex gap-4 justify-center'>
						<Button onClick={cancel} type={'normal'} className={'text-center mt-12 w-[163px] md:h-16 h-[45px] text-xl font-normal'} style={{ backgroundColor: '#02466A' }} svg={<FiSend color={'#fff'} />}>
							ارسال
						</Button>
						<Button type={'outline'} className={'text-center  mt-12 w-[163px] md:h-16 h-[45px] text-xl font-normal'} style={{ borderColor: '#02466A' }} textStyle={{ color: '#02466A' }} onClick={cancel}>
							الغاء
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TraderAlert;
