import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { EditButton } from '../../assets/Icons/index';
import { ReactComponent as DeleteIcon } from '../../assets/Icons/icon-24-delete.svg';
import Context from '../../store/context';
import axios from "axios";
import CircularLoading from '../../UI/CircularLoading/CircularLoading';

const Item = styled(Paper)(({ theme }) => ({
	height: '100%',
}));

const MarketsApis = ({ fetchedData, loading, reload, setReload, editPlatform }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

	const deletePlatform = (id) => {
		axios
			.delete(`https://backend.atlbha.com/api/Admin/platform/${id}`, {
				headers: {
					"Content-Type": "application/json",
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
			})
	}

	const changePlatformStatus = (id) => {
		axios
			.get(`https://backend.atlbha.com/api/Admin/changePlatformStatus/${id}`, {
				headers: {
					"Content-Type": "application/json",
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
			})
	}

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				{
					loading ?
						(
							<div className='w-full h-full flex flex-col items-center'>
								<CircularLoading />
							</div>

						)
						:
						(
							<Grid container spacing={2}>
								{fetchedData?.map((item, index) => {
									return (
										<Grid
											key={index}
											sx={{
												height: '13.125rem',
												mb: '5.625rem',
												'@media(max-width:767px)': {
													mb: '8px',
												}
											}}
											item
											md={4}
											xs={6}
										>
											<Item className='flex flex-col rounded-md overflow-hidden'>
												<a className='flex-1 h-[140px] p-4 flex items-center justify-center' href={item?.link} target='_blank' rel='noreferrer'>
													<img className={`w-9/12 h-full ${item?.status === 'نشط' ? '' : 'grayscale'}`} src={item?.logo} alt={item?.name} />
												</a>

												<div className='h-14 flex justify-center items-center gap-2' style={{ backgroundColor: 'rgb(32,125,175)' }}>
													<Switch
														onChange={() => changePlatformStatus(item?.id)}
														sx={{
															width: '32px',
															padding: 0,
															height: '20px',
															borderRadius: '0.75rem',
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
														checked={item?.status === 'نشط' ? true : false}
													/>
													<button className='h-8 w-8 bg-slate-50 rounded-full flex justify-center items-center'>
														<DeleteIcon onClick={() => deletePlatform(item.id)} className='w-[1.2rem]' color={'red'} />
													</button>
													<button onClick={()=>{editPlatform(item)}} className='h-8 w-8 bg-slate-50 rounded-full flex justify-center items-center'>
														<img className='w-[1.2rem]' src={EditButton} alt={item?.name} />
													</button>
												</div>
											</Item>
										</Grid>
									);
								})}
							</Grid>
						)
				}
			</Box>
		</div>
	);
};

export default MarketsApis;
