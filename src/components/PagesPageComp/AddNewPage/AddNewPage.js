import React, { useState, useContext } from 'react';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import Button from '../../../UI/Button/Button';
import Context from '../../../store/context';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ReactComponent as WriteIcon } from '../../../assets/Icons/icon-24-write.svg';
import { Editor } from 'react-draft-wysiwyg';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-10'></div>;
};

const AddNewPage = ({ cancel }) => {
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
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

	return (
		<>
			<BackDrop onClick={cancel} />
			<div className='absolute  flex flex-col top-28 translate-x-2/4 add_new_page_popup  right-2/4 z-20 rounded-lg overflow-hidden' style={{ width: '72.5rem' }}>
				<div className='h-16 w-full flex items-center justify-between py-4 px-4 trader_alert' style={{ backgroundColor: '#1DBBBE' }}>
					<h2 className='text-slate-50 text-xl text-center font-medium'>إنشاء صفحة </h2>
					<IoMdCloseCircleOutline size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className=' p-6 rounded-b-lg' style={{ backgroundColor: '#F6F6F6' }}>
					<div
						className='flex gap-4 p-4 items-center'
						style={{
							backgroundColor: '#FFFFFF',
							border: '1px solid #D3D3D3',
						}}
					>
						<WriteIcon fill='#ADB5B9'></WriteIcon>
						<input className='outline-none' placeholder={'عنوان الصفحة'} type='text' name='name' />
					</div>
					<div className='mt-10'>
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
					<div className='mt-10'>
						<h2 className='text-xl font-semibold' style={{}}>
							تحسينات SEO
						</h2>
						<div className='mt-5'>
							<h2 className='text-lg font-medium'>عنوان صفحة تعريفية (Page Title)</h2>
							<div
								className='flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input style={{ backgroundColor: '#EBEBEB' }} className=' flex-1   outline-none' placeholder={'عنوان صفحة تعريفية (Page Title)'} type='text' name='name' />
							</div>
						</div>
						<div className='mt-5'>
							<h2 className='text-lg font-medium'>رابط صفحة تعريفية (SEO Page URL)</h2>
							<div
								className='flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input style={{ backgroundColor: '#EBEBEB' }} className=' flex-1   outline-none' placeholder={'رابط صفحة تعريفية (SEO Page URL)'} type='text' name='name' />
							</div>
						</div>
						<div className='mt-5'>
							<h2 className='text-lg font-medium'>وصف صفحة تعريفية (Page Description)</h2>
							<div
								className='flex gap-4 mt-3 p-4 items-center'
								style={{
									backgroundColor: '#EBEBEB',
									border: '1px solid #D3D3D3',
								}}
							>
								<WriteIcon fill='#ADB5B9'></WriteIcon>
								<input style={{ backgroundColor: '#EBEBEB' }} className=' flex-1   outline-none' placeholder={'وصف صفحة تعريفية (Page Description)'} type='text' name='name' />
							</div>
						</div>
					</div>
					<div className='mt-10 flex gap-4'>
						<div
							className='flex-1 rounded-lg '
							style={{
								
								backgroundColor: '#FFFFFF',
								border: '1px solid #ECECEC',
							}}
						>
							<h2
								className='py-4 px-5 text-xl font-medium '
								style={{
									color: '#011723',
									border: '1px solid #ECECEC',
								}}
							>
								تصنيف الصفحة
							</h2>
							<div className='overflow-y-auto h-[12rem]' >
								<FormGroup className='pl-3'>
									<FormControlLabel
										sx={{
											py: 1,
											mr: 0,
											pr: 2,
											border: '1px solid #ECECEC',
											'& .MuiTypography-root': {
												fontSize: '18px',
												fontWeight: '500',
											},
										}}
										control={<Checkbox sx={{ '& path': { fill: '#000000' } }} />}
										label='المدونة'
									/>
									<FormControlLabel
										sx={{
											py: 1,
											mr: 0,
											pr: 2,
											border: '1px solid #ECECEC',
											'& .MuiTypography-root': {
												fontSize: '18px',
												fontWeight: '500',
											},
										}}
										control={<Checkbox sx={{ '& path': { fill: '#000000' } }} />}
										label='سياسة الخصوصية'
									/>
									<FormControlLabel
										sx={{
											py: 1,
											mr: 0,
											pr: 2,
											'& .MuiTypography-root': {
												fontSize: '18px',
												fontWeight: '500',
											},
										}}
										control={<Checkbox sx={{ '& path': { fill: '#000000' } }} />}
										label='عام'
									/>
									
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
								className='py-4 px-5 text-xl font-medium'
								style={{
									color: '#011723',
									border: '1px solid #ECECEC',
								}}
							>
								كلمات مفتاحية
							</h2>
							<div className='flex gap-4 mt-8 px-3'>
								<Button className='h-14 font-medium text-xl' style={{ minWidth: 'fit-content' }} type={'outline'}>
									اضافة
								</Button>
								<input className='outline-none flex-1 rounded-lg h-14' style={{ border: '1px solid #707070' }} type='text' />
							</div>
						</div>
					</div>
					<div className='flex my-20 items-center justify-center gap-8'>
						<Button
							className='h-14 w-[109px]'
							fontSize={'text-2xl font-normal'}
							style={{ minWidth: 'fit-content' }}
							type={'normal'}
							onClick={() => {
								setEndActionTitle('تم حفظ صفحة جديدة بنجاح');
								cancel();
							}}
						>
							حفظ
						</Button>
						<Button
							className='h-14 w-[109px]'
							fontSize={'text-2xl font-normal'}
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
