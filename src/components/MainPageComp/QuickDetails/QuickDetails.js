import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Store, User, Service } from "../../../assets/Icons/index";

const QuickDetails = () => {
  return (
			<Box className="w-full md:mb-[56px] mb-5">
				<Stack className="md:gap-[40px] gap-[10px]" sx={{ flexDirection: 'row',flexWrap:'wrap' }}>
					<Paper
						sx={{
							flex: '1',
							width: '340px',
							p: '1rem',
							display: 'flex',
							alignItems: 'center',
							gap: '3rem',
						}}
						className='md:h-[7.125rem] h-[80px] shadow-[0px_6px_12px_#0000001A] rounded-[10px]'
					>
						<div>
							<div className='h-12 w-12 flex justify-center items-center rounded' style={{ backgroundColor: 'rgba(182, 190, 52, 0.4)' }}>
								<img src={Store} alt='' />
							</div>
						</div>
						<div className='flex-1 h-full flex flex-col justify-between'>
							<h2 className='font-normal text-xl'>عدد المتاجر</h2>
							<div className='flex justify-between items-baseline'>
								<h2 className='font-medium text-2xl'>170</h2>
								<h6 className='font-normal text-[14px] text-green-500'>20% +</h6>
							</div>
						</div>
					</Paper>
					<Paper
						sx={{
							flex: '1',
							width: '340px',
							p: '1rem',
							display: 'flex',
							alignItems: 'center',
							gap: '3rem',
						}}
						className='md:h-[7.125rem] h-[80px] shadow-[0px_6px_12px_#0000001A] rounded-[10px]'
					>
						<div>
							<div className='h-12 w-12 flex justify-center items-center rounded' style={{ backgroundColor: 'rgba(29, 187, 190, 0.4)' }}>
								<img src={User} alt='' />
							</div>
						</div>
						<div className='flex-1 h-full flex flex-col justify-between'>
							<h2 className='font-normal text-xl'>عدد المندوبين</h2>
							<div className='flex justify-between '>
								<h2 className='font-medium text-2xl'>815</h2>
								<h6 className='font-normal text-[14px] text-green-500'>45% +</h6>
							</div>
						</div>
					</Paper>
					<Paper
						sx={{
							flex: '1',
							width: '340px',
							p: '1rem',
							display: 'flex',
							alignItems: 'center',
							gap: '3rem',
						}}
						className='md:h-[7.125rem] h-[80px] shadow-[0px_6px_12px_#0000001A] rounded-[10px]'
					>
						<div>
							<div className='h-12 w-12 flex justify-center items-center rounded' style={{ backgroundColor: 'rgba(255, 56, 56, 0.4)' }}>
								<img src={Service} alt='' />
							</div>
						</div>
						<div className='flex-1 h-full flex flex-col justify-between'>
							<h2 className='font-normal text-xl'>عدد الخدمات</h2>
							<div className='flex justify-between '>
								<h2 className='font-medium text-2xl'>6</h2>
								<h6 className='font-normal text-[14px] text-red-500'>45% -</h6>
							</div>
						</div>
					</Paper>
				</Stack>
			</Box>
		);
};

export default QuickDetails;
