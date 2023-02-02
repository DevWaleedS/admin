import React, { useState } from 'react';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import MarketsApis from '../../../components/GeneralSouqComp/MarketsApis';
import AddApi from '../../../components/GeneralSouqComp/AddApi/AddApi';

import Button from '../../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const GeneralSouq = () => {
	const [showAddApi, setShowAddApi] = useState(false);
	const [editDetails, setEditDetails] = useState(null);

	const handleEditing = (url, logo, marketTitle) => {
		setEditDetails({ url, logo, marketTitle });
		setShowAddApi(true);
	};
	return (
		<div className={`md:p-4 md:pl-36 p-5 pt-0 md:bg-[#fafafa] bg-[#F7F7F7]`}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<PageNavigate currentPage={'السوق العام'} nestedPage={true} parentPage={'السوق'} />
				<Button
					className={'flex justify-center items-center md:w-[180px] w-full md:h-[56px] h-[45px] text-lg'}
					type={'normal'}
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5'/>}
					color={'white'}
					onClick={() => {
						setShowAddApi(true);
					}}
				>
					اضافة API
				</Button>
			</div>
			{showAddApi && (
				<AddApi
					cancel={() => {
						setShowAddApi(false);
						setEditDetails(null);
					}}
					editDetails={editDetails}
				></AddApi>
			)}
			<div className='md:mt-8 mt-[50px]'>
				<MarketsApis
					edit={(url, logo, marketTitle) => {
						handleEditing(url, logo, marketTitle);
					}}
				/>
			</div>
		</div>
	);
};

export default GeneralSouq;
