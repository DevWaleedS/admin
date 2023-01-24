import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShoesImg, CarImg, CameraImg } from "../../../../assets/Icons/index";

function createData(name, category, price, totalSells, productNumber, img) {
  return { name, category, price, totalSells, productNumber, img };
}

const rows = [
  createData("حذاء نايك", "أحذية", "35", "9830", "054", ShoesImg),
  createData("كاميرا شت", "الكترونيات", "35", "9830", "158", CameraImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "98", CarImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "012", CameraImg),
  createData("سيارة انتيكا", "هدايا ", "35", "9830", "077", CarImg),
];

const MostProducts = () => {
  return (
			<TableContainer component={Paper} sx={{ height: '100%' }} className='shadow-[0px_3px_6px_#00000029] rounded-lg'>
				<h2 className='p-4 text-[22px] font-medium'>المنتجات الأكثر زيارة</h2>
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
							<TableCell align='right ' className='text-[#52575D] text-base font-medium '>
								رقم المنتج
							</TableCell>
							<TableCell align='right' className='text-[#52575D] text-base font-medium'>
								الاسم
							</TableCell>
							<TableCell align='right' className='text-[#52575D] text-base font-medium'>
								التصنيف
							</TableCell>
							<TableCell align=' center' className='text-[#52575D] text-base font-medium'>
								السعر
							</TableCell>
							<TableCell align='center' className='text-[#52575D] text-base font-medium '>
								اجمالى المبيعات
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
								<TableCell sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} component='th' scope='row'>
									<img className='h-8' src={row.img} alt='' />
									{row.productNumber}
								</TableCell>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right' className='text-base font-normal'>
									{row.category}
								</TableCell>
								<TableCell align='center' className='text-base font-normal'>
									{row.price}
								</TableCell>
								<TableCell align='center' className='text-base font-normal'>
									{row.totalSells}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
};

export default MostProducts;
