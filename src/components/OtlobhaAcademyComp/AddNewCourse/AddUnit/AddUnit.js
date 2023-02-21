import React, { useState, useContext } from "react";
import Button from "../../../../UI/Button/Button";
import Context from "../../../../store/context";
import styles from "./AddUnit.module.css";
import Box from "@mui/material/Box";


import { GrAttachment } from "react-icons/gr";
import { ReactComponent as AddIcon } from "../../../../assets/Icons/icon-34-add.svg";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};


const formTitleClasses = "md:w-[315px] w-full md:text-[18px] text-[16px] font-normal md:mb-0 mb-2";

const formInputClasses = "md:w-[555px] w-full md:h-14 h-[45px] p-4 outline-0 rounded-md";
const formInputStyle = {
	border: '1px solid rgba(167, 167, 167, 0.5)',
	borderRadius: '8px',
	backgroundColor: '#F6F6F6',
};

const AddUnit = ({ cancel, cancelAll }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
  const [unit,setUnit] = useState({
		title:'',
		file:[],
		video:[],
	});
  console.log(unit);
  const [images, setImages] = useState([]);
  const [multiImages, setMultiImages] = useState([]);
  const inputRef = React.useRef();

  const [source, setSource] = React.useState(null);
  console.log(source?.name);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  console.log(multiImages);

  const emptyMultiImages = [];
  for (let index = 0; index < 5 - multiImages.length; index++) {
    emptyMultiImages.push(index);
  }
  console.log(images);

  return (
			<>
				<BackDrop onClick={cancel}></BackDrop>
				<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-30 otlobha_new_product ${styles.container}`} style={{ width: '1104px',maxWidth:'100%' ,height: 'calc(100% - 4rem)' }}>
					<div className='flex h-full flex-col justify-between'>
						<div
							className='md:p-8 p-4 md:h-[135px] h-[100px]'
							style={{
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<h2 className='font-bold md:text-2xl text-[20px]  mb-3'>اضافة وحدة</h2>
							<h2 className='md:text-xl text-[16px] font-normal'>اضف وحدة جديدة للكورس</h2>
						</div>
						<div className={`flex-1 overflow-y-scroll md:py-12 md:pr-8 p-4 ${styles.content}`}>
							<form action=''>
								<div className='flex md:flex-row flex-col mb-8'>
									<h2 className={formTitleClasses}>
										عنوان الوحدة
									</h2>
									<label>
										<input value={unit?.title} onChange={(e)=>setUnit({...unit,title:e.target.value})} className={formInputClasses} style={formInputStyle} placeholder='عنوان الوحدة' type='text' name='name' />
									</label>
								</div>

								<div className='flex md:flex-row flex-col mb-8'>
									<h2 className={formTitleClasses}>
										ملفات مرفقة
									</h2>
									<label className='md:w-[555px] w-full md:h-14 h-[45px] flex p-4 items-center rounded-lg' style={{ border: '1px solid #ccc' }} htmlFor=''>
										<input onChange={(e)=>setUnit({...unit,file:e.target.files})} className={`flex-1 rounded-lg ${styles.file_select}`} type='file' placeholder='asdasdasd' />
										<div>
											<GrAttachment></GrAttachment>
										</div>
									</label>
								</div>
								<div className='flex md:flex-row flex-col mb-8'>
									<h2 className={formTitleClasses}>
										إضافة درس
									</h2>
									<div>
										<div className='md:w-[555px] w-full md:h-14 h-[45px] flex gap-5 mb-5'>
											<div className="md:w-[392px] w-full md:h-14 h-[45px]">
												<input ref={inputRef} className='hidden rounded-lg' type='file' onChange={handleFileChange} accept='.mov,.mp4' />
												<div
													className='md:w-[392px] w-full md:h-14 h-[45px] fcc p-3 gap-4  cursor-pointer rounded-lg'
													style={{
														backgroundColor: '#02466A00',
														border: '1px solid #A7A7A7',
													}}
													onClick={handleChoose}
												>
													{!source && (
														<>
															<Box
																sx={{
																	'& svg': {
																		width: '24px',
																	},
																	'& circle': { fill: '#ADB5B9' },
																}}
															>
																<AddIcon></AddIcon>
															</Box>
															<h2 className="md:text-[18px] text-[16px]" style={{ color: '#ADB5B9' }}>اضف درس جديد للوحدة</h2>
														</>
													)}
													{source && <h2 className="md:text-[18px] text-[16px]" style={{ color: '#ADB5B9' }}>{source.name}</h2>}
												</div>
											</div>
											<div
												className='md:w-36 w-full md:h-14 h-[45px] flex-1 fcc p-3 gap-4  cursor-pointer rounded-lg'
												style={{
													backgroundColor: '#02466A00',
													border: '1px solid #A7A7A7',
												}}
											>
												<h2 className="md:text-[18px] text-[16px] whitespace-nowrap" style={{ color: '#ADB5B9' }}>0 دقيقة</h2>
											</div>
										</div>
										<div className='md:w-[555px] w-full md:h-14 h-[45px] flex gap-5 mb-5'>
											<div className="md:w-[392px] w-full md:h-14 h-[45px]">
												<input ref={inputRef} className='hidden' type='file' onChange={handleFileChange} accept='.mov,.mp4' />
												<div
													className='md:w-[392px] w-full md:h-14 h-[45px] fcc p-3 gap-4  cursor-pointer rounded-lg'
													style={{
														backgroundColor: '#02466A00',
														border: '2px dashed #A7A7A7',
													}}
													onClick={handleChoose}
												>
													{!source && (
														<>
															<Box
																sx={{
																	'& svg': {
																		width: '24px',
																	},
																	'& circle': { fill: '#ADB5B9' },
																}}
															>
																<AddIcon></AddIcon>
															</Box>
															<h2 className="md:text-[18px] text-[16px]" style={{ color: '#ADB5B9' }}>اضف درس جديد للوحدة</h2>
														</>
													)}
													{source && <h2 className="md:text-[18px] text-[16px]" style={{ color: '#ADB5B9' }}>{source?.name}</h2>}
												</div>
											</div>
											<div
												className='md:w-36 w-full md:h-14 h-[45px] flex-1 fcc p-3 gap-4  cursor-pointer rounded-lg'
												style={{
													backgroundColor: '#02466A00',
													border: '2px dashed #A7A7A7',
												}}
											>
												<h2 className="md:text-[18px] text-[16px] whitespace-nowrap" style={{ color: '#ADB5B9' }}>0 دقيقة</h2>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div
							className='md:h-[135px] h-[100px] md:p-8 p-4 flex items-center justify-center gap-4'
							style={{
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<Button
								className={'md:h-14 h-[45px] md:w-44 w-full md:text-xl text-[16px] font-medium'}
								style={{ backgroundColor: `rgba(2, 70, 106, 1)` }}
								type={'normal'}
								onClick={() => {
									setEndActionTitle('تم اضافة كورس جديد بنجاح');
									cancel();
									cancelAll();
								}}
							>
								حفظ
							</Button>
							<Button
								style={{
									borderColor: `rgba(2, 70, 106, 1)`,
								}}
								textStyle={{ color: 'rgba(2, 70, 106, 1)' }}
								className={'md:h-14 h-[45px] md:w-44 w-full md:text-xl text-[16px] font-medium'}
								type={'outline'}
								onClick={cancel}
							>
								إلغاء
							</Button>
						</div>
					</div>
				</div>
			</>
		);
};

export default AddUnit;
