import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';


import TableComp from '../../../components/SettingComp/EmailPageComp/TableComp/TableComp';
import TraderAlert from '../../../components/SettingComp/EmailPageComp/TraderAlert/TraderAlert';

const EmailSettingPage = () => {
	// get data from api
	const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/EmailIndex');

	const [traderAlert, setTraderAlert] = useState(false);
	const [traderPackageDetails, setTraderPackageDetails] = useState([]);
	const [showEmailInfo, setShowEmailInfo] = useState(false);


	return (
		<div>
			{traderAlert && (
				<TraderAlert
					cancel={() => {
						setTraderAlert(false);
					}}
					traderPackageDetails={traderPackageDetails}
					showEmailInfo={showEmailInfo}
					reload={reload}
					setReload={setReload}
				/>
			)}
			<div>
				<TableComp
					reload={reload}
					loading={loading}
					setReload={setReload}
					fetchedData={fetchedData}
					setShowEmailInfo={setShowEmailInfo}
					openTraderAlert={(row) => {
						setTraderAlert(true);
						setTraderPackageDetails(row);
					}}
				/>
			</div>
		</div>
	);
};

export default EmailSettingPage;
