import React from "react";
import useFetch from '../../../hooks/useFetch';
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import PartitionsSections from "../../../components/TemplatePageComps/PartitionsPage/PartitionsSections/PartitionsSections";

const PartitionsPage = () => {
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/section');
  return (
			<div className={`px-4 md:pt-8 pt-0 pb-10`} style={{ backgroundColor: '#fafafa' }}>
				<div className='md:pr-5 py-3 px-2 rounded font-normal md:text-lg text-[14px]' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
					هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
				</div>
				<div className='md:mt-6 mt-4'>
					<PageNavigate className='text-lg font-normal' parentPage={'القالب'} currentPage={'التقسيم'} />
				</div>
				<div className='md:pl-36 md:mt-10 mt-5'>
					<PartitionsSections
					fetchedData={fetchedData}
					loading={loading}
					reload={reload}
					setReload={setReload}
					/>
				</div>
			</div>
		);
};

export default PartitionsPage;
