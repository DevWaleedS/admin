import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  
} from "recharts";
const data = [
  {
    name: "jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "mar",
    uv: 2000,
    pv: 3800,
    amt: 2290,
  },
  {
    name: "apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "may",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "jun",
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: "jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const GraphSec = () => {
  const [ticks] = useState([]);
  console.log(ticks);
  return (
			<div className='h-full'>
				<div className='pr-8'>
					<h2 className='pb-4 font-medium text-[22px]'>إحصائيات المتاجر</h2>
					<h2 className='text-[22px] font-bold ' style={{ color: '#1DBBBE' }}>
						Avg. $5,309
					</h2>
				</div>
				<div className='flex h-full gap-4'>
					<div className='mt-8' style={{ width: '100%', height: '200px' }}>
						<ResponsiveContainer>
							<LineChart width={600} height={100} data={data}>
								<CartesianGrid horizontal={false} />
								<XAxis axisLine={false} dataKey='name' interval={0} tickLine={false} dx={6} />
								<YAxis
									scale='sqrt'
									tickMargin='60'
									tickLine={false}
									axisLine={false}
									interval='preserveStartEnd'
									orientation={'right'}
									tickFormatter={(e) => {
										return `$${e}`;
									}}
								/>

								<Line type='' dot={false} dataKey='pv' strokeWidth={3} stroke='#1DBBBE' activeDot={{ r: 8 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		);
};

export default GraphSec;
