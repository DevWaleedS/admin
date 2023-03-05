import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import TabsComp from '../../../components/DelegatesPageComp/AddNewDelegateComp/TabsComp/TabsComp';
import CopyRights from '../../../components/DelegatesPageComp/AddNewDelegateComp/CopyRights/CopyRights';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '../../../UI/Button/Button';
import Context from '../../../store/context';
import axios from 'axios';

const DelegatesTablePage = () => {
	const navigate = useNavigate();

	const token = localStorage.getItem('token');
	const [reload, setReload] = useState(false);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// to disable || enable submit button
	const [valid, setValid] = useState(false);

	// to upload image
	const [images, setImages] = useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
	};

	// to set all value to api
	const [mainInfo, setMainInfo] = useState({
		// personal info
		name: '',
		email: '',
		password: '',
		password_confirm: '',
		user_name: '',
		phonenumber: '',

		// social media links
		snapchat: '',
		facebook: '',
		twiter: '',
		whatsapp: '',
		youtube: '',
		instegram: '',
		socialmediatext: '',

		// city and country
		city_id: '',
		country_id: '',

		// status
		status: '',
	});

	// to set onchange function to all inputs
	const handleMainInfo = (event) => {
		const { name, value } = event.target;

		setMainInfo((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	// to set Agree Conditions
	const [condition, setCondition] = useState(1);
	const handleCondition = (e) => {
		setValid(!valid);
		setCondition(e.target.value);
	};

	// define this functions to post all add market data to server
	const addNewMarketer = () => {
		let formData = new FormData();
		formData.append('name', mainInfo?.name);
		formData.append('email', mainInfo?.email);
		formData.append('password', mainInfo?.password);
		formData.append('phonenumber', mainInfo?.phonenumber);
		formData.append('password_confirm', mainInfo?.password_confirm);
		formData.append('user_name', mainInfo?.user_name);
		formData.append('phonenumber', mainInfo?.phonenumber);
		formData.append('periodtype', mainInfo?.periodtype);

		/** ------------------------------------------- */
		formData.append('city_id', mainInfo?.city_id);
		formData.append('country_id', mainInfo?.country_id);

		/** ------------------------------------------- */
		formData.append('image', images[0]?.file || null);
		/** ------------------------------------------- */
		formData.append('snapchat', mainInfo?.snapchat);
		formData.append('facebook', mainInfo?.facebook);
		formData.append('twiter', mainInfo?.twiter);
		formData.append('whatsapp', mainInfo?.whatsapp);
		formData.append('youtube', mainInfo?.youtube);
		formData.append('instegram', mainInfo?.instegram);

		/** ------------------------------------------- */
		formData.append('status', mainInfo?.status);

		/** ------------------------------------------- */
		formData.append('checkbox_field', condition);

		axios
			.post('https://backend.atlbha.com/api/Admin/marketer', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
					navigate('/عرض_المناديب');
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
					navigate('/عرض_المناديب');
				}
			});
	};

	return (
		<div className={`md:px-5 md:py-10 p-4 pt-0`} style={{ backgroundColor: '#F7F7F7' }}>
			<div className='flex justify-between items-center md:text-lg text-[16px] font-medium'>
				<PageNavigate nestedPage={true} parentPage={'عرض المندوبين'} currentPage={'اضافة مندوب جديد'} />
			</div>

			<TabsComp mainInfo={mainInfo} handleMainInfo={handleMainInfo} onChange={onChange} images={images} />
			<CopyRights />
			<FormGroup>
				<FormControlLabel
					sx={{
						mt: '40px',
						py: 1,
						mr: 0,
						'& .MuiTypography-root': {
							fontSize: '18px',
							fontWeight: '500',
							color: '#1DBBBE',
						},
					}}
					control={<Checkbox name='checkbox_field' value={condition} onChange={handleCondition} sx={{ '& path': { fill: '#1DBBBE' } }} />}
					label='أوافق على الشروط أعلاه'
				/>
			</FormGroup>
			<Button disabled={!valid} className={'mt-[26px] py-4'} type={'normal'} style={{ width: '100%' }} onClick={addNewMarketer}>
				تسجيل
			</Button>
		</div>
	);
};

export default DelegatesTablePage;
