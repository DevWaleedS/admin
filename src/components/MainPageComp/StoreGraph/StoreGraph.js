import * as React from "react";
import DatePicker from "./DatePicker/DatePicker";
import GraphSec from "./GraphSec/GraphSec";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Income, Money, Growth } from "../../../assets/Icons/index";


const StoreGraph = () => {
  return (
			<div className='mt-8 '>
				<DatePicker></DatePicker>

				<div className='flex mt-6 h-96 gap-6'>
					<div className='flex-1 p-4 shadow-[0px_6px_12px_#0000000F] rounded-lg' style={{ backgroundColor: '#fff' }}>
						<GraphSec />
					</div>
					<div className='w-64 '>
						<Stack gap={2} sx={{ height: '100%' }}>
							<Paper
								sx={{
									flex: '1',
									p: '0.5rem 1rem',
									display: 'flex',
									alignItems: 'center',
									gap: '3rem',
								}}
								className='shadow-[0px_6px_12px_#0000000F] rounded-lg'
							>
								<div>
									<div className='h-10 w-10 flex justify-center items-center rounded-full p-1'>
										<img src={Income} alt='' />
									</div>
								</div>
								<div className='flex-1 h-full flex flex-col justify-center'>
									<h2 className='font-medium text-2xl'>280</h2>
									<div className='flex justify-between '>
										<h2 className='font-normal text-lg'>عدد المتاجر</h2>
									</div>
								</div>
							</Paper>
							<Paper
								sx={{
									flex: '1',
									p: '0.5rem 1rem',
									display: 'flex',
									alignItems: 'center',
									gap: '3rem',
								}}
								className='shadow-[0px_6px_12px_#0000000F] rounded-lg'
							>
								<div>
									<div className='h-10 w-10 flex justify-center items-center rounded-full p-1'>
										<img className='h-full' src={Money} alt='' />
									</div>
								</div>
								<div className='flex-1 h-full flex flex-col justify-center'>
									<h2 className='font-medium text-2xl'>1,250$</h2>
									<div className='flex justify-between '>
										<h2 className='font-normal text-lg'>قيمة الاشتراكات</h2>
									</div>
								</div>
							</Paper>
							<Paper
								sx={{
									flex: '1',
									p: '0.5rem 1rem',
									display: 'flex',
									alignItems: 'center',
									gap: '3rem',
								}}
								className='shadow-[0px_6px_12px_#0000000F] rounded-lg'
							>
								<div>
									<div className='h-10 w-10 flex justify-center items-center rounded-full p-1'>
										<img src={Growth} alt='' />
									</div>
								</div>
								<div className='flex-1 h-full flex flex-col justify-center'>
									<h2 className='font-medium text-2xl'>
										<span className='txt-[#011723] text-xl font-normal'>%</span> 2.0+
									</h2>
									<div className='flex justify-between '>
										<h2 className='font-normal text-lg'>عدد المندوبين</h2>
									</div>
								</div>
							</Paper>
							<Paper
								sx={{
									flex: '1',
									p: '0.5rem 1rem',
									display: 'flex',
									alignItems: 'center',
									gap: '3rem',
								}}
								className='shadow-[0px_6px_12px_#0000000F] rounded-lg'
							>
								<div>
									<div className='h-10 w-10 flex justify-center items-center rounded-full p-1'>
										<img src={Money} alt='' />
									</div>
								</div>
								<div className='flex-1 h-full flex flex-col justify-center'>
									<h2 className='font-medium text-2xl'>8,800$</h2>
									<div className='flex justify-between '>
										<h2 className='font-normal text-lg'>اجمالي الإيرادات</h2>
									</div>
								</div>
							</Paper>
						</Stack>
					</div>
				</div>
			</div>
		);
};

export default StoreGraph;
