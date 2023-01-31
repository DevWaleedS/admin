import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PieChartSec from "./PieChartSec/PieChartSec";
import MapChartSec from "./MapChartSec/MapChartSec";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SystemAreaSec = () => {
  return (
			<Box className="md:h-[16rem] md:mt-8 mt-5" sx={{ flexGrow: 1}}>
				<Grid className="flex md:flex-row flex-col items-center" container spacing={2}>
					<Grid sx={{ height: '16rem',width:'100%',maxWidth:'100%' }} item xs={4}>
						<Item sx={{ height: '1', p: '1rem' }} className='shadow-[0px_3px_6px_#272D3B0F] rounded-lg  pb-12'>
							<h2 className='font-normal md:text-lg text-[16px]'>إجمالي استخدام النظام</h2>
							<PieChartSec />
						</Item>
					</Grid>
					<Grid sx={{ height: '16rem',width:'100%',maxWidth:'100%' }} item xs={8}>
						<Item sx={{ height: '1', p: '1rem' }} className='shadow-[0px_3px_6px_#272D3B0F] rounded-lg md:pb-12'>
							<h2 className='font-normal md:text-lg text-[16px]' style={{ color: '#1DBBBE' }}>
								المناطق الأكثر اشتراكاً
							</h2>
							<MapChartSec />
						</Item>
					</Grid>
				</Grid>
			</Box>
		);
};

export default SystemAreaSec;
