import React from 'react';
import useFetch from '../../hooks/useFetch';
import PageNavigate from '../../components/PageNavigate/PageNavigate';
import ChangeLogoSec from '../../components/TemplatePageComps/MainPage/ChangeLogoSec/ChangeLogoSec';
import ChangeBannerSec from '../../components/TemplatePageComps/MainPage/ChangeBannerSec/ChangeBannerSec';

const TemplatePage = () => {
	// Fetch data from API
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/homepage');

	return (
		<div className={`px-4 md:pt-8 pt-0 pb-10`} style={{ backgroundColor: '#fafafa' }}>
			<div className='md:pr-5 py-3 px-2 rounded font-normal md:text-lg text-[14px]' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
				هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
			</div>
			<div className='md:mt-6 mt-4'>
				<PageNavigate currentPage={'تنسيق القالب'} />
			</div>
			<div>
				
				{/** change logo  */}
				<ChangeLogoSec fetchedData={fetchedData} loading={loading} reload={reload} setReload={setReload} />

				{/** change banners  */}
				<ChangeBannerSec fetchedData={fetchedData} loading={loading} reload={reload} setReload={setReload} />
			</div>
		</div>
	);
};

export default TemplatePage;
