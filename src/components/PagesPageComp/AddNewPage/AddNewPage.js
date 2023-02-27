import React, { useState, useContext } from 'react';
import styles from './AddNewPage.module.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import Button from '../../../UI/Button/Button';
import Context from '../../../store/context';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ReactComponent as WriteIcon } from '../../../assets/Icons/icon-24-write.svg';
import { ReactComponent as Arrow } from '../../../assets/Icons/icon-24-chevron_down.svg';
import { Editor } from 'react-draft-wysiwyg';
import ImageUploading from 'react-images-uploading';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import useFetch from '../../../hooks/useFetch';
import axios from "axios";

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const AddNewPage = ({ cancel, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const { fetchedData: pageCategory } = useFetch('https://backend.atlbha.com/api/Admin/selector/page-categories');
	const { fetchedData: postCategory } = useFetch('https://backend.atlbha.com/api/Admin/selector/post-categories');
	const [page, setPage] = useState({
		title: '',
		desc: '',
		seo_title: '',
		seo_link: '',
		seo_desc: '',
		tags: [],
		pageCategory: [],
		postCategory_id: '',
	});
	const [tag, setTag] = useState("");
	const [images, setImages] = useState([]);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const [description, setDescription] = useState({
		htmlValue: '<h1></h1>\n',
		editorState: EditorState.createEmpty(),
	});
	const onEditorStateChange = (editorValue) => {
		const editorStateInHtml = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
		setDescription({
			htmlValue: editorStateInHtml,
			editorState: editorValue,
		});
	};
	const addTags = () => {
		setPage({ ...page, tags: [...page.tags, tag] });
		setTag("");
	}

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	const addPage = () => {
		let formData = new FormData();
		formData.append('title', page?.title);
		formData.append('page_content', description?.htmlValue);
		formData.append('page_desc', page?.desc);
		formData.append('seo_title', page?.seo_title);
		formData.append('seo_link', page?.seo_link);
		formData.append('seo_desc', page?.seo_desc);
		formData.append('tags', page?.tags?.join(','));
		formData.append('postCategory_id', page?.postCategory_id);
		for (let i = 0; i < page?.pageCategory?.length; i++) {
			formData.append([`pageCategory[${i}]`], page?.pageCategory[i]);
		}
		formData.append('image', images[0]?.file || '');
		axios
			.post("https://backend.atlbha.com/api/Admin/page", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					cancel();
					setReload(!reload);
				}
			});
	}
	console.log(page?.pageCategory);
	return (
		<>
			<BackDrop onClick={cancel} />
			<div className='absolute  flex flex-col top-5 translate-x-2/4 add_new_page_popup  right-2/4 z-20 rounded-lg overflow-hidden' style={{ width: '72.5rem', maxWidth: '90%' }}>
				<div className='h-16 w-full flex items-center justify-between py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50 text-xl text-center font-medium'>إنشاء صفحة </h2>
					<IoMdCloseCircleOutline size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='md:p-6 p-4 rounded-b-lg md:bg-[#F6F6F6] bg-[#F7F7F7]'>
					<div
						className='flex gap-4 p-4 items-center rounded-sm md:h-14 h-[45px]'
						style={{
							backgroundColor: '#FFFFFF',
							border: '1px solid #D3D3D3',
						}}
					>
						<WriteIcon fill='#ADB5B9'></WriteIcon>
						<input
							value={page?.title}
							onChange={(e) => {
								setPage({ ...page, title: e.target.value });
							}}
							className='w-full outline-none'
							placeholder={'عنوان الصفحة'}
							type='text'
						/>
					</div>
					<div
						className='flex gap-4 p-4 items-center rounded-sm md:mt-10 mt-4'
						style={{
							backgroundColor: '#FFFFFF',
							border: '1px solid #D3D3D3',
						}}
					>
						<textarea
							value={page?.desc}
							onChange={(e) => {
								setPage({ ...page, desc: e.target.value });
							}}
							className='w-full outline-none'
							placeholder={'وصف الصفحة'}
							rows={7}
						></textarea>
					</div>
					<div className='md:mt-10 mt-4'>
						<Editor
							toolbarHidden={false}
							editorState={description.editorState}
							onEditorStateChange={onEditorStateChange}
							inDropdown={true}
							placeholder={'محتوى الصفحة'}
							wrapperClassName='demo-wrapper'
							editorClassName='demo-editor'
							toolbar={{
								options: ['inline', 'textAlign'],
								inline: {
									options: ['bold', 'italic'],
								},
							}}
						/>
					</div>
					<div className='md:mt-10 mt-4'>
						<h2 className='text-xl font-semibold'>
							تحسينات SEO
						</h2>
						<div className='md:mt-5 mt-3'>
							<h2 className='md:text-lg text-[16px] font-medium'>عنوان صفحة تعريفية (Page Title)</h2>
							<div
								className='md:h-14 h-[45px] flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input
									value={page?.seo_title}
									onChange={(e) => {
										setPage({ ...page, seo_title: e.target.value });
									}}
									style={{ backgroundColor: '#EBEBEB' }}
									className=' flex-1   outline-none'
									placeholder={'عنوان صفحة تعريفية (Page Title)'}
									type='text'
								/>
							</div>
						</div>
						<div className='md:mt-5 mt-3'>
							<h2 className='md:text-lg text-[16px] font-medium'>رابط صفحة تعريفية (SEO Page URL)</h2>
							<div
								className='md:h-14 h-[45px] flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input
									value={page?.seo_link}
									onChange={(e) => {
										setPage({ ...page, seo_link: e.target.value });
									}}
									style={{ backgroundColor: '#EBEBEB' }}
									className=' flex-1 outline-none'
									placeholder={'رابط صفحة تعريفية (SEO Page URL)'}
									type='text'
								/>
							</div>
						</div>
						<div className='md:mt-5 mt-3'>
							<h2 className='md:text-lg text-[16px] font-medium'>وصف صفحة تعريفية (Page Description)</h2>
							<div
								className='md:h-14 h-[45px] flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input
									value={page?.seo_desc}
									onChange={(e) => {
										setPage({ ...page, seo_desc: e.target.value });
									}}
									style={{ backgroundColor: '#EBEBEB' }}
									className=' flex-1 outline-none'
									placeholder={'وصف صفحة تعريفية (Page Description)'}
									type='text'
								/>
							</div>
						</div>
					</div>
					<div className='md:mt-10 mt-4 flex md:flex-row flex-col gap-4'>
						<div
							className='flex-1 rounded-lg '
							style={{

								backgroundColor: '#FFFFFF',
								border: '1px solid #ECECEC',
							}}
						>
							<h2
								className='py-4 px-5 md:text-lg text-[16px] font-medium '
								style={{
									color: '#011723',
									border: '1px solid #ECECEC',
								}}
							>
								تصنيف الصفحة
							</h2>
							<div className='overflow-y-auto h-[12rem]' >
								<FormGroup className='pl-3'>
									{pageCategory?.data?.categories?.map((cat, index) => (
										<FormControlLabel
											value={cat?.id}
											key={index}
											sx={{
												py: 1,
												mr: 0,
												pr: 2,
												border: '1px solid #ECECEC',
												'& .MuiTypography-root': {
													fontSize: '18px',
													fontWeight: '500',
													'@media(max-width:767px)': {
														fontSize: '16px',
													}
												},
											}}
											control={
												<Checkbox
													onChange={(e) => {
														if (e.target.checked) {
															setPage({ ...page, pageCategory: [...page.pageCategory, parseInt(e.target.value)] })
														}
														else {
															setPage({ ...page, pageCategory: page?.pageCategory?.filter((item) => parseInt(item) !== parseInt(cat.id)) })
														}
													}}
													sx={{ '& path': { fill: '#000000' } }}
												/>}
											label={cat?.name}
										/>
									))}
								</FormGroup>
							</div>
						</div>
						<div
							className='flex-1 rounded-lg overflow-hidden'
							style={{
								height: '16.5rem',
								backgroundColor: '#FFFFFF',
								border: '1px solid #ECECEC',
							}}
						>
							<h2
								className='py-4 px-5 md:text-lg text-[16px] font-medium'
								style={{
									color: '#011723',
									border: '1px solid #ECECEC',
								}}
							>
								كلمات مفتاحية
							</h2>
							<div className='flex gap-4 md:mt-8 md:px-3 p-3'>
								<Button
									onClick={addTags}
									className='md:h-14 h-[45px] font-medium md:text-lg text-[16px]'
									style={{ minWidth: 'fit-content' }}
									type={'outline'}>
									اضافة
								</Button>
								<input value={tag} onChange={(e) => setTag(e.target.value)} className='outline-none flex-1 rounded-lg md:h-14 h-[45px]' style={{ border: '1px solid #707070' }} type='text' />
							</div>
							<div className='px-3'>
								<span>{page?.tags?.join(' , ')}</span>
							</div>
						</div>
					</div>
					{
						<div className='flex flex-row items-center gap-4 md:mt-10 mt-4'>
							<div className='flex flex-col gap-4'>
								<label className='md:text-[18px] text-[16px]'>تصنيف المدونة</label>
								<FormControl className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
									<Select
										className={styles.select}
										value={page?.postCategory_id}
										onChange={(e) => {
											setPage({ ...page, postCategory_id: e.target.value });
										}}
										displayEmpty
										IconComponent={(props) => <Arrow fill='#242424' {...props} />}
										inputProps={{ 'aria-label': 'Without label' }}
										renderValue={(selected) => {
											if (page?.postCategory_id === '') {
												return <h2>اختر الدولة</h2>;
											}
											const result = postCategory?.data?.categories?.filter((item) => item?.id === parseInt(selected));
											return result[0]?.name;
										}}
										sx={{
											height: '3.5rem',
											backgroundColor: '#FFFFFF',
											border: '1px solid #F0F0F0',
											borderRadius: '8px',
											'& .MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{postCategory?.data?.categories?.map((item, idx) => {
											return (
												<MenuItem
													key={idx}
													className='souq_storge_category_filter_items'
													sx={{
														backgroundColor: '#EFF9FF',
														height: '3rem',
														'&:hover': {},
													}}
													value={`${item?.id}`}
												>
													{item?.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</div>
							<div className='flex flex-col gap-4'>
								<label className='md:text-[18px] text-[16px]'>صورة المدونة</label>
								<ImageUploading value={images} onChange={onChange} maxNumber={2} dataURLKey='data_url' acceptType={['jpg', 'png', 'jpeg']}>
									{({ imageList, onImageUpload, dragProps }) => (
										// write your building UI
										<div className='w-[555px] md:h-[56px] h-[44px] max-w-full'>
											<div
												className='upload__image-wrapper relative overflow-hidden'
												style={{
													border: images[0] ? 'none' : '3px solid #F0F0F0',
													borderRadius: '10px',
												}}
												onClick={() => {
													onImageUpload();
												}}
												{...dragProps}
											>
												<div className='image-item w-full flex cursor-pointer md:h-[56px] h-[44px]' style={{ backgroundColor: '#FFFFFF' }}>
													{!images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>( اختر صورة فقط png & jpg )</h2>
															<div className='flex flex-col justify-center items-center md:px-10 px-5 rounded-lg' style={{ height: '56px', backgroundColor: '#A7A7A7', color: '#ffffff' }}>
																استعراض
															</div>
														</div>
													)}
													{images[0] && (
														<div className='flex flex-row justify-between items-center py-4 pr-5 h-full w-full'>
															<h2 style={{ color: '#7C7C7C' }}>{images[0].file.name}</h2>
															<div className='flex flex-col justify-center items-center md:px-10 px-5 rounded-lg' style={{ height: '56px', backgroundColor: '#A7A7A7', color: '#ffffff' }}>
																استعراض
															</div>
														</div>
													)}
												</div>
											</div>
										</div>
									)}
								</ImageUploading>
							</div>
						</div>
					}
					<div className='flex md:my-20 my-8 items-center justify-center md:gap-8 gap-4'>
						<Button
							className='md:h-14 h-[45px] md:w-[109px] w-full'
							fontSize={'md:text-2xl text-[18px] font-normal'}
							style={{ minWidth: 'fit-content' }}
							type={'normal'}
							onClick={() => addPage()}
						>
							حفظ
						</Button>
						<Button
							className='md:h-14 h-[45px] md:w-[109px] w-full'
							fontSize={'md:text-2xl text-[18px] font-normal'}
							style={{ minWidth: 'fit-content' }}
							type={'outline'}
							onClick={() => {
								setEndActionTitle('تم نشر صفحة جديدة بنجاح');
								cancel();
							}}
						>
							نشر
						</Button>
					</div>
				</div>
				<div className='my-20'></div>
			</div>
		</>
	);
};

export default AddNewPage;
