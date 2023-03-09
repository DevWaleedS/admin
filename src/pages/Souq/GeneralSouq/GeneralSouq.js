import React, { useState } from 'react';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import MarketsApis from '../../../components/GeneralSouqComp/MarketsApis';
import AddApi from '../../../components/GeneralSouqComp/AddApi/AddApi';
import Button from '../../../UI/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import useFetch from '../../../hooks/useFetch';

const GeneralSouq = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/platform');
	const [showAddApi, setShowAddApi] = useState(false);
	const [editDetails, setEditDetails] = useState(null);
	const handleEditing = (data) => {
		setEditDetails(data);
		setShowAddApi(true);
	};
	return (
		<div className={`md:p-4 md:pl-36 p-5 pt-0 md:bg-[#fafafa] bg-[#F7F7F7]`}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<PageNavigate currentPage={'السوق العام'} nestedPage={true} parentPage={'السوق'} />
				<Button
					className={'flex justify-center items-center md:w-[180px] w-full md:h-[56px] h-[45px] text-lg'}
					type={'normal'}
					svg={<AiOutlinePlus color='#fff' className='w-5 h-5' />}
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
					reload={reload}
					setReload={setReload}
					cancel={() => {
						setShowAddApi(false);
						setEditDetails(null);
					}}
					editDetails={editDetails}
				></AddApi>
			)}
			<div className='md:mt-8 mt-[50px]'>
				<MarketsApis
					fetchedData={fetchedData?.data?.platforms}
					loading={loading}
					reload={reload}
					setReload={setReload}
					editPlatform={(data) => {
						handleEditing(data);
					}}
				/>
			</div>
		</div>
	);
};

export default GeneralSouq;
