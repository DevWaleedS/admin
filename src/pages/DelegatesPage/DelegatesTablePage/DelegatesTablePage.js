import React from 'react';
import useFetch from '../../../hooks/useFetch';

import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import DelegatesPageTable from '../../../components/DelegatesPageComp/DelegatesTablePageComp/DelegatesPageTable/DelegatesPageTable';

// icons
import Button from '../../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

const DelegatesTablePage = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/marketer');

	const navigate = useNavigate();

	return (
		<div className={`md:mt-5 px-4 md:pt-4 md:pl-36 md:bg-[#f7f7f7] bg-[#ffffff]`}>
			<div className='md:mt-6 flex md:flex-row flex-col justify-between md:items-center items-start gap-y-4'>
				<PageNavigate currentPage={'عرض المندوبين'} />
				<Button
					className={'flex justify-center items-center md:h-14 h-[45px] md:w-[234px] w-full md:text-lg text-[16px]'}
					style={{ backgroundColor: '#02466A' }}
					type={'normal'}
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
					color={'white'}
					onClick={() => {
						navigate('/إضافة_مندوب_جديد', { reload, setReload });
					}}
				>
					إضافة مندوب جديد
				</Button>
			</div>
			<div className='mt-5'>
				<label className={` flex-1 relative `}>
					<input
						className='h-14 w-full p-4  outline-0 pr-10 rounded-lg bg-transparent'
						placeholder=' ابحث عن مندوب'
						type='text'
						name='name'
						onChange={() => {}}
						style={{
							border: '1px solid #1DBBBE',
						}}
					/>
					<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
						<AiOutlineSearch color='#1DBBBE' size={'18px'} />
					</div>
				</label>
			</div>

			<div className='md:mt-10 mt-4' dir={'ltr'}>
				<DelegatesPageTable fetchedData={fetchedData} loading={loading} reload={reload} setReload={setReload} />
			</div>
		</div>
	);
};

export default DelegatesTablePage;
