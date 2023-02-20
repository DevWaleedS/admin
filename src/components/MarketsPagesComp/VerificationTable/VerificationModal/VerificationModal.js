import React from 'react';
import Button from '../../../../UI/Button/Button';

const BackDrop = ({ onClick }) => {
	return <div onClick={onClick} className='fixed back_drop top-0 left-0 h-full w-full bg-slate-900 opacity-70 z-10'></div>;
};

const VerificationModal = ({ cancel, title, type }) => {
	return (
		<>
			<BackDrop onClick={cancel} />
			<div className='fixed flex flex-col top-50 translate-x-2/4 translate-y-1/4 right-2/4 z-20 rounded-lg overflow-hidden' style={{ width: '650px', maxWidth: '90%' }}>
				<div className='flex-1 flex flex-col md:py-[100px] md:px-[60px] py-[40px] px-[20px] gap-4 bg-white'>
					<div className='flex flex-col items-center gap-4'>
						<h6 style={{ color: type === 'edit' ? '#FF9F1A' : type === 'accepted' ? '#3AE374' : '#FF3838' }} className='md:text-[24px] text-[18px] font-medium text-center'>
							{title}
						</h6>
						<p style={{ color: '#011723' }} className='md:text-[24px] text-[18px] text-center font-medium'>
							عبر البريد الالكتروني الذي قام بالتسجيل من خلاله
						</p>
					</div>
				</div>
				<div className='flex flex-row items-center'>
					<Button
						onClick={() => {
							cancel();
						}}
						type={'normal'}
						style={{ backgroundColor: '#1DBBBE', color: '#F7FCFF' }}
						className={'md:text-[20px] text-[18px] text-center w-full py-4 rounded-none'}
					>
						انهاء
					</Button>
				</div>
			</div>
		</>
	);
};

export default VerificationModal;
