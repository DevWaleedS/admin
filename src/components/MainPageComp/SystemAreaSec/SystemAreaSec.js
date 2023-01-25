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
			<Box sx={{ flexGrow: 1, mt: 4, height: '16rem' }}>
				<Grid container spacing={2}>
					<Grid sx={{ height: '16rem' }} item xs={4}>
						<Item sx={{ height: '1', p: '1rem' }} className='shadow-[0px_3px_6px_#272D3B0F] rounded-lg  pb-12'>
							<h2 className='font-normal text-lg'>إجمالي استخدام النظام</h2>
							<PieChartSec />
						</Item>
					</Grid>
					<Grid sx={{ height: '16rem' }} item xs={8}>
						<Item sx={{ height: '1', p: '1rem' }} className='shadow-[0px_3px_6px_#272D3B0F] rounded-lg pb-12'>
							<h2 className='font-normal text-lg' style={{ color: '#1DBBBE' }}>
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
