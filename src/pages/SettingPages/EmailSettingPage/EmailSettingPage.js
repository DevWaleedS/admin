import React, { useState } from 'react';

import TableComp from '../../../components/SettingComp/EmailPageComp/TableComp/TableComp';
import TraderAlert from '../../../components/SettingComp/EmailPageComp/TraderAlert/TraderAlert';

const EmailSettingPage = () => {
	const [traderAlert, setTraderAlert] = useState(false);
	const [traderPackageDetails, setTraderPackageDetails] = useState([]);

	return (
		<div >
	
			{traderAlert && (
				<TraderAlert
					cancel={() => {
						setTraderAlert(false);
					}}
					traderPackageDetails={traderPackageDetails}
				/>
			)}
			<div >
				<TableComp
					openTraderAlert={(row) => {
						setTraderAlert(true);
						setTraderPackageDetails(row);
					}}
				></TableComp>
			</div>
		</div>
	);
};

export default EmailSettingPage;
