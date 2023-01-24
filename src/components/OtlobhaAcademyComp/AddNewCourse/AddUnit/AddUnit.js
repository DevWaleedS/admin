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


const formTitleClasses = "font-normal text-lg";
const formTitleStyle = { width: "315px" };
//
const formInputClasses = "p-4 outline-0 rounded-md";
const formInputStyle = {
	width: '555px',
	border: '1px solid rgba(167, 167, 167, 0.5)',
	borderRadius: '8px',
	backgroundColor: '#F6F6F6',
};

const AddUnit = ({ cancel, cancelAll }) => {
  const contextStore = useContext(Context);
  const { setEndActionTitle } = contextStore;
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
				<div className={`fixed bottom-0 left-0 bg-[#F6F6F6] z-20 otlobha_new_product ${styles.container}`} style={{ width: '1104px', height: 'calc(100% - 4rem)' }}>
					<div className='flex h-full flex-col justify-between'>
						<div
							className='p-8'
							style={{
								height: '135px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<h2 className='font-bold text-2xl  mb-3'>اضافة وحدة</h2>
							<h2 className='text-xl font-normal'>اضف وحدة جديدة للكورس</h2>
						</div>
						<div className={`flex-1 overflow-y-scroll py-12 pr-8 ${styles.content}`}>
							<form action=''>
								<div className='flex mb-8'>
									<h2 className={formTitleClasses} style={formTitleStyle}>
										عنوان الوحدة
									</h2>
									<label>
										<input className={formInputClasses} style={formInputStyle} placeholder='اسم المنتج' type='text' name='name' />
									</label>
								</div>

								<div className='flex mb-8'>
									<h2 className={formTitleClasses} style={formTitleStyle}>
										ملفات مرفقة
									</h2>
									<label className='flex p-4 items-center rounded-lg' style={{ width: '555px', border: '1px solid #ccc' }} htmlFor=''>
										<input className={`flex-1 rounded-lg ${styles.file_select}`} type='file' placeholder='asdasdasd' />
										<div>
											<GrAttachment></GrAttachment>
										</div>
									</label>
								</div>
								<div className='flex mb-8'>
									<h2 className={formTitleClasses} style={formTitleStyle}>
										إضافة درس
									</h2>
									<div>
										<div className='flex gap-5 mb-5' style={{ width: '555px' }}>
											<div style={{ width: '392px' }}>
												<input ref={inputRef} className='hidden rounded-lg' type='file' onChange={handleFileChange} accept='.mov,.mp4' />
												<div
													className='fcc p-3 gap-4  cursor-pointer rounded-lg'
													style={{
														width: '392px',
														height: '56px',
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
															<h2 style={{ color: '#ADB5B9' }}>اضف درس جديد للوحدة</h2>
														</>
													)}
													{source && <h2 style={{ color: '#ADB5B9' }}>{source.name}</h2>}
												</div>
											</div>
											<div
												className='flex-1 fcc p-3 gap-4  cursor-pointer rounded-lg'
												style={{
													width: '392px',
													height: '56px',
													backgroundColor: '#02466A00',
													border: '1px solid #A7A7A7',
												}}
											>
												<h2 style={{ color: '#ADB5B9' }}>0 دقيقة</h2>
											</div>
										</div>
										<div className='flex gap-5' style={{ width: '555px' }}>
											<div style={{ width: '392px' }}>
												<input ref={inputRef} className='hidden' type='file' onChange={handleFileChange} accept='.mov,.mp4' />
												<div
													className='fcc p-3 gap-4  cursor-pointer rounded-lg'
													style={{
														width: '392px',
														height: '56px',
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
															<h2 style={{ color: '#ADB5B9' }}>اضف درس جديد للوحدة</h2>
														</>
													)}
													{source && <h2 style={{ color: '#ADB5B9' }}>{source?.name}</h2>}
												</div>
											</div>
											<div
												className='flex-1 fcc p-3 gap-4  cursor-pointer rounded-lg'
												style={{
													width: '392px',
													height: '56px',
													backgroundColor: '#02466A00',
													border: '2px dashed #A7A7A7',
												}}
											>
												<h2 style={{ color: '#ADB5B9' }}>0 دقيقة</h2>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div
							className='p-8 flex justify-center gap-4'
							style={{
								height: '135px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<Button
								className={'h-14 w-44 text-xl font-medium'}
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
								className={'h-14 w-44 text-xl font-medium'}
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
