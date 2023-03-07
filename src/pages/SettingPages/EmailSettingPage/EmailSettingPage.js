import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';

import CircularLoading from '../../../UI/CircularLoading/CircularLoading';
import TableComp from '../../../components/SettingComp/EmailPageComp/TableComp/TableComp';
import TraderAlert from '../../../components/SettingComp/EmailPageComp/TraderAlert/TraderAlert';

const EmailSettingPage = () => {
	// get data from api
	const { fetchedData, reload, setReload, loading } = useFetch('https://backend.atlbha.com/api/Admin/EmailIndex');


	console.log(fetchedData)

	const token = localStorage.getItem('token');
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
