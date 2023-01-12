import React from "react";
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
    name: "21/12",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "01/12",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "3/12",
    uv: 2000,
    pv: 3800,
    amt: 2290,
  },
  {
    name: "16/12",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "23/12",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "18/12",
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: "23/6",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const GraphSec = () => {
  return (
    <div className="h-full">
      <div className="flex h-full gap-4">
        <div className="mt-4" style={{ width: "100%", height: "100px" }}>
          <ResponsiveContainer>
            <LineChart width={400} height={200} data={data}>
              <CartesianGrid horizontal={false} />
              <XAxis
                axisLine={false}
                dataKey="name"
                interval={0}
                dx={3}
                tickLine={false}
              />

              <Line
                type=""
                dot={false}
                dataKey="pv"
                strokeWidth={3}
                stroke="#02466A"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphSec;
