import React, { useContext } from 'react';
import axios from 'axios';
import Context from '../../store/context';
import { Notifications } from '../../assets/Icons/index';
import styles from './NotificationsMenu.module.css';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/images/amazon.png';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import getDate from '../../helpers/getDate';
const BackDrop = ({ closeMenu }) => {
	return <div onClick={closeMenu} className='fixed back_drop bottom-0 left-0 h-full w-full z-10'></div>;
};

const NotificationsMenu = () => {
	// get data from api
	const { fetchedData, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/NotificationIndex');
	const token = localStorage.getItem('token');
	const [open, setOpen] = React.useState(false);
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	// delete single item
	const deleteNotification = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/NotificationDelete/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	};
	return (
		<div className='relative'>
			<img onClick={() => setOpen(!open)} className='h-6 cursor-pointer' src={Notifications} alt='notification-icon' />
			<div className={`${open ? 'flex' : 'hidden'}`}>
				<BackDrop
					closeMenu={() => {
						setOpen(false);
					}}
				></BackDrop>
				<div className={`${styles.notificationMenu} z-20`}>
					{fetchedData?.data?.notifications.map((item) => (
						<div key={item?.id} className={`${styles.notification_box} w-full flex flex-row items-center gap-4`}>
							<img src={item?.user.map((user) => user?.image)} alt='notification-img' className='md:w-[35px] w-[30px] md:h-[35px] h-[30px]' style={{ borderRadius: '50%' }} />
							<div className='flex-1 flex flex-col'>
								<Link to='/الاشعارات' onClick={() => setOpen(!open)}>
									<h6 className='md:text-[16px] text-[14px] text-blue-400 mb-3'>{item?.store_name}</h6>
								</Link>
								<div className='flex flex-row justify-between'>
									<p className={`${styles.notification_desc} md:text-[16px] text-[14px]`}>{item?.message}</p>
									<span className='md:text-[14px] text-[12px] text-gray-400'>{getDate(item?.created_at)}</span>
								</div>
							</div>
							<CloseIcon onClick={() => deleteNotification(item?.id)} className='md:text-[1.2rem] text-[0.9rem] cursor-pointer' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default NotificationsMenu;
