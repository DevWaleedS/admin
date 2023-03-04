import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch';
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import SocialMediaActivity from "../../../components/SettingComp/SocialMediaLinksPageComp/SocialMediaActivity/SocialMediaActivity";
import AddNewLink from "../../../components/SettingComp/SocialMediaLinksPageComp/AddNewLink/AddNewLink";

const SocialMediaLinksPage = () => {

  // get data from api
  const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/website_socialmedia');
  
  const [showAddNewLink, setShowAddNewLink] = useState(false);

  return (
			<div className={`md:px-4 md:pt-6 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
				<h2 className='md:text-2xl text-[20px] font-bold mb-3'>صفحات التواصل الاجتماعي </h2>
				<PageNavigate nestedPage={true} parentPage={'الاعدادات'} currentPage={'صفحات التواصل الاجتماعي'} />
				{showAddNewLink && (
					<AddNewLink
						cancel={() => {
							setShowAddNewLink(false);
						}}
						fetchedData={fetchedData}
						reload={reload}
						setReload={setReload}
						loading={loading}
					/>
				)}

				{/** social media links  */}
				<SocialMediaActivity
					openAddLink={() => {
						setShowAddNewLink(true);
					}}
					fetchedData={fetchedData}
					reload={reload}
					setReload={setReload}
					loading={loading}
				/>
			</div>
		);
};

export default SocialMediaLinksPage;
