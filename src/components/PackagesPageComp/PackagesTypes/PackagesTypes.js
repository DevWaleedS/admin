import React, { useState } from 'react';
import Plans from './Plans/Plans';
import EditPackageTemplates from '../EditPackageTemplates/EditPackageTemplates';

const PackagesTypes = ({ fetchedData, loading,reload,setReload, editPackage }) => {
	const [yearlyPlan, setYearlyPlan] = useState(false);
	const [showEditTemplates, setShowEditTemplates] = useState(false);
	const [templatesEachPackage,setTemplatesEachPackage] = useState([]);
	return (
		<div className='h-full md:mb-20 mb-4'>
			<div className='flex justify-center items-center gap-4 md:my-12 my-[30px]'>
				<h2 className='font-medium text-[20px]'>سنوى/شهرى </h2>
				<div
					className={`w-8 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
					style={{ backgroundColor: yearlyPlan ? '#3AE374' : '#A7A7A7' }}
					onClick={() => {
						setYearlyPlan(!yearlyPlan);
					}}
				>
					<div className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${yearlyPlan ? 'left-4' : 'left-1'}`}></div>
				</div>
			</div>
			{showEditTemplates && (
				<EditPackageTemplates
					templatesEachPackage={templatesEachPackage}
					cancel={() => {
						setShowEditTemplates(false);
					}}
				></EditPackageTemplates>
			)}
			<Plans
				fetchedData={fetchedData}
				loading={loading}
				reload={reload}
        		setReload={setReload}
				editPackage={(row) => {
					editPackage(row);
				}}
				editPackageTemplate={(data) => {
					setShowEditTemplates(true);
					setTemplatesEachPackage(data);
				}}
				yearlyPlan={yearlyPlan}
			></Plans>
		</div>
	);
};

export default PackagesTypes;
