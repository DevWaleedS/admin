import React, { useState } from 'react';
import Plans from './Plans/Plans';
import EditPackageTemplates from '../EditPackageTemplates/EditPackageTemplates';

const PackagesTypes = ({ editPackage }) => {
	const [yearlyPlan, setYearlyPlan] = useState(false);
	const [showEditTemplates, setShowEditTemplates] = useState(false);
	return (
		<div className=''>
			<div className='flex justify-center items-center gap-4 my-12'>
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
					cancel={() => {
						setShowEditTemplates(false);
					}}
				></EditPackageTemplates>
			)}
			<Plans
				editPackage={(row) => {
					editPackage(row);
				}}
				editPackageTemplate={() => {
					setShowEditTemplates(true);
				}}
				yearlyPlan={yearlyPlan}
			></Plans>
		</div>
	);
};

export default PackagesTypes;
