import React,{useContext} from 'react';
import { ReactComponent as ProEmoji } from '../../../../assets/Icons/icon-38-emojy.svg';
import { ReactComponent as TraderEmoji } from '../../../../assets/Icons/icon-38-emojy2.svg';
import { ReactComponent as BeginnerEmoji } from '../../../../assets/Icons/icon-38-happy emojy.svg';
import { BsCheckLg } from 'react-icons/bs';
import styles from './Plans.module.css';
import Button from '../../../../UI/Button/Button';
import Switch from '@mui/material/Switch';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import Context from '../../../../store/context';
import CircularLoading from '../../../../UI/CircularLoading/CircularLoading';
import axios from 'axios';

const icons = [<BeginnerEmoji style={{ fill: 'red' }} />, <TraderEmoji style={{ fill: '#fff' }} />, <ProEmoji style={{ fill: '#1DBBBE' }} />];

const Plans = ({ fetchedData, loading,reload,setReload, yearlyPlan, editPackage, editPackageTemplate }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;
	const changeStoreStatus =(id)=>{
		axios
			.get(`https://backend.atlbha.com/api/Admin/changePackageStatus/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res?.data?.success === true && res?.data?.status === 200) {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				} else {
					setEndActionTitle(res?.data?.message?.ar);
					setReload(!reload);
				}
			});
	}
	return (
		<div>
			<div className='flex md:flex-row flex-col gap-4 items-center'>
				{loading ?
					<div className='w-full flex flex-col items-center justify-center'>
						<CircularLoading />
					</div>
					:
					(
						fetchedData?.data?.packages?.map((p, index) => {
							const proPackage = index === 1 ? styles.pro : styles.normal;
							return (
								<div key={index} className={`flex-1 md:w-[376px] w-full p-5 rounded-lg ${proPackage}`}>
									<div className='py-6 '>
										<h2 className='flex items-center text-2xl font-medium gap-4 mb-6 justify-center'>
											{p?.name}
											{icons[index]}
										</h2>
										<h2 className='text-center'>
											<span className='text-4xl font-semibold ml-1'>{yearlyPlan ? p?.yearly_price : p?.monthly_price}</span>
											ر.س
										</h2>
										<h2 className='text-center'>{yearlyPlan ? '/سنويا' : '/شهريا'}</h2>
										<div className='pr-12'>
											{p?.plans?.map((item, index) => {
												return (
													<h2 className={`font-medium my-4 text-xl whitespace-nowrap`} style={{ color: !item?.selected ? '#ADB5B9' : '' }} key={index}>
														<BsCheckLg
															style={{
																color: item?.selected ? '#3AE374' : '#ADB5B9',
																display: 'inline-block',
																marginLeft: '1rem',
																fontSize: '1.25rem',
															}}
														></BsCheckLg>
														{item?.name}
													</h2>
												);
											})}
										</div>
									</div>
									<div className='w-full flex justify-center items-center mb-6'>
										<Switch
											onChange={() => changeStoreStatus(p?.id)}
											sx={{
												width: '32px',
												padding: 0,
												height: '20px',
												borderRadius:'0.75rem',
												'& .MuiSwitch-thumb': {
													width: '12px',
													height: '12px',
												},
												'& .MuiSwitch-switchBase': {
													padding: '0',
													top: '4px',
													left: '4px',
												},
												'& .MuiSwitch-switchBase.Mui-checked': {
													left: '-4px',
												},
												'& .Mui-checked .MuiSwitch-thumb': {
													backgroundColor: '#FFFFFF',
												},
												'& .MuiSwitch-track': {
													height: '100%',
												},
												'&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
													backgroundColor: '#3AE374',
													opacity: 1,
												},
											}}
											checked={p?.status === 'نشط' ? true : false}
										/>
									</div>
									<Button
										svg={<FiEdit style={{ color: '#0099FB' }} />}
										type={index === 1 ? 'normal' : 'outline'}
										className={`mb-2 w-full h-14  text-xl font-medium  ${index === 1 ? 'bg-slate-50 text-[#0099FB]' : ''} `}
										style={{ borderColor: index === 1 ? '' : '#0099FB' }}
										textStyle={{ color: '#0099FB' }}
										onClick={() => {
											editPackage(p);
										}}
									>
										تعديل خصائص الباقة
									</Button>
									<Button
										svg={<AiOutlineEye style={{ color: `  ${index === 1 ? '#fff' : '#67747B'} ` }} />}
										className={'w-full h-14 text-xl font-medium '}
										type={'outline'}
										style={{ border: ` 1px solid ${index === 1 ? '#EFF9FF' : '#67747B'} ` }}
										textStyle={{ color: index === 1 ? '#EFF9FF' : '#67747B' }}
										onClick={() => {
											editPackageTemplate(p?.templates);
										}}
									>
										عرض قوالب الباقة
									</Button>
								</div>
							);
						})
					)}
			</div>
		</div>
	);
};

export default Plans;
