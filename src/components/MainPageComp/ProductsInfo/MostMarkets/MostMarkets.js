import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

import { Gift, Clinic, Electronics } from '../../../../assets/Icons/index';

function createData(name, category, img, rate) {
	return { name, category, img, rate };
}

const rows = [
	createData('أمازون', 'هدايا وألعاب', Gift, 4.8),
	createData('صحتى', 'مستلزمات طبية', Clinic, 2.5),
	createData('تسعة', 'الكترونيات', Electronics, 4.8),
	createData('أمازون', 'هدايا وألعاب', Gift, 4.8),
	createData('صحتى', 'مستلزمات طبية', Clinic, 2.5),
];

const MostMarkets = () => {
	return (
		<TableContainer component={Paper} sx={{ height: '100%' }} className='shadow-[0px_3px_6px_#00000029] rounded-lg'>
			<h2 className='p-4 text-[22px] font-medium'>المتاجر الأكثر زيارة</h2>
			<Table sx={{}} aria-label='simple table'>
				<TableHead>
					<TableRow
						className='bg-[#E6F5F652]'
						sx={{
							'& .MuiTableCell-root.MuiTableCell-head': {
								fontFamily: "'Tajawal', sans-serif",
								border: 'none',
							},
						}}
					>
						<TableCell align='center' className='text-[#52575D] text-base font-medium pr-3'>
							اسم المتجر
						</TableCell>
						<TableCell align='right' className='text-[#52575D] text-base font-medium'>
							التصنيف
						</TableCell>
						<TableCell align='center' className='text-[#52575D] text-base font-medium'>
							تقييم العملاء
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						'& .MuiTableRow-root .MuiTableCell-root': {
							fontFamily: "'Tajawal', sans-serif",
							border: 'none',
						},
					}}
				>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
								'& .MuiTableCell-root': {
									height: '4rem',
									border: 'none',
								},
							}}
						>
							<TableCell component='th' scope='row' align='center' className='text-base font-normal '>
								{row.name}
							</TableCell>
							<TableCell sx={{ display: 'flex ', alignItems: 'right', gap: '0.5rem' }} component='th' scope='row' className='text-base font-normal justify-start'>
								<img className='h-6' src={row.img} alt='' />
								{row.category}
							</TableCell>

							<TableCell align='center' className='text-base font-normal'>
								<div className='flex items-center justify-center'> 
									<div className='flex justify-between items-center py-1 px-1 w-16 h-6 rounded-md' style={{ backgroundColor: 'rgb(164,161,251)' }}>
										<h2 className='font-medium' style={{ color: '#fff' }}>
											{row.rate}
										</h2>
										{row.rate > 3 ? <BsStarFill color='#fff' /> : <BsStarHalf color='#fff' />}
									</div>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MostMarkets;
