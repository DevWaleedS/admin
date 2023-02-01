import React from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import PartitionsSections from "../../../components/TemplatePageComps/PartitionsPage/PartitionsSections/PartitionsSections";

const PartitionsPage = () => {
  return (
			<div className={`px-4 md:pt-8 pt-0 pb-10`} style={{ backgroundColor: '#fafafa' }}>
				<div className='md:pr-5 py-3 px-2 rounded font-normal md:text-lg text-[14px]' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
					هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
				</div>
				<div className='md:mt-6 mt-4'>
					<PageNavigate className='text-lg font-normal' parentPage={'القالب'} currentPage={'التقسيم'} />
				</div>
				<div className='md:pl-36 md:mt-10 mt-5'>
					<PartitionsSections></PartitionsSections>
				</div>
			</div>
		);
};

export default PartitionsPage;
