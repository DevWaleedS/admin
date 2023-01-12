import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const IncreaseRateChartPiece = () => {
  return (
    <div style={{ width: "100%", height: 200, marginTop: "2.5rem" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal vertical={false} />
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <YAxis
            axisLine={false}
            tickLine={false}
            yAxisId="left"
            orientation="left"
            tickMargin={30}
            tickFormatter={(e) => {
              return `$${e / 1000}k`;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            yAxisId="right"
            orientation="right"
            tickMargin={30}
            tickFormatter={(e) => {
              return `$${e / 1000}k`;
            }}
          />

          <Bar yAxisId="left" dataKey="pv" fill="#B6BE34" barSize={6} />
          <Bar yAxisId="right" dataKey="uv" fill="#b6be3480" barSize={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncreaseRateChartPiece;
