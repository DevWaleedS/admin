import React from 'react';
import PageNavigate from '../../components/PageNavigate/PageNavigate';
import ChangeLogoSec from '../../components/TemplatePageComps/MainPage/ChangeLogoSec/ChangeLogoSec';
import ChangeBannerSec from '../../components/TemplatePageComps/MainPage/ChangeBannerSec/ChangeBannerSec';

const TemplatePage = () => {
	return (
		<div className={`px-4 pt-8`} style={{ backgroundColor: '#fafafa' }}>
			<div className='pr-5 py-3 rounded font-normal text-lg ' style={{ color: '#EFF9FF', backgroundColor: '#237EAE' }}>
				هذه الواجهة خاصة بإعدادات الصفحة الرئيسية للموقع الإلكتروني
			</div>
			<div className='mt-6'>
				<PageNavigate currentPage={'تنسيق القالب'} />
			</div>
			<div className={''}>
				<ChangeLogoSec></ChangeLogoSec>
				<ChangeBannerSec></ChangeBannerSec>
			</div>
		</div>
	);
};

export default TemplatePage;
