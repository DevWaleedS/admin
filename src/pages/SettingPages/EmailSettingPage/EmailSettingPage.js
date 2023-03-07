import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';


import TableComp from '../../../components/SettingComp/EmailPageComp/TableComp/TableComp';
import TraderAlert from '../../../components/SettingComp/EmailPageComp/TraderAlert/TraderAlert';

const EmailSettingPage = () => {
	// get data from api
	const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/EmailIndex');

	const [traderAlert, setTraderAlert] = useState(false);
	const [traderPackageDetails, setTraderPackageDetails] = useState([]);

	return (
		<div>
			{traderAlert && (
				<TraderAlert
					cancel={() => {
						setTraderAlert(false);
					}}
					traderPackageDetails={traderPackageDetails}
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
