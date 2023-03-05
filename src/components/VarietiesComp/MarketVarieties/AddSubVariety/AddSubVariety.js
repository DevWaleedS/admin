import React, { Fragment, useState, useContext } from 'react';
import Context from '../../../../store/context';
// icons
import Button from '../../../../UI/Button/Button';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-50 z-40'></div>;
};

const AddSubVariety = ({ cancel }) => {
	const contextStore = useContext(Context);
	const { setSubCategories } = contextStore;
	const [subcat, setSubCat] = useState("");
	const addSubCat = () => {
		setSubCategories((subCategories) => [...subCategories,{name:subcat}]);
		setSubCat("");
		cancel();
	}

	return (
		<Fragment>
			<BackDrop onClick={cancel} />
			<div className='absolute flex flex-col top-5 translate-x-2/4  right-2/4 z-50 rounded-lg overflow-hidden' style={{ width: '60.25rem', maxWidth: '90%' }}>
				<div className='h-16 w-full flex items-center justify-between py-4 px-4 trader_alert' style={{ backgroundColor: '#02466A' }}>
					<h2 style={{ color: '#ECFEFF' }} className='md:text-[22px] text-[18px] font-medium text-center flex-1'>
						اضف تصنيف فرعي
					</h2>
					<IoMdCloseCircleOutline size={'1.25rem'} color={'#fff'} className={'cursor-pointer'} onClick={cancel}></IoMdCloseCircleOutline>
				</div>
				<div className='flex-1 flex flex-col items-center justify-center px-4 py-28' style={{ backgroundColor: '#F6F6F6' }}>
					<div className='w-full flex flex-col items-center'>
						<div className='md:w-fit w-full flex flex-col gap-3'>
							<label className='md:text-[18px] text-[16px]' style={{ color: '#011723' }}>
								اسم التصنيف الفرعي
							</label>
							<input
								className='md:w-[475px] w-full p-4 outline-none rounded-lg'
								style={{ backgroundColor: '#FFFFFF', border: '1px solid #EBEBEB', boxShadow: '0px 3px 6px #00000029' }}
								placeholder='ادخل اسم التصنيف الفرعي'
								type='text'
								name='name'
								value={subcat}
								onChange={(e) => setSubCat(e.target.value)}
							/>
						</div>
						<div className='md:w-fit w-full flex flex-row items-center gap-5 mt-36'>
							<Button
								onClick={() => {
									addSubCat();
								}}
								type={'normal'}
								className='md:w-[227px] w-full md:h-[56px] h-[45px] md:text-[22px] text-[18px] text-center rounded-lg'
								style={{ backgroundColor: '#02466A' }}
								textStyle={{ color: '#EFF9FF' }}
							>
								تأكيد
							</Button>
							<Button
								onClick={() => {
									cancel();
								}}
								type={'outline'}
								className='md:w-[227px] w-full md:h-[56px] h-[45px] md:text-[22px] text-[18px] text-center rounded-lg'
								style={{ backgroundColor: '#02466A00', border: '1px solid #02466A' }}
								textStyle={{ color: '#02466A' }}
							>
								الغاء
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AddSubVariety;
