import React, { useState } from 'react';
import PageNavigate from '../../components/PageNavigate/PageNavigate';
import PagesPageTable from '../../components/PagesPageComp/PagesPageTable/PagesPageTable';
import Filtering from '../../components/PagesPageComp/Filtering/Filtering';
import AddNewPage from '../../components/PagesPageComp/AddNewPage/AddNewPage';

import Button from '../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const PagesPage = () => {
	const [showAddNewPage, setShowAddNewPage] = useState(false);
	return (
		<div className={`px-4 md:pt-8 pt-0 md:mt-5 bg-[#FFFFFF] md-bg-[#fafafa]`}>
			<div className='md:pr-5 py-3 px-2 rounded font-normal md:text-lg text-[14px]' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
				هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
			</div>
			<div className='md:ml-36 p-0'>
				<div className='mt-6 flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
					<PageNavigate currentPage={'الصفحات'} />
					<Button
						className='flex justify-center items-center md:h-14 h-[45px] md:w-[183px] w-full text-lg'
						type={'normal'}
						svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
						color={'white'}
						onClick={() => {
							setShowAddNewPage(true);
						}}
					>
						انشاء صفحة
					</Button>
				</div>
				{showAddNewPage && (
					<AddNewPage
						cancel={() => {
							setShowAddNewPage(false);
						}}
					></AddNewPage>
				)}
				<Filtering></Filtering>
				<div dir='ltr' className='md:mt-10 mt-5'>
					<PagesPageTable></PagesPageTable>
				</div>
			</div>
		</div>
	);
};

export default PagesPage;
